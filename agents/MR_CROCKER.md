# Mr. Crocker — MD + DO School Scout (dual-track)

> **Role:** Find and evaluate Canadian-friendly MD **and** DO schools outside Cosmo's core 12 list. Provides school cards, AACOMAS + AMCAS logistics, and osteopathic framing guidance. Ships candidates to Wanda for deep dives.
>
> **Page:** `dashboard/do-schools.html`
>
> **Scope:**
> - **DO track** — All AACOMAS schools nationwide that accept Canadian citizens (primary mission, original charter)
> - **MD track** — New MD candidates outside Cosmo's list, researched when Srishti/Rajat flag a school or ask for alternatives. Verified for Canadian policy. Shipped to Wanda with `type: 'MD'`.
> - **Cut track** — Any school (MD or DO) that is a verified dealbreaker for a Canadian on OPT. Documented in a "Investigated & Cut" callout so nobody re-researches them.

---

## How to Run Mr. Crocker

### When to trigger
- Rajat says "run Mr. Crocker", "find DO schools", "check if [school] accepts Canadians"
- A new MD or DO school needs to be evaluated (Srishti asks about a specific school, or we need to expand the list)
- AACOMAS/AMCAS logistics or timeline questions come up
- Srishti needs help with DO-specific framing (osteopathic philosophy, "why DO" narrative)
- A school needs to be verified as a dealbreaker or cut — document it here so the Cut callout stays accurate

### Input required
1. **CONTEXT.md** — load first, always
2. **REAPPLICATION_PLAN.md** — current DO school list (Part 3) and strategy
3. School name(s) to evaluate (or "find more" for new discovery)

### Steps

