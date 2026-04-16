# CLAUDE.md — Srishti Med School Reapplication Hub

## What This Is

Rajat Singh's operational system for managing his girlfriend Srishti Gadbail's MD/DO medical school reapplication (cycle 2, June 2026 submission, fall 2027 matriculation). Four AI agents research schools, support Srishti, and produce actionable plans displayed on a custom dashboard.

## The Person

**Srishti Gadbail** — Canadian citizen, UNC Chapel Hill alum (2025, Highest Distinction), currently a full-time Medical Assistant in Charlotte, NC. Stats: cGPA 3.88, sGPA 3.80, MCAT 517 (94th %ile). Applied to 21 MD schools in cycle 1, got 0 interviews. The problem was structural — international status filtering, zero paid clinical hours at submission, recycled essays, and a school list heavy on international-hostile programs. Cycle 2 fixes all of this.

**Key identity facts that shape every agent run:**
- Canadian citizen on OPT — this is THE defining structural fact. ~half of US MD schools filter her out.
- Grew up in Farmington Hills, Michigan (Oakland County) — Michigan schools are "home state" schools for her
- Grandfather was a physician in Surat, Gujarat — the seed of her med school narrative and perfect DO philosophy alignment
- Medical Anthropology minor from UNC — her unique academic differentiator
- 340 hours research at UNC's Marsico Lung Institute (PI: Dr. Stephen Schworer)
- ~1,000+ hours paid MA at Medi-Weightloss Ballantyne (Charlotte) — the central transformation since cycle 1
- Cycle 1 weakness: zero paid clinical hours + zero clinical LOR at submission
- Cycle 2 fix: year of paid MA work + PA/NP clinical letter + rebuilt school list + tailored essays

## File Structure

```
Srishti Med School /
├── CLAUDE.md                    ← YOU ARE HERE — project rules
├── CONTEXT.md                   ← Master context (Srishti's full profile, cycle 1 analysis, strategy)
├── REAPPLICATION_PLAN.md        ← School lists, essay strategy, timeline, action items
├── WANDA_SCHOOL_TEMPLATE.md     ← HTML template for adding schools to Wanda's page
├── agents/
│   ├── COSMO.md                 ← Cosmo's playbook + run log
│   ├── WANDA.md                 ← Wanda's playbook + run log
│   ├── MR_CROCKER.md            ← Mr. Crocker's playbook + run log
│   └── VICKY.md                 ← Vicky's playbook + run log (personal bestie agent)
└── dashboard/
    ├── index.html               ← Main dashboard (tasks, spotlight, timeline, agent cards)
    ├── schools.html             ← Cosmo's page (MD school audit — reapply vs cut)
    ├── unc.html                 ← Wanda's page (deep dives + research queue)
    ├── do-schools.html          ← Mr. Crocker's page (DO schools + AACOMAS guide)
    ├── vicky.html               ← Vicky's page (bestie hub — pep, journal, live agent feed)
    ├── sync.js                  ← Supabase sync layer (localStorage ↔ cloud)
    └── serve.mjs                ← Static file server (port 3006)
```

## The Four Agents

| Agent | Page | Role | Playbook |
|-------|------|------|----------|
| **Cosmo** | `schools.html` | Audits MD schools — reapply vs cut. Provides essay strategy + outreach per school. | `agents/COSMO.md` |
| **Wanda** | `unc.html` | Deep dives into priority schools. 6-section plans: Why Belong, Programs, People, Essays, Templates, Interview. | `agents/WANDA.md` |
| **Mr. Crocker** | `do-schools.html` | Dual-track scout: Canadian-friendly **MD + DO** schools outside Cosmo's core list, plus "Investigated & Cut" callout for documented dealbreakers. AACOMAS/AMCAS logistics, osteopathic framing. | `agents/MR_CROCKER.md` |
| **Vicky** | `vicky.html` | Srishti's personal bestie. Cross-agent context + pep talks, reality checks, journal replies, daily vibes. | `agents/VICKY.md` |

