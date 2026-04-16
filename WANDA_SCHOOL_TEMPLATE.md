# Wanda School Template

How to add a new school to Wanda's Deep Dives page after running research.

## File to edit

`Srishti Med School /dashboard/unc.html`

All school data lives in two JavaScript objects inside the `<script>` block at the bottom of `unc.html`.

---

## Step 1: Add to `wandaSchools` array

Find the `const wandaSchools = [...]` array and add a new object. Use UNC as the reference:

```javascript
{
  id: 'wayne',                              // unique lowercase id (no spaces)
  name: 'Wayne State SOM',                  // full display name
  loc: 'Detroit, MI',                        // city, state
  color: 'from-[#0C5449] to-[#1A8A7A]',     // gradient for the card icon (pick the school's brand color)
  borderColor: 'border-[#0C5449]/20',        // border tint for the card
  tags: ['MD — Reapply', 'Michigan Ties'],   // 1-3 short tags shown on the card
  tagColors: ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-500'],  // one color per tag
  stats: {
    classSize: '~290',
    inState: '60%',         // or whatever the in-state % is
    theirGPA: '3.78',
    theirMCAT: '511',
    yourGPA: '3.88',        // Srishti's stats (always the same)
    yourMCAT: '517'
  },
  summary: 'Short 1-liner for the card. Michigan childhood, dedicated Canadian page.',
  canadian: 'Full text about their Canadian applicant policy.',
  realityCheck: 'Optional honest assessment of chances. Leave empty string if not needed.',
}
```

### Tag color options (reuse these)
- Reach: `'bg-yellow-50 text-yellow-600'`
- Reapply: `'bg-green-50 text-green-600'`
- Promoted: `'bg-blue-50 text-blue-500'`
- Special connection: `'bg-lavender-50 text-lavender-300'`
- DO: `'bg-purple-50 text-purple-500'`

---

## Step 2: Add plan HTML to `schoolPlanContent`

Find the `const schoolPlanContent = { unc: \`...\` }` object and add a new key matching the school's `id`.

```javascript
schoolPlanContent['wayne'] = `
  <!-- PASTE THE FULL PLAN HTML HERE -->
`;
```

### Plan HTML structure

The plan content goes inside the modal's scrollable Plan tab. It should follow this exact accordion structure. Copy the template below and fill in the school-specific content:

