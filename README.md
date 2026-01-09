# Bates Solutions Portfolio

[![Build & Deploy](https://github.com/mbates/portfolio/actions/workflows/ci.deploy.yml/badge.svg)](https://github.com/mbates/portfolio/actions/workflows/ci.deploy.yml)
[![Tests](https://img.shields.io/badge/tests-44%20passing-brightgreen)](https://github.com/mbates/portfolio)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Personal portfolio website for [bates-solutions.com](https://bates-solutions.com), built with React and deployed to AWS.

## Tech Stack

| Frontend | Backend | Infrastructure |
|----------|---------|----------------|
| React 19 | AWS Lambda | S3 + CloudFront |
| TypeScript | SES (Email) | API Gateway |
| Tailwind CSS 4 | Node.js 22 | Serverless Framework |
| Vite 7 | | GitHub Actions |

## Features

- Interactive terminal component with custom commands
- Contact form with serverless email handling
- Responsive design with accessibility support
- SEO optimized with Open Graph and structured data

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Deployment

### Frontend (S3/CloudFront)
Automatically deployed via GitHub Actions on push to `develop`.

### Lambda (API Gateway)
```bash
npm run deploy:lambda
```

## Project Structure

```
portfolio/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   └── test/           # Test setup
├── serverless/
│   ├── email.mjs       # Lambda email handler
│   └── lambda.yml      # Serverless config
└── public/             # Static assets
```

## License

MIT
