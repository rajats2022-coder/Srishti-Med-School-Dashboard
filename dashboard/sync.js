// Supabase sync layer for Srishti's dashboard
// Syncs localStorage <-> Supabase so data persists across devices

const SUPABASE_URL = 'https://yvqbglprecyllkmwxprw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cWJnbHByZWN5bGxrbXd4cHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTIxMDMsImV4cCI6MjA5MTg2ODEwM30.7Rlp4FNmMAbdKRIMZHPt3EYgUmG-bEfLjJMbHKCVcsc';
const API = `${SUPABASE_URL}/rest/v1/srishti_dashboard`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates'
};

// Load all data from Supabase on page load
async function syncLoad() {
  try {
    const res = await fetch(`${API}?select=key,value`, { headers: HEADERS });
    if (!res.ok) return;
    const rows = await res.json();
    for (const row of rows) {
      if (row.key === 'tasks') {
        const tasks = row.value;
        for (const [k, v] of Object.entries(tasks)) {
          localStorage.setItem('srishti_' + k, v.toString());
        }
      } else if (row.key === 'school_moves') {
        if (Object.keys(row.value).length > 0) {
          localStorage.setItem('srishti_school_moves', JSON.stringify(row.value));
        }
      } else if (row.key === 'wanda_queue') {
        if (Array.isArray(row.value) && row.value.length > 0) {
          localStorage.setItem('srishti_wanda_queue', JSON.stringify(row.value));
        }
      } else if (row.key === 'notes') {
        for (const [k, v] of Object.entries(row.value)) {
          if (v) localStorage.setItem(k, v);
        }
      } else if (row.key === 'home_tasks') {
        if (Array.isArray(row.value) && row.value.length > 0) {
          localStorage.setItem('srishti_home_tasks', JSON.stringify(row.value));
        }
      } else if (row.key === 'timmy_chat') {
        if (Array.isArray(row.value) && row.value.length > 0) {
          localStorage.setItem('srishti_timmy_chat', JSON.stringify(row.value));
        }
      } else if (row.key === 'planner_stats') {
        if (row.value && typeof row.value === 'object') {
          localStorage.setItem('srishti_planner_stats', JSON.stringify(row.value));
        }
      } else if (row.key === 'planner_activities') {
        if (Array.isArray(row.value)) {
          localStorage.setItem('srishti_planner_activities', JSON.stringify(row.value));
        }
      } else if (row.key === 'planner_my_list') {
        if (Array.isArray(row.value)) {
          localStorage.setItem('srishti_planner_my_list', JSON.stringify(row.value));
        }
      } else if (row.key === 'planner_secondaries') {
        if (Array.isArray(row.value)) {
          localStorage.setItem('srishti_planner_secondaries', JSON.stringify(row.value));
        }
      } else if (row.key === 'theme') {
        if (typeof row.value === 'string' && (row.value === 'light' || row.value === 'dark')) {
          localStorage.setItem('srishti_theme', row.value);
          // Apply immediately if it differs from current
          const wantsDark = row.value === 'dark';
          const isDark = document.documentElement.classList.contains('dark');
          if (wantsDark !== isDark) document.documentElement.classList.toggle('dark', wantsDark);
        }
      }
    }
  } catch (e) {
    console.log('Sync load failed (offline mode):', e.message);
  }
}

// Save a task checkbox state
async function syncTask(taskKey, checked) {
  localStorage.setItem('srishti_' + taskKey, checked.toString());
  try {
    // Get current tasks, update the one that changed
    const res = await fetch(`${API}?key=eq.tasks&select=value`, { headers: HEADERS });
    const rows = await res.json();
    const current = rows[0]?.value || {};
    current[taskKey] = checked;
    await fetch(API, {
      method: 'POST',
      headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({ key: 'tasks', value: current, updated_at: new Date().toISOString() })
    });
  } catch (e) {
    console.log('Task sync failed (offline mode):', e.message);
  }
}

// Save school moves (reapply <-> cut)
async function syncSchoolMoves(moves) {
  localStorage.setItem('srishti_school_moves', JSON.stringify(moves));
  try {
    await fetch(API, {
      method: 'POST',
      headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({ key: 'school_moves', value: moves, updated_at: new Date().toISOString() })
    });
  } catch (e) {
    console.log('School moves sync failed (offline mode):', e.message);
  }
}

