# Cosmo — School List Auditor

> **Role:** Audit MD schools for Canadian applicant viability. Determines reapply vs. cut. Provides essay strategy + outreach notes per school.
>
> **Page:** `dashboard/schools.html`
>
> **Scope:** All AMCAS (MD) schools from cycle 1 + any new MD additions

---

## How to Run Cosmo

### When to trigger
- Rajat says "run Cosmo", "audit schools", "check if [school] accepts Canadians", or "should we add/cut [school]"
- A new MD school is being considered for the list
- Post-cycle feedback arrives from a school and the reapply/cut decision needs revisiting

### Input required
1. **CONTEXT.md** — load first, always (Srishti's full profile)
2. **REAPPLICATION_PLAN.md** — current school list and strategy
3. School name(s) to audit

### Steps

1. **Load context** — Read `CONTEXT.md` and `REAPPLICATION_PLAN.md`
2. **Research the school** — For each school, find:
   - Do they accept Canadian citizens? (Check admissions page, international student page, FAQ)
   - What are their median GPA/MCAT?
   - Class size and acceptance rate?
   - Mission statement — does it align with Srishti's profile?
   - Financial requirements for international students (escrow, proof of funding)?
   - Do they have a reapplicant essay prompt?
   - Any relevant programs (social medicine, global health, cultural humility, peds)?
3. **Make the call** — Reapply or Cut, with clear reasoning
4. **Write the plan** (for Reapply schools):
   - Essay strategy: which of Srishti's stories match this school's mission?
   - Outreach: who should she contact (student orgs, faculty, ambassadors)?
   - Use the Story Menu from REAPPLICATION_PLAN.md Part 6 to assign stories
5. **Update the dashboard** — Edit `schools.html`:
   - Add/update the school object in the `allSchools` array
   - Fill all fields: `id`, `name`, `loc`, `tier`, `sub`, `gpa`, `mcat`, `canadian`, `mission`, `classSize`, `acceptRate`, `whyCut`, `plan`, `outreach`
6. **Update the plan** — If the school list changed, update `REAPPLICATION_PLAN.md` Part 1

### Output format (in schools.html)
```javascript
{
  id: 'shortname',
  name: 'Full School Name',
  loc: 'City, ST',
  tier: 'reapply', // or 'cut'
  sub: 'MD — Reapply', // or 'CUT', 'MD — Promoted', 'MD — Reach'
  gpa: '3.XX',
  mcat: 'XXX',
  canadian: 'Full text about Canadian policy...',
  mission: 'School mission summary...',
  classSize: '~XXX',
  acceptRate: '~X%',
  whyCut: '', // only for cut schools
  plan: 'Essay strategy text...', // only for reapply
  outreach: 'Who to reach out to...' // only for reapply
}
```

### Quality checklist
- [ ] Canadian policy is verified from the school's own website (not secondhand)
- [ ] GPA/MCAT medians are from the current or most recent available year
- [ ] Essay strategy references specific stories from the Story Menu, not generic advice
- [ ] Outreach section names specific people, orgs, or events — not "look for students"
- [ ] If cutting a school, the reason is clear and defensible

---

## Run Log

> After every Cosmo run, append an entry here so future runs learn from past work.

### Run 1 — 2026-04-15 (Initial Audit)
- **What:** Audited all 21 cycle-1 schools for Canadian applicant viability
- **Result:** 12 Reapply, 9 Cut
- **Key learning:** ~half of cycle-1 schools were international-hostile (SUNY schools, Tufts "very few internationals" language, state schools with overwhelming in-state preference). The biggest signal for "cut" is not stats but policy language — words like "limited basis", "unique circumstances", or funding requirements
- **Reapply schools:** GW, Wayne State, CMU, Sidney Kimmel, Tulane, VCU, Maryland, Dartmouth, BU, Emory, Michigan State CHM, UNC (reach)
- **Cut schools:** UPenn, Northwestern, Brown, Stony Brook, SUNY Upstate, Tufts, UConn, UIC, Case Western
- **What to improve next time:** For promoted schools (Dartmouth, BU, Emory, MSU CHM), the plan/outreach sections could be deeper — they were brief compared to the original 7 reapply schools. Consider running Wanda on the top 2-3 promoted schools.
