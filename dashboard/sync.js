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
      } else if (row.key === 'vicky_journal') {
        if (Array.isArray(row.value) && row.value.length > 0) {
          localStorage.setItem('srishti_vicky_journal', JSON.stringify(row.value));
        }
      } else if (row.key === 'vicky_widget_chat') {
        if (Array.isArray(row.value) && row.value.length > 0) {
          localStorage.setItem('srishti_vicky_widget_chat', JSON.stringify(row.value));
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

// Save Vicky journal entries (debounced) — bestie chat thread
let _vickyJournalTimer;
function syncVickyJournal(entries) {
  localStorage.setItem('srishti_vicky_journal', JSON.stringify(entries));
  clearTimeout(_vickyJournalTimer);
  _vickyJournalTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'vicky_journal', value: entries, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.log('Vicky journal sync failed (offline mode):', e.message);
    }
  }, 800);
}

// Save Vicky widget chat history (debounced) — cross-page floating bestie widget
let _vickyWidgetTimer;
function syncVickyWidgetChat(history) {
  localStorage.setItem('srishti_vicky_widget_chat', JSON.stringify(history));
  clearTimeout(_vickyWidgetTimer);
  _vickyWidgetTimer = setTimeout(async () => {
    try {
      await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'vicky_widget_chat', value: history, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.log('Vicky widget chat sync failed (offline mode):', e.message);
    }
  }, 800);
}

// Load on page init
syncLoad();