// Save a note (debounced)
const _noteTimers = {};
function syncNote(noteKey, value) {
  localStorage.setItem(noteKey, value);
  clearTimeout(_noteTimers[noteKey]);
  _noteTimers[noteKey] = setTimeout(async () => {
    try {
      const res = await fetch(`${API}?key=eq.notes&select=value`, { headers: HEADERS });
      const rows = await res.json();
      const current = rows[0]?.value || {};
      current[noteKey] = value;
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'notes', value: current, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.log('Note sync failed (offline mode):', e.message);
    }
  }, 1000); // Debounce 1 second
}

// Save school tasks (from Wanda page) — debounced
let _schoolTaskTimer;
function syncSchoolTasks(allTasks) {
  localStorage.setItem('srishti_school_tasks', JSON.stringify(allTasks));
  clearTimeout(_schoolTaskTimer);
  _schoolTaskTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'school_tasks', value: allTasks, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.log('School tasks sync failed (offline mode):', e.message);
    }
  }, 1000);
}

// Save Wanda research queue
async function syncWandaQueue(queue) {
  localStorage.setItem('srishti_wanda_queue', JSON.stringify(queue));
  try {
    await fetch(API, {
      method: 'POST',
      headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({ key: 'wanda_queue', value: queue, updated_at: new Date().toISOString() })
    });
  } catch (e) {
    console.log('Wanda queue sync failed (offline mode):', e.message);
  }
}

// Save home tasks (user-added + drag-ranked) — debounced
let _homeTasksTimer;
function syncHomeTasks(tasks) {
  localStorage.setItem('srishti_home_tasks', JSON.stringify(tasks));
  clearTimeout(_homeTasksTimer);
  _homeTasksTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'home_tasks', value: tasks, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.log('Home tasks sync failed (offline mode):', e.message);
    }
  }, 1000);
}

// Save Timmy chat history (debounced)
let _timmyChatTimer;
function syncTimmyChat(history) {
  localStorage.setItem('srishti_timmy_chat', JSON.stringify(history));
  clearTimeout(_timmyChatTimer);
  _timmyChatTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'timmy_chat', value: history, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.log('Timmy chat sync failed (offline mode):', e.message);
    }
  }, 1000);
}

// Planner — stats (debounced)
let _plannerStatsTimer;
function syncPlannerStats(stats) {
  localStorage.setItem('srishti_planner_stats', JSON.stringify(stats));
  clearTimeout(_plannerStatsTimer);
  _plannerStatsTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'planner_stats', value: stats, updated_at: new Date().toISOString() })
      });
    } catch (e) { console.log('Planner stats sync failed:', e.message); }
  }, 1000);
}

// Planner — activities (debounced)
let _plannerActTimer;
function syncPlannerActivities(list) {
  localStorage.setItem('srishti_planner_activities', JSON.stringify(list));
  clearTimeout(_plannerActTimer);
  _plannerActTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'planner_activities', value: list, updated_at: new Date().toISOString() })
      });
    } catch (e) { console.log('Planner activities sync failed:', e.message); }
  }, 1000);
}

// Planner — my list (debounced)
let _plannerListTimer;
function syncPlannerMyList(list) {
  localStorage.setItem('srishti_planner_my_list', JSON.stringify(list));
  clearTimeout(_plannerListTimer);
  _plannerListTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'planner_my_list', value: list, updated_at: new Date().toISOString() })
      });
    } catch (e) { console.log('Planner my_list sync failed:', e.message); }
  }, 1000);
}

// Planner — secondaries (debounced)
let _plannerSecTimer;
function syncPlannerSecondaries(list) {
  localStorage.setItem('srishti_planner_secondaries', JSON.stringify(list));
  clearTimeout(_plannerSecTimer);
  _plannerSecTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'planner_secondaries', value: list, updated_at: new Date().toISOString() })
      });
    } catch (e) { console.log('Planner secondaries sync failed:', e.message); }
  }, 1000);
}

// Save theme preference (light/dark) — cross-device
async function syncTheme(theme) {
  localStorage.setItem('srishti_theme', theme);
  try {
    await fetch(API, {
      method: 'POST',
      headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({ key: 'theme', value: theme, updated_at: new Date().toISOString() })
    });
  } catch (e) {
    console.log('Theme sync failed (offline mode):', e.message);
  }
}

// Load on page init
syncLoad();
