# Plan: Security Hardening

## Overview

Address critical security vulnerabilities in the frontend and backend code, including hardcoded secrets, input validation, and error handling.

## Issues Addressed

| ID | Severity | Issue |
|----|----------|-------|
| S1 | Critical | Hardcoded API endpoint in Contact.tsx |
| S2 | Critical | `any` type in error handling |
| S3 | High | Console.log in production code |
| S4 | Medium | Typo in button class name |
| S5 | Medium | Form not reset after successful submission |
| S6 | Medium | Button not disabled while sending |

## Changes

### 1. Create Environment Variable for API URL

**File:** `.env.example` (new)

```env
VITE_API_URL=https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/api/portfolio-message
```

**File:** `.env` (new, gitignored)

```env
VITE_API_URL=https://427im0p45b.execute-api.us-east-1.amazonaws.com/api/portfolio-message
```

**File:** `.gitignore` (add)

```
.env
.env.local
```

### 2. Update Contact.tsx

**File:** `src/components/Contact.tsx`

```typescript
import { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import Spinner from './Spinner';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

interface ContactProps {
  message: string;
}

const Contact: React.FC<ContactProps> = ({ message }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSending(true);
      setSent(false);
      setError('');
      await axios.post(import.meta.env.VITE_API_URL, data);
      setSending(false);
      setSent(true);
      reset();
    } catch (e: unknown) {
      setSending(false);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  // ... rest of component with button changes below
};
```

Key changes:
- Use `import.meta.env.VITE_API_URL` instead of hardcoded URL
- Change `e: any` to `e: unknown` with proper type guard
- Remove `console.log` and `console.error` statements
- Add `reset()` call after successful submission
- Clear error state on new submission

### 3. Update Submit Button

**File:** `src/components/Contact.tsx` (button section)

```tsx
<div className='mb-4'>
  <button
    className='bg-orange-800 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded cursor-pointer flex disabled:opacity-50 disabled:cursor-not-allowed'
    type='submit'
    disabled={sending}
  >
    {sending && <Spinner />}
    <span>{sending ? 'Sending...' : 'Send'}</span>
  </button>
  {sent && (
    <span className='text-green-600'>
      Thanks, your message has been sent.
    </span>
  )}
  {error && <span className='text-red-600'>Error! {error}</span>}
</div>
```

Key changes:
- Fix typo: `hover:bg-orangwe-900` → `hover:bg-orange-900`
- Add `disabled={sending}` to prevent double submission
- Add disabled styles: `disabled:opacity-50 disabled:cursor-not-allowed`
- Change button text to "Sending..." while in progress

### 4. Update GitHub Actions for Environment Variables

**File:** `.github/workflows/ci.deploy.yml` (add to deploy job)

```yaml
- name: Create .env file
  run: |
    echo "VITE_API_URL=${{ secrets.VITE_API_URL }}" >> .env
```

Add this step before the build step.

### 5. Add TypeScript Environment Type Declaration

**File:** `src/vite-env.d.ts` (update)

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Files to Modify

| File | Action |
|------|--------|
| `src/components/Contact.tsx` | Update API URL, error handling, button |
| `src/vite-env.d.ts` | Add environment type declarations |
| `.env.example` | Create with placeholder |
| `.env` | Create with actual value (gitignored) |
| `.gitignore` | Add .env files |
| `.github/workflows/ci.deploy.yml` | Add env file creation step |

## Implementation Steps

1. [ ] Create `.env.example` with placeholder API URL
2. [ ] Create `.env` with actual API URL
3. [ ] Update `.gitignore` to exclude `.env`
4. [ ] Update `src/vite-env.d.ts` with environment types
5. [ ] Update `src/components/Contact.tsx`:
   - Replace hardcoded URL with env var
   - Fix `any` type to `unknown`
   - Remove console statements
   - Add form reset on success
   - Fix button typo
   - Add disabled state to button
6. [ ] Update `.github/workflows/ci.deploy.yml` to create .env from secrets
7. [ ] Add `VITE_API_URL` to GitHub repository secrets
8. [ ] Test locally with `npm start`
9. [ ] Verify form submission works
10. [ ] Verify button disables during submission
11. [ ] Verify form resets after success

## Testing

- Run `npm start` and test contact form
- Verify button shows "Sending..." and is disabled during submission
- Verify form clears after successful submission
- Verify error message displays properly on failure
- Run `npm run build` to ensure env var is bundled correctly

## GitHub Secret Required

Add to repository settings → Secrets → Actions:
- `VITE_API_URL`: `https://427im0p45b.execute-api.us-east-1.amazonaws.com/api/portfolio-message`
