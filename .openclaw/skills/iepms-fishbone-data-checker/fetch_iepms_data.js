#!/usr/bin/env node

/**
 * IEPMS Fishbone Data Checker
 * Trigger: fbr-check {site_code}
 *
 * Multi-step workflow to verify site information, task status, and SubCon TI value.
 * All HTTP requests and responses are logged to stdout as JSON.
 *
 * Uses axios for HTTP requests.
 */

const axios = require('axios');
if (!axios) {
  console.error('ERROR: axios is required but not installed. Please run: npm install axios');
  process.exit(1);
}
const BASE_URL = 'https://iepms.zte.com.cn/fbr/apidata/getAPIData';
const DEFAULT_USER_ID = '7018000051';
const DEFAULT_TOKEN = '6d1e33e2011aa1bec9b7370a1d1a57dd';

// API IDs
const API1_ID = '526129009928470528';                 // Project list
const API1_1_ID = '553988106803511296';               // Fields list (daily cache)
const API2_ID = '1059839087123398656';                // Site/DU data
const API3_ID = '529648514487058432';                 // Tasks
const API4_ID = '553909219625041920';                 // SubCon TI and SOW fields

const DEFAULT_PROJ_CODE = 'P202202168750_D002';
const DEFAULT_DU_MODEL = '2023 TX Rollout';

// Primary task names for fishbone milestones (7 key points)
const DEFAULT_PRIMARY_TASK_NAMES = [
  'Material Collection',
  'Material On Site',
  'EHS Check',
  'Equipment Installation',
  'TX Integrated',
  'L1 Approved',
  'PAC Approved'
];

// Full IEPMS task sequence (32 steps) - reference only
const FULL_TASK_SEQUENCE = [
  'PO Received from Cust',
  'TX Planning',
  'Lifting 1 Usage Submission (Document Approval)',
  'Physical Survey',
  'Lifting 1 Usage Report (L1)',
  'TSSR Submitted to ZTE',
  'TSSR Submitted to Customer',
  'TSSR customer Approval',
  'Link Budget_Tx',
  'BOQ Confirm',
  'Material Collection',
  'Lifting 2 Usage Submission (Document Approval)',
  'Material On Site',
  'EHS Check',
  'Equipment Installation',
  'TX Integrated',
  'Lifting 2 Usage Report (L1)',
  'L1 Approved',
  'TX Outsource Handover',
  'Online Site Acceptance',
  'Digi ATP Approval',
  'MRCF',
  'Topology Diagram_Tx',
  'L1 Report',
  'As-Built Drawing',
  'FQPL',
  'MRCF Document',
  'Front Page',
  'Site Binder Completed',
  'PAC Work Complete',
  'PAC Approved',
  'FAC Approved'
];

// Target field names for SubCon TI and SOW fields
const TARGET_FIELD_NAMES = [
  'SubCon - TI',
  'TX SOW (LLD)',
  'Post MOCN TX SOW (LLD)',
  'Microwave Tx SOW-1'
];

const fs = require('fs');
const path = require('path');

// Cache directory (store in skill's data folder)
function getDataDir() {
  return path.join(__dirname, 'data');
}

function getFieldsCachePath(projId) {
  return path.join(getDataDir(), `dufield_${projId}.json`);
}

function loadFieldsCache(projId) {
  const cachePath = getFieldsCachePath(projId);
  try {
    if (fs.existsSync(cachePath)) {
      const raw = fs.readFileSync(cachePath, 'utf8');
      const cache = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      if (cache.requestedAt === today) {
        console.log(`[CACHE HIT] Fields cache for proj ${projId}`);
        return cache;
      }
    }
  } catch (e) {}
  console.log(`[CACHE MISS] Fields cache for proj ${projId}`);
  return null;
}

function saveFieldsCache(projId, data) {
  const cachePath = getFieldsCachePath(projId);
  const cache = {
    requestedAt: new Date().toISOString().slice(0, 10),
    ...data
  };
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
}

// Build Cookie header from credentials
// Supports two formats:
// 1) { username, token } -> builds UCSSSOAccount=username; UCSSSOToken=token;
// 2) { UCSSSOAccount, UCSSSOToken } -> uses values directly
function buildCookie(creds) {
  if (creds.UCSSSOAccount !== undefined && creds.UCSSSOToken !== undefined) {
    return `UCSSSOAccount=${creds.UCSSSOAccount}; UCSSSOToken=${creds.UCSSSOToken};`;
  } else if (creds.username !== undefined && creds.token !== undefined) {
    return `UCSSSOAccount=${creds.username}; UCSSSOToken=${creds.token};`;
  } else {
    // Fallback to defaults if credentials are malformed
    return `UCSSSOAccount=${DEFAULT_USER_ID}; UCSSSOToken=${DEFAULT_TOKEN};`;
  }
}

