// Timmy — floating chat widget. Mounts on every page via <script src="timmy-widget.js">.
// Hides itself on /timmy.html (the full-page chat owns that screen).

(function () {
  if (/timmy\.html$/.test(location.pathname)) return;

  const STORAGE_KEY = 'srishti_timmy_chat';
  const loadHistory = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  };
  const saveHistory = (h) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
    if (typeof syncTimmyChat === 'function') syncTimmyChat(h);
  };

  const css = `
  .timmy-fab { position: fixed; bottom: 20px; right: 20px; z-index: 9998; width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #FF87B2 0%, #4B9CD3 100%); box-shadow: 0 8px 24px rgba(255,105,180,0.35); cursor: pointer; display: flex; align-items: center; justify-content: center; border: 3px solid #fff; transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s; }
  .timmy-fab:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 12px 32px rgba(255,105,180,0.45); }
  .timmy-fab img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; object-position: center top; }
  .timmy-fab::after { content: ''; position: absolute; top: 6px; right: 6px; width: 12px; height: 12px; background: #4ade80; border: 2px solid #fff; border-radius: 50%; }
  .timmy-panel { position: fixed; bottom: 96px; right: 20px; z-index: 9999; width: min(380px, calc(100vw - 40px)); height: min(560px, calc(100vh - 140px)); background: #FFFAF5; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,105,180,0.15); display: none; flex-direction: column; overflow: hidden; font-family: 'Quicksand', sans-serif; animation: timmySlideUp 0.3s cubic-bezier(0.16,1,0.3,1); }
  html.dark .timmy-panel { background: #1a0f18; box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,105,180,0.25); }
  .timmy-panel.open { display: flex; }
  @keyframes timmySlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .timmy-head { background: linear-gradient(135deg, #FF87B2 0%, #4B9CD3 100%); padding: 14px 16px; display: flex; align-items: center; gap: 12px; color: #fff; }
  .timmy-head img { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; object-position: center top; border: 2px solid rgba(255,255,255,0.8); background: #fff; }
  .timmy-head .tname { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 18px; line-height: 1; }
  .timmy-head .tsub { font-size: 11px; opacity: 0.9; margin-top: 2px; }
  .timmy-head .tgrow { flex: 1; }
  .timmy-head .tclose { background: rgba(255,255,255,0.2); border: 0; color: #fff; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; font-size: 18px; line-height: 1; display: flex; align-items: center; justify-content: center; }
  .timmy-head .tclose:hover { background: rgba(255,255,255,0.35); }
  .timmy-log { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; background: #FFFAF5; }
  html.dark .timmy-log { background: #1a0f18; }
  .timmy-msg { max-width: 85%; padding: 10px 12px; border-radius: 14px; font-size: 13.5px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; }
  .timmy-msg.u { align-self: flex-end; background: #4B9CD3; color: #fff; border-bottom-right-radius: 4px; }
  .timmy-msg.a { align-self: flex-start; background: #fff; color: #333; border: 1px solid #FFE4EF; border-bottom-left-radius: 4px; }
  html.dark .timmy-msg.a { background: #2a1824; color: #f5e6ee; border-color: #4a2c3c; }
  .timmy-msg.thinking { color: #999; font-style: italic; }
  .timmy-empty { text-align: center; color: #B76E79; font-size: 13px; padding: 30px 18px; line-height: 1.6; }
  .timmy-empty .q { display: block; margin-top: 8px; padding: 8px 10px; background: #fff; border: 1px solid #FFE4EF; border-radius: 10px; cursor: pointer; font-size: 12.5px; color: #555; text-align: left; transition: border-color 0.15s, background 0.15s; }
  .timmy-empty .q:hover { border-color: #FF87B2; background: #FFF5F7; }
  html.dark .timmy-empty .q { background: #2a1824; border-color: #4a2c3c; color: #f5e6ee; }
  .timmy-input { border-top: 1px solid #FFE4EF; padding: 10px; display: flex; gap: 8px; background: #fff; }
  html.dark .timmy-input { background: #241520; border-top-color: #4a2c3c; }
  .timmy-input textarea { flex: 1; resize: none; border: 1px solid #FFE4EF; border-radius: 12px; padding: 9px 12px; font-family: inherit; font-size: 13.5px; outline: none; max-height: 80px; background: #fff; color: #333; }
  .timmy-input textarea:focus { border-color: #FF87B2; }
  html.dark .timmy-input textarea { background: #1a0f18; border-color: #4a2c3c; color: #f5e6ee; }
  .timmy-input button { background: linear-gradient(135deg, #FF87B2 0%, #4B9CD3 100%); color: #fff; border: 0; border-radius: 12px; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 13px; }
  .timmy-input button:disabled { opacity: 0.5; cursor: not-allowed; }
  .timmy-foot { padding: 6px 12px 8px; display: flex; justify-content: space-between; align-items: center; font-size: 10.5px; background: #fff; border-top: 1px solid #FFE4EF; }
  html.dark .timmy-foot { background: #241520; border-top-color: #4a2c3c; color: #aaa; }
  .timmy-foot a { color: #B76E79; text-decoration: none; font-weight: 600; }
  .timmy-foot button { background: transparent; border: 0; color: #999; cursor: pointer; font-size: 10.5px; }
  .timmy-foot button:hover { color: #FF69B4; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.className = 'timmy-fab';
  fab.setAttribute('aria-label', 'Open Timmy chat');
  fab.innerHTML = '<img src="assets/timmy.png" alt="Timmy">';
  document.body.appendChild(fab);

  const panel = document.createElement('div');
  panel.className = 'timmy-panel';
  panel.innerHTML = `
    <div class="timmy-head">
      <img src="assets/timmy.png" alt="Timmy">
      <div>
        <div class="tname">Timmy</div>
        <div class="tsub">Med school tactical coach</div>
      </div>
      <div class="tgrow"></div>
      <button class="tclose" aria-label="Close chat">&times;</button>
    </div>
    <div class="timmy-log"></div>
    <div class="timmy-input">
      <textarea placeholder="Ask Timmy anything — essays, schools, secondaries..." rows="1"></textarea>
      <button type="button">Send</button>
    </div>
    <div class="timmy-foot">
      <a href="timmy.html">Open full page &rarr;</a>
      <button type="button" class="tclear">Clear chat</button>
    </div>
  `;
  document.body.appendChild(panel);

  const log = panel.querySelector('.timmy-log');
  const ta = panel.querySelector('textarea');
  const sendBtn = panel.querySelector('.timmy-input button');
  const clearBtn = panel.querySelector('.tclear');
  let history = loadHistory();
  let sending = false;

  const STARTERS = [
    "Critique my most recent PS draft",
    "Should Srishti apply to [school]?",
    "Draft a 'why us' secondary for MSU CHM",
    "How do I frame the PA letter vs a physician letter?"
  ];

  function render() {
    log.innerHTML = '';
    if (history.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'timmy-empty';
      empty.innerHTML = `<div><strong>Hey, I'm Timmy.</strong> Ryan Gray's playbook + Srishti's real situation. Ask me anything about cycle 2.</div>`;
      STARTERS.forEach(s => {
        const q = document.createElement('span');
        q.className = 'q';
        q.textContent = s;
        q.onclick = () => { ta.value = s; ta.focus(); };
        empty.appendChild(q);
      });
      log.appendChild(empty);
      return;
    }
    for (const m of history) {
      const div = document.createElement('div');
      div.className = 'timmy-msg ' + (m.role === 'user' ? 'u' : 'a');
      div.textContent = m.content;
      log.appendChild(div);
    }
    log.scrollTop = log.scrollHeight;
  }

  async function send() {
    const text = ta.value.trim();
    if (!text || sending) return;
    sending = true;
    sendBtn.disabled = true;
    history.push({ role: 'user', content: text });
    saveHistory(history);
    ta.value = '';
    render();
    const thinking = document.createElement('div');
    thinking.className = 'timmy-msg a thinking';
    thinking.textContent = 'Timmy is thinking…';
    log.appendChild(thinking);
    log.scrollTop = log.scrollHeight;
    try {
      const r = await fetch('/api/timmy-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await r.json();
      thinking.remove();
      if (!r.ok) {
        const err = document.createElement('div');
        err.className = 'timmy-msg a';
        err.textContent = 'Error: ' + (data.error || r.status);
        log.appendChild(err);
      } else {
        history.push({ role: 'assistant', content: data.reply || '(no reply)' });
        saveHistory(history);
        render();
      }
    } catch (e) {
      thinking.remove();
      const err = document.createElement('div');
      err.className = 'timmy-msg a';
      err.textContent = 'Network error: ' + e.message;
      log.appendChild(err);
    } finally {
      sending = false;
      sendBtn.disabled = false;
      ta.focus();
    }
  }

  fab.onclick = () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) { render(); ta.focus(); }
  };
  panel.querySelector('.tclose').onclick = () => panel.classList.remove('open');
  sendBtn.onclick = send;
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  clearBtn.onclick = () => {
    if (!confirm('Clear this chat?')) return;
    history = [];
    saveHistory(history);
    render();
  };

  render();
})();
