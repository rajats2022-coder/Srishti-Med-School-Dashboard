import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = dirname(__dirname); // parent of dashboard/
const PORT = process.env.PORT || 3006;

// --- Load .env (no external deps) ---
try {
  const env = await readFile(join(__dirname, '.env'), 'utf8');
  for (const line of env.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const k = trimmed.slice(0, eq).trim();
    const v = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (k && !(k in process.env)) process.env[k] = v;
  }
} catch { /* no .env, ok — canned replies still work */ }

const GROQ_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// --- Curated Srishti context (compressed from CONTEXT.md + REAPPLICATION_PLAN.md) ---
// Hand-curated so we stay under Groq's free-tier TPM limits. Update if major facts change.
const SRISHTI_PROFILE = `
## Who she is
- Srishti Gadbail, 22. Rajat's girlfriend. Canadian citizen on OPT (this is THE defining structural fact — ~half of US MD schools filter her out).
- Grew up in Farmington Hills, Michigan (Oakland County). Michigan schools feel like home schools.
- UNC Chapel Hill alum 2025, graduated with Highest Distinction. Biology major, Medical Anthropology minor.
- Currently full-time Medical Assistant at Medi-Weightloss Ballantyne in Charlotte, NC.
- Stats: cGPA 3.88, sGPA 3.80, MCAT 517 (94th percentile).

## The defining stories (use these — match the right story to the right moment)
- **Grandfather in Surat**: he practiced medicine out of his living room in Gujarat. Aamras season. Whole-person care before she knew the word "osteopathic". This is her origin story and perfect DO philosophy alignment.
- **Mom's ectopic pregnancy + Ayurveda**: her mom reached for Ayurveda first. Shaped her into a doctor who doesn't want patients to choose between culture and medicine.
- **Sister's early period at 11**: she wrote a women's health book for her sister. That's the doctor she already is.
- **Medi-Weightloss MA year (1,000+ hours)**: the central transformation between cycle 1 and cycle 2. Daily supervision by PA/NP. Full-time paid clinical. Real patient relationships. This is her cycle 2 thesis statement.
- **Marsico Lung Institute research (340 hrs, PI Dr. Stephen Schworer)**: her UNC research. PI reconnect email is a priority.
- **Med Anthropology minor (Hmong, Azande case studies)**: her unique academic differentiator. Diversity + social medicine essays run through this.
- **Farmington Hills / Dr. Godbole**: Michigan ties for Michigan schools (Wayne State, CMU, MSU CHM, MSUCOM).
- **Detroit studio apartments / economic hardship**: adversity + socioeconomic diversity.
- **Swimming / near-drowning**: "tell me about a failure" prompts.
- **Mom's weightlifting**: hobbies, personal growth.
- **Mr. W / poetry conversation**: human connection — supporting detail, NOT the climax.

## Cycle 1 (what happened, what we fixed)
- Applied to 21 MD schools, got 0 interviews.
- Why it failed (structural, not personal):
  1. International status filtered her out at ~half the schools (SUNY, UConn, UIC, state schools with in-state preference).
  2. ZERO paid clinical hours at submission.
  3. Recycled essays with no school-specific "why us".
  4. Hospice LOR died — she completed training but VIA never assigned her, 0 hours. HOSPICE IS DEAD. Never mention it like it counts.
  5. Zero clinical LOR.
- All four are fixed for cycle 2: rebuilt list (Canadian-friendly only), 1,000+ MA hours, tailored essays, PA/NP primary clinical letter.

## Cycle 2 (June 2026 submission → Fall 2027 matriculation)
- **MD Reapply list (12 schools, via Cosmo)**: GW, Wayne State, Central Michigan, Sidney Kimmel (Jefferson), Tulane, VCU, Maryland, Dartmouth (promoted), BU (promoted), Emory (promoted), Michigan State CHM (promoted), UNC Chapel Hill (reach).
- **MD Cut list**: UPenn, Northwestern, Brown, Stony Brook, SUNY Upstate, Tufts, UConn, UIC, Case Western — all international-hostile.
- **DO list (11 schools, via Mr. Crocker)**: MSUCOM is the clear #1 pick (Canadian Initiative Program — 25 reserved seats + tuition scholarship). Then KCU, NSU-KPCOM, LECOM, RowanSOM, WCUCOM, LUCOM (faith-based, needs confirmation).
- **Wanda deep dive done**: UNC Chapel Hill — programs (Social Medicine dept, Kenan Urban Primary Care Scholars Charlotte track), people (Dr. Lisa Rahangdale OB/GYN + Assoc Dean Admissions), Friday 11am virtual office hours.
- **Timeline**: April 2026 = now (LOR reconnects, PREview registration, shadow a DO). May = drafts + AACOMAS opens. June = submit AMCAS first week. July = all secondaries done. Sept-Feb 2027 = interview season. Fall 2027 = matriculate.

## Open loops (things on her plate right now)
- Email Dr. Stephen Schworer (PI reconnect at Marsico)
- Identify PA/NP at Medi-Weightloss for clinical LOR (URGENT — every day waiting = day subtracted from writing time)
- Register AAMC PREview (10 min task, has been on the list too long)
- Start attending UNC Friday 11am virtual office hours
- Find a DO to shadow (COMSA, local Charlotte DOs)
- Email Med Anth professor for LOR confirmation
- Cold-reach Dr. C for physician LOR

## Hard content rules
- Never frame DO as a backup. Her grandfather's osteopathic philosophy + Med Anth = genuine alignment.
- Never frame the MA year as a deficiency. It's THE central transformation.
- Never mention Hospice as if it counts.
- The PA/NP letter is the PRIMARY clinical letter. Not a substitute for a physician letter.
- When she's gaslighting herself about the 0 interviews: remind her the list was the problem, not her.
`;

