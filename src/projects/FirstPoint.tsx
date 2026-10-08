import Icon from '../assets/firstpoint-icon.svg';
import ProjectLayout from '../components/ProjectLayout';

// Facts match the resume and the company site's FirstPoint card, plus what the FirstPointEnergy
// repo shows was built (checked 2026-10-07). Only what reached the dev environment is claimed;
// the design's sandbox and production environments and the monthly-report schedule weren't built.
const FirstPoint: React.FC = () => (
  <ProjectLayout
    logo={<img src={Icon} className='w-20' alt='' />}
    name='FirstPoint Energy'
    tagline='Contract, December 2025 to February 2026: a peak-shaving optimiser and the battery-site platform around it, built solo as a prototype.'
    metrics={['120 merged PRs in nine weeks', '256 tests', 'HiGHS LP solver in Lambda']}
    overview={
      <p>
        For FirstPoint Energy, an energy systems company, I designed the system, from the services
        and data model to the API and deployment, then built it alone: a platform for sites, their
        usage data and their batteries. At its centre is a peak-shaving optimiser, since a battery
        earns its keep by cutting the peaks in a site&apos;s demand. The client then took it
        in-house.
      </p>
    }
    role={[
      {
        title: 'The optimiser',
        items: [
          'Peak-shaving thresholds on the HiGHS linear-programming solver',
          'Its WebAssembly build bundled to run inside AWS Lambda',
          'Monthly, weekly and daily views, with a seasonal projection for next month',
        ],
      },
      {
        title: 'Sites and usage data',
        items: [
          'BC Hydro usage import, with deduplication and large CSV uploads',
          'Usage analysis: consumption, peak demand and time-of-day charts',
          'Battery configuration and site equipment metadata, edited by section',
        ],
      },
      {
        title: 'Architecture',
        items: [
          'Designed the services, data model, OpenAPI spec and deployment',
          'Users and sites APIs on Lambda and API Gateway, an emails Lambda fed by SQS, the app on S3 and CloudFront',
          'Seven DynamoDB tables, Cognito sign-in, invitations through SQS with a dead-letter queue',
        ],
      },
      {
        title: 'Infrastructure and CI',
        items: [
          'Terraform modules: a generic Lambda module and one per service',
          'Remote state in S3 with DynamoDB locking',
          'CI checks every PR; merges deploy the infrastructure and the React app',
        ],
      },
    ]}
    techStack={[
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts'] },
      { category: 'Backend', items: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Cognito', 'SQS', 'SES'] },
      { category: 'Optimisation', items: ['HiGHS', 'WebAssembly'] },
      { category: 'Infrastructure', items: ['Nx', 'Terraform', 'S3 + CloudFront', 'GitHub Actions', 'Jest'] },
    ]}
  />
);

export default FirstPoint;