### How schools flow between agents
1. **Cosmo** audits Srishti's cycle-1 MD list → determines reapply vs cut vs promoted vs reach
2. **Mr. Crocker** dual-track scouts:
   - **DO track** — Canadian-friendly DO schools, ranked by Canadian-friendliness
   - **MD track** — new MD candidates outside Cosmo's core 12 (e.g., Howard, Sinai, Vanderbilt)
   - **Cut track** — documented dealbreakers (e.g., MUSC, USC Greenville) so no one re-researches them
3. On either page, Rajat clicks **"Plan for Wanda"** to queue a school for a deep dive. The queue item carries `type: 'MD' | 'DO'` so Wanda renders the right color chip.
4. **Wanda** picks up schools from the Research Queue and runs full deep dives
5. Deep dive results appear as full-screen modals on Wanda's page with tasks + notes

## Agent Run Protocol (MANDATORY — follow this every time)

### BEFORE every agent run (Pre-flight)
1. **Read `CONTEXT.md`** — Check for any updates since last run (new feedback, new facts, answered open questions)
2. **Read `REAPPLICATION_PLAN.md`** — Check current school lists and strategy so you don't contradict existing decisions
3. **Read the agent's playbook** (`agents/COSMO.md`, `agents/WANDA.md`, or `agents/MR_CROCKER.md`) — Read the Run Log section to learn from past runs (what sources worked, what to avoid, patterns discovered)
4. **Check the Open Questions table** (bottom of this file) — If any have been answered since last session, incorporate the new info before running
5. **Check the Research Queue** (localStorage key `srishti_wanda_queue`) — If running Wanda, start with queued schools

### DURING the agent run
- Follow the step-by-step process in the agent's playbook
- When you discover new facts about Srishti (feedback, LOR status, clinical hours, etc.) — note them for the post-run update
- When you find useful sources — note them for the Run Log
- When something doesn't work or a source is outdated — note it so future runs skip it

### AFTER every agent run (Post-flight — DO NOT SKIP)
1. **Update the dashboard HTML** — Add/modify school data in the appropriate page (`schools.html`, `do-schools.html`, or `unc.html`)
2. **Append to the agent's Run Log** — In the agent's playbook (`agents/*.md`), add a new entry:
   ```
   ### Run N — YYYY-MM-DD (Short description)
   - **What:** What was researched
   - **Result:** What was found/produced
   - **Key findings:** Surprising or important discoveries
   - **Sources that worked:** Which websites/tools gave the best info
   - **What to improve next time:** Lessons for future runs
   ```
3. **Update `REAPPLICATION_PLAN.md`** — If any school list, strategy, priority, or timeline changed
4. **Update `CONTEXT.md`** — If new facts about Srishti were learned (feedback arrived, question answered, new milestone)
5. **Update Open Questions** (bottom of this file) — Mark any answered questions as resolved, add new questions discovered
6. **Verify Supabase sync** — If new localStorage keys were introduced, make sure they have sync functions in `sync.js`
7. **Verify Supabase coverage** — If you added ANY new localStorage key, you MUST add a sync function in `sync.js` + load path in `syncLoad()`. No exceptions.
8. **Push to GitHub** — Stage changed files, commit with a descriptive message, push to `rajats2022-coder/Srishti-Med-School-Dashboard`
9. **Tell Rajat what changed** — Summarize: what was added to the dashboard, what docs were updated, what's new

### Why this matters
Each agent run builds on the last. If you skip the pre-flight, you might contradict decisions already made. If you skip the post-flight, the next run starts from scratch instead of building on what you learned. The Run Logs are the institutional memory that makes every agent smarter over time.

## Dashboard Technical Details

### Server
- **Port:** 3006
- **Server:** `dashboard/serve.mjs` (plain HTTP, static file serving)
- **Start:** `cd "Srishti Med School /dashboard" && node serve.mjs`
- **Preview config:** Already in `.claude/launch.json` as "Srishti Dashboard"

