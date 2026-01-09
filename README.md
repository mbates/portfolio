# Mike Bates Portfolio

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

### Prerequisites

- Node.js 20+
- AWS account (for Lambda deployment)
- AWS CLI configured
- Serverless Framework (`npm install -g serverless`)

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/mbates/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your API Gateway URL (or leave empty for local dev without contact form).

4. Start the development server
   ```bash
   npm start
   ```

### Forking This Project

If you want to use this as a template for your own portfolio:

1. **Fork the repository** on GitHub

2. **Update personal information:**
   - `index.html` - Update title, meta tags, and structured data
   - `src/pages/` - Update content with your own projects and bio
   - `public/` - Replace favicon and images

3. **Set up the contact form Lambda:**
   - Update `serverless/lambda.yml`:
     - `RECIPIENT_EMAIL` - Your email address
     - `SENDER_EMAIL` - Your verified SES email
     - `CORS_ORIGIN` - Your domain
   - Verify your domain/email in AWS SES
   - Deploy: `npm run deploy:lambda`

4. **Configure CI/CD** (GitHub Actions):

   Add these secrets/variables in your repo settings:

   | Type | Name | Description |
   |------|------|-------------|
   | Secret | `AWS_SECRET_ACCESS_KEY` | AWS secret key |
   | Secret | `VITE_API_URL` | Your API Gateway endpoint |
   | Variable | `AWS_ACCESS_KEY` | AWS access key ID |
   | Variable | `AWS_ACCOUNT_ID` | Your AWS account ID |
   | Variable | `AWS_REGION` | e.g., `us-east-1` |
   | Variable | `AWS_BUCKET` | S3 bucket URL (s3://...) |
   | Variable | `distribution_id` | CloudFront distribution ID |

5. **Push to `main`** to trigger deployment

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
Automatically deployed via GitHub Actions on push to `main`.

### Lambda (API Gateway)
```bash
npm run deploy:lambda
```

## Contributing

This project uses [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow):

1. Create a feature branch from `main`
2. Make changes and commit
3. Open a pull request to `main`
4. Merge after review and CI passes

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
