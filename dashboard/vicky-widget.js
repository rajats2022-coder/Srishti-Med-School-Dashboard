// Vicky Widget — floating cross-page chatbot for Srishti's dashboard.
// Include on any page (except vicky.html, which has the full chat).
// Talks to /api/vicky-chat — works on localhost:3006 (via serve.mjs)
// AND on Vercel-deployed site (via /api/vicky-chat.js at project root).
//
// New localStorage key: `srishti_vicky_widget_chat`
// New Supabase key:     `vicky_widget_chat`  (sync via syncVickyWidgetChat in sync.js)
(function () {
  'use strict';

  // ============================================================
  // STYLE (scoped — prefixed with .vw- so it can't collide)
  // ============================================================
  const css = `
  .vw-btn {
    position: fixed; right: 20px; bottom: 20px;
    width: 60px; height: 60px; border-radius: 9999px;
    background: linear-gradient(135deg, #FFB088 0%, #FF9562 70%, #FF7A3D 100%);
    box-shadow: 0 8px 28px rgba(255, 122, 61, 0.45), 0 2px 8px rgba(255, 149, 98, 0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; color: white; cursor: pointer;
    border: none; outline: none; z-index: 999999;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    animation: vw-pulse 2.4s ease-in-out infinite;
  }
  .vw-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 14px 36px rgba(255, 122, 61, 0.55); }
  .vw-btn:active { transform: translateY(-1px) scale(0.98); }
  .vw-btn:focus-visible { outline: 3px solid #FFD166; outline-offset: 3px; }
  @keyframes vw-pulse {
    0%, 100% { box-shadow: 0 8px 28px rgba(255, 122, 61, 0.45), 0 0 0 0 rgba(255, 149, 98, 0.35); }
    50% { box-shadow: 0 8px 28px rgba(255, 122, 61, 0.45), 0 0 0 12px rgba(255, 149, 98, 0); }
  }
  .vw-btn-dot {
    position: absolute; top: 4px; right: 4px;
    width: 12px; height: 12px; border-radius: 9999px;
    background: #10b981; border: 2px solid white;
  }
  .vw-btn-dot.off { background: #9ca3af; }
  .vw-btn-dot.err { background: #ef4444; }

  .vw-panel {
    position: fixed; right: 20px; bottom: 92px;
    width: 380px; max-width: calc(100vw - 28px);
    height: 560px; max-height: calc(100vh - 120px);
    background: #FFFAF5; border-radius: 24px;
    border: 1px solid #FFC99F;
    box-shadow: 0 20px 60px rgba(255, 122, 61, 0.28), 0 4px 16px rgba(0,0,0,0.08);
    display: flex; flex-direction: column;
    z-index: 999998; overflow: hidden;
    transform: translateY(12px) scale(0.96); opacity: 0; pointer-events: none;
    transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
    font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .vw-panel.vw-open { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; }

  .vw-header {
    padding: 14px 18px;
    background: linear-gradient(135deg, #FFF5ED 0%, #FFE5D0 100%);
    border-bottom: 1px solid #FFC99F;
    display: flex; align-items: center; gap: 10px;
  }
  .vw-avatar {
    width: 36px; height: 36px; border-radius: 12px;
    background: linear-gradient(135deg, #FFB088, #FF7A3D);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: white; flex-shrink: 0;
  }
  .vw-header-title {
    font-family: 'Playfair Display', serif; font-weight: 700;
    font-size: 16px; color: #1f2937;
    display: flex; align-items: center; gap: 8px;
  }
  .vw-status {
    font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px;
    background: #E0F7EF; color: #047857;
  }
  .vw-status.off { background: #f3f4f6; color: #6b7280; }
  .vw-status.err { background: #FEE2E2; color: #b91c1c; }
  .vw-header-sub { font-size: 11px; color: #9ca3af; margin-top: 1px; }
  .vw-close {
    margin-left: auto; background: transparent; border: none;
    width: 32px; height: 32px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #9ca3af; font-size: 20px;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .vw-close:hover { background: #FFE5D0; color: #FF7A3D; }
  .vw-clear {
    margin-left: auto; background: transparent; border: none;
    width: 32px; height: 32px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #9ca3af; font-size: 15px;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .vw-clear:hover { background: #FFE5D0; color: #FF7A3D; }
  .vw-clear + .vw-close { margin-left: 0; }

  .vw-thread {
    flex: 1; overflow-y: auto; padding: 16px;
    display: flex; flex-direction: column; gap: 10px;
    background: #FFFAF5;
  }
  .vw-thread::-webkit-scrollbar { width: 6px; }
  .vw-thread::-webkit-scrollbar-thumb { background: #FFC99F; border-radius: 9999px; }

  .vw-msg { display: flex; gap: 8px; max-width: 100%; animation: vw-slide 0.3s ease-out; }
  @keyframes vw-slide { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .vw-msg-vicky { align-self: flex-start; }
  .vw-msg-user { align-self: flex-end; flex-direction: row-reverse; }
  .vw-bubble {
    padding: 10px 14px; border-radius: 16px;
    font-size: 14px; line-height: 1.5; color: #1f2937;
    max-width: 280px; word-wrap: break-word;
  }
  .vw-msg-vicky .vw-bubble {
    background: linear-gradient(135deg, #FFF5ED 0%, #FFE5D0 100%);
    border: 1px solid #FFC99F; border-top-left-radius: 4px;
  }
  .vw-msg-user .vw-bubble {
    background: linear-gradient(135deg, #FFB088, #FF9562);
    color: white; border-top-right-radius: 4px;
  }
  .vw-msg-ts { font-size: 10px; color: #d1d5db; margin-top: 3px; padding: 0 4px; }

  .vw-empty {
    text-align: center; color: #9ca3af; font-size: 13px;
    padding: 32px 20px; line-height: 1.6;
  }
  .vw-empty-emoji { font-size: 32px; margin-bottom: 8px; }

  .vw-chips {
    padding: 0 16px 8px 16px;
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .vw-chip {
    padding: 6px 12px; border-radius: 9999px;
    background: #FFE5D0; color: #FF7A3D; font-size: 12px; font-weight: 600;
    border: 1px solid #FFC99F; cursor: pointer;
    transition: transform 0.15s ease, background 0.15s ease;
    font-family: inherit;
  }
  .vw-chip:hover { background: #FFC99F; transform: translateY(-1px); }

  .vw-input-row {
    padding: 12px 14px 14px;
    border-top: 1px solid #FFE5D0;
    background: #FFFAF5;
    display: flex; gap: 8px; align-items: flex-end;
  }
  .vw-input {
    flex: 1; resize: none; padding: 10px 12px;
    border: 1px solid #FFC99F; border-radius: 14px;
    background: white; font-size: 14px;
    font-family: inherit; color: #1f2937;
    min-height: 40px; max-height: 110px;
    outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .vw-input:focus { border-color: #FF9562; box-shadow: 0 0 0 3px rgba(255, 149, 98, 0.15); }
  .vw-input::placeholder { color: #d1b8a5; }
  .vw-send {
    padding: 0 16px; height: 40px; flex-shrink: 0;
    border: none; border-radius: 9999px;
    background: linear-gradient(135deg, #FFB088, #FF7A3D);
    color: white; font-weight: 700; font-size: 13px; cursor: pointer;
    font-family: inherit;
    transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  }
  .vw-send:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(255, 122, 61, 0.35); }
  .vw-send:disabled { opacity: 0.55; cursor: wait; transform: none; }

  .vw-typing { display: inline-flex; gap: 3px; align-items: center; padding: 4px 0; }
  .vw-typing span {
    width: 6px; height: 6px; border-radius: 9999px; background: #FFB088;
    animation: vw-bounce 1.2s infinite ease-in-out;
  }
  .vw-typing span:nth-child(2) { animation-delay: 0.15s; }
  .vw-typing span:nth-child(3) { animation-delay: 0.3s; }
  @keyframes vw-bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  @media (max-width: 520px) {
    .vw-panel {
      right: 8px; left: 8px; bottom: 82px;
      width: auto; height: calc(100vh - 100px);
      border-radius: 20px;
    }
    .vw-btn { right: 14px; bottom: 14px; width: 54px; height: 54px; font-size: 24px; }
  }
  `;

  const style = document.createElement('style');
  style.setAttribute('data-vicky-widget', 'true');
  style.textContent = css;
  document.head.appendChild(style);

  // ============================================================
  // STORAGE
  // ============================================================
  const STORAGE_KEY = 'srishti_vicky_widget_chat';
  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.slice(-60) : [];
    } catch { return []; }
  }
  function saveHistory(history) {
    try {
      const trimmed = history.slice(-60);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      if (typeof window.syncVickyWidgetChat === 'function') {
        window.syncVickyWidgetChat(trimmed);
      }
    } catch { /* quota — ignore */ }
  }

  // ============================================================
  // CONTEXT COLLECTION — what she's looking at right now
  // ============================================================
  function pageName() {
    const p = (window.location.pathname || '').toLowerCase();
    if (p.endsWith('schools.html') || p === '/schools') return 'schools';
    if (p.endsWith('unc.html') || p === '/unc') return 'unc-wanda';
    if (p.endsWith('do-schools.html') || p === '/do-schools') return 'do-schools';
    if (p.endsWith('vicky.html')) return 'vicky';
    if (p === '/' || p.endsWith('index.html') || p === '') return 'home';
    return p.replace(/^\/|\.html$/g, '') || 'home';
  }

  function countTasks() {
    let done = 0, total = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('srishti_task-')) {
          total++;
          if (localStorage.getItem(k) === 'true') done++;
        }
      }
    } catch { /* ignore */ }
    return { done, left: Math.max(0, total - done), total };
  }

  function queueLength() {
    try {
      const raw = localStorage.getItem('srishti_wanda_queue');
      if (!raw) return 0;
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.length : 0;
    } catch { return 0; }
  }

  function daysUntilSubmit() {
    const target = new Date('2026-06-01T00:00:00');
    const now = new Date();
    const ms = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(ms / 86400000));
  }

  function pageSpecificContext() {
    const page = pageName();
    try {
      if (page === 'schools') {
        const moves = JSON.parse(localStorage.getItem('srishti_school_moves') || '{}');
        const reapply = Object.values(moves).filter(v => v === 'reapply').length;
        const cut = Object.values(moves).filter(v => v === 'cut').length;
        return `Cosmo page. Current school-moves overrides: ${reapply} reapply, ${cut} cut.`;
      }
      if (page === 'unc-wanda') {
        const queue = JSON.parse(localStorage.getItem('srishti_wanda_queue') || '[]');
        const names = Array.isArray(queue) ? queue.map(q => q.name || q.id).slice(0, 3).join(', ') : '';
        return `Wanda page (UNC deep dive live). Queue preview: ${names || '(empty)'}`;
      }
      if (page === 'do-schools') {
        return `Mr. Crocker page (DO schools). MSUCOM is the #1 pick.`;
      }
      if (page === 'home') {
        return `Dashboard home — tasks, spotlight, timeline.`;
      }
    } catch { /* ignore */ }
    return '';
  }

  function collectDashState() {
    const { done, left } = countTasks();
    const weekday = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return {
      page: pageName(),
      tasksDone: done,
      tasksLeft: left,
      queueLen: queueLength(),
      daysLeft: daysUntilSubmit(),
      weekday,
      pageContext: pageSpecificContext(),
    };
  }

  // ============================================================
  // DOM
  // ============================================================
  const btn = document.createElement('button');
  btn.className = 'vw-btn';
  btn.setAttribute('aria-label', 'Open chat with Vicky');
  btn.innerHTML = `&#128132;<span class="vw-btn-dot off" id="vw-btn-dot" aria-hidden="true"></span>`;

  const panel = document.createElement('div');
  panel.className = 'vw-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat with Vicky');
  panel.innerHTML = `
    <div class="vw-header">
      <div class="vw-avatar">&#128132;</div>
      <div style="min-width:0; flex:1">
        <div class="vw-header-title">
          Vicky
          <span class="vw-status off" id="vw-status">checking...</span>
        </div>
        <div class="vw-header-sub">ur bestie &mdash; here on every page 💖</div>
      </div>
      <button class="vw-clear" id="vw-clear" aria-label="Clear chat" title="clear chat">&#128465;</button>
      <button class="vw-close" id="vw-close" aria-label="Close chat">&times;</button>
    </div>
    <div class="vw-thread" id="vw-thread"></div>
    <div class="vw-chips" id="vw-chips">
      <button class="vw-chip" data-prompt="pep me up bestie, i need it">🔥 pep me up</button>
      <button class="vw-chip" data-prompt="what should i focus on right now?">✨ what now</button>
      <button class="vw-chip" data-prompt="i'm kinda spiraling, help">🥺 spiraling</button>
    </div>
    <div class="vw-input-row">
      <textarea class="vw-input" id="vw-input" rows="1" placeholder="text vicky..."></textarea>
      <button class="vw-send" id="vw-send">send</button>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  const thread = panel.querySelector('#vw-thread');
  const input = panel.querySelector('#vw-input');
  const sendBtn = panel.querySelector('#vw-send');
  const closeBtn = panel.querySelector('#vw-close');
  const clearBtn = panel.querySelector('#vw-clear');
  const chipsWrap = panel.querySelector('#vw-chips');
  const statusEl = panel.querySelector('#vw-status');
  const dotEl = btn.querySelector('#vw-btn-dot');

  // ============================================================
  // RENDER
  // ============================================================
  let history = loadHistory();

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function renderThread() {
    thread.innerHTML = '';
    if (history.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'vw-empty';
      empty.innerHTML = `<div class="vw-empty-emoji">&#128132;</div>
        hey bestie 💖 i know everything the squad is up to — tasks, schools, where u are on the site.
        ask me anything or just vent.`;
      thread.appendChild(empty);
      return;
    }
    for (const m of history) {
      const row = document.createElement('div');
      row.className = 'vw-msg ' + (m.role === 'user' ? 'vw-msg-user' : 'vw-msg-vicky');
      const bubble = document.createElement('div');
      bubble.className = 'vw-bubble';
      bubble.textContent = m.content;
      row.appendChild(bubble);
      thread.appendChild(row);
    }
    requestAnimationFrame(() => { thread.scrollTop = thread.scrollHeight; });
  }

  function renderTyping() {
    const row = document.createElement('div');
    row.className = 'vw-msg vw-msg-vicky';
    row.id = 'vw-typing-row';
    const bubble = document.createElement('div');
    bubble.className = 'vw-bubble';
    bubble.innerHTML = `<div class="vw-typing"><span></span><span></span><span></span></div>`;
    row.appendChild(bubble);
    thread.appendChild(row);
    requestAnimationFrame(() => { thread.scrollTop = thread.scrollHeight; });
  }
  function clearTyping() {
    const r = thread.querySelector('#vw-typing-row');
    if (r) r.remove();
  }

  // ============================================================
  // NETWORK
  // ============================================================
  let brainState = 'checking'; // 'on' | 'off' | 'err' | 'checking'

  function setBrain(state, label) {
    brainState = state;
    statusEl.className = 'vw-status' + (state === 'on' ? '' : ' ' + state);
    statusEl.textContent = label;
    dotEl.className = 'vw-btn-dot' + (state === 'on' ? '' : ' ' + (state === 'err' ? 'err' : 'off'));
  }

  async function pingBrain() {
    try {
      const res = await fetch('/api/vicky-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'ask', message: 'ping' })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data && data.ok) setBrain('on', 'brain: online 💖');
      else if (data && data.error === 'no_key') setBrain('off', 'brain: offline');
      else setBrain('err', 'brain: err');
    } catch {
      setBrain('off', 'brain: no server');
    }
  }

  function buildApiHistory() {
    // Map our {role: 'user'|'vicky'} -> OpenAI {role: 'user'|'assistant'}
    return history.slice(-8).map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }));
  }

  async function callBrain(message) {
    try {
      const res = await fetch('/api/vicky-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'ask',
          message,
          dashState: collectDashState(),
          history: buildApiHistory(),
        })
      });
      const data = await res.json().catch(() => null);
      if (data && data.ok && data.text) return data.text;
      if (data && data.text) return data.text; // error fallback text
      return null;
    } catch {
      return null;
    }
  }

  function offlineFallback(msg) {
    const lower = (msg || '').toLowerCase();
    if (lower.match(/\b(scared|anxious|panic|overwhelm|spiral)\b/)) {
      return "bestie come here 🩷 ur brain is loud rn but the plan is solid. pick ONE tiny thing off ur list — just one — and we go. i'm right here.";
    }
    if (lower.match(/\b(do|osteopath)\b/)) {
      return "DO is NOT a backup bestie 💫 ur grandfather's whole philosophy + ur med anth minor = actual osteopathic alignment. MSUCOM is giving 👑";
    }
    if (lower.match(/\b(pep|hype|motivat|encourag)\b/)) {
      return "ok girl — 1000+ MA hours, 517 MCAT, and a whole new school list. cycle 1 u was a draft. cycle 2 u is THE final 💅";
    }
    return "(brain's offline rn so saving this — when u get back on localhost or once vercel redeploys i'll reply properly 💖)";
  }

  // ============================================================
  // EVENTS
  // ============================================================
  function openPanel() {
    panel.classList.add('vw-open');
    renderThread();
    setTimeout(() => input.focus(), 120);
  }
  function closePanel() { panel.classList.remove('vw-open'); }

  btn.addEventListener('click', () => {
    if (panel.classList.contains('vw-open')) closePanel();
    else openPanel();
  });
  closeBtn.addEventListener('click', closePanel);

  function clearChat() {
    if (history.length === 0) return;
    if (!confirm('clear the whole chat with vicky? this wipes it on every device 💔')) return;
    history = [];
    saveHistory(history); // also syncs empty [] to Supabase
    renderThread();
    input.focus();
  }
  clearBtn.addEventListener('click', clearChat);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('vw-open')) closePanel();
  });

  async function send(text) {
    const msg = (text || '').trim();
    if (!msg || sendBtn.disabled) return;
    history.push({ role: 'user', content: msg, ts: Date.now() });
    saveHistory(history);
    renderThread();
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    renderTyping();

    let reply = null;
    if (brainState === 'on' || brainState === 'checking') {
      reply = await callBrain(msg);
    }
    if (!reply) reply = offlineFallback(msg);

    clearTyping();
    history.push({ role: 'vicky', content: reply, ts: Date.now() });
    saveHistory(history);
    renderThread();
    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', () => send(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input.value);
    }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(110, input.scrollHeight) + 'px';
  });

  chipsWrap.addEventListener('click', e => {
    const chip = e.target.closest('.vw-chip');
    if (!chip) return;
    const prompt = chip.getAttribute('data-prompt');
    if (prompt) send(prompt);
  });

  // Keep chat synced across tabs/pages
  window.addEventListener('storage', e => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const next = JSON.parse(e.newValue);
        if (Array.isArray(next)) {
          history = next;
          if (panel.classList.contains('vw-open')) renderThread();
        }
      } catch { /* ignore */ }
    }
  });

  // ============================================================
  // INIT
  // ============================================================
  renderThread();
  pingBrain();
  // Re-check when the tab becomes visible (e.g., vercel redeploy finished)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) pingBrain();
  });
})();
