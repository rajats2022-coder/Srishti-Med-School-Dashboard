# Wanda — School Deep Dive Researcher

> **Role:** Ultra-deep research on priority schools. Creates 6-section plans with interview prep, essay frameworks, outreach scripts, and people to contact.
>
> **Page:** `dashboard/unc.html` (multi-school — despite filename)
>
> **Scope:** High-priority schools queued from Cosmo (MD) or Mr. Crocker (DO)

---

## How to Run Wanda

### When to trigger
- Rajat says "run Wanda on [school]", "deep dive [school]", "plan for [school]"
- A school appears in the Research Queue on Wanda's dashboard page
- Rajat clicks "Plan for Wanda" on a school card in Cosmo or Mr. Crocker's page

### Input required
1. **CONTEXT.md** — load first, always
2. **REAPPLICATION_PLAN.md** — current strategy and story menu
3. **WANDA_SCHOOL_TEMPLATE.md** — HTML template for adding schools
4. The school name + any existing data from Cosmo or Mr. Crocker's page
5. Previous run log entries (below) for pattern knowledge

### Steps

1. **Load all context files** listed above
2. **Deep research the school** — Go beyond what Cosmo found. For each school, research:

   **A. Why She Belongs (2-4 connection points)**
   - What specific programs, departments, or initiatives match her profile?
   - Does the school have connections to her geography (Michigan, Charlotte, NC)?
   - Does the school have research in her interest areas (lung/pulmonary, peds, women's health)?
   - Any alumni/faculty connections she already has?

   **A.1. Go-No-Go Readiness Check** *(MANDATORY — added per Gray audit 2026-04-16)*
   - Per Ryan Gray, School List (~line 3100): before applying, pressure-test Srishti's readiness for THIS school specifically — not just whether she belongs thematically. Many cycle-1 rejections were structural, not academic; this check catches structural gaps before the secondary fee is spent.
     - [ ] **MCAT ready** — is her 517 competitive at this school's matriculant median? (Above = asset; well above = yield-protection risk, see Section G.)
     - [ ] **GPA ready** — is her 3.88 competitive at this school's matriculant median?
     - [ ] **Clinical consistent** — is her ~1,000+ paid MA hours at Medi-Weightloss enough for this school's implicit bar? (Research-heavy schools expect more; community-care schools treat it as sufficient.)
     - [ ] **Shadowing sufficient** — DO-specific shadowing if DO school (see [CLAUDE.md](../CLAUDE.md) Open Q #8), or meaningful physician shadow if MD?
     - [ ] **Research appropriate** — is her 340 hrs at Marsico Lung Institute enough for a research-heavy school (Vanderbilt, Pitt, Duke), or is it a non-issue for a community-care school?
     - [ ] **Time to submit early** — can she realistically submit AMCAS/AACOMAS in the first 2-3 weeks of the cycle opening? (Load-bearing at rolling-admissions schools — see Section G structural gates.)
   - **Any NO box triggers an essay-strategy flag in the plan.** The secondary must proactively address that gap. E.g., Vanderbilt with no posters/pubs → "Why Vanderbilt" essay needs a research-growth-trajectory angle, not a past-accomplishment claim. Flag explicitly in the plan's Overview banner, not just in Section A.

   **B. Programs That Fit (4-6 programs)**
   - Search the school's website for: scholarly concentrations, dual degrees, certificates, special tracks
   - Look for: social medicine, humanities in medicine, global health, cultural competency, primary care scholars, rural health
   - For each: name, what it is, why it fits Srishti specifically

   **C. People to Reach Out To**
   - Admissions leadership (dean of admissions, assistant deans)
   - Faculty in her interest areas (find actual names, titles, research topics)
   - Student organizations (South Asian, peds interest, free clinics, cultural orgs)
   - Social media accounts and forums (Instagram, SDN threads, LinkedIn)
   - Virtual events (office hours, open houses, info sessions — find dates if possible)

   **D. Secondary Essay Prompts**
   - Find the school's most recent secondary prompts (SDN is the best source)
   - For each prompt: write a specific strategy using stories from the Story Menu
   - Always include the reapplicant essay strategy (framework: Before → Pivot → What Changed → Why This School)

   **D.1. Hard Story Assignment** *(MANDATORY — added per Gray audit 2026-04-16)*
   - Srishti's #1 cycle-1 failure was recycling the same 3 essay blocks across 21 schools ([CONTEXT.md §9](../CONTEXT.md)). The fix is a school-by-school story mapping, not a generic "use the Story Menu" instruction. Per Ryan Gray, Secondaries (~line 3400) + PS (~line 2200): don't recycle; match stories to the school's specific mission.
   - For each of this school's secondary prompts, specify:
     - **USE** — 2-3 specific Story Menu blocks (by name from [REAPPLICATION_PLAN.md](../REAPPLICATION_PLAN.md) Part 6) that fit this prompt at this school
     - **DO NOT USE** — which Story Menu blocks are already spent at 2+ other schools on the active list (so the same 3 blocks don't recycle across 15+ secondaries)
     - **Tailor hook** — one sentence of school-specific detail that proves this isn't a copy-paste (program name, faculty name, mission language, campus fact)
   - **Maintain a running "Story Menu usage map" at the top of the plan** (accordion or sidebar): which Story Menu blocks have been assigned at which schools across the active list. Before assigning at a new school, check the map — if a block is already used at 2+ schools, force a different block here. This is the enforcement mechanism, not just a guideline.
   - **Cycle-1 recycling patterns to actively avoid:** Mr. W / poetry conversation (overused in cycle 1), Grandfather-in-Surat opener (powerful but spent everywhere), Marsico research (fits UNC specifically, weak as generic "why us" filler). See [CONTEXT.md §9](../CONTEXT.md) for the full diagnostic on what got recycled.

   **E. Outreach Templates (3+ copyable messages)**
   - Email to a faculty member (personalized to the school)
   - DM to a current student
   - Email to PI/existing connection (if applicable)
   - Each must be specific enough to copy-paste with minimal edits

   **F. Interview Format**
   - What type (MMI, traditional, panel, group)?
   - Structure (how many interviews, who interviews, blinded?)
   - Season (what months, what days of week)

   **G. Application Yield — Is She a High-Yield Application Here?** *(MANDATORY — added per Srishti 2026-04-16)*
   - **Question to answer:** Is the secondary fee + essay time at this school a *high-yield* spend for Srishti, or a low-yield spend that should be cut?
   - This is the MSAR-style data check Ryan Gray prescribes for international applicants ([RyanGray.md:3137](../RyanGray.md#L3137)): *"look at how many international students apply, how many are interviewed, and how many are ultimately accepted or matriculate. If a med school states they accept international students, but the actual data doesn't show it, you are probably better to move to the next school."*
   - **Pull (or estimate) these numbers:**
     - International / Canadian applicants per cycle
     - International / Canadian interview invites per cycle
     - International / Canadian **matriculants** in the most recent class (this is the load-bearing number)
     - OOS acceptance rate (proxy when international-specific data isn't published)
     - Post-interview yield % if available
   - **Assign a Canadian-Friendly Tier** (codified from Run 4 CMU pattern):
     - **Tier 1 — High-yield:** Explicit Canadian-eligible policy + Canadian matriculants present in recent class (e.g., MSU CHM). Apply confidently, lean into Canadian framing where it helps.
     - **Tier 2 — Eligible but low-yield:** Explicit policy allows Canadians, but zero or near-zero Canadian matriculants in last 1–2 years (e.g., CMU). Apply only if there's a *separate* structural advantage (Michigan roots, mission fit, specific faculty alignment). Do NOT lean on Canadian framing — lean on the other angle.
     - **Tier 3 — Effectively closed / CUT:** Policy filters internationals or requires LPR/green card (e.g., LSU NOLA). Move to Investigated & Cut. Don't waste the secondary fee.
   - **Also flag yield protection risk** ([RyanGray.md:3072](../RyanGray.md#L3072)): with her 517 MCAT, schools whose matriculant median is well below 510 may reject her under yield protection (especially DO schools). When this risk is real, the secondary should explicitly demonstrate "I would actually attend here" — specific program names, faculty, geographic commitment, mission language. Note this as an essay-strategy flag in the plan.
   - **Output verdict in the plan:** one of `HIGH-YIELD APPLY` / `LOW-YIELD — APPLY ONLY IF [reason]` / `CUT — yield too low to justify cost`. This verdict goes in the school's Overview banner so Rajat can see at a glance whether the application $ + Srishti's essay time are justified.
   - **Also pull these 4 structural gates** *(added per Gray audit 2026-04-16 — eligibility without these verified is incomplete; a "HIGH-YIELD APPLY" that skips these is fragile)*:
     - **Casper / PREview / SJT policy** — is Casper required at this school? Is PREview required or favored? Srishti's cycle-1 Casper was 3rd quartile ([CONTEXT.md §7c](../CONTEXT.md)) — flag if this school weights Casper heavily (per [CONTEXT.md §10](../CONTEXT.md): Tufts, Tulane, BU, Wayne State, Sidney Kimmel, MSU, CMU do). If 3rd-quartile Casper is a silent drag here, note it as a retake-priority signal feeding [CLAUDE.md](../CLAUDE.md) Open Question #9.
     - **LOR policy — PA/NP acceptance** — verify from the school's own LOR page: does this school accept a PA/NP as the primary clinical letter, or require/prefer MD/DO? Critical Rule #6 says her PA/NP letter is the primary clinical letter — if a school weakly prefers MD/DO, flag as an essay-strategy issue (secondary should lean harder on the daily-supervision depth angle from the PA/NP letter, not on credential type).
     - **Escrow / Canadian financial-aid eligibility** — some US MD schools require Canadian students to escrow full tuition upfront ($75K–100K) before matriculating. Eligible on paper ≠ attendable. Required pull for every Canadian-eligible school. When unknown, add an Open Question entry (see CMU Open Question #11 pattern).
     - **Rolling admissions submit-by date** — is this school rolling? When does OOS-seat shrinkage begin? What's the realistic "late = dead" window? Built into the Timeline accordion as a hard date, not a vague "submit early." (Run 4 CMU precedent: June 5 AMCAS submit target, not July 15.)

   **H. Reapplicant Diagnostic** *(MANDATORY for cycle-1 reapply schools only — added per Gray audit 2026-04-16)*
   - **Applies to the 7 cycle-1 reapply schools only:** GW, Wayne State, CMU, Sidney Kimmel, Tulane, VCU, Maryland. For any other school (fresh apply, new scout), skip this section entirely — don't pad the plan.
   - Per Ryan Gray, Rejection & Reapplying (~line 4505): *"The #1 reapplicant mistake is jumping back in too fast without fixing what went wrong."* Gray prescribes a section-by-section audit: MCAT, GPA, Activities, PS, Timing, Secondaries, School List, Interview.
   - **Required audit for each reapply school:**
     1. **Pull Srishti's cycle-1 secondary for this school from Drive** ([CONTEXT.md §14](../CONTEXT.md) has the Drive folder path). If unreachable, flag and ask Rajat for the file before writing the plan.
     2. **Identify 2-3 cycle-1-specific weaknesses** at this school. Examples: "secondary cited hospice training that never happened," "no Michigan framing despite CMU's in-state preference," "recycled the Grandfather block that was also used at 8 other schools," "used 'anticipated MA' framing that now reads as stale."
     3. **Write a 200-word 'what's different now' paragraph** for the reapplicant essay. Framework: *Before → Pivot → What Changed → Why This School Specifically.* Wanda pre-writes this so Srishti isn't doing it cold when the secondary lands.
     4. **Cross-check for stale claims.** Critical Rule #4: hospice is DEAD (0 hours — she completed training but VIA never assigned her). If the cycle-1 secondary referenced hospice, flag for removal. "Anticipated MA" language from cycle 1 is now real — rewrite to past-tense accomplished, not future-aspirational.
   - **Output in the plan:** a dedicated accordion labeled "Reapplicant Diagnostic" containing (a) the 2-3 identified cycle-1 weaknesses at this school, (b) the pre-written 200-word "what's different now" paragraph, (c) a highlighted list of cycle-1 claims that need removal/rewrite.

3. **Build the dashboard entry** — Follow `WANDA_SCHOOL_TEMPLATE.md` exactly:
   - Add school object to `wandaSchools` array (full plan OR Investigated & CUT variant — either counts as "done")
   - Add full plan HTML to `schoolPlanContent[schoolId]`
   - Add school name to `schoolNames` in `index.html`

4. **Update the source page (MD files) based on where the school came from** — Every queued item carries `source: 'cosmo' | 'crocker'`. Match the update to the source:
   - **If `source === 'cosmo'`** → update `dashboard/schools.html`. For CUT verdicts, move the school out of `allSchools` and document it on schools.html (or cross-link to Wanda's CUT card). For full plans, make sure the school's Cosmo card reflects the latest essay/outreach direction from the deep dive.
   - **If `source === 'crocker'`** → update `dashboard/do-schools.html`. For CUT verdicts, remove the school from `doSchools` / `mdSchools` and add a card to the Investigated & Cut section with a one-line dealbreaker + primary source. For full plans, refresh the card's `fit` / `canadian` fields with any new intel.
   - Either way: the source page must never contradict what Wanda just published. If Wanda decided a school is CUT, Cosmo and Mr. Crocker's pages must show CUT, not "VERIFY" or "reapply."

5. **Remove the school from the Research Queue** — Queue is stored in `localStorage['srishti_wanda_queue']` + Supabase `wanda_queue`. Wanda's page now auto-filters queued items whose IDs appear in `wandaSchools` on every render (and persists the filtered list via `syncWandaQueue`). You don't need to call `removeFromQueue` manually — but verify the queue card is gone after a reload. If the school was never actually in the queue (Rajat asked for it directly), skip this step.

6. **Update the run log** — Append what was found, what was surprising, what to improve

7. **Update all other MD files** — Per the standing rule from Run 4: every Wanda run must update `CONTEXT.md` (new facts about Srishti), `REAPPLICATION_PLAN.md` (school-list / strategy changes), and the root `CLAUDE.md` Open Questions table (mark resolved, add new). Not just the dashboard HTML.

### Quality checklist
- [ ] Application Yield verdict assigned: `HIGH-YIELD APPLY` / `LOW-YIELD — APPLY ONLY IF [reason]` / `CUT — yield too low`, with Canadian-Friendly Tier (1/2/3) and yield-protection flag if applicable
- [ ] Section A Go-No-Go 6-box readiness check completed (MCAT / GPA / Clinical / Shadowing / Research / Timing); any NO box triggered an essay-strategy flag in the Overview banner
- [ ] Section D Hard Story Assignment: each secondary prompt has USE / DO NOT USE / Tailor hook specified, and a running Story Menu usage map is at the top of the plan
- [ ] Section G structural gates pulled: Casper/PREview policy, LOR PA/NP acceptance, escrow/Canadian financial-aid eligibility, rolling-admissions submit-by date
- [ ] If this is one of the 7 cycle-1 reapply schools (GW, Wayne State, CMU, Sidney Kimmel, Tulane, VCU, Maryland): Section H Reapplicant Diagnostic accordion present with 2-3 cycle-1 weaknesses + pre-written 200-word "what's different now" paragraph + stale-claims list
- [ ] All 6 accordion sections present (Why Belong, Programs, People, Essays, Templates, Interview)
- [ ] First accordion section uses `expanded` + `open` classes; others don't
- [ ] All `tpl-` IDs in outreach templates are unique across all schools
- [ ] Secondary essay prompts are from the current or most recent cycle (cite source)
- [ ] At least 3 outreach templates with Copy buttons
- [ ] Reality check banner included if OOS/international odds are <5%
- [ ] School name added to `schoolNames` in `index.html`
- [ ] Card appears on Wanda page, modal opens, all 3 tabs (Plan/Tasks/Notes) work
- [ ] Source page updated: if `source === 'cosmo'` → `schools.html`; if `source === 'crocker'` → `do-schools.html` (CUT verdict removed from active array + added to Investigated & Cut)
- [ ] Queue confirmed clean: reloaded Wanda page shows no queue card for the deep-dived school

### Sources to check (in order)
1. School's official admissions website
2. School's secondary application page / portal
3. Student Doctor Network (SDN) school-specific threads — best for essay prompts
4. School's Instagram/social media — for student org discovery
5. School's faculty directory — for people to contact
6. MSAR (if accessible) — for verified stats
7. Reddit r/premed — for recent applicant experiences

---

## Run Log

> After every Wanda run, append an entry here. Include what sources were most useful, what was hard to find, and any learnings about the school or the research process.

### Run 1 — 2026-04-15 (UNC Chapel Hill)
- **What:** Full deep dive on UNC SOM as reapplication target
- **Result:** Complete 6-section plan with 6 programs, 8+ people, 5 essay prompts + reapplicant essay, 3 outreach templates, MMI interview format
- **Key findings:**
  - UNC has Friday virtual office hours at 11 AM — this is the single most actionable outreach opportunity [**CORRECTED IN RUN 2:** actually Tuesdays 9-10am EST]
  - Dr. Lisa Rahangdale is both Associate Dean for Admissions AND an OB/GYN professor — directly relevant to Srishti's women's health interest
  - The Kenan Urban Primary Care Scholars Program is partly based in Charlotte where Srishti currently works — huge "why UNC" point
  - Department of Social Medicine is the direct academic home for her Med Anth background
  - OOS acceptance rate is ~1-2% — this is a reach, but a meaningful one because of real institutional connections
- **Sources that worked best:** UNC SOM website (programs, faculty), SDN 2025-2026 thread (essay prompts, interview format), Instagram @unc.som and @uncsom_charlotte (student orgs)
- **What was hard to find:** Exact secondary prompts required cross-referencing SDN with the school portal. Interview format details were scattered across SDN posts.
- **What to improve next time:** Start by searching SDN for the school's thread — it usually has everything (prompts, interview format, student experiences) in one place. Also search for "[school] Canadian student" to find any international student experiences.

### Run 2 — 2026-04-16 (UNC Chapel Hill — Deeper Research Round 2)
- **What:** Rajat asked for a second round of UNC research to expand/improve the existing deep dive. Launched 3 parallel subagents (admissions stats & timeline; faculty & people; additional programs & reapplicant strategy) and synthesized findings into 4 new accordion sections + expanded existing sections.
- **Result:** UNC plan grew from 6 accordions → 10 accordions. Added: Charlotte Campus deep dive, 2026-27 Timeline, Action Items This Week, Sources list. Expanded: overview stats (Class of 2029 data + new dean), Programs (all 12 SCPs), People (5 → 20+ named faculty with emails), Outreach Templates (3 → 8, including a priority template for Dr. Mara Buchbinder).
- **Key findings (new intel):**
  - **CORRECTION to Run 1:** Virtual office hours are **Tuesdays 9–10am EST** (not Friday 11am). First-come-first-served, 10-min cap, no signup. URL: med.unc.edu/admit/requirements/virtual-office-hours
  - **CORRECTION to Run 1:** Reapplicant essay is **200 words**, not 250
  - **NEW DEAN (Nov 24, 2025):** Dr. Cristy Page, MD, MPH — UNC triple alum, family medicine, founded **FIRST program** and Mission3. Mission now tilts toward primary care + service + rural equity, not research prestige. Major reframe for "Why UNC"
  - **Class of 2029 stats:** 6,264 apps → 229 matriculants (3.66%). OOS: 5,130 apps → ~38 seats (0.74%). Matriculant median: 3.82 / 516 — Srishti's 3.88 / 517 is ABOVE median. Her C1 rejection was not academic
  - **Post-interview yield: ~36%** — once she gets an II, ~1 in 3 odds. Getting the invite is the real wall
  - **Reapplicant cap: 4 total apps** (initial + 3 reapps). She's on #2. Two chances remain
  - **Charlotte campus partner = NOVANT HEALTH, not Atrium.** (Atrium deal fell through 2018.) Opened Feb 2022 with 9 students, scaling to 30/class. Stated mission: "special focus on health equity led by Novant Health." Years 1-2 Chapel Hill, Years 3-4 Charlotte. Same MD, branch campus. Assoc Dean: Dr. Mark Higdon (mlhigdon@novanthealth.org)
  - **12 scholarly concentrations** (not 4): Humanities & Social Sciences, Women's Health (NEW 2024), Global Health, MESSAGE (LGBTQ+), Clinical Research, Care of Older Patient, QI/Safety, Med Ed, Med Innovation, Nutrition, Planetary Health, Ultrasound
  - **TEC 2.0 curriculum** launched Aug 2023 — shortened core rotations 16→8 weeks, competency-based, emphasizes "diversity, telehealth, QI, patient safety." Name-check for "Why UNC"
  - **Top 5 first-touch faculty:** Dr. Mara Buchbinder (Chair, Social Medicine, medical anthropologist — highest leverage), Dr. Chemtai Mungo (Global Women's Health, NIH-funded, early-career), Dr. Anne Drapkin Lyerly (Social Med + OB-GYN bridge), Dr. Mark Higdon (Charlotte gatekeeper), Dr. Camille Ehre (Marsico PI)
  - **Timeline:** AMCAS deadline Oct 1, 2026. First secondaries mid-July 2026, 14-day turnaround. No secondary screen. First II wave aug 19-21 (last cycle pattern). Acceptances Oct 15+ by phone. Waitlist movement into May/June/July
  - **F-1 policy (verbatim):** "Non-US citizens with visa types F-1, H-1, J, etc., are not eligible to apply as NC residents (but may apply as a non-resident) and are not eligible for federal loans or grants." No published escrow amount but I-20 issuance requires proof of funds
  - **Hidden unlock:** She IS UNC alumni. Medical Alumni Office (medalum@med.unc.edu) can pair her with current SOM students — few reapplicants have this asset
  - **No Osher Center at UNC** — UNC's integrative medicine is PIM (Dr. Gary Asher). Don't mis-name in essays
- **Sources that worked best:** med.unc.edu directly (admissions FAQ, Charlotte campus profile, scholarly concentrations list, faculty directory), medcmp.com (Class of 2029 stats), Accepted.com (secondary essay breakdown), UNC Health News (dean announcements), SDN 2025-2026 UNC thread
- **What was hard to find:** Exact international/F-1 matriculation counts — not public, requires direct email or MSAR lookup. Individual faculty email verification took cross-referencing (UNC convention is firstname_lastname@med.unc.edu but many faculty use different variants)
- **What to improve next time:** The 3-parallel-agent pattern (stats/timeline, people, programs/strategy) was very high-leverage — each returned ~1500-2000 words of structured findings with sources in under 6 minutes total. Do this for every Wanda school going forward, not just sequential research. Also: always verify every fact from the previous run against the school's current website — Run 1 had the office hours day wrong and the essay word count wrong.

### Run 3 — 2026-04-16 (Michigan State CHM — Home State Priority)
- **What:** Full deep dive on MSU College of Human Medicine as a top-priority reapplication target. Queued from Cosmo as "MD — Promoted" because (1) Srishti grew up in Farmington Hills / Oakland County, MI, (2) MSU CHM explicitly accepts Canadian citizens, (3) MSU CHM community-based model has a campus in Southeast Michigan <15 miles from her hometown. Used the 3-parallel-agent pattern established in Run 2.
- **Result:** 10-accordion plan matching UNC's depth. Sections: Overview banner, Why You Belong (6 cards), Southeast Michigan Campus Deep Dive, Programs That Fit (SDC + LMU Flint + dual degrees), People (admissions leadership + 6 ranked faculty + Dr. Godbole unlock), Secondary Essay Prompts (3 verbatim prompts + reapp framework), Outreach Templates (7 copy-paste messages), Interview Format (4-station MMI), 2026-27 Timeline, Action Items This Week (8 items), Sources (20 URLs).
- **Key findings:**
  - **HUGE news (6 days old):** MSU + MSUCOM merged into "MSU Medicine" on **2026-04-10**. CHM remains the MD school but the institutional org chart just changed. 2026-27 cycle still runs as CHM per MSU's post-announcement statement. Flagged prominently on the plan so essays don't reference the pre-merger structure incorrectly.
  - **Interim Dean (since Oct 2025):** Dr. Rayamajhi replaced Dr. Aron Sousa. Use Rayamajhi's name in any "Why MSU leadership excites me" language — NOT Sousa (who departed).
  - **Canadian citizen policy is explicit:** CHM treats Canadian citizens identically to US citizens for admissions eligibility. Canadian PRs, DACA-only, and other non-citizens are NOT eligible. This is a near-unicorn policy for a state school.
  - **Community campus geography is the play:** CHM has 7 community campuses. Southeast Michigan (Henry Ford Providence Southfield + Novi) is <15mi from Farmington Hills — a better fit than Grand Rapids, East Lansing, or Midland for her essay narrative. Students are assigned to campuses after matriculation based on preference + fit. The "Why SE Michigan" essay writes itself.
  - **86% Michigan residents** in entering class — but Srishti has REAL Michigan roots (grew up there, family still there). That ratio is a filter against out-of-state applicants with no MI connection, not against people like her. Her Canadian citizenship doesn't block her from the "Michigan connection" pathway.
  - **Stats context:** Matriculant median ~3.7-3.9 GPA / 509 MCAT. Srishti's 3.88 / 517 is at/above median on GPA, +8 above median on MCAT. Like UNC, cycle 1 rejection was structural (no paid clinical hours, no clinical LOR), not academic.
  - **Dr. Mona Hanna (née Hanna-Attisha) is the priority outreach target:** Flint water crisis pediatrician, MSU faculty, nationally recognized, actively public-facing. Her RxKids program = direct alignment with Srishti's social medicine interest. High-ROI cold email — she responds to students.
  - **Dr. Leonard Fleck = Bioethics chair** — direct academic home for Srishti's Med Anth / cultural humility background. Under-researched target; few pre-meds think to reach out to bioethics faculty.
  - **The Dr. Godbole unlock:** Srishti's childhood pediatrician in Farmington Hills is the highest-ROI ask in the entire plan. A letter or intro from a practicing MI physician who's known Srishti since childhood is rare and powerful for MSU's community-based model. Built into Action Items as #2 behind "read MSU feedback when it arrives."
  - **Secondary prompt structure:** Three prompts, 400 words each. Prompt 3 asks "what have you done since your last application" — effectively a reapplicant essay without calling it one. Use Before → Pivot → What Changed → Why MSU CHM.
  - **Interview format:** 4-station MMI (~8 min each) + 30-min student 1-on-1 + admissions info session. Virtual. Decisions rolling from Oct 15.
  - **LMU Flint primary care certificate:** Free certificate for M3/M4s interested in primary care + underserved work. Not widely publicized; excellent "why us" detail.
  - **Pre-screen:** No secondary screen — everyone who submits AMCAS primary gets the secondary. Submit primary EARLY (June) to be at front of rolling review.
- **Sources that worked best:**
  - MSU CHM admissions site (pre-req FAQ, Canadian citizen policy, community campus explainer) — authoritative on eligibility
  - MSU CHM program pages (SDC, LMU Flint, MD-PH, Bioethics/BHS) — for program details
  - MSU Today 2026-04-10 press release on MSU Medicine merger — freshest institutional news
  - SDN 2025-2026 MSU CHM thread — essay prompts, interview format, applicant experiences
  - MSU faculty directory (chm.msu.edu/directory) — for Hanna, Fleck, Roman, Stahl, Gold, Vos names and emails
  - RxKids program page + Dr. Hanna's public profile — to calibrate outreach tone
- **What was hard to find:**
  - Exact Canadian citizen matriculation count — not public. CHM publishes aggregate data but doesn't break out citizenship. Had to rely on the "explicitly eligible, treated identically" policy statement.
  - Dr. Rayamajhi's first name — MSU's interim dean announcement used initials in most press coverage. Cross-referenced with MSU Medicine org page.
  - 2026-27 specific secondary prompts — had to use 2025-26 prompts from SDN as the best available proxy. Flagged Action Item #8 to re-verify once MSU opens 2026-27 secondaries in May.
- **What to improve next time:**
  - The 3-parallel-agent pattern held up — again ~6 minutes to 3 structured research docs. Keep using it.
  - For Michigan schools specifically, always verify whether the community-campus-assignment model applies (CHM does; Wayne State doesn't; CMU has a single regional campus). Campus geography is often the essay angle.
  - When a school has just merged / restructured (like MSU Medicine on 2026-04-10), surface that news at the TOP of the plan and tell the applicant explicitly NOT to reference the old structure in essays. This was a near-miss — old sources still describe the separate colleges.
  - Always find the "existing MI doctor" unlock for Michigan schools (Dr. Godbole pattern). Every Michigan school plan should ask: "who's the existing MI physician contact?" and build it into Action Items.

### Run 4 — 2026-04-16 (Covenant HealthCare COM at CMU — Michigan Reapply #3)
- **What:** Full deep dive on Central Michigan University's med school, queued from Cosmo as "MD — Reapply" because it was school #10 on Srishti's cycle-1 list with no interview and CMU post-cycle feedback is in progress. Pre-flight: explicit instruction to learn from Run 2 (UNC deeper) + Run 3 (MSU CHM) and make this one better than both. Used the 3-parallel-agent pattern (stats/timeline, people, programs+essays) plus an expanded post-flight that updated CONTEXT.md, REAPPLICATION_PLAN.md, CLAUDE.md Open Questions, and this Run Log per new user instruction: *"make sure when we run we update all of our md files for maximum outputs every time."*
- **Result:** 10-accordion plan (Reality Check, Canadian Policy Verified, Michigan County trump card, The People, Covenant+MyMichigan partnership context, Essay Strategy, Timeline, Outreach, Interview Prep, Watch-outs) + a Breaking News banner for the rebrand + Resources block. Plan opens on the Michigan County accordion because that's her single structural advantage over the OOS pool.
- **Key findings:**
  - **HUGE institutional news (fall 2025):** School was renamed **"Covenant HealthCare College of Medicine at Central Michigan University"** after an **$80M partnership** ($40M Covenant HealthCare + $40M MyMichigan Health). Every "Central Michigan SOM" reference in our docs needed to be updated. Essays that use the old name will signal stale research instantly — flagged prominently in the plan and across all updated MD files.
  - **Leadership turnover:** Dr. George Kikano resigned March 2025. **Dr. Tina Thompson has been interim dean since 2025-05-16.** Stated priorities: rural Michigan workforce, partnership integration, student-centered curriculum. Any essay that cites Kikano as a program authority is wrong as of 2025.
  - **Canadian eligibility VERIFIED from CMU's own FAQ:** *"Applicants must be a U.S. citizen, Canadian citizen, or permanent resident of the United States or Canada."* This is pulled from the school's website, not from SDN or secondary reports. She qualifies on citizenship alone — no visa, no DACA, no F-1/OPT status needed.
  - **But: ZERO Canadian matriculants in the 2025 class.** CMU is Canadian-*eligible* but not Canadian-*statistically-friendly*. They don't filter Canadians on their end, but they don't recruit them either. **Canadian identity framing is NOT the draw here — Michigan roots are.** This is an important calibration: at MSU CHM we can lean on Canadian-friendliness as a structural positive; at CMU, we lean on Michigan-rootedness and downplay Canadian framing.
  - **OOS matriculation is 0.25% (~18 of 104 seats).** Roughly 25x harder than in-state. Her stats (3.88/517) are above their matriculant median (3.78/507) — so the rejection last cycle was almost certainly structural (OOS filter + no paid clinical at submission + no Michigan framing in secondaries), not academic.
  - **Michigan County 250-word secondary prompt is her trump card.** Most OOS applicants literally cannot answer it. She has: Farmington Hills (18 years of home), Dr. Godbole (existing MI physician relationship), Oakland County family, intent to return to SE Michigan post-residency. Ranked this as the highest-priority accordion and set it to `open` by default in the HTML.
  - **Rolling admissions means early June submit is load-bearing.** OOS seats at rolling schools shrink weekly after mid-July. A July-15 submit is significantly worse than a June-5 submit at the same stat level. Built into the timeline accordion as a hard rule.
  - **Open financial question:** Does CMU's Dean's Award or need-based aid extend to Canadian citizens? Some US MD schools require Canadian students to escrow full tuition. Added as Open Question #11 in CLAUDE.md — needs direct email to CMU admissions, not assumption.
- **Sources that worked best:**
  - CMU College of Medicine FAQ page — authoritative on Canadian eligibility (direct quote captured in the plan and CONTEXT.md)
  - AAMC MSAR entry for CMU — class size, IS/OOS ratio, matriculant GPA/MCAT medians
  - CMU College of Medicine admissions page — interim dean, office info
  - Covenant HealthCare + MyMichigan Health press coverage (fall 2025) — $80M partnership details
  - CMU CoM newsroom + Dr. Thompson interim dean announcement — leadership change dates
- **What was hard to find:**
  - Exact count of Canadian applicants vs Canadian matriculants at CMU — the "zero Canadian matriculants in 2025" number came from cross-referencing their class profile release with Canadian-friendly med school trackers. Not authoritative but strongly indicated.
  - 2026-27 specific secondary prompts — used 2025-26 prompt set as proxy (same ones Srishti completed last cycle). Flagged to re-verify in May 2026 when CMU opens new secondaries.
  - Whether CMU's interim dean Dr. Thompson has made public statements about her admissions philosophy — limited press since May 2025. Worth re-scanning closer to 2026-27 interview season.
- **What to improve next time:**
  - **3-parallel-agent pattern held up again** — third consecutive run where it produced 3 structured docs in ~6 minutes. Pattern is now standard; codify it in the playbook as the default for any full school deep dive.
  - **"Update all MD files every run" is now the standard,** per Rajat's explicit instruction this run. Every future Wanda run must update: CONTEXT.md (new findings), REAPPLICATION_PLAN.md (school entries, essay strategy), CLAUDE.md (Open Questions), and WANDA.md (this Run Log) — not just the dashboard HTML. Built the update pattern: CONTEXT.md gets a "Wanda Run N strategic notes" callout section; REAPPLICATION_PLAN.md gets the school-row rewrite + Michigan-essay-strategy update; CLAUDE.md Open Questions gets any new open questions surfaced.
  - **Verify institutional rebrands BEFORE starting the plan.** CMU's rebrand was fall 2025 — 6+ months ago — and still wasn't reflected in Srishti's cycle-1 docs or our REAPPLICATION_PLAN until this run. Add a pre-flight step: check the school's own homepage for any recent naming / leadership changes before writing the plan.
  - **For every OOS application at a Michigan school, the Michigan County / home state essay is the highest-leverage accordion.** Surface it early, set it to `open` by default, and pre-write the essay in the plan itself so the student isn't doing it cold when the secondary lands.
  - **Differentiate Canadian-friendly tiers.** MSU CHM is tier 1 (explicit policy + Canadian matriculants present). CMU is tier 2 (explicit policy, zero Canadian matriculants last year — eligible but not recruited). Wayne State is tier 3 (dedicated Canadian applicant page — probably tier 1-ish, verify in next run). Track this tiering across Michigan schools so essay framing calibrates correctly.
  - **Cross-reference previous-run facts.** Run 2 caught that UNC's office hours day had shifted and the essay word count was wrong in Run 1. This run caught that CMU's school name itself was wrong across all our docs. Always verify previous-run institutional facts against the current website before writing a new plan.

### Run 5 — 2026-04-16 (LSU Health New Orleans SOM — investigated & CUT)

- **What:** Deep dive into LSU Health New Orleans School of Medicine — the MD scout-list entry from Mr. Crocker Run 2 flagged "VERIFY — policy not published" at row 4. Target: produce a full Wanda plan if Canadian-eligible, or produce a documented CUT card (MUSC/USC Greenville pattern) if not.
- **Result:** **CUT.** Three parallel research tracks all converged on the same dealbreaker — LSU NOLA does not accept international applicants, treats Canadians without US LPR as international, and instructs Canadian secondary applicants to bring a green card to the interview. Srishti is on OPT, not LPR. Built an "Investigated & CUT" dashboard card instead of the standard 6-accordion reapply plan.
- **Key findings:**
  - **LSU's own Admissions Criteria page** states verbatim: *"Applications are not accepted from International Students."* No ambiguity, no exception clause, no "case-by-case" language. This is the primary source of truth.
  - **SDN secondary-essay thread** (multiple cycles, including recent) reports the LSU secondary asks Canadian applicants to *"bring a green card to the interview."* This confirms that LSU's definition of "international" includes Canadians without US lawful permanent residence. OPT status does not satisfy this gate.
  - **SEVP school lookup** — LSU NOLA is SEVP-certified, but their admissions policy gates eligibility before the I-20 question even matters. SEVP certification ≠ willingness to enroll Canadians.
  - **Class profile context:** 195 matriculants, 87.7% in-state, 3.86 median GPA, 510 median MCAT. Srishti's 3.88/517 is above both medians — confirms this is a **citizenship gate, not a stats gate.** No amount of application strength flips a structural policy.
  - **Tulane SOM (private, New Orleans)** is the correct Louisiana substitute. Tulane is already on Srishti's reapply list at row 5 of the MD reapply table, is citizenship-blind, and is in the exact same city. No new replacement school is needed — the infrastructure already exists on her list.
  - **Research preserved anyway.** The 3 parallel agents produced substantive content on LSU's MD/MPH, CHVE, Manning Peds, LaPQC, and global health electives. Rather than discard this work, I archived it in Accordion 3 ("what she'd be foregoing — informational only") inside a clearly-labeled INELIGIBLE banner. If LSU ever changes policy, this research is ready to use; until then, nobody re-researches it.
  - **Outreach template included** for one actionable step — Template C to Kimberly Peychaud (Admissions Director) confirming the eligibility policy in writing. This is belt-and-suspenders: the policy is already confirmed from 3 sources, but the written email gives Srishti a documented response in her file in case anyone asks.
- **Sources that worked best:**
  - LSU Health New Orleans SOM Admissions Criteria page (primary source — verbatim "no international applicants" language)
  - SDN 2025-2026 LSU NOLA secondary essay thread (pattern-confirmed: Canadian applicants receive green-card instruction)
  - SEVP school lookup (confirms certification exists but doesn't override admissions policy)
  - AAMC MSAR entry for LSU NOLA (class profile + in-state percentage + stats)
- **What was hard to find:**
  - An explicit "we do not accept Canadians specifically" statement — LSU uses the blanket "International Students" category. Had to triangulate that Canadians without LPR fall inside that category via SDN secondary behavior.
  - LSU financial aid policy for Canadian students — moot once the eligibility gate is found, but worth noting the page doesn't even address it, which is itself a signal.
- **What to improve next time:**
  - **When 3 parallel research tracks converge on a CUT verdict, build the "Investigated & CUT" variant, not the standard 6-accordion reapply plan.** Red banner at top + preserved research in collapsed accordions + single outreach template to confirm policy in writing + full source list at bottom. This matches the Mr. Crocker MUSC / USC Greenville precedent and preserves the research so nobody re-opens the question.
  - **Triangulate "no international" policies across at least 3 independent source types** (school's own website + SDN secondary reports + SEVP / AAMC data) before declaring CUT. Single-source CUT decisions are fragile; 3-source convergence is airtight.
  - **Always identify a substitute school when cutting.** LSU NOLA cuts cleanly because Tulane is already on the list in the same city. If the cut school had been in a city with no alternative, the action item would have been "find a replacement" — not just "document the cut."
  - **Citizenship-gate schools cannot be flipped by stats or essays.** Srishti's 3.88/517 is above LSU's medians, and it didn't matter. Structural gates (citizenship, residency, green-card requirement) are binary — move to CUT table without further investigation once confirmed. Don't waste a cycle hoping "maybe they'll make an exception."
  - **Open Questions table entries with "VERIFY — policy not published" are action items, not placeholders.** Row 4 of the Mr. Crocker scout list sat flagged from Run 2 (2026-04-16) until this run (same day). In future, flagged-verify entries should be triaged in the next Wanda run by default rather than lingering on the scout list.
