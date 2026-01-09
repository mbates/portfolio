# Plan: Testing Setup

## Overview

Set up a testing framework with Vitest (Vite-native test runner) and React Testing Library to enable unit and integration testing for components.

## Issues Addressed

| ID | Severity | Issue |
|----|----------|-------|
| T1 | Critical | No test coverage - no test files exist |
| T2 | High | No testing framework configured |
| T3 | Medium | No test scripts in package.json |

## Changes

### 1. Install Testing Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8
```

### 2. Update Vite Config

**File:** `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/main.tsx',
      ],
    },
  },
});
```

### 3. Create Test Setup File

**File:** `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

### 4. Update TypeScript Config for Vitest

**File:** `tsconfig.app.json` (add to compilerOptions)

```json
{
  "compilerOptions": {
    // ... existing options
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

### 5. Add Test Scripts to package.json

**File:** `package.json` (add to scripts)

```json
{
  "scripts": {
    "start": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

### 6. Create Test Files

**File:** `src/components/__tests__/Contact.test.tsx`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact';

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

import axios from 'axios';

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact form with all fields', () => {
    render(<Contact message="" />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('pre-fills message when provided', () => {
    render(<Contact message="Hello from terminal" />);

    expect(screen.getByLabelText(/message/i)).toHaveValue('Hello from terminal');
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();
    render(<Contact message="" />);

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/this field is required/i)).toBeInTheDocument();
  });

  it('shows error for invalid email', async () => {
    const user = userEvent.setup();
    render(<Contact message="" />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    const user = userEvent.setup();
    vi.mocked(axios.post).mockResolvedValueOnce({ data: {} });

    render(<Contact message="" />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone/i), '555-1234');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/thanks, your message has been sent/i)).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    const user = userEvent.setup();
    vi.mocked(axios.post).mockRejectedValueOnce(new Error('Network error'));

    render(<Contact message="" />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/error!/i)).toBeInTheDocument();
    });
  });
});
```

**File:** `src/components/__tests__/About.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../About';

describe('About', () => {
  it('renders about content', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText(/full stack engineering/i)).toBeInTheDocument();
  });

  it('contains contact link', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /mbates@bates-solutions.com/i })).toBeInTheDocument();
  });
});
```

**File:** `src/components/__tests__/Spinner.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('renders svg spinner', () => {
    const { container } = render(<Spinner />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('animate-spin');
  });
});
```

**File:** `src/components/__tests__/Project.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Project from '../Project';

describe('Project', () => {
  it('renders Casechek project', () => {
    render(
      <BrowserRouter>
        <Project project="casechek" />
      </BrowserRouter>
    );

    expect(screen.getByText(/casechek inc/i)).toBeInTheDocument();
  });

  it('renders OpsKwan project', () => {
    render(
      <BrowserRouter>
        <Project project="opskwan" />
      </BrowserRouter>
    );

    expect(screen.getByText(/opskwan/i)).toBeInTheDocument();
  });

  it('renders Mickles project', () => {
    render(
      <BrowserRouter>
        <Project project="mickles" />
      </BrowserRouter>
    );

    expect(screen.getByText(/mickles canning/i)).toBeInTheDocument();
  });

  it('renders Bates project', () => {
    render(
      <BrowserRouter>
        <Project project="bates" />
      </BrowserRouter>
    );

    expect(screen.getByText(/bates solutiuons/i)).toBeInTheDocument();
  });

  it('renders nothing for unknown project', () => {
    const { container } = render(
      <BrowserRouter>
        <Project project="unknown" />
      </BrowserRouter>
    );

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
```

### 7. Update CI/CD to Run Tests

**File:** `.github/workflows/ci.deploy.yml` (update build job)

```yaml
build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        cache: npm
    - run: npm ci
    - run: npm run test:run
    - run: npm run build
```

## Files to Create/Modify

| File | Action |
|------|--------|
| `package.json` | Add test dependencies and scripts |
| `vite.config.ts` | Add Vitest configuration |
| `tsconfig.app.json` | Add Vitest types |
| `src/test/setup.ts` | Create test setup file |
| `src/components/__tests__/Contact.test.tsx` | Create Contact tests |
| `src/components/__tests__/About.test.tsx` | Create About tests |
| `src/components/__tests__/Spinner.test.tsx` | Create Spinner tests |
| `src/components/__tests__/Project.test.tsx` | Create Project tests |
| `.github/workflows/ci.deploy.yml` | Add test step |

## Implementation Steps

1. [ ] Install testing dependencies
2. [ ] Update `vite.config.ts` with test configuration
3. [ ] Update `tsconfig.app.json` with Vitest types
4. [ ] Create `src/test/setup.ts`
5. [ ] Create `src/components/__tests__/` directory
6. [ ] Create `Contact.test.tsx`
7. [ ] Create `About.test.tsx`
8. [ ] Create `Spinner.test.tsx`
9. [ ] Create `Project.test.tsx`
10. [ ] Update `package.json` with test scripts
11. [ ] Update CI/CD workflow to run tests
12. [ ] Run `npm run test` to verify all tests pass
13. [ ] Run `npm run test:coverage` to check coverage

## Testing

```bash
# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:run

# Run with coverage report
npm run test:coverage

# Run with UI (optional)
npm run test:ui
```

## Expected Coverage

Initial test suite should cover:
- Contact form rendering and validation
- Contact form submission success/failure
- About component rendering
- Spinner component rendering
- Project component routing

Target: >70% coverage for components
