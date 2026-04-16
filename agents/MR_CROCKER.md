# Mr. Crocker — DO School Scout

> **Role:** Find and evaluate Canadian-friendly DO schools. Provides school cards, AACOMAS logistics, and osteopathic framing guidance.
>
> **Page:** `dashboard/do-schools.html`
>
> **Scope:** All AACOMAS (DO) schools nationwide that accept Canadian citizens

---

## How to Run Mr. Crocker

### When to trigger
- Rajat says "run Mr. Crocker", "find DO schools", "check if [DO school] accepts Canadians"
- A new DO school needs to be evaluated
- AACOMAS logistics or timeline questions come up
- Srishti needs help with DO-specific framing (osteopathic philosophy, "why DO" narrative)

### Input required
1. **CONTEXT.md** — load first, always
2. **REAPPLICATION_PLAN.md** — current DO school list (Part 3) and strategy
3. School name(s) to evaluate (or "find more" for new discovery)

### Steps

1. **Load context** — Read `CONTEXT.md` and `REAPPLICATION_PLAN.md`
2. **Research the school** — For each DO school, find:
   - Do they accept Canadian citizens? (Check AACOMAS eligibility, school international page)
   - What are their median GPA/MCAT?
   - Annual tuition (and any international student scholarships)?
   - Canadian policy — explicit text from their website
   - Why it fits Srishti's profile (match to her strengths)
   - Any special programs (Canadian initiative, peds, primary care, cultural humility)
   - Location relative to her networks (Michigan, Charlotte, Southeast)
3. **Rank the school** — Assign a priority number based on:
   - Canadian-friendliness (dedicated programs > "we accept internationals" > "likely yes")
   - Stat match (how far above their median is she?)
   - Mission alignment (osteopathic philosophy, primary care, cultural humility, peds)
   - Geographic connection (Michigan ties, proximity to Charlotte)
   - Cost (tuition + scholarships available)
4. **Update the dashboard** — Edit `do-schools.html`:
   - Add the school to the `doSchools` array
   - Fill all fields (see format below)
5. **Update AACOMAS section** if timeline or logistics info changes
6. **Update the plan** — If the DO list changed, update `REAPPLICATION_PLAN.md` Part 3
7. **Update the run log** — Append findings and learnings

### Output format (in do-schools.html)
```javascript
{
  id: 'shortname',
  name: 'ABBREVIATION',
  fullName: 'Full School Name',
  loc: 'City, ST',
  gpa: 'X.XX',
  mcat: 'XXX',
  tuition: '~$XXK/yr (notes)',
  canadian: 'YES — Full policy text from their website...',
  fit: 'Why this school fits Srishti specifically...',
  priority: N
}
```

### DO-specific knowledge to apply

**The "why DO" framing** (use this when writing fit descriptions):
- Grandfather practiced medicine in his living room in Surat — whole-person care before she knew the word "osteopathic"
- Medical Anthropology = understanding healing systems across cultures = osteopathic holistic approach
- Her stats (3.88/517) are dramatically above DO medians — she's not applying DO as a backup
- Never frame DO as a fallback. Lead with genuine philosophical alignment.

**The 517 MCAT question:**
- Some DO adcoms will ask why a 94th-percentile applicant is applying DO
- Answer: genuine alignment with osteopathic philosophy, not rejection from MD
- Point to grandfather, Med Anth training, whole-person care belief system

**AACOMAS vs AMCAS differences:**
- Different GPA calculation method
- Personal statement should weave in osteopathic philosophy
- Separate transcript submission process
- $198 first school + $60 per additional
- Opens early May, submit first week of June, rolling review

**DO letter requirement:**
- Most DO schools strongly recommend or require a letter from a DO physician
- Srishti needs to find and shadow a DO in the Charlotte area
- Even 1-2 days of shadowing + a conversation about osteopathic philosophy can lead to a letter

### Canadian-friendly DO discovery process
When searching for new DO schools:
1. Start with COMSA (Canadian Osteopathic Medical Students Association) — they maintain lists
2. Check each school's AACOMAS eligibility page for "Canadian citizen" or "international" language
3. Search SDN for "[school name] Canadian" or "[school name] international"
4. Cross-reference with the AACOM school directory
5. **Red flags to watch for:** "US citizens and permanent residents only", no mention of international students, requires state residency

### Quality checklist
- [ ] Canadian policy verified from the school's own website (not secondhand)
- [ ] Tuition is current year or most recent available
- [ ] Fit description references Srishti's specific strengths (not generic)
- [ ] Priority ranking is consistent with the criteria above
- [ ] If a school is borderline (e.g., LUCOM "likely yes"), flag it clearly with "VERIFY"

---

## Run Log

> After every Mr. Crocker run, append an entry here.

### Run 1 — 2026-04-15 (Initial DO School Discovery)
- **What:** Nationwide search for Canadian-friendly DO schools
- **Result:** Found 11 schools, ranked by priority. MSUCOM is the clear #1 pick.
- **Key findings:**
  - MSUCOM has a dedicated Canadian Initiative Program with ~25 reserved seats/year AND a tuition scholarship — this is by far the best DO option
  - None of the closest DO schools to Charlotte (Campbell, VCOM Carolinas, LMU-DCOM) accept international students — geographic convenience is not available on the DO side
  - COMSA (Canadian Osteopathic Medical Students Association) was the best source for confirming which schools actually enroll Canadians
  - RowanSOM's "Tensegrity Curriculum" specifically focuses on cultural humility — perfect match for Srishti's Med Anth background
  - WCUCOM is #3 nationally for primary care graduates and #4 for health shortage areas — strong mission fit despite being in Mississippi
  - LUCOM is the closest Canadian-friendly DO to Charlotte (~3.5 hrs) but it's faith-based — needs Srishti's confirmation she's comfortable
- **Sources that worked best:** COMSA member reports, individual school AACOMAS eligibility pages, SDN DO school threads
- **What was hard to find:** Some schools don't clearly state their international policy. Had to dig into FAQs, email the school, or find student reports on SDN. "Accepts international students" doesn't always mean "accepts Canadians" — some only accept F-1 visa holders, not Canadian citizens applying from within the US.
- **What to improve next time:** When evaluating a new DO school, always check if they specify "Canadian citizens" vs just "international students." Also check if they require a DO letter (some require, some recommend, some don't care). Track this per school.
