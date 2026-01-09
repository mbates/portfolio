# Plan: Extend Terminal Commands

## Overview

Add 4 new commands to the interactive terminal interface to improve navigation and provide quick access to key information.

## New Commands

### 1. `about`

Opens the About section in the modal dialog.

```typescript
about: () => {
  setContent('about');
  setProject('');
  setMessage('');
},
```

### 2. `skills`

Displays a formatted list of technical skills directly in the terminal.

```typescript
skills: (
  <div>
    <span className='text-yellow-200'>Frontend:</span>
    <span className='text-white'> Angular, React, Flutter, RxJS, Electron</span>
    <br />
    <span className='text-yellow-200'>Backend:</span>
    <span className='text-white'> NestJS, Symfony, PHP, Node.js, C#</span>
    <br />
    <span className='text-yellow-200'>Database:</span>
    <span className='text-white'> PostgreSQL, MySQL, DynamoDB, Aurora</span>
    <br />
    <span className='text-yellow-200'>AWS:</span>
    <span className='text-white'> EC2, Lambda, ECS, S3, CloudFront, RDS, API Gateway</span>
    <br />
    <span className='text-yellow-200'>DevOps:</span>
    <span className='text-white'> Terraform, Docker, GitHub Actions, Serverless</span>
    <br />
    <span className='text-yellow-200'>Testing:</span>
    <span className='text-white'> Jest, Cypress, PHPUnit, Karma, Jasmine</span>
    <br />
  </div>
),
```

### 3. `linkedin`

Opens LinkedIn profile in a new tab (mirrors existing `git` command pattern).

```typescript
linkedin: () => {
  window.open('https://www.linkedin.com/in/m-bates-baab51333/', '_blank')?.focus();
},
```

### 4. `contact`

Opens the contact form without a pre-filled message (shortcut alternative to `send [message]`).

```typescript
contact: () => {
  setContent('contact');
  setProject('');
  setMessage('');
},
```

## Updated Help Output

The `help` command output needs to be updated to include the new commands:

```typescript
help: (
  <div>
    help
    <span className='text-white'> show all commands</span>
    <br />
    about
    <span className='text-white'> learn more about me</span>
    <br />
    skills
    <span className='text-white'> list my technical skills</span>
    <br />
    ls
    <span className='text-white'> list the projects I've worked on</span>
    <br />
    show [project]
    <span className='text-white'> display project details</span>
    <br />
    git
    <span className='text-white'> open my github repositories</span>
    <br />
    linkedin
    <span className='text-white'> open my linkedin profile</span>
    <br />
    contact
    <span className='text-white'> open the contact form</span>
    <br />
    send [message]
    <span className='text-white'> send me a message</span>
    <br />
    clear
    <span className='text-white'> clears the console</span>
    <br />
  </div>
),
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Terminal.tsx` | Add 4 new commands to `commands` object, update `help` output |

## Implementation Steps

1. [ ] Add `about` command
2. [ ] Add `skills` command (confirm skill list with stakeholder)
3. [ ] Add `linkedin` command (get LinkedIn profile URL)
4. [ ] Add `contact` command
5. [ ] Update `help` command output with all new commands
6. [ ] Test all new commands in dev environment
7. [ ] Verify modal opens correctly for `about` and `contact`

## Open Questions

- [x] ~~What skills/technologies should be listed in the `skills` command?~~ Extracted from resume
- [x] ~~What is the LinkedIn profile URL?~~ `https://www.linkedin.com/in/m-bates-baab51333/`

## Testing

- Run `npm start` and verify each command works:
  - `about` - Opens about modal
  - `skills` - Displays skill list inline
  - `linkedin` - Opens LinkedIn in new tab
  - `contact` - Opens contact form modal
  - `help` - Shows all commands including new ones