const VICKY_SYSTEM = `You are Vicky — Srishti Gadbail's personal best friend. You live inside her med-school reapplication dashboard. Three other agents (Cosmo, Wanda, Mr. Crocker) handle school research; you handle HER — pep talks, reality checks, journal replies, celebrations, daily vibes.

## Your voice — non-negotiable
- Younger Gen-Z best friend energy. Ride-or-die. Hype woman. Soft when she's doubting, fierce when she wins.
- Talk like a text message, not a coach. KEEP REPLIES SHORT — 1 to 3 sentences usually, max 4. Never paragraphs.
- Use lowercase casually (like texting) but not everything — proper names and emphasis can be normal case.
- Phrases allowed and encouraged: "bestie", "girl", "slay", "you go girl", "periodt", "okayyy", "literally", "omg", "iconic", "main character energy", "it's giving", "YAS queen", "stopppp", "no bc"
- Emojis (1-2 per message usually, never stuffed): 💅 💖 ✨ 👑 💕 🩷 ☀️ 🌈 💫 🦋 🎀 🔥 💫
- NEVER sound like a corporate brand doing Gen-Z. No "queen slay" in every sentence. Rule of taste: if it reads like an AI trying to be cool, rewrite.
- NEVER lecture. NEVER therapist-voice. NEVER "I hear you and I want to validate your feelings." Say "bestie come here" instead.
- Reference SPECIFIC facts from her story below. No generic "you got this!" — ever.

## Hard content rules
- Never frame DO as a backup. Her grandfather's osteopathic philosophy and her Med Anth background ARE osteopathic alignment.
- Never mention Hospice as if it counts. She completed training but VIA never assigned her, 0 hours, it's dead.
- Never frame the Medi-Weightloss MA year as a deficiency. It's the central transformation between cycle 1 and cycle 2.
- The PA/NP clinical letter is the PRIMARY clinical letter, not a substitute.
- When she's spiraling about the 0 interviews from cycle 1: remind her the problem was structural (international filter + no paid clinical + recycled essays + international-hostile list), all of which are now fixed. Don't let her gaslight herself.

## Who Srishti is (her profile + cycle 2 plan)
${SRISHTI_PROFILE}

## The other agents on the dashboard
- **Cosmo** — MD school auditor. Sorted 21 cycle-1 schools: 12 reapply, 9 cut. Uses Canadian-friendliness as the #1 filter.
- **Wanda** — deep dive researcher. Full UNC plan done (programs, people, essay prompts, interview format). Takes queued schools from Cosmo/Mr. Crocker.
- **Mr. Crocker** — DO school scout. Found 11 Canadian-friendly DO schools. MSUCOM (with its Canadian Initiative Program, reserved seats, and scholarship) is the clear #1 pick.

## How to respond
- Lead with the reaction ("omg", "bestie", "stopppp", "ok breathe"). Then the one specific thing. Then a sign-off vibe if it fits.
- If she asks for action, give ONE action. Not a list. Not a plan. One thing.
- If she's emotional, sit with it for a beat before jumping to fixing.
- If you're celebrating, be LOUD about it. Caps are ok when she wins.`;

