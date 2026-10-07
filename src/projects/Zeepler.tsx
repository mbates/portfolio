import Logo from '../assets/zeepler-logo.svg';
import ProjectLayout from '../components/ProjectLayout';

// Facts match the company case study (bates-solutions.com/work/zeepler) and the resume.
const Zeepler: React.FC = () => (
  <ProjectLayout
    logo={<img src={Logo} className='w-24' alt='' />}
    name='Zeepler'
    tagline='My product, since 2025: a JSON-to-ZPL label API with accounts, API keys, metering and Square billing.'
    links={[
      { label: 'zeepler.com', url: 'https://zeepler.com' },
      { label: 'Case study', url: 'https://bates-solutions.com/work/zeepler' },
    ]}
    metrics={['207 merged PRs', '2 AWS regions', '3,073 junk sign-ups found and removed']}
    overview={
      <p>
        Thermal label printers speak ZPL, Zebra&apos;s printer language, and every team that
        prints labels from its own software ends up hand-writing it. Zeepler takes the label as
        JSON and returns ZPL ready to send to the printer. I designed and built all of it, alone,
        and run it in production. It&apos;s live and deliberately not marketed yet.
      </p>
    }
    role={[
      {
        title: 'The generator',
        items: [
          'Text, QR codes and Code 128, Code 93 and EAN-13 barcodes',
          '3×1 and 4×2 inch labels at 203 dpi',
          "ZPL control characters in values are hex-escaped, so data can't run printer commands",
        ],
      },
      {
        title: 'Accounts and billing',
        items: [
          'Self-service sign-up through Cognito, behind a Turnstile check',
          'API keys shown once and stored only as a SHA-256 hash',
          'Per-label metering, billed monthly through Square, with idempotent calls',
        ],
      },
      {
        title: 'Two regions',
        items: [
          'Customers choose the US or Canada at sign-up',
          'Their account, keys, usage and billing records stay in that region',
          'Each region is one Terraform module: API, Cognito, Lambdas, DynamoDB',
        ],
      },
      {
        title: 'Operations',
        items: [
          'CI deploys on merge through GitHub OIDC, Canada first as a canary',
          'WCAG 2.1 AA checked with axe on every change',
          'Found 3,073 junk sign-ups from a bot, removed them and gated sign-up',
        ],
      },
    ]}
    techStack={[
      { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
      { category: 'Backend', items: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Cognito'] },
      { category: 'Infrastructure', items: ['Terraform', 'S3 + CloudFront', 'GitHub Actions'] },
      { category: 'Integrations', items: ['Square', 'Cloudflare Turnstile'] },
    ]}
  />
);

export default Zeepler;
