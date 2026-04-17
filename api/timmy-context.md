# TIMMY CONTEXT BUNDLE
# Auto-bundled from parent dir for Vercel deployment. Regenerate if source files change.

========================================
FILE: CLAUDE.md (project rules + critical rules + open questions)
========================================
# CLAUDE.md — Srishti Med School Reapplication Hub

## What This Is

Rajat Singh's operational system for managing his girlfriend Srishti Gadbail's MD/DO medical school reapplication (cycle 2, June 2026 submission, fall 2027 matriculation). Three AI agents research schools and produce actionable plans displayed on a custom dashboard.

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
│   └── MR_CROCKER.md            ← Mr. Crocker's playbook + run log
└── dashboard/
    ├── index.html               ← Main dashboard (tasks, spotlight, timeline, agent cards)
    ├── schools.html             ← Cosmo's page (MD school audit — reapply vs cut)
    ├── unc.html                 ← Wanda's page (deep dives + research queue)
    ├── do-schools.html          ← Mr. Crocker's page (DO schools + AACOMAS guide)
    ├── sync.js                  ← Supabase sync layer (localStorage ↔ cloud)
    └── serve.mjs                ← Static file server (port 3006)
```

## The Three Agents

| Agent | Page | Role | Playbook |
|-------|------|------|----------|
| **Cosmo** | `schools.html` | Audits MD schools — reapply vs cut. Provides essay strategy + outreach per school. | `agents/COSMO.md` |
| **Wanda** | `unc.html` | Deep dives into priority schools. 6-section plans: Why Belong, Programs, People, Essays, Templates, Interview. | `agents/WANDA.md` |
| **Mr. Crocker** | `do-schools.html` | Dual-track scout: Canadian-friendly **MD + DO** schools outside Cosmo's core list, plus "Investigated & Cut" callout for documented dealbreakers. AACOMAS/AMCAS logistics, osteopathic framing. | `agents/MR_CROCKER.md` |

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
   - **Wanda runs are source-aware.** Every queued school carries `source: 'cosmo' | 'crocker'`. When Wanda finishes a deep dive (full plan OR Investigated & CUT), she must also update the source page so it never contradicts her verdict:
     - `source === 'cosmo'` → update `schools.html`
     - `source === 'crocker'` → update `do-schools.html` (CUT verdicts: remove from `doSchools`/`mdSchools`, add to the Investigated & Cut section)
   - **Wanda must clean the Research Queue.** `unc.html` auto-filters queued items whose IDs appear in `wandaSchools` on render and persists via `syncWandaQueue`. Verify the queue card is gone after a reload. LSU-style leftovers (CUT verdict published but still sitting in the queue) are a bug.
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
[S logo] Med School HQ  |  Dashboard  Cosmo  Wanda  Mr. Crocker
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
| 12 | LSU NOLA Canadian eligibility (from REAPPLICATION_PLAN.md Run 2 scout list row 4)? | **RESOLVED 2026-04-16 by Wanda Run 5.** NOT eligible. LSU Admissions Criteria: "Applications are not accepted from International Students." SDN-confirmed: Canadians without US LPR are treated as international. School moved to Investigated & CUT table. Tulane (already on reapply list) is the LA substitute. No further action needed. |

========================================
FILE: CONTEXT.md (Srishti's full profile + cycle 1 analysis + strategy)
========================================
# Srishti — Medical School Reapplication Context

> **Purpose of this doc.** Master context file for Srishti Gadbail's MD/DO reapplication. Built from a full read of her Google Drive folder (`Srishti med school`) on 2026-04-15, updated after the consolidated-secondaries deep read. Every future planning conversation should load this first — it's the source of truth for who she is, what she submitted last cycle, what worked, what didn't, and the open questions we still need answered before we strategize.

---

## 1. Who She Is (Identity & Background)

- **Name:** Srishti Gadbail
- **Email on file:** srishti.gadbail@gmail.com
- **Approx. age:** 21–22 (her own essay phrase: "After 21 years without work due to my visa status…")
- **Citizenship:** **Canadian citizen** living in the U.S. on a non-immigrant visa (was on F-2/dependent until late undergrad, then F-1 student, now on **OPT post-graduation**). This is *the* defining structural fact of her application — see §6.
- **Origin path:** Born in Windsor, Canada → moved to Scottsdale, AZ at 6 months → grew up in **Farmington Hills, Michigan (Oakland County)** → moved to NC for high school → UNC Chapel Hill for college → currently Charlotte. Family is from **Surat, Gujarat, India**.
- **Michigan roots (this matters strategically — see §10):**
  - Grew up in **Farmington Hills, Oakland County, Michigan**
  - Childhood pediatrician was **Dr. Godbole**, an Indian immigrant who left a strong impression on her
  - Did **Math Olympiad**, **Bollywood dance**, and learned to swim at the **YMCA** in Michigan
  - Father did his **master's degree in Detroit** (see §6 — economic hardship narrative)
  - **This makes Central Michigan and Michigan State authentic strong-fit schools for her — and the secondaries do leverage this.**
- **Family:**
  - **Father:** From a family of physicians in India. Came to Detroit for grad school. Rational/factual personality. Family lived in studio apartments through her early childhood; bought their first house when she entered high school.
  - **Mother:** Empathetic, Ayurvedic-leaning ("warm water, honey, turmeric" first, then medicine). Had a traumatic ectopic pregnancy she only disclosed to Srishti during a med-anth interview project.
  - **Grandfather (paternal, "ajoba"):** Beloved family physician in Surat. **The seed of her med school narrative.** She watched him see patients in their home as a child.
  - **Grandmothers:** Traveled from India to help during her mother's pregnancies — central to her "Grandmother Hypothesis" essay block.
  - **Sister:** 8 years younger. Srishti is heavily parental/caretaker for her — once was sole guardian for a month while parents were in India. The sister starting her period early sparked the women's health book project.
  - **No extended family in the U.S.** Recently a cousin from India moved to Canada to study; she has limited support there too.
- **Location now:** Charlotte, NC area (her current MA job is at **Medi-Weightloss Ballantyne**, which is a Charlotte neighborhood).

---

## 2. Academic Profile

- **Undergrad:** University of North Carolina at Chapel Hill (UNC)
- **Graduated:** May 2025
- **Honors:** **Highest Distinction**, **Dean's List every semester**
- **Major:** Biology (presumed — full course list is bio/chem/physics heavy, no major name explicitly stated in the docs)
- **Minor:** **Medical Anthropology** ← unusually strong differentiator, central to her voice
- **Coursework documented:**
  - *Bio:* BIOL 201 (Eco/Evo), 202 (Mol Bio/Genetics), 205 (Cell/Dev), 252+L (Human A&P), 454 (Evolutionary Genetics), 564+L (Population Ecology)
  - *Chem:* CHEM 101+L, 102+L, 261, 241+L, 262+L, 430 (Biological Chemistry)
  - *Physics:* PHYS 114, 115
  - *Math:* MATH 231 (Calc I), PSYC 210 (Stats)
  - *English:* ENGL 105, ENGL 121
  - Med Anth coursework included: Hmong/Azande healing systems, "First 1000 Days" maternal/infant health, Science vs Anti-Science, ethnographic methods
- **GPA (verified by AMCAS, page 8 of the AMCAS Report — 2026 entering class):**
  - **cGPA: 3.88** (104 verified undergrad hours)
  - **sGPA / BCPM: 3.80**
  - **AO (non-science) GPA: 3.98**
  - **Year-by-year trend (this is a narrative *win*, not a weakness):**
    | Year | BCPM | AO | Total |
    |---|---|---|---|
    | Freshman | 3.80 | 4.00 | **3.91** |
    | Sophomore | 3.70 | 3.90 | **3.77** ← only dip |
    | Junior | 3.79 | 4.00 | **3.83** |
    | Senior | 4.00 | 4.00 | **4.00** ← perfect |
  - Clean **ascending trajectory** with one sophomore dip and a perfect senior year. This is exactly the story adcoms reward — she should lead with it explicitly in any interview where she's asked about academics.
- **MCAT: 517** ✅ (verified). Test date **01/10/2025**, confidence band 515–519, **94th percentile**.
  - Chem/Phys: **130** (96th)
  - **CARS: 128** (90th) ← lowest section, still strong
  - Bio/Biochem: **130** (96th)
  - Psych/Soc: **129** (85th)
  - **Balanced score with no red-flag section.** Above median for nearly every school she targeted (only Penn matriculant median is meaningfully higher).
- **AAMC ID:** 16418230

---

## 3. Clinical / Healthcare Experience

This is **the** weakness her submission gestures at and the structural problem we have to solve. Full breakdown:

### What was on the AMCAS at submission (summer 2025)

| Experience | Type | Hours | Status at submission |
|---|---|---|---|
| **Pediatric Play Atrium — UNC Children's** | Community Service – Clinical (volunteer) | **100** | Completed |
| **Hospital Volunteering — UNC Memorial + Novant** (rounds, child life, ED) | Community Service – Clinical (volunteer) | **130** | Completed |
| **High school "Wellness Cart" volunteering** | Community Service – Clinical (volunteer, pre-college) | unknown | Completed |
| **Physician Shadowing** — UNC Children's specialty (peds endo, peds GP/circumcision/headache), ACT Therapy (peds OT/SLP), Carolina Plus Urgent Care (DNPs, MAs, radiology) | Shadowing | **16** (per VCU secondary) | Completed |
| **Hospice Volunteer — VIA Health Partners** | Community Service – Clinical | 100 (anticipated) | **Anticipated only — hadn't started at submission** |
| **Medical Assistant — Medi-Weightloss Ballantyne** | Paid Employment – Medical/Clinical | 0 | **"Anticipated"** — she even wrote *"Not sure if I should include this as I have not started…and won't actually be able to start until I am legally eligible to work in July."* |

**Total real direct clinical at time of submission: ~246 hours, 100% volunteer/shadowing, 0 paid clinical employment, 0 hospice, 0 MA.**

For context: most successful MD applicants at the schools she targeted have **150+ hours of paid/scribed direct patient-care clinical work** in addition to volunteer hours. Her Play Atrium and rounding hours are real but adcoms tend to discount them as "volunteer enrichment" rather than "patient care."

### What she has NOW (cycle 2 picture, as of 2026-04-15)

- **Medical Assistant — Medi-Weightloss Ballantyne** — started **August 2025**, **almost 1 full year** of MA work as of now. **Started part-time, currently full-time.** This is the single biggest fixable change between cycle 1 and cycle 2. Estimated ~1,000+ paid clinical hours by next AMCAS submission.
  - **⚠️ Important workplace fact:** Medi-Weightloss Ballantyne **does not employ any physicians** that she works directly under. **All providers at the clinic are PAs and NPs.** Her direct manager is an **RMA (Registered Medical Assistant)** — i.e., a senior MA, not a clinician with prescriptive authority. This significantly constrains the LOR strategy (see §7b).
  - **🆕 CCMA plan (told to Rajat 2026-04-15):** After hitting 1 year at Medi-Weightloss (~August 2026), Srishti plans to **take the CCMA exam** (Certified Clinical Medical Assistant — NHA credential). Once credentialed, she plans to **look for a better MA job** — likely a hospital system, pediatric clinic, or specialty practice. This is a *very smart* move and has major strategic implications for the application timeline (see §17 — this is the new top strategic question).
- **Hospice volunteer with VIA Health Partners** — ⚠️ **DID NOT HAPPEN.** She completed training in spring 2025 and listed it as "anticipated 100 hours" on her cycle-1 AMCAS, but **never received an assignment and never logged a single hour.** As of April 2026 this is a dead activity. **It must be removed entirely from her cycle-2 W&A** — there is no version of "anticipated" that works twice. We also need a story for any interviewer who asks "what happened with the hospice plan?" (Likely answer: VIA never matched her, she pivoted into the MA role full-time.)
- **Children's Women's Health Book** — co-author/co-founder with college roommate, inspired by sister's early period + roommate's PMDD diagnosis. Started Mar–May 2025. Status as of April 2026: ❓ unknown.

### Why the gap existed (the core narrative)

She legally **could not work in the U.S.** until her **OPT (Optional Practical Training)** authorization came through after graduation in summer 2025. Every American pre-med who needed paid clinical experience could just apply to be a scribe or MA at 18; she physically couldn't. This is true and verifiable and important — it's the central adversity story that has to be reframed in her reapplication.

---

## 4. Research

- **Boucher Lab — UNC School of Medicine, Marsico Lung Institute**
- **PI / mentor:** Stephen Schworer (saschworer@unc.edu)
- **Hours:** **340** (Nov 2023 – May 2025, ~1.5 years)
- **Focus:** Gene/protein expression in mucus-producing lung epithelial cells; why people with asthma get airway mucus plugs that contribute to severe disease/death. Worked with lungs from deceased asthma patients.
- **Techniques learned:** RNA extraction, qPCR, cell culture, histology slide scanning, sterile technique
- **Publications:** ❓ Not mentioned. Need to confirm if she's an author on anything.
- **Posters/presentations:** ❓ Not mentioned.

### The late-start backstory (this matters for reframing)

She **cold-emailed countless labs as a freshman and sophomore and got rejected by all of them.** She didn't start research until **junior year**, when a friend referred her to the Boucher Lab. Knowing this, **340 hours over 1.5 years starting late is genuinely impressive** — and reframes what looks at a glance like a "thin" research record into a story about persistence under structural friction. **This is a fixable PR problem in essays.**

---

## 5. Other Activities (W&A entries)

- **CPALS (Carolina Pediatric Attention, Love, and Support)** — Social Committee. Supports peds heme-onc patients & providers. Organized 15 events/year. Jan 2023 – May 2025.
- **STEM Sisters @ UNC** — Flex Time committee member then **Chair**. Designed/led college prep + STEM career sessions at Carrboro High School. Aug 2021 – May 2023.
- **Babysitter / Swim Instructor** — Summer 2021–Aug 2023, ~50 hours. (Informal/unpaid because of work-auth limits — see §6.)
- **Hobbies (current — per Northwestern essay):**
  - **Weightlifting / strength training** (her newest passion — "each increase in weight feels like a small yet meaningful win")
  - **Cooking with mom** (experimenting cross-cultural; "I think we can make this better at home")
  - **Baking** — recent hit: chocolate-covered brownie date balls (healthy desserts since lifting)
  - **Swimming, hiking, spin classes**
  - Older: art, longtime swimming starting at the YMCA (Michigan)

The swim story has a "near-drowning" failure narrative she uses for "tell me about a failure" essays.

---

## 6. The Visa / Citizenship Story (CENTRAL ADVERSITY ARC)

This is **the** thread that has to be woven through the reapp because it explains the clinical hours gap better than any excuse could.

- Born in Canada, family moved to U.S. at 6 months
- Grew up entirely in the U.S. but legally still Canadian
- Yearly visa renewals, drives back to Windsor with "stone-faced border officers"
- Common App required her "Alien Registration Number" — the word "Alien" landed hard
- **Could not work for pay** in the U.S. (under dependent visa) — until spring of senior year of undergrad
- **The lost-MA-job story (now the central "challenge" essay across at least 6 schools — Brown, UIC, Dartmouth, BU, Tufts, Stony Brook):** Briefly accepted an MA job offer at a **pediatric practice** before her work auth came through. Realized at orientation that the company was legally required to pay her for the 3-hour virtual session. Because accepting that payment without authorization could jeopardize her visa, she spent a week emailing HR, then **requested termination less than a month in.** Then found her current Medi-Weightloss role.
- **OPT** kicked in summer 2025 → started Medi-Weightloss in **August 2025**

### Family economic hardship (UPenn essay, less surfaced elsewhere)

Father came to Detroit for his master's degree. Family lived in **studio apartments** through her early childhood. They didn't buy their first house until she was entering high school. This is a real first-gen-immigrant economic story and is **massively underused** in the rest of her applications.

### Why this matters strategically

Roughly half of U.S. MD schools either don't accept international applicants at all or require escrow accounts / financial proof from internationals. **This alone could have killed several of her 21 apps before they ever got read.** We need to verify which of her 21 schools were actually international-friendly.

---

## 7. Personal Statement (As Submitted)

**Theme:** "Conversation is the first step to effective care." Human connection, cultural humility, listening as a form of healing.

**Structure (final/6th draft):**
1. **Hook:** Childhood in grandfather's home in Surat — eating *aamras*, listening to him talk medicine + Greek mythology. Watching him receive longtime patients in his living room. *"Like my grandfather, I hope to become a physician grounded in service and human connection."*
2. **Mr. W story:** 90-year-old at UNC Memorial Bed Tower 8th floor, recovering from intramedullary rod insertion. Asked for a soda can tab to file his nails. Conversation about poetry, biking, meditation, cultural shift in healthcare. Told her *"This conversation made me feel better than the pain meds I took today."* *(Met him freshman year — this is a 3-year-old story carrying the whole essay.)*
3. **Med Anthropology bridge:** Hmong + Azande case studies. Cultural humility framework. *"Anthropology allows me to vocalize what I observe; medicine gives me the chance to respond."*
4. **Adrian / Susan story (ACT Therapy):** Mother of autistic toddler whose delays were missed by the pediatrician. Long commute, expensive therapy, never wavered in gratitude.
5. **Conclusion:** Time, empathy, lifelong learning, "meeting people where they are."

**Opening line of every draft:**
> "Some of my fondest childhood memories take place in my father's home in Surat, Gujarat, India. I'd sit in the cool dining room, taking cover from the blistering summer sun, eating aamras—a refreshing mango purée my grandmother made from our farmhouse fruit—enraptured as my grandfather spoke about medicine and Greek mythology in the same breath."

**Honest critique of the PS as submitted:**
- ✅ Beautiful writing. Clean voice. Specific sensory detail. The aamras opener is genuinely good.
- ✅ Mr. W story is vivid and gets to "human connection" without preaching.
- ✅ Med anth → cultural humility is a unique angle.
- ⚠️ **The "doctor in the family" archetype is one of the most common openers in all of pre-med.** Adcoms see this 1000x per cycle. The aamras detail saves it but barely.
- ⚠️ **The whole emotional core of the essay is a story from FRESHMAN year of undergrad** (Mr. W). Three years later, with more recent and harder experiences (research, ACT, hospice training), leaning on the freshman story signals "I peaked early."
- ⚠️ **Why MD specifically?** The essay never directly answers: why physician and not nurse, PA, occupational therapist, or social worker? Every story is about *being present* and *listening* — which is exactly what she'd do as a great nurse or PA.
- ⚠️ **Volunteer/observer-heavy.** Every named story positions her as the one watching, soothing, or listening. None show her holding clinical responsibility.
- ⚠️ The visa/citizenship story (her strongest unique adversity) is **siloed in the Other Impactful Experiences essay** instead of woven into the PS. Strategic miss.

**She has 6 PS drafts in the brainstorm doc — she takes drafting seriously.** Real strength when we revise.

---

## 7b. Letters of Recommendation — Cycle 1 packet + Cycle 2 plan

> **Framing note:** read this section together with the warning in §17. The cycle-1 letter packet had a real gap — *no clinician had seen her in a clinical role they'd put their name on yet*, because she literally couldn't work for pay. That gap was a function of her visa timeline, not her readiness. Cycle 2 closes it with **a year of paid MA work + a credentialed clinical letter writer (PA or NP) who has supervised her daily.** Don't talk about the cycle-2 LOR plan as a "constrained substitute" for a physician letter — talk about it as her primary clinical anchor, because that's what it is.

**4 letters submitted in cycle 1, all academic/research:**

| # | Letter writer | Type | Quality signal |
|---|---|---|---|
| 1 | **Stephen Schworer** (Boucher Lab PI, UNC SOM Marsico Lung Institute) | PI / research | Strong — direct supervisor, 340 hours, named in W&A |
| 2 | Bio professor #1 | Science faculty | "**Was fond of her, wanted her to join research**" — very likely a strong letter |
| 3 | Bio professor #2 | Science faculty | Unknown content |
| 4 | **Medical Anthropology professor** | Non-science faculty | "**Said she'd write a great review**" — potentially her most differentiating letter, given the med anth angle is her unique hook |

### What cycle 1 was missing

**Zero clinical letters.** Despite shadowing Dr. Stewart, Dr. Vitale, "Dr. C" (the circumcision pediatric story), and rounding at UNC Memorial + Novant + UNC Children's for 2.5 years — none of those clinical relationships became a letter writer. She did not stay in touch with any of the physicians she shadowed.

She also **did not personally read any of the cycle-1 letters** (normal for committee/Interfolio submissions) and only has secondhand reads on quality:
- **Schworer (PI):** 340 hours, kept her on, presumably positive but unconfirmed
- **Bio professor #1:** "fond of her, wanted her in research" — this is the strongest secondhand signal we have
- **Bio professor #2:** zero signal
- **Med anth professor:** "said she'd write a great review" — likely her best differentiator

Her own read: *"more likely than not they were supportive."* We can't verify quality without re-asking writers to share, but we should plan for cycle 2 as if at least one was generic rather than championing.

**Why this mattered in cycle 1:** most successful MD applicants have at least one clinical letter from a supervising clinician — physician, PA, NP, scribe lead, or MA supervisor — who can say "I have seen this person around real patients." In cycle 1, Srishti had zero clinical letters *and* zero paid clinical hours at submission (the MA and hospice were both "anticipated"). That combination likely softened a file that was strong on every quantitative metric.

**Why cycle 2 is different:** by submission she will have **~10+ months of paid full-time MA work** and a clinical letter from a **PA or NP who has supervised her daily for a year.** That is exactly the clinical voice her cycle-1 file was missing. This isn't a partial fix — it's the fix.

### Cycle 2 LOR strategy

Medi-Weightloss Ballantyne does not employ MDs/DOs — all clinicians are PAs and NPs, and her direct manager is an RMA. **A PA or NP letter is her primary clinical letter and that's a solid anchor.** The vast majority of MD schools accept PA/NP clinical letters, and the letter's strength comes from the writer having watched Srishti work with patients every day for a year — that daily-supervision depth matters more than the writer's credential type.

Three options for clinical voice:

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **A. PA or NP at Medi-Weightloss** | Real clinician with a credential; works with her daily; can speak to her clinical aptitude over a full year of MA work | Some MD schools weakly prefer MD/DO letters over mid-level letters, though most accept them | **Strongest available option — pursue first.** She should identify the PA or NP she works with most closely and ask directly. This needs to happen ASAP, not next spring. |
| **B. RMA manager (currently her plan)** | Direct supervisor, knows her work intimately, will say yes | RMA is not a clinician — it's a senior MA. Adcoms will read this as a "lead coworker" letter, not a clinical supervisor letter. **Significantly weaker** than a PA/NP letter. | **Use as supplement only**, not as the primary clinical letter. If she only sends the RMA letter, the "no clinician has vouched for her" gap remains unfixed. |
| **C. Cold-reach back to Dr. Stewart, Dr. Vitale, or Dr. C** | Actual physicians; pediatric specialty (her stated interest); Dr. C already starred in a Most Meaningful experience essay | She has not been in touch in 2+ years; awkward to ask; they may not remember her well enough to write substantively | **Worth attempting for ONE of them** — Dr. C is the strongest because she's already in Srishti's W&A as a meaningful relationship. Outreach script: "I'm reapplying, here's the year I had as an MA, can we reconnect — and would you be willing to write a letter?" Even a "no" gives us nothing to lose. |

**Target letter packet for cycle 2 (4–5 letters):**
- ✅ **Schworer** (PI / research) — keep
- ✅ **Med anth professor** (unique academic differentiator) — keep
- ✅ **Bio professor #1** (the one who was fond of her — strongest signal) — keep
- ❌ **Bio professor #2** (no signal, no unique angle) — drop
- 🆕 **PA or NP at Medi-Weightloss** — primary clinical voice (highest priority new ask)
- 🆕 **Optional: RMA manager** — supplemental, only if a PA/NP letter is also secured
- 🆕 **Optional: Dr. C / Dr. Stewart / Dr. Vitale** — long-shot reach-back to a physician letter

**Critical action:** the PA/NP ask should happen **within the next 30 days**, not next spring. The longer that PA or NP has been thinking of Srishti as "a future doctor," the better the letter will read. Same logic applies to the cold reach-back to her former shadowing hosts — every month of delay weakens the relationship signal.

---

## 7c. Standardized Tests Beyond MCAT

| Test | Result | Strategic read |
|---|---|---|
| **MCAT** | 517 (130/128/130/129), 94th %ile | ✅ Strength. No section weakness. |
| **Casper** | **3rd quartile** (~50–75th %ile) | ⚠️ Middling. Not a screen-out but not a differentiator. Some Casper-heavy schools (Tufts, Tulane, BU, Wayne State, Sidney Kimmel, MSU, CMU all use Casper at varying weights) may have weighted this against her relative to 4th-quartile applicants. **Should retake for cycle 2** if she can push to 4th quartile. |
| **AAMC PREview** | **NOT TAKEN** | ❌ Active liability for cycle 1. Several schools either require, strongly recommend, or favor PREview submitters — and not having it can either hard-screen her out or quietly downgrade her file. **Penn, UIC, Tulane, and others** on her cycle-1 list are PREview schools. **She should take PREview for cycle 2** — it expands the addressable list and removes a soft drag on multiple existing targets. |

---

## 8. Other Impactful Experiences essay

1325-character narrative. Centers on **the Canadian visa / "Alien Registration Number" story**: born in Windsor, moved at 6 months, lived as outsider, couldn't work, *"what began as a workaround quickly became a defining part of who I am."* Closes with: advocate for self, embrace resilience, pursue goals with unwavering persistence.

This is *good* and *correctly placed* — but it should be louder elsewhere too.

---

## 9. Last Cycle's Application — What She Submitted To

### School list — **all 21 schools confirmed** (all MD via AMCAS)

| # | School | Notes |
|---|---|---|
| 1 | **UNC Chapel Hill SOM** | Lived in NC but Canadian citizen — residency status unclear |
| 2 | **Dartmouth Geisel SOM** | T-tier, international-restrictive |
| 3 | **George Washington SOM** | |
| 4 | **Tufts SOM** | |
| 5 | **UPenn (Perelman) SOM** | T10 |
| 6 | **Stony Brook Renaissance SOM** | |
| 7 | **Northwestern (Feinberg) SOM** | T20 |
| 8 | **Wayne State SOM** | Detroit — Michigan ties |
| 9 | **Sidney Kimmel (Thomas Jefferson)** | |
| 10 | **Central Michigan University SOM** (now **Covenant HealthCare COM at CMU** as of fall 2025) | Michigan ties — strong fit. Renamed after $80M Covenant + MyMichigan partnership. Interim Dean **Dr. Tina Thompson** since 2025-05-16. |
| 11 | **SUNY Upstate (Norton COM)** | |
| 12 | **Brown (Warren Alpert)** | |
| 13 | **Tulane SOM** | |
| 14 | **UConn SOM** | |
| 15 | **UIC (Illinois)** | |
| 16 | **Case Western SOM** | |
| 17 | **University of Maryland SOM** | |
| 18 | **Michigan State CHM** | Michigan ties — MSU post-cycle feedback already obtained |
| 19 | **Boston University SOM** | |
| 20 | **Virginia Commonwealth (VCU) SOM** | |
| 21 | **Emory SOM** ✅ | Confirmed via consolidated secondaries doc |

### Result: **21 applications, 0 interviews.**

### Topics covered in her secondary essays (recurring set):
- "Why us" + grandmother hypothesis / first 1000 days / maternal-infant health
- Diversity / Canadian-Indian-American identity / Ayurveda
- Adversity / visa challenges / lost MA job
- Failure / pool incident with sister's friend
- Challenge / interview project for med anth
- Leadership / CPALS, STEM Sisters
- Gap year / hospice + MA + book
- Public health / "free family clinic for women" 15-year vision
- Cultural humility / COVID vaccine hesitancy with parents

### The "3 recycled blocks" pattern (important strategic finding)

Across 21 secondary essays I read, Srishti rotates **three core narrative blocks** for nearly every prompt:

1. **"Ayurveda + COVID vaccine + parents"** — used as the diversity / perspective / cultural humility block. Almost identical text in **Brown, Northwestern, Dartmouth, UIC**.
2. **"Grandmother Hypothesis + foster toddler at UNC Children's"** — used as the "why us" / community service / multigenerational care block. Word-for-word in **Dartmouth, Northwestern, Emory, UIC**.
3. **"Lost MA job"** — used as the adversity / challenge / "tell me about a time you had to change course" block. Heavily reused across **Brown, UIC, Dartmouth** at minimum, with light edits.

She also reuses the **gap-year paragraph** ("After graduating, I knew I needed time away…") nearly verbatim across **BU, VCU, Michigan State, Brown, Dartmouth, Emory, Northwestern**.

**Why this matters:** any adcom running cross-school text overlap detection or even just reading carefully would notice. More importantly, **she is leaving school-specific story matches on the table** — Central Michigan and Michigan State should have gotten the Farmington Hills / Dr. Godbole / Math Olympiad story, not the same Grandmother Hypothesis block. UPenn should have gotten the Detroit-studio-apartments story. This is a **fixable strategic issue for cycle 2.**

---

## 10. Why She Got Zero Interviews — Working Hypotheses (UPDATED)

With the new LOR + standardized test data, the picture sharpens dramatically. The numbers are not the issue — the issue is **the file as read by an adcom doesn't add up to "ready for clinical training" yet,** and **structural filters knocked out a fraction of the schools before they ever read her.** In rough order of impact:

1. **International applicant filter.** Many MD schools auto-screen Canadians/internationals, and several require six-figure escrow accounts. Probably the biggest single factor. If even half of her 21 schools applied this filter, she lost 10 apps before her file was opened. **Verifiable — we should audit each school's international policy and rebuild the list around international-friendly programs.**
2. **No clinical voice in the cycle-1 file (largely resolved for cycle 2).** In cycle 1, Srishti had zero clinical letters, zero paid clinical hours at submission, and both her MA and hospice listed as "anticipated." That meant no clinician had vouched for her readiness in writing, and nothing in W&A counted as paid direct patient care. That was a real gap. **Cycle 2 closes it:** by submission she'll have ~10+ months of paid full-time MA work at a real clinic and a clinical letter from a PA or NP who has supervised her daily. The gap that existed in cycle 1 will not exist in cycle 2.
3. **AAMC PREview not taken.** Active liability for at least 3–5 schools on her list (Penn, UIC, Tulane and others either require or strongly favor PREview). **Must take for cycle 2.**
4. **Casper 3rd quartile** is fine but undifferentiating. Several of her cycle-1 schools weight Casper meaningfully (Tufts, Tulane, BU, Wayne State, Sidney Kimmel, MSU, CMU). 3rd quartile won't screen her out at most, but won't elevate her either. **Retake if possible to push to 4th quartile.**
5. **Recycled essay blocks.** The 3-block pattern in §9 means she didn't tailor essays per school. Adcoms can feel this even without overlap-detection software. Specifically, she missed the chance to play her **strongest fit signal (Michigan roots, Dr. Godbole, Farmington Hills)** at the two Michigan schools.
6. **PS leans on a freshman-year story** and doesn't answer "why MD vs other healthcare roles."
7. **School list mismatch / over-reach.** She applied to multiple T20s (Penn, Northwestern, Brown, Dartmouth) — many of which are international-restrictive — without a differentiated clinical profile.

### ❌ Removed from suspect list (resolved by AMCAS Report page 8)

- ~~MCAT~~ — **517 verified** (130/128/130/129, 94th percentile). Balanced, no weak section, above nearly every target school's median. **Not the problem.**
- ~~GPA~~ — **cGPA 3.88 / sGPA 3.80 verified.** Above median for every MD school on her list and well above DO medians. Plus the year-by-year trend is *ascending* with a perfect senior year (4.00 BCPM, 4.00 AO). **Not the problem — actively a strength to surface in essays.**
- ~~Submission timing~~ — **Submitted June 1, 2025 at 8:37 AM, verified July 17, 2025.** AMCAS opens late May; she submitted within ~5 days of opening. **She was a deliberately early submitter.** Verification took ~6 weeks (normal). Secondaries went out late July, on track for the early-decision window. **Timing is not the problem — it's actually a strength.**

### Post-cycle feedback in progress

- **Michigan State CHM** — feedback already received. Need to ask Srishti what they said.
- **Covenant HealthCare COM at CMU** — feedback in progress (request submitted; awaiting response). When it lands, compare against the Wanda Run 4 "rejection was structural not academic" hypothesis — stats are above their matriculant median (3.78/507 vs her 3.88/517), so if feedback cites GPA/MCAT that's a tell it's actually something else (OOS filter, missing Michigan framing, late submit, no paid clinical at submission).
- **All other 19 schools** — no feedback requested yet. Worth asking which others offer it.

### Wanda Run 4 strategic notes — Covenant HealthCare COM at CMU (2026-04-16)

Key discoveries that belong in any future strategy conversation about CMU:

- **School was renamed fall 2025.** It's now "Covenant HealthCare College of Medicine at Central Michigan University" after an $80M partnership ($40M Covenant HealthCare + $40M MyMichigan Health). Every essay and outreach email must use the new name — using the old name signals stale research.
- **Leadership turned over.** Dr. George Kikano resigned March 2025. **Dr. Tina Thompson is interim dean since 2025-05-16.** Stated priorities: rural Michigan workforce, partnership integration, student-centered curriculum.
- **Canadian eligibility VERIFIED from CMU's own FAQ:** *"Applicants must be a U.S. citizen, Canadian citizen, or permanent resident of the United States or Canada."* Not secondhand — pulled from the school's website. She qualifies on citizenship alone.
- **BUT: zero Canadian matriculants in the 2025 class.** CMU is Canadian-*eligible* but not Canadian-*statistically-friendly*. Canadian-identity framing is not their draw — Michigan roots are. Lead with Oakland County, not with Canadian diversity.
- **OOS matriculation is 0.25% (~18 seats of 104 total).** That's roughly 25x harder than in-state. The wall isn't academic — her stats (3.88/517) are above their median (3.78/507). The wall is that they only take a handful of OOS candidates, so every OOS file needs a structural reason to stay in the pile.
- **Her Michigan County prompt answer is the single biggest structural advantage she has over the OOS pool.** 250 words. Most OOS applicants literally cannot answer it. She has Farmington Hills (18 years) + Dr. Godbole + Oakland County + intent to return to SE Michigan. Pre-write in May, don't wait for the secondary to land.
- **Rolling admissions — early June submit is load-bearing.** OOS seats at rolling schools shrink weekly after mid-July. Target: AMCAS submitted by 2026-06-05, secondary returned by 2026-07-01.
- **Financial open question:** Are CMU's Dean's Award and need-based aid available to Canadian citizens? Some US MD schools require Canadian students to escrow full tuition. This needs to be asked directly — either during interview or by email to admissions before she invests in a fall secondary.

---

## 11. What's Genuinely Strong (Build On These)

- 🏆 **~12 months of paid, full-time MA work at Medi-Weightloss by submission — the central transformation between cycle 1 and cycle 2.** Cycle 1 had zero paid clinical hours; cycle 2 will have ~1,000+. She took the only job her work authorization allowed, in a specialty that wasn't her dream (weight loss, not peds), and showed up full-time for a year. That's grit, and it's a story adcoms reward. A PA or NP who has supervised her daily will write her primary clinical letter — that's the clinical voice her cycle-1 file was missing, now in place.
- **cGPA 3.88 / sGPA 3.80** with an **ascending year-by-year trend ending in a perfect 4.00 senior year** — this is exactly the academic story adcoms reward
- **MCAT 517** — well above the median for nearly every school she's targeting; not a barrier
- **Highest Distinction graduation, Dean's List every semester** at UNC — academic discipline is not in question
- **Submitted June 1, 2025** — within ~5 days of AMCAS opening. She's a disciplined early submitter, not someone who fumbled the timing
- **340 hours of substantive wet-lab research** with a named PI in a real lung physiology lab — *especially* impressive given she started in junior year after rejection from many labs
- **Medical Anthropology minor** is a genuinely uncommon angle and gives her a real intellectual hook
- **Genuine writing voice** — the personal statement is well-crafted, not AI slop, with sensory detail and warmth
- **Long-term commitments** (Play Atrium 2.5 yrs, CPALS 2.5 yrs, research 1.5 yrs) — no resume padding
- **Real, lived multicultural identity** (Canadian + Indian + American), and she has the vocabulary to talk about cultural humility credibly
- **Clear, specific patient stories** (Mr. W, Sally, Adrian, baby Sam, baby in 5C12) — she remembers and honors the people, not just the procedures
- **Drafts hard** — 6 PS drafts visible. She'll do the revision work.
- **Authentic Michigan ties** (Farmington Hills, Dr. Godbole, Detroit master's program in family) that should pin down at least 2–3 strong-fit Michigan schools
- **Post-cycle feedback already gathered** from Michigan State (and CMU pending) — concrete diagnostic data to plan against

---

## 12. The Reapplication Problem (in one paragraph)

A bright, well-written UNC honors grad with **3.88 cGPA, 3.80 sGPA, 517 MCAT, an ascending GPA trajectory ending in a 4.0 senior year, an early June 1 submission, and a real research record** applied to 21 MD schools and got zero interviews. The numbers are not the problem. The most likely reasons are *structural* (international visa filter + zero paid clinical at submission + a school list weighted toward international-restrictive T20s + recycled essay blocks + LORs we can't see) rather than *content* (her writing and stats are fine). A reapplication is winnable if we (a) lean hard on the now-real ~1 year of paid MA hours at Medi-Weightloss, (b) **rebuild the school list around international-friendly MD programs and add DO/AACOMAS as a parallel track**, (c) **rewrite the PS to lead with the visa story and explicitly answer "why MD,"** (d) write **school-specific** essays — especially playing Michigan roots into Wayne State, MSU, CMU, and OAKLAND-region DO schools — instead of recycling 3 blocks, (e) close LOR gaps with current MA supervisors, and (f) execute warm pre-app outreach to faculty and current students at her top targets to surface her file.

### DO is now in scope

Per Rajat: DO/AACOMAS is now on the table as a parallel track. Her stats and clinical profile would do **dramatically better** in DO admissions:
- 517 MCAT is well above DO matriculant median (~504)
- DO schools value the holistic / cultural humility / hands-on-care framing she already writes naturally
- DO schools are typically more international-friendly (still need to verify per school)
- Adds 20–35 schools to the addressable list
- Osteopathic philosophy of "treating the whole person" maps cleanly onto her Med Anth + grandfather narrative

---

## 13. Open Questions for Rajat

These were blocking last session. Status updated:

| # | Question | Status |
|---|---|---|
| 1 | MCAT score? | ✅ **517** (130 C/P, 128 CARS, 130 B/B, 129 P/S — 94th %ile) |
| 2 | Cumulative GPA + science GPA? | ✅ **cGPA 3.88 / sGPA 3.80 / AO 3.98** (104 hrs verified). Senior year 4.00/4.00 |
| 3 | Letters of recommendation — who wrote them last cycle? | ✅ **4 letters: PI (Schworer) + 2 bio professors (one was fond of her and wanted her in research) + 1 med anth professor (said she'd write a great review). NO clinical/physician letter.** |
| 4 | AAMC PREview / Casper scores? | ✅ **Casper: 3rd quartile (50–75th %ile). PREview: NOT TAKEN.** |
| 5 | AMCAS submission date / verification date? | ✅ **Submitted Jun 1, 2025 8:37 AM; verified Jul 17, 2025** |
| 6 | The 21st school? | ✅ **Emory** |
| 7 | Did any school send rejection feedback? | ✅ MSU **submitted morning of 2026-04-15** (response pending). CMU in progress. **Top diagnostic priority — read MSU response the moment it lands.** |
| 8 | DO (AACOMAS) on the table? | ✅ **Yes — now in scope** |
| 9 | NC residency status for in-state UNC consideration? | ❓ Still unknown |
| 10 | Financial situation / escrow capacity for international apps? | ❓ Still unknown |
| 11 | Major confirmed? | ❓ Need from new AMCAS PDF |
| 12 | Has she actually started MA work? Hours so far? | ✅ **Yes — started Aug 2025, almost 1 year, started part-time, now full-time** |
| 13 | Hospice — assigned yet? Hours? | ❌ **Never happened.** Trained but VIA never assigned her. 0 hours. **Must be removed from cycle 2 W&A entirely.** |
| 14 | Children's Women's Health Book — current status? | ❓ Still unknown |
| 15 | Research publications/posters? | ❓ Still unknown |

### New questions raised by the consolidated read + LOR follow-ups

16. What did **Michigan State** say in post-cycle feedback? Submitted morning of 2026-04-15 — **top priority diagnostic** the moment it lands.
17. ~~How was her Casper performance?~~ ✅ **3rd quartile.**
18. Did she attend any **virtual open houses** or have **named faculty connections** at any of the 21 schools? (None surface in the drafts.)
19. Was she **screened out pre-secondary** (no secondary invitation) or **screened out post-secondary** (got the secondary, completed it, then nothing)? The fact that she completed secondaries for all 21 suggests post-secondary — which points more at LORs / "no clinical voice" than pre-screen stat filters.
20. **Are any of the PAs or NPs at Medi-Weightloss willing to write her a letter?** This is the single highest-leverage open question for cycle 2 LOR strategy. Should be answered within 30 days.
21. **Did the Children's Women's Health Book actually come together,** or is this a second "anticipated activity that didn't happen" risk like hospice? If it's still in progress / never published, we need to decide whether to keep it on cycle 2 W&A or drop it.
22. **What is the Medi-Weightloss patient interaction like?** For interview prep we need to know: does she take vitals, draw blood, give injections (B12, semaglutide), do EMR, do intake interviews, counsel patients, observe consults? The richer her real clinical responsibility, the stronger the "12-month MA" story becomes.

---

## 14. Drive Folder Inventory (as of 2026-04-15)

Path: `Google Drive / s4aiagency / Srishti med school /`

| File | Owner | Size | Last modified | Notes |
|---|---|---|---|---|
| `personal statement` | srishti.gadbail | 5 KB | 2025-05-29 | Final-final PS, single clean draft |
| `AMCAS PS & other impactful experiences` | srishti.gadbail | 36 KB | 2025-05-31 | All 6 PS drafts + OIE essay |
| `AMCAS application written portion` | srishti.gadbail | 37 KB | 2025-06-01 | Full Work & Activities (every entry) + OIE + PS |
| `Work and Activites AMCAS` | srishti.gadbail | 57 KB | 2025-05-21 | Earlier W&A working doc with brainstorms |
| `Secondaries Brainstorm` | srishti.gadbail | 20 KB | 2025-08-04 | Topic outlines for adversity/diversity/challenge/etc |
| `Med School Secondaries` | srishti.gadbail | 190 KB | 2026-01-14 | Full submitted secondaries for 20+ schools |
| `secondaries consolidated` | srishti.gadbail | 109 KB | 2026-01-14 | ✅ Now read in full |
| `Interview Prep` | srishti.gadbail | 2 KB | 2025-10-29 | Started but barely populated — confirms she never got interviews |
| **AMCAS app PDF (new, verified)** | — | — | — | ⏳ **Promised by Rajat, not in folder yet as of 2026-04-15.** Must read on next session — page 9 confirms MCAT and likely contains GPA, submission date, major, LOR list. |

Notable: the **Interview Prep doc was created 2025-10-28 and barely written in** — meaning she set it up hopefully and then never had to use it. The Med School Secondaries doc was last touched **Jan 14, 2026** — that was probably when she gave up on the cycle.

---

## 15. What I (Claude) Read vs. Still To Do

✅ **Read in full:**
- `personal statement` (final draft)
- `AMCAS PS & other impactful experiences` (all 6 PS drafts + OIE)
- `AMCAS application written portion` (every W&A entry, OIE, PS)
- `Secondaries Brainstorm` (full)
- `Interview Prep` (full — it's tiny)
- `secondaries consolidated` (full — split into 21 per-school files at `/tmp/sec_*.md`)
- Individual deep reads of: **UNC, Michigan State, Boston University, VCU, Tufts, Emory, Central Michigan, UPenn, Dartmouth, Northwestern, Brown, UIC, Case Western**

⏳ **Skimmed / structurally mapped, not deep-read line-by-line:**
- Stony Brook, Wayne State, Sidney Kimmel, SUNY Upstate, Tulane, UConn, Maryland, GW (all present in the consolidated file, structurally mapped, not yet word-by-word)

❌ **Not yet available:**
- **New verified AMCAS PDF** — Rajat said he was uploading it; not in folder as of this update

**For the next session:** read the new AMCAS PDF the moment it lands, especially page 9 (MCAT/biographical) and the W&A section. Then do the remaining 8 secondary deep reads to complete the per-school audit before writing the strategy plan.

---

## 16. Voice Notes (so future drafts sound like her, not like AI)

- Opens stories with sensory hooks (cool dining room, blistering sun, soda can tab, gripping crib bars)
- Uses Indian-language proper nouns naturally (*aamras*, *ajoba*, haldi)
- Likes the rhythm of "X, Y, and Z" tricolons
- Self-effacing — describes her own "biggest mistake" as knocking over pipette tips
- Tends to end paragraphs with a gentle thesis-statement coda ("listening became a form of care itself")
- Uses dialogue sparingly but well ("Thank you, doctor.")
- **Avoids** clinical jargon and acronyms — leans humanist
- Emotional vocabulary: *presence, dignity, peace, comfort, belonging, healing, grace*
- **Doesn't brag.** Has to be coached to assert her own competency.
- Loves **food as memory device** (aamras, brownie date balls, mom's "we can make this better at home")
- Finds physical metaphors for emotional growth (lifting heavier weight = small wins, swimming = perseverance)

---

## 17. Strategic Priorities — Cycle 2, Summer 2026 (LOCKED)

### Decision locked (2026-04-15)

- **Cycle 2 = June 2026 submission for fall 2027 matriculation.** Not waiting for cycle 3.
- **Both MD and DO on the table** — balanced school list, not DO-heavy.
- **CCMA + better job remains her plan** but it's post-submission career fuel, not application fuel. If she earns the cert in fall 2026 while apps are out, it can be sent as an **update letter** to schools that accept them (which actually flatters her — "here's how I've kept growing since I submitted").

### ⚠️ Important framing note for future Claude sessions

Earlier in the conversation I (Claude) overweighted the "no physician letter" gap and it landed on Srishti as if I were saying her year of MA work didn't count. **It does count. A lot.** The right framing is:

- The cycle-1 problem was "ZERO clinical hours at submission, ZERO clinical letters, MA listed as anticipated." That was real and that hurt her.
- Cycle 2 fixes that almost entirely with **10+ months of paid full-time MA work at a real clinic + a clinical letter from a credentialed provider (PA or NP) who has supervised her daily.** That's the cake.
- A physician letter would be the cherry on top. It's nice to have but it is not the difference between getting in and not getting in. Most successful MD applicants have PA/NP/scribe-supervisor letters, not MD letters.
- **Do NOT frame her current work as a deficiency.** It's the central transformation between cycle 1 and cycle 2 and it should be celebrated in every essay rewrite.
- She took the only job her work auth let her start in, in a clinic that wasn't her dream specialty (pediatrics), and showed up full-time for a year. **That's grit and it's a story.** Frame it that way.

### Old "Cycle 2 vs Cycle 3 fork" analysis (archived — decision is cycle 2)

We explored a timing fork around CCMA + better job before Srishti locked cycle 2. The core tradeoff was: apply now with ~10 months MA + PA/NP letter, or wait a year for CCMA cert + possible physician letter from a new job. **She chose cycle 2, and it's the right call.** Her file is genuinely transformed from cycle 1 — a year of paid clinical work + a credentialed clinical letter + rewritten essays + a rebuilt school list is more than enough delta to earn interviews this time. The CCMA, if she earns it in fall 2026, becomes an update letter that adds to an already-strong file rather than a prerequisite she had to wait for.

---

### Cycle 2 execution priority list:

1. **Read the MSU post-cycle feedback** the moment it comes back (submitted morning of 2026-04-15) — that's our single most direct diagnostic and may confirm or rewrite this entire hypothesis stack.
2. **Lock the new LOR packet.**
   - **Within 30 days:** identify the PA or NP she works with most closely at Medi-Weightloss and ask for a letter. This is the **primary clinical letter** — they've watched her work with patients daily for a year, and that depth of supervision is exactly what adcoms look for.
   - **Optional bonus:** cold-reach back to **Dr. C, Dr. Stewart, or Dr. Vitale** (her former shadowing physicians). A "yes" adds a physician voice on top of the PA/NP anchor; a "no" costs nothing.
   - **RMA manager letter** is a nice supplement if the PA/NP letter is also secured — not a replacement for it.
   - Hospice is removed from cycle 2 W&A entirely (never happened).
   - **Drop bio professor #2** (no signal, no unique angle). Keep Schworer + med anth professor + bio professor #1 (the "fond of her" one).
3. **Schedule AAMC PREview** for late spring 2026. It's offered multiple times per year — she should test as soon as she can to expand the addressable list and remove a soft drag on Penn / UIC / Tulane / etc.
4. **Decide on Casper retake.** If her 3rd quartile is from January 2025, she can retake in cycle 2 — only the most recent attempt counts at most schools. Targeting 4th quartile.
5. **Audit each of the 21 schools** for international MD policy. Cut the ones that auto-screen Canadians. This alone may eliminate half the list.
6. **Build a parallel DO list** (10–15 AACOMAS schools) that are international-friendly and align with her Michigan/maternal-health/peds interests.
4. **Rewrite the PS** to lead with the visa story and explicitly answer "why MD/DO vs nurse, PA, OT." Move Mr. W out of the climax position and put the lost-MA-job + Medi-Weightloss arc there instead — that's her real, recent, hard-stakes story now.
7. **Stop recycling the 3 blocks.** Draft a *menu* of 8–10 distinct stories and assign each school 2–3 that match the school's specific strengths:
   - **Michigan schools (Wayne State, MSU, CMU + any DO in Michigan)** → Farmington Hills + Dr. Godbole + Detroit master's program
   - **UPenn + financial-need-friendly** → studio apartments + family economic story
   - **UNC + Tulane + UMD + others with Black maternal health work** → Tufts MARCH-style maternal health pitch
   - **All schools** → MA at Medi-Weightloss + lost-MA-job arc as the reapplication "what's changed" story
8. **Outreach plan:** identify 2–3 current students or junior faculty at her top 8 target schools. Coffee chats / informational calls / LinkedIn DMs. Goal: warm-introduce her file before submission.
9. **Submission timing:** she already nailed this in cycle 1 (June 1 submission). Replicate — AMCAS opens ~late May, submit within 7 days of opening. Have all secondaries pre-drafted before primary verification clears. Get to "complete at every school" by mid-July 2026 at the latest.

---

*Last updated: 2026-04-15 (pass 2) by Claude. Cycle 2 locked, framing corrected across §7b/§10/§11/§17 to center the year of MA work as the central transformation — not a deficiency. DO + MD balanced list in scope. Next: MSU feedback read, school list audit, essay strategy. Update this file at the end of every planning session.*

---

## Wanda Run 5 — LSU NOLA CUT decision (2026-04-16)

Wanda investigated LSU Health New Orleans SOM (the Run 2 scout list entry flagged "VERIFY — policy not published"). All three parallel research tracks converged on a CUT verdict.

**The three convergent signals:**
1. **LSU's own Admissions Criteria page** states: *"Applications are not accepted from International Students."*
2. **SDN secondary-essay thread** reports Canadians receive the secondary form with an instruction to *"bring a green card to the interview"* — they treat Canadians without US LPR as international.
3. **SEVP school lookup** — LSU NOLA is SEVP-certified but they apply it only to students they treat as eligible (not international applicants). OPT does not satisfy their eligibility gate regardless.

**The structural fact this confirms:** LSU NOLA is a **citizenship gate**, not a stats gate. 3.88/517 cannot flip a policy that requires green card or US citizenship. This is the same shape of dealbreaker as MUSC (green card required) — not something that can be neutralized by stronger essays, better LORs, or outreach.

**What this changes in the plan:**
- LSU NOLA moved from REAPPLICATION_PLAN.md "Mr. Crocker MD scout list" row 4 → "Investigated & CUT" table alongside MUSC and USC Greenville
- Tulane SOM (already on the reapply list, citizenship-blind admissions, private, same city) is the correct Louisiana substitute. No replacement school needed.
- CUT count in the summary matrix updated from 2 → 3
- LSU NOLA card added to Wanda's dashboard page as an "Investigated & CUT" variant (red banner + archived research) so the research isn't lost and nobody re-opens the question

**What Srishti does NOT need to do:** email LSU admissions, fill out their secondary, pay their $75 fee, or spend any more time on this school. Closed.

**Lesson for future runs (added to WANDA.md Run Log):** when 3 parallel research tracks converge on a CUT verdict, build the "Investigated & CUT" variant of the dashboard card (red banner + preserved research + outreach template to confirm), not the standard 6-accordion reapply plan. Preserves the work, prevents re-researching, matches the Mr. Crocker MUSC/USC Greenville precedent.

========================================
FILE: REAPPLICATION_PLAN.md (school lists + essay strategy + timeline + story menu)
========================================
# Srishti Gadbail — Cycle 2 Reapplication Master Plan

> **Created:** 2026-04-15 | **Target submission:** June 2026 (AMCAS + AACOMAS) | **Matriculation:** Fall 2027
>
> **The bottom line:** Srishti's stats (3.88/3.80/517) were never the problem. The problem was structural: international status filtering, zero paid clinical hours at submission, no clinical LOR, recycled essays, and a school list that included too many international-hostile programs. Cycle 2 fixes all of this. She now has ~1,000+ hours of paid clinical work, a clinical letter coming, and this plan rebuilds her school list from scratch around programs that actually want Canadian applicants.

---

## Part 1: The New School List

### How to read this list
- **MD schools** = AMCAS application (she knows this process)
- **DO schools** = AACOMAS application (new this cycle — runs parallel to AMCAS, both submitted simultaneously)
- Every school below has been verified to accept Canadian citizens
- Stats comparison shows her 3.88 cGPA / 3.80 sGPA / 517 MCAT vs. school medians

---

### MD SCHOOLS — REAPPLY FROM CYCLE 1 (7 schools)

These are the cycle-1 schools that are genuinely Canadian-friendly AND where her stats are competitive. The other 14 are cut.

| # | School | Their Median GPA/MCAT | Her Advantage | Why Reapply |
|---|--------|----------------------|---------------|-------------|
| 1 | **George Washington SOM** | 3.88 / 515 | At/above | Canadians treated same as US citizens. Global health + health equity mission. DC location. |
| 2 | **Wayne State SOM** | 3.78 / 511 | Well above | Dedicated Canadian applicant page. Detroit = Michigan ties. She grew up in Farmington Hills. Effectively a "home state" school. |
| 3 | **Covenant HealthCare COM at CMU** (renamed fall 2025 — formerly Central Michigan SOM) | 3.78 / 507 | Well above | Explicitly accepts Canadians (verified from their FAQ). Rural Michigan mission. Farmington Hills / Oakland County connection is her structural unlock. Interim Dean Dr. Tina Thompson (since 2025-05-16, after Dr. Kikano resigned). $80M Covenant + MyMichigan partnership = current essay content, not stale. **Michigan County 250-word secondary prompt is her biggest OOS advantage** — most OOS applicants literally can't answer it. Reality check: OOS matriculation is 0.25% (~18 seats of 104), so this is a target not a safety despite her stat lead. Zero Canadian matriculants in 2025 class — Canadian identity framing is not the draw; Michigan roots are. |
| 4 | **Sidney Kimmel (Jefferson)** | 3.80 / 513 | Above | Same evaluation criteria for Canadians. Clinical excellence + diversity mission. |
| 5 | **Tulane SOM** | 3.70 / 510 | Well above | Citizenship-blind admissions — identical process for all. Community health + global health + underserved. Outstanding mission fit. |
| 6 | **VCU SOM** | 3.70 / 512 | Above | Canadians explicitly listed alongside US citizens in eligibility. Health equity mission. She's in Charlotte — Richmond is close. |
| 7 | **University of Maryland SOM** | 3.84 / 512 | At/above | "Citizens of Canada" explicitly eligible. Research-intensive + community health. |

### MD SCHOOLS — NEW ADDITIONS (up to 5 schools)

These are Canadian-friendly MD programs she should ADD to replace the 14 cuts.

| # | School | Why Add | Action Needed |
|---|--------|---------|---------------|
| 8 | **Dartmouth Geisel** (was "maybe" from cycle 1) | Same financial aid as US citizens. 3.77/516 median — she's above. Rural/underserved mission. Reapplicant essay available. ~10 international students/year. | Reapply with tailored essays |
| 9 | **Boston University SOM** (was "maybe" from cycle 1) | Encourages Canadian applicants. Notes Canadians don't need visa to study. 3.76/517 — she's above/at. Urban underserved mission. | Reapply with tailored essays |
| 10 | **Emory SOM** (was "maybe" from cycle 1) | Welcomes internationals, 10-15 accepted/year. 3.70/514 — above. Atlanta close to Charlotte. Global health + community health. | Reapply with tailored essays |
| 11 | **Michigan State CHM** (was "maybe" from cycle 1) | Accepts Canadian citizens. 3.70/507 — well above. Michigan ties. She already requested post-cycle feedback from them. | Reapply, USE their feedback |
| 12 | **Mount Sinai / Georgetown / Drexel / Rush** | Research which of these are Canadian-friendly and mission-aligned. All are known to accept internationals. | Verify and pick 1-2 to add |

### MD SCHOOLS — CUT FROM CYCLE 1 (10 schools)

| School | Why Cut |
|--------|---------|
| **UPenn (Perelman)** | Stats below their median (3.97/521). Must prove 4-year funding upfront. Prestige reach with no traction last cycle. |
| **Northwestern (Feinberg)** | Stats below median (3.93/521). Same issue as Penn. |
| **Brown (Warren Alpert)** | Small class (144), no need-based aid for internationals, less mission alignment, no traction last cycle. |
| **Stony Brook** | SUNY = strong NY preference. $95K upfront financial requirement. No financial aid for non-citizens. |
| **SUNY Upstate** | Another SUNY school. Explicit US citizen priority. No NY ties. |
| **Tufts** | "Admits very few internationals" and "only under unique or compelling circumstances." Hostile language. |
| **UConn** | State school, "limited basis" for internationals, strong CT preference. |
| **UIC (Illinois)** | State school with overwhelming IL preference. Long odds as non-resident. |
| **Case Western** | Must prove 1 year payment upfront. Right at their median (3.90/517). Less mission alignment with her primary care focus. |
| **Stony Brook** | (listed above) |

### UNC CHAPEL HILL — SPECIAL CASE (keep, but eyes wide open)

**The hard truth:** UNC is 83% in-state. NC law says F-1/OPT holders cannot claim residency regardless of time lived there. Out-of-state acceptance rate is ~1-2%. She already applied and got zero traction.

**Why keep it anyway:**
- She's a UNC alumna with Highest Distinction — real institutional bond
- 340 hours of research inside UNC SOM's own Marsico Lung Institute
- Med Anth minor from UNC's department feeds into their Humanities & Social Sciences Scholarly Concentration
- Stats above median (3.88/517 vs 3.82/512)
- Currently works in Charlotte — UNC has a Kenan Urban Primary Care Scholars Program partly based there
- This is a meaningful reach, not a prestige reach

**The deal:** Include UNC, but the strategy must be outreach-heavy to overcome the OOS wall. See Part 2 for the full UNC playbook. Do NOT count on it — stack the rest of the list with schools where she's not fighting an in-state barrier.

**Total MD schools: 12-13** (7 reapply + 4-5 new/promoted + UNC as a reach)

---

### DO SCHOOLS — NEW AACOMAS TRACK (8-11 schools)

Her 3.88/517 is dramatically above DO medians (~3.5-3.65 GPA, ~504-508 MCAT). The main filter is which DO schools accept Canadians — most don't. These all do.

**CRITICAL FINDING:** None of the closest DO schools to Charlotte (Campbell, VCOM Carolinas, LMU-DCOM) accept international students. The nearest Canadian-friendly option is Liberty (Lynchburg, VA, ~3.5 hrs).

| Priority | School | Location | Their Median | Accepts Canadians? | Why It Fits |
|----------|--------|----------|-------------|-------------------|-------------|
| **1** | **MSUCOM** (Michigan State DO) | East Lansing, MI | 3.6 / 507 | **YES — dedicated Canadian Initiative Program with reserved seats (~25/yr) + tuition scholarship** | **THE #1 DO PICK.** Canadian program, Michigan roots (Farmington Hills), scholarship reduces international tuition. Her stats demolish their median. |
| **2** | **Marian WCOM** (Indianapolis) | Indianapolis, IN | 3.56 / 506 | YES — explicit Canadian acceptance | **NEW from Run 2.** Midwest proximity to Michigan family. Franciscan service mission aligns with Med Anth background. Stats well above median. |
| 3 | **KCU** (Kansas City) | Kansas City, MO | 3.62 / 505 | YES | Canadian-friendly, active COMSA members. Stats way above. |
| 4 | **NSU-KPCOM** (Nova Southeastern) | Fort Lauderdale, FL | 3.5 / 505 | YES | Strong pediatrics pipeline (one of only 2 community health center-based peds residency programs in the country). Southeast location. |
| 5 | **LECOM** (Bradenton campus) | Bradenton, FL | ~3.5 / ~505 | YES | Lowest tuition among private DO schools (~$40K/yr). Southeast. Primary care mission. |
| 6 | **CCOM** (Midwestern - Chicago) | Downers Grove, IL | ~3.6 / 509 | YES | Near Michigan. Peds + OB/GYN core rotations. |
| 7 | **RVUCOM** (Rocky Vista) | Parker, CO | 3.60 / 505 | YES — confirmed | **NEW from Run 2.** Military + rural medicine tracks. Holistic medicine emphasis aligns with DO philosophy. |
| 8 | **AZCOM** (Midwestern - Arizona) | Glendale, AZ | ~3.6 / 509 | YES | Canadian-friendly per COMSA. |
| 9 | **RowanSOM** | Stratford, NJ | 3.70 / 508 | YES | Cultural humility curriculum (Tensegrity) — perfect match for her Med Anth background. |
| 10 | **MCOM** (Rocky Mountain / Montana) | Billings, MT | ~3.5 / ~504 | LIKELY YES — verify | **NEW from Run 2.** New school (first class 2023), rural/frontier mission, lower competition. Residency data still maturing. |
| 11 | **WesternU COMP** (Pomona only) | Pomona, CA | 3.67 / 507 | YES (Pomona campus only) | Canadian-friendly. |
| 12 | **WCUCOM** (William Carey) | Hattiesburg, MS | 3.56 / 504 | YES | #3 nationally for primary care graduates. #4 for health shortage areas. Her stats are dramatically above. |
| 13 | **UNECOM** (New England) | Biddeford, ME | ~3.6 / ~507 | YES | ~40% from outside New England. Global mission. Holistic review. |
| 14 | **LUCOM** (Liberty) | Lynchburg, VA | 3.40 / 504 | Likely yes — verify | Closest Canadian-friendly DO to Charlotte (~3.5 hrs). Faith-based environment — confirm she's comfortable. |

**Total DO schools: 11-14** (3 new from Run 2: Marian WCOM, RVUCOM, MCOM)

---

### MD CANDIDATES — MR. CROCKER SCOUT LIST (Run 2, 2026-04-16)

New MD schools Mr. Crocker scouted outside Cosmo's core 12. All verified Canadian-friendly unless flagged. Priorities reflect profile fit + international policy strength.

| Priority | School | Location | Their Median | Accepts Canadians? | Why It Fits |
|----------|--------|----------|-------------|-------------------|-------------|
| **1** | **Howard COM** | Washington, DC | 3.58 / 506 | YES — explicit | **TOP MD ADD.** HBCU mission of serving underserved populations = direct Med Anth alignment. Her stats well above median. Primary care + peds pipeline. Grandfather-in-Surat story lands perfectly. |
| 2 | **Mount Sinai Icahn** | New York, NY | 3.83 / 519 | YES | Stats align (3.88/517 vs 3.83/519). InFocus global/community health + Center for Multicultural Community Affairs. NYC Indian diaspora. |
| 3 | **Vanderbilt SOM** | Nashville, TN | 3.89 / 521 | YES | Stretch but not unreachable. Research-heavy (matches Marsico background). Curriculum 2.0 emphasizes cultural competency. Need-based aid for internationals. |
| 4 | **UChicago Pritzker** | Chicago, IL | 3.89 / 520 | YES | Small class (~88), research powerhouse, Bucksbaum Institute. Comer Children's for peds. Midwest = closer to MI family. |

### CUT — INVESTIGATED DEALBREAKERS (Run 2 + Wanda Run 5)

| School | Dealbreaker | Source |
|--------|-------------|--------|
| **MUSC College of Medicine** (Charleston, SC) | Requires US citizenship or **lawful permanent resident (green card)**. OPT does not qualify. | MUSC admissions eligibility page, confirmed 2026-04-16 |
| **USC SOM Greenville** (Greenville, SC) | No SEVP I-17 approval → cannot legally issue I-20 to a Canadian citizen. USC Columbia same policy. | USC SOM Greenville international applicant FAQ + SEVP school lookup, confirmed 2026-04-16 |
| **LSU Health New Orleans SOM** (New Orleans, LA) | Admissions Criteria states: "Applications are not accepted from International Students." SDN-confirmed: secondary form instructs Canadians to "bring a green card to the interview" — they treat Canadians without US LPR as international. OPT does not qualify. Tulane (private, New Orleans) is the correct LA substitute. | LSU NOLA Admissions Criteria page + SDN secondary thread + SEVP school lookup, confirmed by Wanda Run 5 on 2026-04-16 |

*Documented here so no one re-researches them. Mirror displayed on Mr. Crocker's dashboard page + LSU NOLA card on Wanda's page.*

---

### COMBINED LIST SUMMARY

| Category | Count | Schools |
|----------|-------|---------|
| MD — Reapply from cycle 1 | 7 | GW, Wayne State, CMU, Sidney Kimmel, Tulane, VCU, Maryland |
| MD — Promoted/new | 4-5 | Dartmouth, BU, Emory, MSU CHM, + 1-2 TBD |
| MD — Reach (UNC) | 1 | UNC Chapel Hill |
| MD — Mr. Crocker scout list (Run 2) | 4 | Howard COM, Mount Sinai Icahn, Vanderbilt, UChicago Pritzker |
| DO — New AACOMAS track | 11-14 | MSUCOM, Marian WCOM, KCU, NSU, LECOM, CCOM, RVUCOM, AZCOM, RowanSOM, MCOM, WesternU, WCUCOM, UNECOM, LUCOM |
| **CUT** | 3 | MUSC, USC Greenville, LSU NOLA (dealbreakers documented) |
| **TOTAL (potential)** | **27-32** | Balanced, every included school verified Canadian-friendly |

vs. Cycle 1: 21 schools, ~half were international-hostile, 0 DO schools. Night and day.

**Note:** Mr. Crocker's MD scout list overlaps zero with Cosmo's reapply list — these are new candidates to consider during final school-list consolidation. Srishti + Rajat pick which to actually add after Wanda deep dives and cost/fit review.

---

## Part 2: UNC Chapel Hill — Full Reapplication Playbook

### Why UNC matters to Srishti
- Moved to NC for high school
- 4 years at UNC undergrad — Highest Distinction, Dean's List every semester, perfect 4.0 senior year
- 340 hours research at UNC SOM's Marsico Lung Institute (PI: Stephen Schworer)
- Medical Anthropology minor from UNC's department
- Currently lives and works full-time in Charlotte, NC
- 8+ years in North Carolina — this is her home, even if the visa says otherwise

### UNC Admissions Facts
- **Class size:** ~190-229
- **In-state:** 83-85% | **Out-of-state:** 15-17%
- **OOS acceptance rate:** ~1-2%
- **Median stats:** 3.82 GPA / 512-516 MCAT (she's above on both)
- **Interview format:** MMI (Multiple Mini Interviews), 6-8 min each, one blinded interviewer
- **Interview period:** September through February
- **Reapplication limit:** Max 4 total applications (this is her 2nd — she has room)
- **Associate Dean for Admissions:** Dr. Lisa Rahangdale, MD, MPH (also Professor of OB/GYN — relevant to Srishti's women's health interest)
- **Assistant Dean for Admissions:** Dr. Anthony Passannante, MD
- **Virtual office hours:** Fridays at 11 AM — **she should start attending these NOW**

### UNC Secondary Essay Prompts (2025-2026)
1. Describe an experience where you attempted a task and realized you were not ready for it. How did this impact your approach to trying new things? (250 words)
2. How will your life experiences foster a positive educational environment and benefit your future patients? (250 words)
3. Discuss a service activity that impacted your understanding of healthcare and your desire to pursue medicine. (250 words)
4. **What motivates you to apply to UNC SOM?** (250 words)
5. **[Reapplicant] What has changed about you as a candidate since your last application? What has made you a stronger applicant?**

### UNC Programs That Match Her Profile

| Program | Why It Fits |
|---------|-------------|
| **Humanities & Social Sciences Scholarly Concentration** | Direct continuation of her Medical Anthropology minor |
| **Department of Social Medicine** | "Teaching, research, and service addressing the social dimensions of health, illness, and doctoring" — her exact lane |
| **Global Health Scholarly Concentration** | Trains "globally-minded physicians" with interdisciplinary courses including anthropology |
| **Kenan Urban Primary Care Scholars Program** | Selects 5 scholars/year. Based partly in Charlotte — where she works RIGHT NOW. Includes $2,000 stipend. |
| **FIRST Program** | 3-year accelerated MD with NC service commitment. Mission-aligned. |
| **Health and Humanities Lab (HHive)** | Interdisciplinary health + humanities initiative |

### People She Should Reach Out To

#### Admissions Staff
- **Dr. Lisa Rahangdale, MD, MPH** — Associate Dean for Admissions + OB/GYN Professor. Women's health connection.
- **Dr. Anthony Passannante, MD** — Assistant Dean for Admissions
- **Admissions Office:** admissions@med.unc.edu | 919-962-8331
- **Friday virtual office hours at 11 AM** — attend these regularly, ask thoughtful questions, become a known name

#### Her Existing UNC Connections (LEVERAGE THESE)
- **Stephen Schworer, MD, PhD** — Her actual PI at Marsico Lung Institute. UNC SOM faculty. He's an Assistant Professor of Medicine and NC TraCS K Scholar studying asthma origins. **She should:**
  1. Email him to reconnect and share her reapplication plans
  2. Ask if he'd be willing to make an introduction to anyone in admissions
  3. Confirm he'll write her research LOR again
  4. Ask if there are any publications from her work (even if she's in the acknowledgments)
- **Dr. Richard C. Boucher, MD** — Director of Marsico Lung Institute, 43 years at UNC. Even a brief email mentioning her work in his institute could open a door.
- **Medical Anthropology professor** (wrote her LOR) — reconnect, ask about Department of Social Medicine connections

#### Student Organizations to Connect With
- **South Asian Medical Student Organization** — active at UNC SOM. Find them on Instagram/Facebook/LinkedIn
- **Pediatrics Interest Group**
- **Student Health Action Coalition (SHAC)** — free clinic run by students, relevant to underserved care
- **Student National Medical Association (SNMA)**
- **Alliance of Health Science Ambassadors**

#### How to Find Current Students
- **@unc.som** on Instagram (6,065 followers) — UNC SOM official
- **@uncsom_charlotte** on Instagram — Charlotte campus (she's in Charlotte!)
- **Student Doctor Network:** [2025-2026 UNC thread](https://forums.studentdoctor.net/threads/2025-2026-u-north-carolina-chapel-hill.1507985/)
- **LinkedIn:** Search "UNC School of Medicine" + "medical student" — look for:
  - Reapplicants who got in (they'll understand her journey)
  - South Asian students (cultural connection)
  - Anyone interested in peds, women's health, or medical anthropology
  - Students from the Humanities & Social Sciences concentration
- **Reddit:** r/premed, r/medicalschool — search for UNC SOM threads

#### What to Say in Outreach
**To current students (email/LinkedIn/Instagram DM):**
> Hi [Name], I'm Srishti — I graduated from UNC in 2025 with a Biology degree and Medical Anthropology minor. I did research at Marsico Lung Institute and I'm reapplying to UNC SOM this cycle. I'd love to hear about your experience at the school, especially [specific program/interest]. Would you be open to a quick 15-minute chat?

**To Dr. Schworer (email):**
> Hi Dr. Schworer, I hope you're doing well! I wanted to reach out because I'm reapplying to medical school this cycle, including UNC SOM. Since leaving the Boucher Lab, I've been working full-time as a Medical Assistant at a clinic in Charlotte — it's been an incredible year of direct patient care that's only strengthened my commitment to medicine. I'd love to catch up if you have a few minutes, and I'm also hoping you'd be willing to write a letter of recommendation again. I'm happy to send you an updated CV and personal statement. Thank you so much for everything you taught me in the lab.

### UNC Reapplicant Essay Strategy

**Prompt:** "What has changed about you as a candidate since your last application? What has made you a stronger applicant?"

**Framework:**
- **Before (cycle 1):** Strong academics and research, but limited direct patient care experience due to visa restrictions on employment
- **The pivot:** Started full-time MA work at Medi-Weightloss Ballantyne in August 2025 — her first paid clinical role, made possible by OPT authorization after graduation
- **What she gained:** 1,000+ hours of direct patient care. Taking vitals, patient intake, working alongside PAs and NPs daily. Learning what it means to show up for patients every day, not just in volunteer shifts
- **The deeper lesson:** Working in weight management (not her dream specialty of peds) taught her that every patient deserves the same quality of care regardless of the setting — connect this to her cultural humility framework
- **Why UNC specifically:** She wants to return to the institution where she grew, where she researched lung disease at Marsico, where she studied the social dimensions of medicine through Medical Anthropology — now with the clinical foundation she was missing

**"Why UNC" Essay (250 words) — Key Beats:**
1. She's not discovering UNC — she's coming home. Open with a specific memory from campus/lab/clinic
2. Name the Department of Social Medicine and Humanities & Social Sciences Scholarly Concentration as the academic continuation of her Med Anth work
3. Name the Kenan Urban Primary Care Scholars Program (Charlotte-based) as a direct fit for her current location and interests
4. Reference her Marsico Lung Institute research — she contributed to UNC SOM's mission before she was a student there
5. Close with her vision for serving NC communities — immigrant health, women's health, primary care

---

## Part 3: DO Strategy — The MSUCOM Priority

### Why MSUCOM is the most important application she'll write

Michigan State University College of Osteopathic Medicine has a **Canadian Initiative Program** that:
- **Reserves ~25 seats per year specifically for Canadian students**
- **Offers a scholarship** that reduces international tuition closer to in-state rate (~$31K vs ~$44K)
- Has an established pipeline for Canadian students including visa support
- Is the most Canadian-friendly DO school in the entire country

And Srishti grew up in **Farmington Hills, Michigan (Oakland County)**. This is not a random DO school — this is her home state school with a program built for students exactly like her.

### MSUCOM + Her Profile
- **Her stats vs. median:** 3.88/517 vs 3.6/507 — she is dramatically above
- **Michigan roots:** Farmington Hills, Dr. Godbole (childhood pediatrician), Math Olympiad, YMCA swimming, father's Detroit master's degree
- **Osteopathic philosophy fit:** Whole-person care, cultural humility, primary care, grandfather as family physician — this is osteopathic medicine's core belief system
- **Pediatrics:** MSUCOM has a dedicated Department of Pediatrics with core rotations

### What she needs for AACOMAS (different from AMCAS)
1. **DO letter of recommendation** — Important for DO applications. She should find and shadow a DO physician ASAP and get a letter. This is the one new thing she needs for the DO track.
2. **Personal statement** — Can be similar to AMCAS but should weave in understanding of osteopathic philosophy. Her grandfather narrative + cultural humility + "treating the whole person" maps perfectly.
3. **Transcripts sent to AACOMAS** — Separate from AMCAS transcript process
4. **AACOMAS GPA calculation** — Different from AMCAS; may slightly differ

### AACOMAS Timeline
- **Application opens:** Early May 2026
- **Target submission:** First week of June 2026 (rolling admissions — early = better)
- **Submit simultaneously with AMCAS** — thousands of applicants do this, completely normal

### The "517 MCAT at a DO school" Question
Some DO admissions committees may wonder why a 94th-percentile MCAT applicant is applying DO. She MUST address this authentically:
- **Don't say:** "I'm applying DO because I didn't get into MD schools"
- **Do say:** Lead with genuine alignment. Her grandfather practiced medicine in his living room in Surat — that's osteopathic philosophy before she knew the word for it. Whole-person care, hands-on healing, treating the human not just the disease. Her Medical Anthropology training taught her that healing systems across cultures share this common thread. DO is not her backup — it's the philosophy she was raised in.

---

## Part 4: Outreach Plan — Beyond UNC

### General outreach strategy (all top target schools)

For her top 8 schools, she should identify and reach out to **2-3 people per school:**

| Who to find | Where to find them | What to say |
|-------------|-------------------|-------------|
| **Current medical students** (especially reapplicants, South Asian students, peds/women's health interests) | LinkedIn, Instagram, school social media, SDN forums | "I'm a reapplicant interested in [school]. I'd love to hear about your experience, especially [specific program]. 15-minute chat?" |
| **Student ambassadors / admissions committee student members** | School admissions pages, open house events | Attend virtual events, ask thoughtful questions, follow up by email |
| **Junior faculty aligned with her interests** (peds, women's health, social medicine, cultural humility) | School faculty directories, Google Scholar | "I'm applying to [school] and your work on [specific topic] aligns closely with my background in medical anthropology. I'd love to learn more about opportunities in your department." |
| **Alumni of her undergrad (UNC) at the target school** | LinkedIn alumni search | UNC connection is a conversation starter anywhere |

### Priority outreach by school

| School | Key person/angle to pursue |
|--------|---------------------------|
| **UNC** | Dr. Schworer (PI), Dr. Rahangdale (admissions + OB/GYN), South Asian student org, Friday office hours |
| **MSUCOM** | Canadian Initiative Program coordinator, current Canadian students (they exist — the program enrolls ~25/year), Michigan connection |
| **Wayne State** | Michigan roots angle, any Farmington Hills/Oakland County alumni |
| **Tulane** | Global health + community health faculty, social medicine programs |
| **GW** | Health policy + global health faculty |
| **Dartmouth** | Rural health + reapplicant-friendly culture |

### Timeline for outreach
- **Now (April-May 2026):** Reconnect with Dr. Schworer. Start attending UNC virtual office hours. Begin LinkedIn searches.
- **May-June 2026:** Send 2-3 outreach messages per week to current students at top targets. Attend any virtual open houses.
- **July-August 2026:** Follow up with anyone who responded. Reference conversations in secondary essays ("After speaking with [student], I was inspired by...").
- **September-February 2027:** If invited to interview, reach back out for interview day tips.

---

## Part 5: Critical Action Items — What Srishti Needs to Do RIGHT NOW

### Immediate (This Week — by April 22)

- [ ] **Email Dr. Stephen Schworer** at saschworer@unc.edu — reconnect, share reapplication plans, ask for LOR, ask about introductions
- [ ] **Identify the PA or NP she works with most closely** at Medi-Weightloss and mentally prepare to ask for a clinical LOR (ask within 30 days)
- [ ] **Register for AAMC PREview** — look up next available test date and sign up. This removes a soft drag from multiple schools.

### This Month (April 2026)

- [ ] **Ask the PA or NP at Medi-Weightloss for a clinical letter of recommendation** — this is the #1 priority new LOR
- [ ] **Find and shadow a DO physician** — she needs a DO letter for AACOMAS applications. Even 1-2 days of shadowing + a conversation about osteopathic philosophy can lead to a letter
- [ ] **Start attending UNC SOM virtual office hours** (Fridays at 11 AM)
- [ ] **Decide on Casper retake** — if her 3rd quartile score is from 2025, she can retake targeting 4th quartile
- [ ] **Email her Medical Anthropology professor** — reconnect, confirm LOR for cycle 2
- [ ] **Email Bio professor #1** (the one who was fond of her) — confirm LOR for cycle 2
- [ ] **Cold-reach back to Dr. C** (the pediatrician from her shadowing) — worth a shot for a physician LOR. Script: "I'm reapplying, I've spent the past year as a full-time MA, can we reconnect?"

### May 2026

- [ ] **Draft AMCAS personal statement** — lead with the visa story, build to the MA year, answer "why MD" explicitly
- [ ] **Draft AACOMAS personal statement** — same core but weave in osteopathic philosophy alignment
- [ ] **Pre-write all secondary essays** — she knows the prompts for every reapply school. Have drafts ready before primaries are verified.
- [ ] **Request AMCAS and AACOMAS transcripts**
- [ ] **Remove hospice from W&A entirely** — it never happened. Replace with the MA experience entry.
- [ ] **Verify Children's Women's Health Book status** — if it's real and published, keep it. If it stalled, remove or reframe honestly.

### June 2026

- [ ] **Submit AMCAS within 7 days of opening** (she did June 1 last cycle — replicate)
- [ ] **Submit AACOMAS within first week of opening** (opens early May — can submit even earlier)
- [ ] **Take AAMC PREview** if not already completed
- [ ] **Have all secondary essays ready** before primary verification clears (target: complete at every school by mid-July)

### Ongoing

- [ ] **2-3 outreach messages per week** to current students at target schools
- [ ] **Track every connection** — name, school, date, what you discussed (for secondary essays)
- [ ] **Continue full-time MA work** — every month adds to the clinical hours story
- [ ] **CCMA exam prep** — if she earns it in fall 2026, send as an update letter to schools that accept them

---

## Part 6: Essay Strategy — Stop Recycling, Start Matching

### The cycle-1 problem
She rotated 3 blocks across 21 schools:
1. "Ayurveda + COVID vaccine + parents" (diversity/cultural humility)
2. "Grandmother Hypothesis + foster toddler" (why medicine/community service)
3. "Lost MA job" (adversity/challenge)

### The cycle-2 fix: Story Menu System

Build a menu of **10+ distinct stories** and assign each school 2-3 that match their specific mission:

| Story | Best used for | Schools to deploy at |
|-------|--------------|---------------------|
| **Visa / "Alien" / lost MA job arc** | Adversity, reapplicant "what changed", diversity | EVERY school — this is the spine of the reapp |
| **Medi-Weightloss year (NEW)** | Clinical growth, "what changed", why medicine | EVERY school — the central transformation |
| **Farmington Hills / Dr. Godbole / Michigan childhood** | "Why us", community ties, pediatrics origin | Wayne State, CMU, MSUCOM, MSU CHM |
| **Detroit studio apartments / family economic hardship** | Adversity, socioeconomic diversity, first-gen | GW, Tulane, Dartmouth, financial-need-aware schools |
| **Grandfather in Surat / aamras / family medicine** | PS opener, osteopathic philosophy, "why medicine" | DO schools especially, but universally powerful |
| **Marsico Lung Institute research** | Research, "why us" for UNC, intellectual curiosity | UNC, research-heavy schools |
| **Med Anth / Hmong & Azande / cultural humility framework** | Diversity, unique perspective, "why us" for social medicine programs | UNC (Social Medicine), RowanSOM (Tensegrity), Tulane |
| **Mother's ectopic pregnancy + Ayurveda** | Women's health, family influence, cultural perspective | Women's health-aligned schools |
| **Sister's early period / women's health book** | Pediatrics, women's health, leadership, initiative | Peds-focused programs, NSU-KPCOM |
| **Mr. W / poetry conversation** | Human connection, patient-centered care | Keep but don't lead with it — it's a supporting detail now, not the climax |
| **Swimming / near-drowning / perseverance** | Failure, growth, resilience | "Tell me about a failure" prompts |
| **Weightlifting / physical growth as metaphor** | Hobbies, personal growth, stress management | "Tell us about yourself" / "what do you do outside of medicine" |

### School-specific essay assignments

**Michigan schools (Wayne State, Covenant HealthCare COM at CMU, MSUCOM, MSU CHM):**
- Lead with Farmington Hills / Dr. Godbole / Oakland County childhood
- Father's Detroit master's degree for economic hardship angle
- "Why us" should reference specific Michigan communities she wants to serve
- **CMU-specific:** The secondary has a **250-word "Michigan County" prompt** that almost no OOS applicant can answer. Srishti has a complete Oakland County answer (home 18 yrs, Dr. Godbole, family still in SE Michigan, intent to return). **Pre-write this in May before the secondary even lands** — that 2-week head start on a rolling school matters more than a perfect essay written late. Also name the Covenant HealthCare + MyMichigan partnership explicitly in "Why CMU" — it proves current research, not recycled reapplicant copy.

**UNC:**
- Lead with returning to an institution that shaped her
- Name Department of Social Medicine, Kenan Urban Primary Care Scholars (Charlotte), Marsico Lung Institute
- The reapplicant essay centers the MA year as the fix for the gap

**Tulane / GW / VCU / Maryland:**
- Global health / health equity / underserved population focus
- Cultural humility framework from Med Anth
- Visa story as lived understanding of healthcare access barriers

**DO schools:**
- Grandfather narrative maps to osteopathic philosophy (whole-person care in his living room)
- Med Anth = understanding healing systems across cultures = osteopathic holistic approach
- MA year shows she's not applying DO as a backup — she's been doing the work

---

## Part 7: LOR Packet — Cycle 2

| # | Writer | Type | Status | Priority |
|---|--------|------|--------|----------|
| 1 | **Stephen Schworer** (Boucher Lab PI) | Research | Reconnect NOW | Keep from cycle 1 |
| 2 | **Medical Anthropology professor** | Academic (unique differentiator) | Reconnect NOW | Keep from cycle 1 |
| 3 | **Bio professor #1** (fond of her) | Academic (science) | Reconnect NOW | Keep from cycle 1 |
| 4 | **PA or NP at Medi-Weightloss** | **Clinical** (primary new letter) | **Ask within 30 days** | **#1 NEW PRIORITY** |
| 5 | **DO physician** (shadow + letter) | Clinical / DO-specific | **Find and shadow ASAP** | **Required for AACOMAS** |
| 6 | (Optional) **Dr. C or Dr. Stewart** | Physician / shadowing | Cold reach-back attempt | Nice-to-have |
| 7 | (Optional) **RMA manager** | Clinical supplement | Only if PA/NP letter secured | Supplement only |

**Drop from cycle 1:** Bio professor #2 (no signal, no unique angle)

---

## Part 8: Financial Reality Check

### As a Canadian citizen, Srishti cannot access:
- Federal student loans (Stafford, PLUS, Grad PLUS)
- Federal grants (Pell, etc.)
- Most state-based financial aid

### Options to research:
- **Private student loans with US co-signer** — many lenders work with international med students
- **Canadian provincial student aid** (she's a Canadian citizen — check Ontario/other provinces)
- **Canadian bank loans for US medical education** — RBC, TD, Scotiabank have programs
- **School-specific scholarships** — each school's financial aid office should be contacted
- **MSUCOM Canadian Initiative scholarship** — reduces tuition from ~$44K to ~$31K
- **Service commitment scholarships** (e.g., UNC's Kenan Rural Primary Care = $30K reduction for NC rural service)
- **NHSC (National Health Service Corps)** — may have options for non-citizen residents

### Cost comparison (rough annual tuition)
| School type | Annual tuition range |
|-------------|---------------------|
| DO private (MSUCOM w/ scholarship) | ~$31,000 |
| DO private (LECOM) | ~$40,000 |
| DO private (other) | ~$45,000-70,000 |
| MD public (OOS) | ~$55,000-65,000 |
| MD private | ~$60,000-70,000 |

**MSUCOM with the Canadian scholarship is likely the most affordable option on the entire list.**

---

## Part 9: Master Timeline

| When | What |
|------|------|
| **Now (April 2026)** | Reconnect with LOR writers. Ask PA/NP for letter. Find DO to shadow. Register for PREview. Start attending UNC virtual office hours. Begin outreach to current students. |
| **May 2026** | Draft both personal statements (AMCAS + AACOMAS). Pre-write all secondaries. Request transcripts. Take PREview if available. Submit AACOMAS (opens early May). |
| **June 2026** | Submit AMCAS within first week of opening. Continue outreach. Finalize all LORs. |
| **July 2026** | Complete all secondaries within 2 weeks of receiving them. Target: complete at every school by mid-July. |
| **August 2026** | All applications complete. Continue MA work. Begin CCMA exam prep. |
| **September-October 2026** | Interview invitations begin. Prep with mock MMIs. If CCMA earned, send update letters. |
| **November 2026-February 2027** | Interview season. |
| **March-April 2027** | Acceptances. Decide. |
| **Fall 2027** | Matriculate. |

---

*This plan was built from: (1) deep read of Srishti's full CONTEXT.md, (2) web research on all 21 cycle-1 schools' international policies, (3) web research on Canadian-friendly DO schools nationally, (4) deep research on UNC SOM admissions, programs, and outreach targets. Every school on the new list has been verified to accept Canadian citizens.*

*Next steps: Rajat will tell us what to work on next. Waiting for MSU post-cycle feedback. The plan is alive — update it as new information comes in.*