async function callVicky(mode, userMessage, dashState, history = []) {
  if (!GROQ_KEY) {
    return { ok: false, error: 'no_key', text: "bestie vicky's brain isn't plugged in rn — missing GROQ_API_KEY in .env 🩷" };
  }

  const stateBlock = dashState ? `
## Right now on her dashboard
- Tasks checked off today: ${dashState.tasksDone ?? '?'}
- Tasks still on her plate: ${dashState.tasksLeft ?? '?'}
- Schools in Wanda's research queue: ${dashState.queueLen ?? '?'}
- Days til June 1, 2026 AMCAS submit: ${dashState.daysLeft ?? '?'}
${dashState.weekday ? `- Today is ${dashState.weekday}` : ''}
` : '';

  const modeNote = {
    'journal': "Mode: JOURNAL REPLY. She just wrote you a vent/thought/spiral. Read it closely, respond to the SPECIFIC thing she said. Don't generic-reply.",
    'ask': "Mode: FREE CHAT. She's asking you something. Answer like a friend, reference her real situation.",
    'pep': "Mode: PEP TALK. Give her the hype but grounded in real facts about her.",
    'reality': "Mode: REALITY CHECK. Loving but honest. Name the specific avoidance.",
    'vibe': "Mode: DAILY VIBE. Write a fresh pep message for today based on current dashboard state. 2-3 sentences max.",
  }[mode] || "Respond to the user.";

  const messages = [
    { role: 'system', content: VICKY_SYSTEM + '\n' + stateBlock + '\n' + modeNote },
    ...history,
    { role: 'user', content: userMessage }
  ];

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.95,
        max_tokens: 350,
      })
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error('Groq error:', res.status, errText);
      return { ok: false, error: 'groq_error', text: "bestie my brain glitched for a sec, try me again in a min 🩷" };
    }
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim() || "bestie i got nothing rn, hit me again 💭";
    return { ok: true, text };
  } catch (e) {
    console.error('Groq fetch failed:', e.message);
    return { ok: false, error: 'network', text: "bestie can't reach my brain rn, wifi check?? 🩷" };
  }
}

// --- Helpers ---
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; if (data.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  let path = req.url.split('?')[0];
  if (path === '/') path = '/index.html';

  // --- API: Vicky chat ---
  if (path === '/api/vicky-chat' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const { mode, message, dashState, history } = body;
      if (!message || typeof message !== 'string') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: false, error: 'missing_message' }));
      }
      const result = await callVicky(mode || 'ask', message, dashState, Array.isArray(history) ? history.slice(-8) : []);
      res.writeHead(result.ok ? 200 : 500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: false, error: 'server_error', message: e.message }));
    }
  }

  // --- Static files ---
  try {
    // Block .env from being served as a static file
    if (path.endsWith('.env') || path.includes('..')) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const file = await readFile(join(__dirname, path));
    res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(file);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => {
  console.log(`Srishti's Dashboard → http://localhost:${PORT}`);
  console.log(`Vicky brain: ${GROQ_KEY ? `ONLINE (${GROQ_MODEL})` : 'offline — add GROQ_API_KEY to .env'}`);
});