// Cookie store to persist fb_session across requests
let cookieStore = '';

function updateCookieStore(setCookieHeader) {
  const fbSessionMatch = setCookieHeader.match(/fb_session=([^;]+)/);
  if (fbSessionMatch) {
    // Replace existing fb_session or prepend new one
    cookieStore = cookieStore.replace(/fb_session=[^;]+; ?/, '');
    cookieStore = `fb_session=${fbSessionMatch[1]}; ` + cookieStore;
  }
}

function buildFullCookie(baseCookie) {
  return baseCookie + cookieStore;
}

// Universal axios wrapper with logging and cookie persistence
async function axiosPost(url, body, baseCookie, stepLabel) {
  console.log(`\n=== HTTP REQUEST (${stepLabel}) ===`);
  console.log(`POST ${url}`);
  const fullCookie = buildFullCookie(baseCookie);
  const requestHeaders = {
    'Host': 'iepms.zte.com.cn',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json; charset=UTF-8',
    'Cookie': fullCookie
  };
  console.log('Headers:', JSON.stringify({
    'Host': 'iepms.zte.com.cn',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json; charset=UTF-8',
    'Cookie': fullCookie.replace(/(UCSSSOToken=[^;]+);/, 'UCSSSOToken=***;').replace(/(fb_session=[^;]+);/, 'fb_session=***;')
  }, null, 2));
  console.log('Body:', JSON.stringify(body, null, 2));

  try {
    const response = await axios.post(url, body, {
      headers: requestHeaders,
      validateStatus: status => status < 500
    });

    // Extract and store fb_session from Set-Cookie
    const setCookie = response.headers['set-cookie'];
    if (Array.isArray(setCookie)) {
      for (const sc of setCookie) {
        if (sc.includes('fb_session=')) {
          updateCookieStore(sc);
        }
      }
    }

    console.log(`Response: ${response.status} ${response.statusText || ''}`);
    console.log('Response Headers:', JSON.stringify(response.headers, null, 2));
    console.log('Response Body:', JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    const status = error.response?.status || 'unknown';
    const statusText = error.response?.statusText || error.message;
    console.log(`Response: ${status} ${statusText}`);
    if (error.response?.data) {
      console.log('Response Body:', JSON.stringify(error.response.data, null, 2));
    }
    throw new Error(`HTTP ${status}: ${statusText}`);
  }
}

// Step 1.1: Fetch and cache fields data (run once per day)
async function fetchFieldsData(projId, user_id, cookie) {
  const cache = loadFieldsCache(projId);
  if (cache) {
    return cache;
  }

  const url = `${BASE_URL}?apiid=${API1_1_ID}&user_id=${user_id}&username=${user_id}`;
  const payload = { proj_id: projId };
  const response = await axiosPost(url, payload, cookie, 'Step 1.1 (Fields)');

  if (!response.success) {
    throw new Error('Step 1.1 failed: ' + (response.error || 'unknown error'));
  }

  saveFieldsCache(projId, response);
  return response;
}

// Helper: Get field_code by field_name from fields cache
function getFieldCode(fieldsData, targetName) {
  const arr = Array.isArray(fieldsData.data) ? fieldsData.data : [];
  const found = arr.find(f => f.field_name === targetName);
  return found ? found.field_code : null;
}

// Helper: Filter tasks by names (return matched tasks in order of requested names)
function filterByTaskNames(taskList, taskNames) {
  if (!Array.isArray(taskList)) return [];
  const map = {};
  for (const t of taskList) {
    if (t.scope_task_name && taskNames.includes(t.scope_task_name)) {
      map[t.scope_task_name] = t;
    }
  }
  return taskNames.map(name => map[name]).filter(Boolean);
}

// Helper: Format date (YYYY-MM-DD)
function formatDate(dateStr) {
  if (!dateStr) return '';
  return dateStr.split(' ')[0];
}

// Build WhatsApp output
function buildOutput(proj, site, du, tasksFiltered, fieldValues) {
  const proj_code = proj.proj_code;
  const proj_name = proj.proj_name;
  const du_model_name = du.du_model_name;
  const du_code = du.du_code;
  const site_code = site.site_code;
  const region = du.region || site.region || '-';

  const productDomain = du.product_domain || '';
  const duLine = productDomain
    ? `${productDomain}/${du_model_name} (${du_code})`
    : `${du_model_name} (${du_code})`;

  const taskLines = tasksFiltered.map(rec => {
    const date = formatDate(rec.my_date);
    const status = rec.status;
    const person = rec.responsible_user_en || rec.responsible_user_cn || '-';
    return `${status === 'Completed' ? '✅' : '⏳'} ${rec.scope_task_name} - ${status}${date ? ` (${date})` : ''} - ${person}`;
  });

  const subconTi = fieldValues.subcon_ti || '-';
  const txSow = fieldValues.tx_sow || '-';
  const postMocnSow = fieldValues.post_mocn_tx_sow || '-';
  const microwaveSow = fieldValues.microwave_tx_sow || '-';

  const out = [
    `Site: ${site_code}`,
    '',
    `Project: ${proj_code} (${proj_name})`,
    `DU: ${duLine}`,
    `Region: ${region}`,
    '',
    'Work Status:',
    '',
    ...taskLines,
    '',
    `SubCon TI: ${subconTi}`,
    `TX SOW (LLD): ${txSow}`,
    `Post MOCN TX SOW (LLD): ${postMocnSow}`,
    `Microwave Tx SOW-1: ${microwaveSow}`
  ];

  return out.join('\n');
}

// Parse fbr-check command
function parseInput(message) {
  const parts = message.trim().split(/\s+/);
  if (parts.length < 2 || parts[0] !== 'fbr-check') {
    return { success: false, message: 'Invalid trigger. Use: fbr-check {site_code} [project {project_code}] [model {du_model_name}] [full] [tasks {task1,task2,...}]' };
  }
  let site_code = parts[1];
  let project_code = undefined;
  let du_model_name = undefined;
  let full = false;
  let tasks = undefined;

  for (let i = 2; i < parts.length; i++) {
    if (parts[i] === 'project' && i + 1 < parts.length) {
      project_code = parts[++i];
    } else if (parts[i] === 'model' && i + 1 < parts.length) {
      du_model_name = parts[++i];
    } else if (parts[i] === 'full') {
      full = true;
    } else if (parts[i] === 'tasks' && i + 1 < parts.length) {
      tasks = parts[++i];
    }
  }

  let taskNames = undefined;
  if (tasks) {
    taskNames = tasks.split(',').map(t => t.trim()).filter(Boolean);
  }

  return { success: true, data: { site_code, project_code, du_model_name, full, taskNames } };
}

// Main workflow
async function performCheck(input, creds) {
  const { site_code, project_code, du_model_name, full, taskNames } = input;
  const cookie = buildCookie(creds);
  const user_id = creds.username || creds.UCSSSOAccount || DEFAULT_USER_ID; // fallback to default if not provided

  // Step 1: Project list
  const step1Payload = { user_id: user_id };
  const url1 = `${BASE_URL}?apiid=${API1_ID}&user_id=${user_id}&username=${user_id}`;
  console.log(JSON.stringify({ step1Payload }, null, 4));
  const step1Response = await axiosPost(url1, step1Payload, cookie, 'Step 1 (Projects)');
  if (!step1Response.success) {
    return { success: false, message: 'Step 1 failed: ' + (step1Response.error || 'unknown') };
  }

  const projList = Array.isArray(step1Response.data) ? step1Response.data : [];
  const proj = project_code
    ? projList.find(p => p.proj_code === project_code)
    : projList.find(p => p.proj_code === DEFAULT_PROJ_CODE);
  if (!proj) {
    return { success: false, message: 'Step 1 no record' };
  }
  const proj_id = proj.proj_id;

  // Step 1.1: Fields cache (fetch if not cached for today)
  let fieldsCache;
  try {
    fieldsCache = await fetchFieldsData(proj_id, user_id, cookie);
  } catch (e) {
    return { success: false, message: 'Step 1.1 failed: ' + e.message };
  }

  // Resolve field codes for target fields
  const fieldCodes = {
    subcon_ti: getFieldCode(fieldsCache, 'SubCon - TI'),
    tx_sow: getFieldCode(fieldsCache, 'TX SOW (LLD)'),
    post_mocn_tx_sow: getFieldCode(fieldsCache, 'Post MOCN TX SOW (LLD)'),
    microwave_tx_sow: getFieldCode(fieldsCache, 'Microwave Tx SOW-1')
  };

  // Step 2: Site/DU info
  const step2Payload = {
    proj_id,
    model_id: '',
    model_name: '',
    site_model_name: '',
    region: '',
    phase: '',
    du_code: '',
    du_name: '',
    du_status: '',
    site_id: '',
    site_code: site_code,
    site_name: ''
  };
  const url2 = `${BASE_URL}?apiid=${API2_ID}&user_id=${user_id}&username=${user_id}&parse_json=true`;
  console.log(JSON.stringify({ step2Payload }, null, 4));
  const step2Response = await axiosPost(url2, step2Payload, cookie, 'Step 2 (Site Info)');
  if (!step2Response.success) {
    return { success: false, message: 'Step 2 failed: ' + (step2Response.error || 'unknown') };
  }
  const sites = Array.isArray(step2Response.data) ? step2Response.data : [];
  if (sites.length === 0) {
    return { success: false, message: 'Step 2 no record, skip step 3' };
  }

  // Build model map: { [du_model_name]: du_model_id } from all site records
  const availableModels = {};
  for (const s of sites) {
    if (s.du_model_name && s.du_model_id) {
      availableModels[s.du_model_name] = s.du_model_id;
    }
  }

  // Pick DU by model filter (default: 2023 TX Rollout)
  const targetModel = du_model_name || DEFAULT_DU_MODEL;
  const du = sites.find(s => s.du_model_name === targetModel) || sites[0];
  const du_id = du.du_id;

  // Step 3: Task status
  const step3Payload = {
    task_id: '',
    proj_id,
    status: 'Completed,OnGoing',
    du_id: `empty,${du_id}`
  };
  const url3 = `${BASE_URL}?apiid=${API3_ID}&user_id=${user_id}&username=${user_id}`;
  console.log(JSON.stringify({ step3Payload }, null, 4));
  const step3Response = await axiosPost(url3, step3Payload, cookie, 'Step 3 (Tasks)');
  if (!step3Response.success) {
    return { success: false, message: 'Step 3 failed: ' + (step3Response.error || 'unknown') };
  }
  const tasksAll = Array.isArray(step3Response.data) ? step3Response.data : [];
  const selectedTaskNames = taskNames || DEFAULT_PRIMARY_TASK_NAMES;
  const tasksFiltered = filterByTaskNames(tasksAll, selectedTaskNames);
  if (tasksFiltered.length === 0) {
    return { success: false, message: 'no result found' };
  }

  // Step 4: Field values lookup
  const fieldValues = {};
  for (const [key, fieldCode] of Object.entries(fieldCodes)) {
    if (!fieldCode) {
      fieldValues[key] = '-';
      continue;
    }
    const step4Payload = {
      proj_id,
      field_code: fieldCode,
      du_id
    };
    const url4 = `${BASE_URL}?apiid=${API4_ID}&user_id=${user_id}&username=${user_id}`;
    console.log(JSON.stringify({ step4Payload }, null, 4));
    const step4Response = await axiosPost(url4, step4Payload, cookie, `Step 4 (Field: ${key})`);
    if (step4Response.success && Array.isArray(step4Response.data) && step4Response.data.length > 0) {
      fieldValues[key] = step4Response.data[0].value || '-';
    } else {
      fieldValues[key] = '-';
    }
  }

  // Build output (use du as site since they refer to same record)
  const output = buildOutput(proj, du, du, tasksFiltered, fieldValues);

  const result = {
    success: true,
    output,
    result: {
      data: {
        project: proj,
        site: du,
        du: du,
        availableModels,
        tasks: full ? tasksAll : tasksFiltered,
        fields: full ? fieldsCache : null,
        fieldValues: full ? fieldValues : { subcon_ti: fieldValues.subcon_ti },
        fieldCodes
      }
    }
  };

  return result;
}

// Main entry point (called by OpenClaw skill runner)
async function main(input) {
  try {
    const { message, context } = input;

    // Credentials: use context.credentials if provided, else use defaults
    let creds;
    if (context && context.credentials) {
      creds = context.credentials;
    } else {
      console.log('Using default credentials.');
      creds = { username: DEFAULT_USER_ID, token: DEFAULT_TOKEN };
    }

    const parsed = parseInput(message);
    if (!parsed.success) {
      return { success: false, message: parsed.message };
    }

    const result = await performCheck(parsed.data, creds);
    if (!result.success) {
      return { success: false, message: result.message };
    }

    return result;
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = { main };
