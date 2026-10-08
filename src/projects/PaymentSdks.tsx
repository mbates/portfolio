import Logo from '../assets/favicon.ico';
import GithubLogo from '../assets/github-logo.png';
import ProjectLayout from '../components/ProjectLayout';

const sdks = ['squareup', 'stripe', 'clover'];

// Facts match the company site's /lab entry (libs/content/projects/payment-sdks) and the resume.
const PaymentSdks: React.FC = () => (
  <ProjectLayout
    logo={<img src={Logo} className='w-16' alt='' />}
    name='Payment SDKs'
    tagline='Open source, since 2026: one typed TypeScript design across the Square, Stripe and Clover APIs.'
    links={sdks.flatMap((sdk) => [
      { label: `@bates-solutions/${sdk} on JSR`, url: `https://jsr.io/@bates-solutions/${sdk}` },
      { label: `mbates/${sdk}`, url: `https://github.com/mbates/${sdk}`, icon: GithubLogo },
    ])}
    metrics={['3 SDKs, MIT', '14 Square services', '76 merged PRs', "getMickled's payment layer"]}
    overview={
      <p>
        Three packages that share one design, so if you know one you know the others: a
        service-based client, a typed error hierarchy, money helpers and webhook handling.{' '}
        <strong>squareup</strong> (2.3.0) is the payment layer under getMickled,{' '}
        <strong>stripe</strong> (1.0.2) wraps the official Stripe SDK, and{' '}
        <strong>clover</strong> (1.0.3) talks to Clover over a small <code>fetch</code> client with
        no dependencies at all.
      </p>
    }
    role={[
      {
        title: 'squareup',
        items: [
          '14 services, from payments and orders to gift cards, inventory and OAuth',
          'Webhook middleware for Express, Lambda and Next.js',
          'In production under getMickled',
        ],
      },
      {
        title: 'stripe',
        items: [
          'A thin, consistent wrapper over the official Stripe SDK',
          'Webhook signatures verified with WebCrypto on Node, Deno, Bun and Workers',
          'Express, Next.js and Lambda adapters',
        ],
      },
      {
        title: 'clover',
        items: [
          'No vendor SDK: a small typed fetch client, zero dependencies',
          'Edge-ready webhooks, with the Clover verification handshake handled',
          'Express and Lambda adapters',
        ],
      },
      {
        title: 'Shared design',
        items: [
          'Service-based clients and a typed error hierarchy',
          'Money helpers that convert to and from minor units, and format',
          'Published to JSR, MIT licensed',
        ],
      },
    ]}
    techStack={[
      { category: 'Language', items: ['TypeScript'] },
      { category: 'Runtimes', items: ['Node.js', 'Deno', 'Bun', 'Cloudflare Workers', 'AWS Lambda'] },
      { category: 'Frameworks', items: ['Express', 'Next.js'] },
      { category: 'Tooling', items: ['Vitest', 'JSR', 'GitHub Actions'] },
    ]}
  />
);

export default PaymentSdks;
