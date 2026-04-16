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
