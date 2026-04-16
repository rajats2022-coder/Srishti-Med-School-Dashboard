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

   **E. Outreach Templates (3+ copyable messages)**
   - Email to a faculty member (personalized to the school)
   - DM to a current student
   - Email to PI/existing connection (if applicable)
   - Each must be specific enough to copy-paste with minimal edits

   **F. Interview Format**
   - What type (MMI, traditional, panel, group)?
   - Structure (how many interviews, who interviews, blinded?)
   - Season (what months, what days of week)

3. **Build the dashboard entry** — Follow `WANDA_SCHOOL_TEMPLATE.md` exactly:
   - Add school object to `wandaSchools` array
   - Add full plan HTML to `schoolPlanContent[schoolId]`
   - Add school name to `schoolNames` in `index.html`

4. **Remove from queue** — After the deep dive is complete, the school's queue card on Wanda's page will automatically show "Deep dive complete" (it checks `wandaSchools` IDs)

5. **Update the run log** — Append what was found, what was surprising, what to improve

### Quality checklist
- [ ] All 6 accordion sections present (Why Belong, Programs, People, Essays, Templates, Interview)
- [ ] First accordion section uses `expanded` + `open` classes; others don't
- [ ] All `tpl-` IDs in outreach templates are unique across all schools
- [ ] Secondary essay prompts are from the current or most recent cycle (cite source)
- [ ] At least 3 outreach templates with Copy buttons
- [ ] Reality check banner included if OOS/international odds are <5%
- [ ] School name added to `schoolNames` in `index.html`
- [ ] Card appears on Wanda page, modal opens, all 3 tabs (Plan/Tasks/Notes) work

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
