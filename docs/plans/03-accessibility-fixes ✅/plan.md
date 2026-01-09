# Plan: Accessibility Fixes

## Overview

Address accessibility issues to ensure the portfolio meets WCAG 2.1 AA standards, including missing alt text, semantic HTML, ARIA labels, and keyboard navigation.

## Issues Addressed

| ID | Severity | Issue | File |
|----|----------|-------|------|
| A1 | Critical | Images missing alt text | Multiple project files |
| A2 | Critical | Dialog missing ARIA labels | HomePage.tsx |
| A3 | Critical | Non-semantic close button (span instead of button) | HomePage.tsx |
| A4 | High | Form inputs missing id attributes | Contact.tsx |
| A5 | High | Tab images in dialog missing alt text | HomePage.tsx |
| A6 | Medium | Color-only affordance in window buttons | HomePage.tsx |

## Changes

### 1. Add Alt Text to Project Images

**File:** `src/projects/Casechek.tsx`

```tsx
// Line 12
<img src={Logo} alt="Casechek logo" />
```

**File:** `src/projects/OpsKwan.tsx`

```tsx
// Line 6
<img src={Logo} className='float-right' alt="OpsKwan logo" />
```

**File:** `src/projects/Mickles.tsx`

```tsx
// Line 14
<img src={MandisMicklesLogo} alt="Mandi's Mickles logo" />

// Line 49
<img src={MandisMicklesLogo} className='w-6 h-6 mt-1 mr-1' alt="Mandi's Mickles logo" />

// Line 57
<img src={MicklesKithcenLogo} className='w-6 h-6 mt-1 mr-1' alt="Mickles Kitchen logo" />

// Line 65
<img src={LotusLogo} className='w-6 h-6 mt-1 mr-1' alt="Lotus Bodywork logo" />
```

**File:** `src/projects/Bates.tsx`

```tsx
// Line 46
<img src={GithubLogo} className='w-6 mr-1' alt="GitHub logo" />

// Line 65
<img src={GithubLogo} className='w-6 mr-1' alt="GitHub logo" />

// Line 78
<img src={GithubLogo} className='w-6 mr-1' alt="GitHub logo" />

// Line 88
<img src={GithubLogo} className='w-6 mr-1' alt="GitHub logo" />
```

### 2. Add Alt Text to Dialog Tab Images

**File:** `src/pages/HomePage.tsx`

```tsx
// Line 66
<img src={CasechekLogo} className='w-4 h-4 mt-1 mr-1' alt="Casechek logo" />

// Line 72
<img src={OpsKwanLogo} className='w-4 h-4 mt-1 mr-1' alt="OpsKwan logo" />

// Line 78
<img src={MandisMicklesLogo} className='w-4 h-4 mt-1 mr-1' alt="Mandi's Mickles logo" />

// Line 84
<img src={BatesLogo} className='w-4 h-4 mt-1 mr-1' alt="Bates Solutions logo" />
```

### 3. Add ARIA Labels to Dialog

**File:** `src/pages/HomePage.tsx`

```tsx
<dialog
  ref={dialogRef}
  className='animated-dialog rounded-lg w-full h-200 max-w-240 mt-10 justify-self-center shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm'
  aria-label='Project details'
  aria-modal='true'
>
```

### 4. Convert Close Button to Semantic HTML

**File:** `src/pages/HomePage.tsx`

Replace the span close button:

```tsx
// Before (lines 58-61)
<span
  className='w-3 h-3 rounded-full bg-red-400 cursor-pointer'
  onClick={clearProject}
></span>

// After
<button
  type='button'
  className='w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300'
  onClick={clearProject}
  aria-label='Close dialog'
></button>
```

### 5. Add IDs to Form Inputs

**File:** `src/components/Contact.tsx`

```tsx
// Name input (line 57-60)
<input
  id='name'
  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
  {...register('name', { required: true })}
/>

// Email input (line 73-82)
<input
  id='email'
  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
  {...register('email', {
    required: true,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  })}
/>

// Phone input (line 100-102)
<input
  id='phone'
  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
  {...register('phone')}
/>

// Message textarea (line 112-117)
<textarea
  id='message'
  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
  rows={4}
  defaultValue={message}
  {...register('message', { required: true })}
/>
```

### 6. Add ARIA Labels to Decorative Window Buttons

**File:** `src/pages/HomePage.tsx`

```tsx
<div className='w-full rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3'>
  <button
    type='button'
    className='w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300'
    onClick={clearProject}
    aria-label='Close dialog'
  ></button>
  <span
    className='w-3 h-3 rounded-full bg-yellow-400'
    aria-hidden='true'
  ></span>
  <span
    className='w-3 h-3 rounded-full bg-green-400'
    aria-hidden='true'
  ></span>
  {/* ... rest of tab content */}
</div>
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/projects/Casechek.tsx` | Add alt text to logo image |
| `src/projects/OpsKwan.tsx` | Add alt text to logo image |
| `src/projects/Mickles.tsx` | Add alt text to 4 images |
| `src/projects/Bates.tsx` | Add alt text to 4 GitHub logo images |
| `src/pages/HomePage.tsx` | Add ARIA labels, fix close button, add alt text to tab images |
| `src/components/Contact.tsx` | Add id attributes to form inputs |

## Implementation Steps

1. [ ] Update `src/projects/Casechek.tsx` - add alt text
2. [ ] Update `src/projects/OpsKwan.tsx` - add alt text
3. [ ] Update `src/projects/Mickles.tsx` - add alt text to 4 images
4. [ ] Update `src/projects/Bates.tsx` - add alt text to 4 images
5. [ ] Update `src/pages/HomePage.tsx`:
   - Add `aria-label` and `aria-modal` to dialog
   - Convert close span to button with aria-label
   - Add `aria-hidden` to decorative yellow/green spans
   - Add alt text to 4 tab logo images
6. [ ] Update `src/components/Contact.tsx` - add id to all form inputs
7. [ ] Test with keyboard navigation (Tab, Enter, Escape)
8. [ ] Test with screen reader (optional but recommended)

## Testing

### Manual Testing
- Tab through the page - all interactive elements should be focusable
- Press Escape while dialog is open - should close
- Press Enter on close button - should close dialog
- Verify all images have alt text in browser dev tools

### Automated Testing
```bash
# Install axe-core for accessibility testing (optional)
npm install -D @axe-core/cli

# Run accessibility audit
npx axe http://localhost:5173
```

### Screen Reader Testing (Optional)
- Test with VoiceOver (Mac) or NVDA (Windows)
- Verify images are announced with descriptive text
- Verify dialog is announced as a modal
- Verify close button is announced as "Close dialog, button"
