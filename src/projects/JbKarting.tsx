import Logo from '../assets/jb-karting-logo.png';
import ProjectLayout from '../components/ProjectLayout';

// Facts match the company case study (bates-solutions.com/work/jb-karting) and the resume. The
// racer is a minor, so neither page names him.
const JbKarting: React.FC = () => (
  <ProjectLayout
    logo={<img src={Logo} className='w-32' alt='' />}
    name='JB Karting'
    tagline='Built solo, since 2026: a race site for a junior kart racer in the UK, with results fetched every race weekend.'
    links={[
      { label: 'jb-karting.com', url: 'https://jb-karting.com' },
      { label: 'Case study', url: 'https://bates-solutions.com/work/jb-karting' },
    ]}
    metrics={['Live since March 2026', '200 merged PRs', '25 Terraform files', '3,936 result rows, first live fetch']}
    overview={
      <p>
        A junior kart racer needs sponsors, and sponsors want to see results. I built the site that
        shows a season properly, an admin the family edit and publish from themselves, and a
        pipeline that fetches race results from the timing site, which has no API, every race
        weekend.
      </p>
    }
    role={[
      {
        title: 'The site and admin',
        items: [
          'React site: results, races, circuits, teams, news and videos',
          'Admin behind Cognito sign-in, with a rich-text editor and CSV import',
          'Publish to website: the profile goes out as JSON, with a built-in fallback',
        ],
      },
      {
        title: 'The results pipeline',
        items: [
          'Headless Chromium with Playwright, run as a container Lambda',
          'Every page archived in S3, parsed into versioned JSON, then loaded',
          'Each session loads in one DynamoDB transaction; a repeat changes nothing',
        ],
      },
      {
        title: 'Failing loudly',
        items: [
          'Rebuilt after a silent scraper failure that exited with success',
          'Implausible results fail the run, and an alarm emails after a quiet week',
          "Saved copies of the timing site's pages run in the tests",
        ],
      },
      {
        title: 'Infrastructure',
        items: [
          'One Hono API on Lambda over a single-table DynamoDB design',
          'Terraform in three roots; CI plans every change and refuses unlabelled destroys',
          'Deploys on merge through GitHub OIDC, so CI holds no AWS keys',
        ],
      },
    ]}
    techStack={[
      { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'TipTap'] },
      { category: 'Backend', items: ['Hono', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'Cognito'] },
      { category: 'Results pipeline', items: ['Playwright', 'S3', 'EventBridge Scheduler', 'CloudWatch', 'SNS'] },
      { category: 'Infrastructure', items: ['Nx', 'Terraform', 'CloudFront', 'GitHub Actions', 'Vitest'] },
    ]}
  />
);

export default JbKarting;