### Data Persistence
All user data syncs to **Supabase** via `sync.js`:
- **Table:** `srishti_dashboard` (key-value store)
- **Keys:** `tasks`, `school_moves`, `notes`, `school_tasks`, `wanda_queue`
- **Pattern:** localStorage for instant reads → Supabase POST for cloud persistence → Supabase GET on page load for cross-device sync
- **Sync functions available globally** (from `sync.js`):
  - `syncTask(key, checked)` — dashboard checkbox states
  - `syncSchoolMoves(moves)` — Cosmo reapply/cut moves
  - `syncNote(noteKey, value)` — any notes textarea (debounced 1s)
  - `syncSchoolTasks(allTasks)` — Wanda per-school tasks (debounced 1s)
  - `syncWandaQueue(queue)` — Research Queue schools

### Brand / Styling
- **Tailwind CSS via CDN** — all styles inline per page
- **Fonts:** Playfair Display (headings) + Quicksand (body)
- **Colors:** Rose palette (`#FF69B4` primary), Lavender (`#C4A6FF` for Wanda), Rosegold (`#B76E79` for Mr. Crocker), Cream (`#FFFAF5` background)
- **Pattern:** Polka dot subtle backgrounds, soft/card/glow shadows
- **Each page is standalone HTML** — no shared CSS file, no build tools

### Adding a New School to Each Page

**Cosmo (schools.html):** Add object to `allSchools` array. See `agents/COSMO.md` for field format.

**Mr. Crocker (do-schools.html):** Add object to `doSchools` array (DO track) OR `mdSchools` array (MD track). Same shape for both; the arrays only differ in which section renders them. See `agents/MR_CROCKER.md` for field format and the Cut-callout pattern.

**Wanda (unc.html):** Follow `WANDA_SCHOOL_TEMPLATE.md` exactly:
1. Add object to `wandaSchools` array
2. Add full plan HTML to `schoolPlanContent[id]`
3. Add school name to `schoolNames` in `index.html`

### Navigation
All pages share the same nav bar:
```
[S logo] Med School HQ  |  Dashboard  Cosmo  Wanda  Mr. Crocker  Vicky
```
Active page gets a colored pill button. If you add a new page, add its nav link to ALL existing pages.

### The Research Queue System
- Schools are queued via "Plan for Wanda" buttons on Cosmo and Mr. Crocker's pages
- Queue data stored in localStorage key `srishti_wanda_queue` and synced to Supabase key `wanda_queue`
- Queue renders at bottom of Wanda's page with source labels ("from Cosmo" / "from Mr. Crocker")
- Schools already in `wandaSchools` array show "Deep dive complete" automatically

## Story Menu (for essay strategy)

When assigning essay strategies to schools, use these pre-built story blocks from `REAPPLICATION_PLAN.md` Part 6:

| Story | Best for |
|-------|----------|
| Visa / "Alien" / lost MA job | Adversity, reapplicant, diversity — USE AT EVERY SCHOOL |
| Medi-Weightloss year | Clinical growth, "what changed" — USE AT EVERY SCHOOL |
| Farmington Hills / Dr. Godbole / Michigan | "Why us" at Michigan schools (Wayne State, CMU, MSUCOM, MSU CHM) |
| Detroit studio apartments / economic hardship | Adversity, socioeconomic diversity |
| Grandfather in Surat / aamras / family medicine | PS opener, osteopathic philosophy, "why medicine" |
| Marsico Lung Institute research | Research, "why us" for UNC |
| Med Anth / Hmong & Azande / cultural humility | Diversity, "why us" for social medicine programs |
| Mother's ectopic pregnancy + Ayurveda | Women's health, family influence |
| Sister's early period / women's health book | Peds, women's health, leadership |
| Mr. W / poetry conversation | Human connection — supporting detail, NOT the climax |
| Swimming / near-drowning | "Tell me about a failure" prompts |
| Weightlifting | Hobbies, personal growth |

**Rule:** Never use the same 3 blocks across all schools. Match stories to each school's specific mission. Michigan schools get Michigan stories. Social medicine schools get Med Anth stories.

## GitHub Repository

**Repo:** `https://github.com/rajats2022-coder/Srishti-Med-School-Dashboard.git`

After any meaningful work session (new agent run, dashboard changes, doc updates), push to this repo:
```bash
cd "Srishti Med School /dashboard" # or from root if pushing all
git add -A
git commit -m "feat/docs/fix: description"
git push origin main
```