```html
<!-- Overview Banner -->
<div class="bg-gradient-to-br from-[SCHOOL_COLOR]/10 to-lavender-50 rounded-2xl p-5 mb-6 border border-[SCHOOL_COLOR]/20">
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
    <div class="bg-white/80 rounded-xl p-3 text-center">
      <div class="text-xs text-gray-400">Class Size</div>
      <div class="font-bold text-gray-700">CLASS_SIZE</div>
    </div>
    <div class="bg-white/80 rounded-xl p-3 text-center">
      <div class="text-xs text-gray-400">In-State</div>
      <div class="font-bold text-gray-700">IN_STATE_%</div>
    </div>
    <div class="bg-white/80 rounded-xl p-3 text-center">
      <div class="text-xs text-gray-400">Their GPA/MCAT</div>
      <div class="font-bold text-gray-700">GPA / MCAT</div>
    </div>
    <div class="bg-white/80 rounded-xl p-3 text-center">
      <div class="text-xs text-gray-400">Your GPA/MCAT</div>
      <div class="font-bold text-green-500">3.88 / 517</div>
    </div>
  </div>
  <!-- Optional reality check — remove if not needed -->
  <div class="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
    <p class="text-xs text-yellow-700"><strong>Reality check:</strong> HONEST_ASSESSMENT_HERE</p>
  </div>
</div>

<!-- Accordion sections -->
<div class="space-y-3">

  <!-- === SECTION: Why You Belong === -->
  <div class="border border-rose-50 rounded-2xl overflow-hidden">
    <button onclick="toggleAccordion(this)" class="accordion-head expanded w-full flex items-center justify-between px-5 py-4 text-left">
      <span class="font-bold text-gray-800 flex items-center gap-2"><span class="text-lg">&#127793;</span> Why You Belong at SCHOOL_NAME</span>
      <svg class="accordion-chevron w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div class="accordion-body open px-5 pb-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <!-- Add 2-4 cards. Each card: -->
        <div class="bg-rose-50/50 rounded-xl p-4">
          <div class="text-xl mb-1">EMOJI</div>
          <h4 class="font-bold text-gray-800 text-sm mb-1">TITLE</h4>
          <p class="text-xs text-gray-500">DESCRIPTION</p>
        </div>
        <!-- ... more cards -->
      </div>
    </div>
  </div>

  <!-- === SECTION: Programs That Fit === -->
  <div class="border border-rose-50 rounded-2xl overflow-hidden">
    <button onclick="toggleAccordion(this)" class="accordion-head w-full flex items-center justify-between px-5 py-4 text-left">
      <span class="font-bold text-gray-800 flex items-center gap-2"><span class="text-lg">&#10024;</span> Programs That Fit Your Profile</span>
      <svg class="accordion-chevron w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div class="accordion-body px-5 pb-5">
      <div class="space-y-2 mt-1">
        <!-- Add program cards. Each: -->
        <div class="bg-lavender-50/50 rounded-xl p-4 border border-lavender-100">
          <h4 class="font-bold text-gray-800 text-sm">PROGRAM_NAME</h4>
          <p class="text-xs text-gray-500 mt-1">WHY_IT_FITS</p>
        </div>
        <!-- ... more programs -->
      </div>
    </div>
  </div>

  <!-- === SECTION: People to Reach Out To === -->
  <div class="border border-rose-50 rounded-2xl overflow-hidden">
    <button onclick="toggleAccordion(this)" class="accordion-head w-full flex items-center justify-between px-5 py-4 text-left">
      <span class="font-bold text-gray-800 flex items-center gap-2"><span class="text-lg">&#128101;</span> People to Reach Out To</span>
      <svg class="accordion-chevron w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div class="accordion-body px-5 pb-5">
      <div class="mt-1 space-y-4">
        <!-- Group: Admissions -->
        <div>
          <h4 class="font-bold text-rose-400 text-xs uppercase tracking-wide mb-2">Admissions Leadership</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div class="bg-white rounded-xl p-3 border border-rose-50 shadow-soft">
              <div class="font-bold text-gray-800 text-sm">PERSON_NAME</div>
              <div class="text-xs text-rose-400 font-semibold">TITLE</div>
              <p class="text-xs text-gray-500 mt-1">WHY_RELEVANT</p>
            </div>
          </div>
        </div>
        <!-- Group: Existing Connections (if any) -->
        <!-- Group: Student Orgs -->
        <div>
          <h4 class="font-bold text-rose-400 text-xs uppercase tracking-wide mb-2">Student Organizations</h4>
          <div class="flex flex-wrap gap-2">
            <span class="bg-white rounded-full px-3 py-1.5 text-xs border border-rose-50 shadow-soft">ORG_NAME</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- === SECTION: Secondary Essay Prompts === -->
  <div class="border border-rose-50 rounded-2xl overflow-hidden">
    <button onclick="toggleAccordion(this)" class="accordion-head w-full flex items-center justify-between px-5 py-4 text-left">
      <span class="font-bold text-gray-800 flex items-center gap-2"><span class="text-lg">&#9997;</span> Secondary Essay Prompts</span>
      <svg class="accordion-chevron w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div class="accordion-body px-5 pb-5">
      <div class="space-y-3 mt-1">
        <!-- Each prompt: -->
        <div class="bg-white rounded-xl p-4 border border-rose-50 shadow-soft">
          <div class="text-xs font-bold text-rose-400 mb-1">Prompt N (WORD_LIMIT words)</div>
          <p class="text-sm text-gray-700">THE_PROMPT_TEXT</p>
          <p class="text-xs text-gray-400 mt-2 italic">Strategy: HOW_TO_ANSWER</p>
        </div>
        <!-- Reapplicant essay (always include): -->
        <div class="bg-gradient-to-br from-rose-50 to-lavender-50 rounded-xl p-4 border border-rose-200">
          <div class="text-xs font-bold text-rose-500 mb-1">Reapplicant Essay (Required)</div>
          <p class="text-sm text-gray-700 font-medium">REAPPLICANT_PROMPT</p>
          <div class="mt-2 p-3 bg-white/80 rounded-lg">
            <p class="text-xs text-gray-600"><strong>Framework:</strong></p>
            <ul class="text-xs text-gray-600 mt-1 space-y-0.5">
              <li>&#8226; <strong>Before:</strong> BEFORE_STATE</li>
              <li>&#8226; <strong>The pivot:</strong> WHAT_CHANGED</li>
              <li>&#8226; <strong>What changed:</strong> CONCRETE_GROWTH</li>
              <li>&#8226; <strong>Why SCHOOL:</strong> SCHOOL_SPECIFIC_WHY</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- === SECTION: Outreach Templates === -->
  <div class="border border-rose-50 rounded-2xl overflow-hidden">
    <button onclick="toggleAccordion(this)" class="accordion-head w-full flex items-center justify-between px-5 py-4 text-left">
      <span class="font-bold text-gray-800 flex items-center gap-2"><span class="text-lg">&#128236;</span> Outreach Templates</span>
      <svg class="accordion-chevron w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div class="accordion-body px-5 pb-5">
      <div class="space-y-3 mt-1">
        <!-- Each template: -->
        <div class="bg-white rounded-xl p-4 border border-rose-50 shadow-soft">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-bold text-gray-800 text-sm">TEMPLATE_TITLE</h4>
            <button onclick="copyEl('tpl-UNIQUE_ID')" class="copy-btn text-xs font-semibold text-rose-400 hover:text-rose-600 px-3 py-1 rounded-full border border-rose-200 hover:bg-rose-50 transition-all">Copy</button>
          </div>
          <div id="tpl-UNIQUE_ID" class="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed whitespace-pre-line">EMAIL_OR_DM_TEXT_HERE</div>
        </div>
      </div>
    </div>
  </div>

  <!-- === SECTION: Interview Format === -->
  <div class="border border-rose-50 rounded-2xl overflow-hidden">
    <button onclick="toggleAccordion(this)" class="accordion-head w-full flex items-center justify-between px-5 py-4 text-left">
      <span class="font-bold text-gray-800 flex items-center gap-2"><span class="text-lg">&#127919;</span> Interview Format</span>
      <svg class="accordion-chevron w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div class="accordion-body px-5 pb-5">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
        <div class="bg-lavender-50/50 rounded-xl p-3">
          <div class="font-bold text-gray-700 text-sm mb-1">Format</div>
          <p class="text-xs text-gray-500">INTERVIEW_FORMAT</p>
        </div>
        <div class="bg-lavender-50/50 rounded-xl p-3">
          <div class="font-bold text-gray-700 text-sm mb-1">Structure</div>
          <p class="text-xs text-gray-500">INTERVIEW_STRUCTURE</p>
        </div>
        <div class="bg-lavender-50/50 rounded-xl p-3">
          <div class="font-bold text-gray-700 text-sm mb-1">Season</div>
          <p class="text-xs text-gray-500">INTERVIEW_SEASON</p>
        </div>
      </div>
    </div>
  </div>

</div>
```

