#!/usr/bin/env node

/**
 * IEPMS Column Writer (7-step workflow)
 *
 * Updates a specific column value for a site in the IEPMS system.
 *
 * CLI Signature:
 *   iepms-writter {site_code} {proj_code} {duModelName} {viewName} {fieldTitle} {fieldName} {value:YYYY-MM-DD}
 *
 * Example:
 *   iepms-writter 1572C "P202202168750_D002" "2023 TX Rollout" "TX Rollout V2" "Material On Site" "actual_end_date" 2025-08-19
 *
 * Default: runs without prompt. Use --interactive for confirmation.
 *
 * Authentication:
 *   Default credentials:
 *     username: 7018000051
 *     token: 6d1e33e2011aa1bec9b7370a1d1a57dd
 *   Override by providing credentials JSON via context or first-run prompt.
 *   Accepts { token, username } or { UCSSSOAccount, UCSSSOToken }.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const axios = require('axios');

// Configuration
const IEPMS_BASE_URL = 'https://iepms.zte.com.cn';
const CACHE_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.openclaw', 'skills', 'iepms-column-writter', 'cache');
const COLUMNS_CACHE_PREFIX = 'columns_';
const SITE_CACHE_PREFIX = 'site_';
const PROJ_CACHE_PREFIX = 'proj_';

// Ensure cache directory exists
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

// Cookie store to persist fb_session across requests
let cookieStore = '';

function updateCookieStore(setCookieHeader) {
  const fbSessionMatch = setCookieHeader.match(/fb_session=([^;]+)/);
  if (fbSessionMatch) {
    cookieStore = cookieStore.replace(/fb_session=[^;]+; ?/, '');
    cookieStore = `fb_session=${fbSessionMatch[1]}; ` + cookieStore;
  }
}

function getCookieHeader(baseCookie) {
  return baseCookie + cookieStore;
}

// Load credentials
function loadCredentials() {
  const credFile = path.join(CACHE_DIR, 'credentials.json');
  try {
    if (fs.existsSync(credFile)) {
      const data = JSON.parse(fs.readFileSync(credFile, 'utf8'));
      if (data.token && data.username) {
        return { token: data.token, username: data.username };
      }
      if (data.UCSSSOToken && data.UCSSSOAccount) {
        return { token: data.UCSSSOToken, username: data.UCSSSOAccount };
      }
    }
  } catch (e) {}
  return null;
}

function saveCredentials(token, username) {
  ensureCacheDir();
  const credFile = path.join(CACHE_DIR, 'credentials.json');
  fs.writeFileSync(credFile, JSON.stringify({ token, username }, null, 2));
}

// Prompt for credentials
async function promptCredentials(rl) {
  return new Promise((resolve, reject) => {
    const defaultCreds = { token: '6d1e33e2011aa1bec9b7370a1d1a57dd', username: '7018000051' };
    rl.question('Enter credentials JSON (or press Enter to use defaults): ', (input) => {
      try {
        if (!input.trim()) {
          saveCredentials(defaultCreds.token, defaultCreds.username);
          resolve(defaultCreds);
          return;
        }
        const creds = JSON.parse(input.trim());
        let token, username;
        if (creds.token && creds.username) {
          token = creds.token;
          username = creds.username;
        } else if (creds.UCSSSOAccount && creds.UCSSSOToken) {
          token = creds.UCSSSOToken;
          username = creds.UCSSSOAccount;
        } else {
          throw new Error('Missing required fields');
        }
        saveCredentials(token, username);
        resolve({ token, username });
      } catch (e) {
        console.error('Invalid input. Expected empty (use defaults) or JSON with token/username or UCSSSOAccount/UCSSSOToken.');
        rl.close();
        process.exit(1);
      }
    });
  });
}

// Universal HTTP logger
function logHttp(method, url, headers, body) {
  console.log(`\n=== HTTP REQUEST ===`);
  console.log(`${method} ${url}`);
  const safeHeaders = { ...headers };
  if (safeHeaders['X-Auth-Value']) safeHeaders['X-Auth-Value'] = '***';
  if (safeHeaders['Cookie']) safeHeaders['Cookie'] = safeHeaders['Cookie'].replace(/(UCSSSOToken=[^;]+;?)/, 'UCSSSOToken=***;').replace(/(fb_session=[^;]+;?)/, 'fb_session=***;');
  console.log('Headers:', JSON.stringify(safeHeaders, null, 2));
  if (body) {
    try {
      const parsed = JSON.parse(body);
      console.log('Body:', JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('Body:', body);
    }
  }
}

// Log response details, return parsed body
function logResponse(response, rawBody) {
  console.log(`Response: ${response.status} ${response.statusText || ''}`);
  console.log('Response Headers:', JSON.stringify(Object.fromEntries(response.headers), null, 2));
  let parsed;
  try {
    parsed = JSON.parse(rawBody);
    console.log('Response Body:', JSON.stringify(parsed, null, 2));
  } catch (e) {
    parsed = rawBody;
    console.log('Response Body:', rawBody);
  }
  return parsed;
}

// Core axios wrapper with mandatory logging and cookie persistence
async function httpsRequest(options, body = null) {
  const urlObj = new URL(options.path, IEPMS_BASE_URL);
  const method = options.method || 'GET';
  const fullUrl = IEPMS_BASE_URL + urlObj.pathname + urlObj.search;
  const headers = options.headers || {};

  logHttp(method, fullUrl, headers, body);

  try {
    const response = await axios({
      method,
      url: fullUrl,
      headers,
      data: body,
      validateStatus: () => true, // always resolve, we handle status
      maxRedirects: 0,
      responseType: 'text',
    });

    const rawBody = response.data;
    const parsed = logResponse(response, rawBody);

    // Capture fb_session from Set-Cookie
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      const lines = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const line of lines) {
        if (line.includes('fb_session=')) {
          const match = line.match(/fb_session=([^;]+)/);
          if (match) updateCookieStore(`fb_session=${match[1]};`);
        }
      }
    }

    return {
      status: response.status,
      data: parsed,
      headers: response.headers,
      raw: rawBody,
    };
  } catch (error) {
    if (error.response) {
      const rawBody = error.response.data;
      const parsed = logResponse(error.response, rawBody);
      return {
        status: error.response.status,
        data: parsed,
        headers: error.response.headers,
        raw: rawBody,
      };
    }
    throw error;
  }
}

// Cache helpers
function cachePath(prefix, key) {
  return path.join(CACHE_DIR, `${prefix}${key}.json`);
}

function loadCache(prefix, key, ttlMs) {
  const file = cachePath(prefix, key);
  try {
    if (fs.existsSync(file)) {
      const cached = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Date.now() - cached.cachedAt < ttlMs) {
        console.log(`[CACHE HIT] ${prefix}${key}`);
        return cached.data;
      }
    }
  } catch (e) {}
  console.log(`[CACHE MISS] ${prefix}${key}`);
  return null;
}

function saveCache(prefix, key, data) {
  ensureCacheDir();
  fs.writeFileSync(cachePath(prefix, key), JSON.stringify({ cachedAt: Date.now(), data }, null, 2));
}

// API: Get project list (Step 2)
async function getProjectList(token, username) {
  const cacheKey = `user_${username}`;
  const cached = loadCache(PROJ_CACHE_PREFIX, cacheKey, 60 * 60 * 1000); // 1h
  if (cached) return cached;

  const url = `/fbr/apidata/getAPIData?apiid=526129009928470528&user_id=${encodeURIComponent(username)}&username=${encodeURIComponent(username)}`;
  const body = JSON.stringify({ user_id: username });
  // Step 2 headers: Cookie-based SSO + Host
  const baseCookie = `UCSSSOAccount=${username}; UCSSSOToken=${token};`;
  const headers = {
    'Host': 'iepms.zte.com.cn',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json; charset=UTF-8',
    'Cookie': getCookieHeader(baseCookie),
  };

  const { status, data } = await httpsRequest({ path: url, method: 'POST', headers }, body);
  if (status !== 200) {
    throw new Error(`Failed to get project list: HTTP ${status}`);
  }
  if (!data.success) {
    throw new Error(`Failed to get project list: ${data.error || 'unknown error'}`);
  }

  // Construct projMap1: { [proj_id]: proj_code }
  const projMap1 = {};
  for (const p of (data.data || [])) {
    projMap1[p.proj_id] = p.proj_code;
  }
  console.log('projMap1:', JSON.stringify(projMap1, null, 2));

  saveCache(PROJ_CACHE_PREFIX, cacheKey, data);
  return data;
}

// API: Get duModels (Step 3)
async function getDuModels(token, username, projId) {
  const cacheKey = 'duModels';
  const cached = loadCache(COLUMNS_CACHE_PREFIX, cacheKey, 24 * 60 * 60 * 1000); // 24h
  if (cached) return cached;

  const url = `/zte-crm-iepms-basebff/zte-crm-iepms-schedule/duModel`;
  const headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json',
    'X-Emp-No': username,
    'X-Auth-Value': token,
    'X-Itp-Value': `timeZone=8;projId=${projId}`,
    'Referer': 'https://iepms.zte.com.cn/zte-crm-iepms-scheduleui/',
  };

  const { status, data } = await httpsRequest({ path: url, method: 'GET', headers });
  if (status !== 200 || data.code?.code !== '0000') {
    throw new Error(`Failed to get duModels: ${data?.code?.msg || 'HTTP ' + status}`);
  }

  // Build plain map: { [duModelId]: duModelName }
  const duMap = {};
  for (const domain of (data.bo || [])) {
    for (const model of (domain.duModelVOList || [])) {
      if (model.duModelStatus === 'ENABLED') {
        duMap[model.duModelId] = model.duModelName;
      }
    }
  }

  const result = {
    requestedAt: new Date().toISOString().split('T')[0],
    ...data,
    duMap,
  };

  console.log('duMap:', JSON.stringify(duMap, null, 2));

  saveCache(COLUMNS_CACHE_PREFIX, cacheKey, result);
  return result;
}

// API: Get views for duModel (Step 4)
async function getViewList(token, username, duModelId, projId) {
  const cacheKey = `views_${duModelId}`;
  const cached = loadCache(COLUMNS_CACHE_PREFIX, cacheKey, 24 * 60 * 60 * 1000); // 24h
  if (cached) return cached;

  const url = `/zte-crm-iepms-basebff/zte-crm-iepms-schedule/viewManage/getViewList?duModelId=${encodeURIComponent(duModelId)}`;
  const headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json',
    'X-Emp-No': username,
    'X-Auth-Value': token,
    'X-Itp-Value': `timeZone=8;projId=${projId}`,
    'Referer': 'https://iepms.zte.com.cn/zte-crm-iepms-scheduleui/',
  };

  const { status, data } = await httpsRequest({ path: url, method: 'GET', headers });
  if (status !== 200 || data.code?.code !== '0000') {
    throw new Error(`Failed to get view list: ${data?.code?.msg || 'HTTP ' + status}`);
  }

  // Build plain map: { [viewId]: viewName }
  const viewMap = {};
  for (const view of (data.bo?.publicViews || [])) {
    viewMap[view.viewId] = view.viewName;
  }

  console.log('duViews:', JSON.stringify(viewMap, null, 2));

  saveCache(COLUMNS_CACHE_PREFIX, cacheKey, viewMap);
  return viewMap;
}

// API: Get schedule titles (columns) (Step 5)
async function getColumns(token, username, duModelId, viewId, projId) {
  // Cache key uses viewId only; file name: columns_{viewId}.json
  const cacheKey = viewId;
  const cached = loadCache(COLUMNS_CACHE_PREFIX, cacheKey, 24 * 60 * 60 * 1000); // 24h
  if (cached) return cached;

  const url = `/zte-crm-iepms-basebff/zte-crm-iepms-schedule/schedule/getScheduleTitle?duModelId=${encodeURIComponent(duModelId)}&viewId=${encodeURIComponent(viewId)}`;
  const headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json',
    'X-Emp-No': username,
    'X-Auth-Value': token,
    'X-Itp-Value': `timeZone=8;projId=${projId}`,
    'Referer': 'https://iepms.zte.com.cn/zte-crm-iepms-scheduleui/',
  };

  const { status, data } = await httpsRequest({ path: url, method: 'GET', headers });
  if (status !== 200 || data.code?.code !== '0000') {
    throw new Error(`Failed to get columns: ${data?.code?.msg || 'HTTP ' + status}`);
  }

  // Group columns by duModelWpAcId
  const columnMap = {};
  for (const col of (data.bo || [])) {
    if (col.duModelWpAcId) {
      if (!columnMap[col.duModelWpAcId]) columnMap[col.duModelWpAcId] = [];
      columnMap[col.duModelWpAcId].push(col);
    }
  }

  // Append requestedAt (date only YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  const result = {
    requestedAt: today,
    duModelId,
    viewId,
    ...data,
    columns: columnMap,
  };

  console.log('duColumns:', JSON.stringify(columnMap, null, 2));

  saveCache(COLUMNS_CACHE_PREFIX, cacheKey, result);
  return result;
}

// API: Get site info (Step 6)
async function getSiteInfo(token, username, projectId, duModelId, siteCode) {
  const cacheKey = `${siteCode}_${projectId}`;
  const cached = loadCache(SITE_CACHE_PREFIX, cacheKey, 30 * 60 * 1000); // 30m
  if (cached) return cached;

  const url = `/fbr/apidata/getAPIData?apiid=1059839087123398656&user_id=${encodeURIComponent(username)}&username=${encodeURIComponent(username)}&parse_json=true`;
  const body = JSON.stringify({
    proj_id: projectId,
    model_id: duModelId || '',
    model_name: '',
    site_model_name: '',
    region: '',
    phase: '',
    du_code: '',
    du_name: '',
    du_status: '',
    site_id: '',
    site_code: siteCode,
    site_name: '',
  });
  const baseCookie = `UCSSSOAccount=${username}; UCSSSOToken=${token};`;
  const headers = {
    'Host': 'iepms.zte.com.cn',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json; charset=UTF-8',
    'Cookie': getCookieHeader(baseCookie),
  };

  const { status, data } = await httpsRequest({ path: url, method: 'POST', headers }, body);
  if (status !== 200) {
    throw new Error(`Failed to get site info: HTTP ${status}`);
  }
  if (!data.success) {
    throw new Error(`Failed to get site info: ${data.error || 'unknown error'}`);
  }

  if (!data.data || data.data.length === 0) {
    throw new Error(`No records found for site '${siteCode}'`);
  }
  if (data.data.length > 1) {
    throw new Error(`Multiple records found for site '${siteCode}' (${data.data.length})`);
  }

  saveCache(SITE_CACHE_PREFIX, cacheKey, data.data[0]);
  return data.data[0];
}

// API: Batch modify schedule column (Step 7)
async function updateColumn(token, username, projId, duIdList, fieldType, fieldId, fieldValue, bizId) {
  const url = `/zte-crm-iepms-basebff/zte-crm-iepms-schedule/schedule/batchModify`;
  const body = JSON.stringify({
    duIdList,
    fieldType,
    fieldId,
    fieldValue,
    bizId,
  });
  const headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Emp-No': username,
    'X-Auth-Value': token,
    'X-Itp-Value': `timeZone=8;projId=${projId}`,
    'Referer': 'https://iepms.zte.com.cn/zte-crm-iepms-scheduleui/',
  };

  const { status, data } = await httpsRequest({ path: url, method: 'POST', headers }, body);
  if (status !== 200 || data.code?.code !== '0000') {
    throw new Error(`Failed to update column: ${data?.code?.msg || 'HTTP ' + status}`);
  }

  return data;
}

// Find column matching fieldTitle and fieldName
function findColumn(columnsByWpAc, fieldTitle, fieldName) {
  for (const wpAcId in columnsByWpAc) {
    for (const col of columnsByWpAc[wpAcId]) {
      const titleMatch = col.titleOne === fieldTitle || col.titleTwo === fieldTitle;
      const nameMatch = col.fieldName === fieldName || col.titleThree === fieldName;
      if (titleMatch && nameMatch) {
        return {
          wpAcId,
          fieldId: col.fieldId,
          fieldType: col.fieldType,
          screeningType: col.screeningType,
          valueType: col.valueType,
          titleOne: col.titleOne,
          fieldName: col.fieldName,
        };
      }
    }
  }
  throw new Error(`Field not found: ${fieldTitle} + ${fieldName}`);
}

// Main
async function main() {
  // args: site_code proj_code duModelName viewName fieldTitle fieldName value [--interactive]
  const args = process.argv.slice(2);
  const interactiveIdx = args.findIndex(arg => arg === '--interactive' || arg === '-i');
  if (interactiveIdx !== -1) args.splice(interactiveIdx, 1);
  const force = interactiveIdx === -1; // default non-interactive
  const [siteCode, projCode, duModelName, viewName, fieldTitle, fieldName, value] = args;
  if (!siteCode || !projCode || !duModelName || !viewName || !fieldTitle || !fieldName || value === undefined) {
    console.error('Usage: iepms-writter {site_code} {proj_code} {duModelName} {viewName} {fieldTitle} {fieldName} {value} [--interactive]');
    console.error('Example (date): iepms-writter 1572C "P202202168750_D002" "2023 TX Rollout" "TX Rollout V2" "Material On Site" "actual_end_date" 2025-08-19');
    console.error('Example (text):  iepms-writter 1572C "P202202168750_D002" "2023 TX Rollout" "TX Rollout V2" "Subcon Info" "SubCon - TI" "Magicell"');
    process.exit(1);
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    // Step 1: Credentials
    let creds = loadCredentials();
    if (!creds) creds = await promptCredentials(rl);
    console.log(`Authenticated as ${creds.username}`);

    // Step 2: Project list
    console.log('\n[1/6] Fetching project list...');
    const projList = await getProjectList(creds.token, creds.username);
    const project = projList.data.find(p => p.proj_code === projCode);
    if (!project) throw new Error(`Project '${projCode}' not accessible`);
    console.log(`  Project: ${project.proj_name} (${project.proj_code})`);
    const projId = project.proj_id;

    // Step 3: duModels
    console.log('\n[2/6] Fetching duModel list...');
    const duModelsResult = await getDuModels(creds.token, creds.username, projId);
    const duMap = duModelsResult.duMap;
    const duModelId = Object.keys(duMap).find(id => duMap[id] === duModelName);
    if (!duModelId) throw new Error(`duModel "${duModelName}" not found`);
    console.log(`  duModel: ${duMap[duModelId]} (${duModelId})`);

    // Step 4: View list
    console.log('\n[3/6] Fetching view list...');
    const viewMap = await getViewList(creds.token, creds.username, duModelId, projId);
    let viewId = Object.keys(viewMap).find(id => viewMap[id] === viewName);
    if (!viewId) {
      const zhFallbackId = Object.keys(viewMap).find(id => viewMap[id] === '默认视图');
      if (zhFallbackId) {
        console.log(`  View "${viewName}" not found, falling back to "默认视图" (${zhFallbackId})`);
        viewId = zhFallbackId;
      } else {
        const enFallbackId = Object.keys(viewMap).find(id => viewMap[id] === 'Default View');
        if (enFallbackId) {
          console.log(`  View "${viewName}" not found, falling back to "Default View" (${enFallbackId})`);
          viewId = enFallbackId;
        } else {
          throw new Error(`View "${viewName}" not found and no fallback views available`);
        }
      }
    } else {
      console.log(`  View: ${viewMap[viewId]} (${viewId})`);
    }

    // Step 5: Columns
    console.log('\n[4/6] Fetching columns...');
    const columnsData = await getColumns(creds.token, creds.username, duModelId, viewId, projId);
    const fieldInfo = findColumn(columnsData.columns, fieldTitle, fieldName);
    console.log(`  Resolved: ${fieldInfo.titleOne} / ${fieldInfo.fieldName}`);
    console.log(`    fieldId: ${fieldInfo.fieldId}, fieldType: ${fieldInfo.fieldType}, bizId: ${fieldInfo.wpAcId}`);

    // Validate date format if needed (after column metadata is fetched)
    const isDateField = (fieldInfo.fieldType === 'activity' && fieldInfo.screeningType === 'date') || fieldInfo.valueType === 'date';
    if (isDateField && value !== '' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error('value must be in YYYY-MM-DD format for this field');
    }

    // Step 6: Site info
    console.log('\n[5/6] Fetching site info...');
    const siteInfo = await getSiteInfo(creds.token, creds.username, projId, duModelId, siteCode);
    console.log(`  Site: ${siteInfo.site_code} (${siteInfo.site_id})`);
    console.log(`  DU: ${siteInfo.du_code} (${siteInfo.du_id})`);

    // Confirmation
    console.log('\n' + '='.repeat(50));
    console.log('SUMMARY');
    console.log('='.repeat(50));
    console.log(`Project:  ${project.proj_name}`);
    console.log(`Site:     ${siteInfo.site_code}`);
    console.log(`Field:    ${fieldInfo.titleOne} > ${fieldInfo.fieldName}`);
    console.log(`Value:    ${value}`);
    console.log(`Target:   DU ID ${siteInfo.du_id}`);
    console.log('='.repeat(50));
    if (!force) {
      console.log('\nProceed with update? (yes/no): ');
      const answer = await new Promise(resolve => rl.question('', resolve));
      if (answer.toLowerCase() !== 'yes') {
        console.log('Cancelled.');
        rl.close();
        process.exit(0);
      }
    } else {
      console.log('\nForce mode: skipping confirmation.');
    }

    // Step 7: Update
    console.log('\n[6/6] Updating...');
    const result = await updateColumn(creds.token, creds.username, projId, [siteInfo.du_id], fieldInfo.fieldType, fieldInfo.fieldId, value, fieldInfo.wpAcId);

    console.log('\n✓ Update successful');
    console.log('Response:', JSON.stringify(result, null, 2));
    rl.close();
    process.exit(0);

  } catch (err) {
    console.error('\n✗ Error:', err.message);
    rl.close();
    process.exit(1);
  }
}

main();