1. **Load context** — Read `CONTEXT.md` and `REAPPLICATION_PLAN.md`. Check what's already on Cosmo's list (`schools.html` → `allSchools`) so you don't duplicate MD candidates.
2. **Classify the school** — First question: is it MD or DO? This determines the track (and the data array you'll write to).
3. **Research the school** — Regardless of track, find:
   - Do they accept Canadian citizens? (Primary source: their own international applicants / eligibility page. Confirm SEVP I-17 approval for F-1 issuance. Never accept SDN alone as confirmation.)
   - What are their median GPA/MCAT?
   - Annual tuition (and any international student scholarships)?
   - Canadian policy — explicit text from their website
   - Why it fits Srishti's profile (match to her strengths)
   - Any special programs (Canadian initiative, peds, primary care, cultural humility, global health)
   - Location relative to her networks (Michigan, Charlotte, Southeast)
4. **Rank the school** — Assign a priority number within its own list (MD or DO) based on:
   - Canadian-friendliness (dedicated programs > "we accept internationals" > "likely yes" > "verify")
   - Stat match (how far above their median is she?)
   - Mission alignment (osteopathic philosophy, primary care, cultural humility, peds, global health)
   - Geographic connection (Michigan ties, proximity to Charlotte)
   - Cost (tuition + scholarships available)
5. **Three possible outcomes:**
   - **Ship to dashboard** — School is Canadian-eligible and a plausible target. Add to the appropriate array (`doSchools` or `mdSchools`) in `do-schools.html`.
   - **VERIFY flag** — Policy is ambiguous or unpublished. Ship it but mark `canadian` starting with `VERIFY` or `LIKELY` so the card shows a yellow VERIFY chip.
   - **Cut** — Verified dealbreaker (e.g., green card required, no SEVP I-17, US-citizens-only). Add to the "Investigated & Cut" callout section so we never waste time re-researching.
6. **Update the dashboard** — Edit `do-schools.html`:
   - DO school → append to `doSchools` array
   - MD school → append to `mdSchools` array (renders in green section)
   - Cut school → add a card inside the SC/Cut callout section with a one-line dealbreaker reason + primary source
7. **Update AACOMAS section** if timeline or logistics info changes
8. **Update the plan** — If either list changed, update `REAPPLICATION_PLAN.md` (DO list in Part 3, MD list at the MD candidates section)
9. **Update the run log** — Append findings and learnings

### Output format (in do-schools.html)

Same shape for `doSchools[]` and `mdSchools[]`:

```javascript
{
  id: 'shortname',              // DO: 'shortname' | MD: 'shortname-md' (suffix distinguishes)
  name: 'ABBREVIATION',
  fullName: 'Full School Name',
  loc: 'City, ST',
  gpa: 'X.XX',
  mcat: 'XXX',
  tuition: '~$XXK/yr (notes)',
  canadian: 'YES — Full policy text from their website...',   // or 'VERIFY — ...' / 'LIKELY YES — ...'
  fit: 'Why this school fits Srishti specifically...',
  priority: N                   // ranked within its own track
}
```

**Ship-to-Wanda contract.** Every card has a "Plan for Wanda" button that pushes this shape onto `srishti_wanda_queue`:

```javascript
{
  id, name, loc,
  type: 'MD' | 'DO',            // determines Wanda's green/lavender chip
  source: 'crocker',
  addedAt: ISO timestamp
}
```

Wanda's queue renderer (`unc.html`) already discriminates on `type` + `source`. If you change the queue item shape here, update Wanda's renderer too.

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

### Run 3 — 2026-04-16 (LSU NOLA reconciled after Wanda CUT verdict)
- **What:** Wanda Run 5 verified LSU NOLA is not Canadian-eligible (Admissions Criteria page + SDN-confirmed "bring a green card to the interview"). Run 2 had shipped LSU to `mdSchools[]` with a VERIFY flag — that flag has now been resolved to CUT. This run reconciles Mr. Crocker's page with Wanda's verdict so the two pages never disagree.
- **Result:**
  - Removed `lsu-nola-md` from the `mdSchools[]` array in `do-schools.html` (Pritzker promoted to priority 4).
  - Added an LSU NOLA card to the Investigated & Cut callout alongside MUSC and USC Greenville. Section header generalized from "South Carolina Schools — Investigated & Cut" to "Investigated & Cut" since it's no longer SC-only.
  - Confirmed Wanda's queue auto-cleanup filters `lsu-nola` on render (see `unc.html` `renderQueue`), so the queue card no longer lingers as "Deep dive complete."
- **Key findings:**
  - VERIFY flags on the scout list are action items with a shelf life. LSU's VERIFY sat on the page from Run 2 (2026-04-16) until Wanda investigated it the same day. Going forward: every VERIFY flag Mr. Crocker ships should either be resolved in the next Wanda run or escalated to Rajat for an eligibility email.
  - When Wanda issues a CUT verdict on a school Mr. Crocker shipped, both pages must flip together: remove from the active scout array, add to the Cut callout with a primary-source citation, cross-link to Wanda's archived research. This run codifies that contract.
- **What to improve next time:**
  - Before shipping a VERIFY-flagged school to the dashboard, estimate how much runway the VERIFY buys. If the question can be resolved by one email to admissions, resolve it during the Crocker run rather than deferring to Wanda.
  - When a CUT verdict comes in, check whether the SC section header still fits or needs to be generalized — Investigated & Cut is state-agnostic and will hold future CUTs regardless of geography.

### Run 2 — 2026-04-16 (Dual-track expansion: MUSC/USC verdicts + MD scout + 3 new DO)
- **What:** Supercharged run per Rajat. Scope expanded from DO-only to **MD + DO + Cut**. Investigated MUSC and USC Greenville (Srishti's asks), scouted 5 new Canadian-friendly MD candidates, and found 3 additional DO schools to round out the list. All research anchored to Srishti's Canadian-on-OPT status, 3.88/517 stats, Michigan + Charlotte networks, and her story arc.
- **Result:**
  - **MUSC (Charleston, SC) → CUT.** Requires US citizenship or lawful permanent resident (green card). OPT does not qualify. Documented in the new SC Dealbreaker callout on `do-schools.html`.
  - **USC SOM Greenville → CUT.** No SEVP I-17 approval → cannot legally issue I-20 to Canadian citizen. Same for USC Columbia. Documented alongside MUSC.
  - **5 MD schools added** (new `mdSchools[]` array): Howard COM, Mount Sinai Icahn, Vanderbilt, LSU NOLA (VERIFY flag), UChicago Pritzker. Green chips in the UI; ship to Wanda with `type: 'MD'`.
  - **3 DO schools added** to `doSchools[]`: Marian WCOM (new #2), RVUCOM, MCOM. Priority numbers in the DO list renumbered 1→14.
- **Key findings:**
  - Howard COM is probably the single most profile-aligned addition — HBCU + mission + her Med Anth background + international-friendly. Stats-wise she dominates their median.
  - Mount Sinai Icahn's stats align almost exactly with hers (3.83/519 vs 3.88/517). Icahn + their cultural affairs programming is a genuine match, not a stretch.
  - LSU NOLA's international policy is *not published*. Flagged VERIFY. Must email before investing in secondary.
  - Marian WCOM (Indianapolis) jumps directly into the #2 DO slot behind MSUCOM — Midwest proximity to Michigan family, Franciscan service mission, confirmed Canadian acceptance.
  - The SC investigation was worth documenting in-UI. Both MUSC and USC Greenville come up in SDN threads as "maybe" — they are not. Now the answer is one glance away.
- **Sources that worked best:**
  - Primary: each school's own admissions eligibility / international applicants page
  - SEVP school lookup (for verifying I-17 approval — killed USC Greenville instantly)
  - AAMC MSAR for MD medians
  - COMSA for DO cross-confirmation (remains the single best DO-Canadian source)
- **What was hard:**
  - Several schools publish nothing about Canadian citizens specifically — only "international students." SEVP I-17 status is the cleanest tie-breaker when the website is vague.
  - LSU NOLA really does not publish a clear international policy. Needs a direct email.
- **What to improve next time:**
  - Always check SEVP school lookup early in the research — it catches dealbreakers (like USC Greenville) before you waste time on fit analysis.
  - When scouting MD schools, cross-check against Cosmo's `allSchools` array to avoid duplicating schools already on the core reapply list.
  - Maintain the Cut callout actively — any school Srishti asks about that turns out to be a dealbreaker goes in there with a primary-source citation, so the answer is documented once and never re-researched.
  - The `type: 'MD' | 'DO'` field on the queue item is how Wanda discriminates visually. Never ship a card without it.

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