---

## Step 3: Update dashboard school name map

In `dashboard/index.html`, find the `schoolNames` object and add the new school:

```javascript
const schoolNames = { unc: 'UNC', wayne: 'Wayne State' };
```

This controls how the school label appears in the dashboard's Today's Tasks section.

---

## Sections included in every school

Every school plan MUST have these 6 accordion sections:
1. **Why You Belong** (first section, starts expanded)
2. **Programs That Fit** (collapsed by default)
3. **People to Reach Out To** (collapsed by default)
4. **Secondary Essay Prompts** (collapsed by default)
5. **Outreach Templates** (collapsed by default, each with a Copy button)
6. **Interview Format** (collapsed by default)

The first section uses `class="accordion-head expanded"` and its body uses `class="accordion-body open"`. All others omit `expanded` and `open`.

---

## How tasks and notes work

- **Tasks**: Stored per school in `localStorage` key `srishti_school_tasks` as `{ schoolId: [{id, text, done}, ...] }`. Synced to Supabase via `syncSchoolTasks()`. Auto-appear on the dashboard.
- **Notes**: Stored per school in `localStorage` key `srishti_school_notes_SCHOOLID`. Synced to Supabase via `syncNote()`.

No additional wiring needed -- the modal handles this automatically based on the school `id`.

---

## Quick checklist for agents

When adding a new school after research:

- [ ] Add object to `wandaSchools` array with unique `id`
- [ ] Add plan HTML to `schoolPlanContent[id]`
- [ ] Add school name to `schoolNames` in `index.html`
- [ ] Verify all 6 accordion sections are present
- [ ] Verify all `tpl-` IDs in outreach templates are unique
- [ ] Test: card appears on Wanda page, modal opens, all tabs work
