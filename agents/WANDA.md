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
  - UNC has Friday virtual office hours at 11 AM — this is the single most actionable outreach opportunity
  - Dr. Lisa Rahangdale is both Associate Dean for Admissions AND an OB/GYN professor — directly relevant to Srishti's women's health interest
  - The Kenan Urban Primary Care Scholars Program is partly based in Charlotte where Srishti currently works — huge "why UNC" point
  - Department of Social Medicine is the direct academic home for her Med Anth background
  - OOS acceptance rate is ~1-2% — this is a reach, but a meaningful one because of real institutional connections
- **Sources that worked best:** UNC SOM website (programs, faculty), SDN 2025-2026 thread (essay prompts, interview format), Instagram @unc.som and @uncsom_charlotte (student orgs)
- **What was hard to find:** Exact secondary prompts required cross-referencing SDN with the school portal. Interview format details were scattered across SDN posts.
- **What to improve next time:** Start by searching SDN for the school's thread — it usually has everything (prompts, interview format, student experiences) in one place. Also search for "[school] Canadian student" to find any international student experiences.