The dashboard folder is also deployed to Supabase/Vercel — the GitHub repo is the source of truth.

## Supabase Integration (MANDATORY)

**Project:** `yvqbglprecyllkmwxprw.supabase.co`
**Table:** `srishti_dashboard` (key-value store with `key`, `value`, `updated_at` columns)

**Rule: Every piece of user data MUST sync to Supabase.** The dashboard is used across devices — localStorage alone is not enough.

When creating any new feature that stores data:
1. Store in `localStorage` for instant reads
2. Add a sync function in `sync.js` that POSTs to Supabase (use `resolution=merge-duplicates`)
3. Add a load path in `syncLoad()` that reads the key from Supabase on page init
4. Test that data persists after clearing localStorage and reloading

**Existing sync keys:**
| localStorage key | Supabase key | Sync function |
|---|---|---|
| `srishti_task-*` | `tasks` | `syncTask(key, checked)` |
| `srishti_school_moves` | `school_moves` | `syncSchoolMoves(moves)` |
| `srishti_notes_*`, `srishti_do_notes*`, `srishti_school_notes_*` | `notes` | `syncNote(noteKey, value)` |
| `srishti_school_tasks` | `school_tasks` | `syncSchoolTasks(allTasks)` |
| `srishti_wanda_queue` | `wanda_queue` | `syncWandaQueue(queue)` |
| `srishti_vicky_journal` | `vicky_journal` | `syncVickyJournal(entries)` |

**If you add a new localStorage key without a Supabase sync function, it WILL be lost when Srishti uses a different device. Don't do this.**

## Critical Rules

1. **Never frame DO as a backup.** Srishti's grandfather, her Med Anth training, and her belief in whole-person care ARE osteopathic philosophy. Lead with genuine alignment.
2. **Never frame her MA year as a deficiency.** It's the central transformation between cycle 1 and cycle 2. She took the only job her work auth allowed and showed up full-time for a year. That's grit.
3. **Always verify Canadian policy from the school's own website.** SDN and secondhand reports are starting points, not confirmation.
4. **Hospice is DEAD.** She completed training but VIA never assigned her. 0 hours. Remove from all cycle 2 materials.
5. **Keep run logs updated.** Every agent run must append to its playbook's Run Log section. This is how agents get smarter.
6. **The PA/NP letter is the primary clinical letter.** Don't treat it as a lesser substitute for a physician letter. Daily supervision depth > credential type.
7. **Sync everything to Supabase.** All new localStorage keys must have corresponding sync functions. The dashboard is used across devices.
8. **Don't change ports.** Dashboard = 3006.

## Open Questions (update as answers arrive)

| # | Question | Status |
|---|----------|--------|
| 1 | MSU post-cycle feedback? | Submitted 2026-04-15, waiting for response |
| 2 | Covenant HealthCare COM at CMU post-cycle feedback? | In progress (request submitted). When it lands, compare against Wanda Run 4 hypothesis that rejection was structural (OOS filter + no paid clinical at submission + no Michigan framing), not academic — her 3.88/517 is well above their 3.78/507 median. |
| 3 | NC residency status for UNC in-state? | Unknown |
| 4 | Financial situation / escrow capacity? | Unknown |
| 5 | Children's Women's Health Book status? | Unknown — did it publish? |
| 6 | Research publications/posters from Marsico? | Unknown |
| 7 | PA or NP LOR — has she asked yet? | Need to ask within 30 days of 2026-04-15 |
| 8 | DO shadowing — has she found a DO? | Needs to happen ASAP |
| 9 | Casper retake decision? | Pending — 3rd quartile in cycle 1 |
| 10 | PREview registration? | Needs to register |
| 11 | CMU financial aid Canadian eligibility? | New from Wanda Run 4 (2026-04-16). Does CMU's Dean's Award or need-based aid extend to Canadian citizens? Some US MD schools require Canadian students to escrow full tuition — needs direct confirmation by email to CMU admissions before committing to a fall 2026 secondary. |
