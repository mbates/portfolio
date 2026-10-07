import './Bates.scss';
import GithubLogo from '../assets/github-logo.png';
import Logo from '../components/Logo';
import ProjectLayout from '../components/ProjectLayout';

const repos = [
  'squareup',
  'stripe',
  'clover',
  'portfolio',
  'bates-solutions-example',
  'bates-solutions-example-common',
  'bates-solutions-common',
];

const Bates: React.FC = () => (
  <ProjectLayout
    logo={
      <div className='flex' aria-hidden='true'>
        <Logo />
        <div className='logo text-8xl justify-self-start text-purple-600 flex flex-col translate-y-1'>
          Bates <span>Solutions</span>
        </div>
      </div>
    }
    name='Bates Solutions'
    tagline='My consultancy and product studio, founded 2013 in Vancouver, Canada.'
    links={[
      { label: 'bates-solutions.com', url: 'https://bates-solutions.com' },
      ...repos.map((repo) => ({
        label: `mbates/${repo}`,
        url: `https://github.com/mbates/${repo}`,
        icon: GithubLogo,
      })),
    ]}
    metrics={['Founded 2013', 'Open-source SDKs (MIT)']}
    overview={
      <p>
        I work with Canadian, US and UK software companies. Most of my work has been in{' '}
        <strong>healthcare software</strong>, and these days it also covers commerce platforms,
        SaaS and cloud infrastructure. My TypeScript SDKs for the Square, Stripe and Clover APIs
        are open source (MIT). The source for this portfolio and an archived microservices example
        is public on GitHub.
      </p>
    }
    role={[
      {
        title: 'This Portfolio',
        items: [
          'React 19 with TypeScript',
          'Interactive terminal interface',
          'Tailwind CSS styling',
          'Serverless contact form (Lambda + SES)',
          'S3 + CloudFront hosting via GitHub Actions',
        ],
      },
      {
        title: 'Microservices Example',
        items: [
          'Kubernetes orchestration',
          'TypeScript + Express services',
          'NATS pub/sub messaging',
          'MongoDB persistence',
          'Auth service + example service with Jest tests',
          'Two npm libraries shared between services: common components for the example, and global components for Express projects',
        ],
      },
    ]}
    techStack={[
      { category: 'Frontend', items: ['React', 'react-terminal', 'Tailwind CSS', 'Axios', 'Vite'] },
      { category: 'Backend', items: ['AWS Lambda', 'API Gateway', 'SES', 'Serverless Framework'] },
      {
        category: 'Infrastructure',
        items: ['S3 + CloudFront', 'GitHub Actions CI/CD', 'Kubernetes (example)', 'NATS + MongoDB (example)'],
      },
    ]}
  />
);

export default Bates;
