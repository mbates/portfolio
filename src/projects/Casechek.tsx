import { Link } from 'react-router-dom';
import Logo from '../assets/casechek-logo.png';

const Casechek: React.FC = () => {
  return (
    <div className='w-full p-3 pr-5'>
      <Link
        to='https://casechek.com'
        className='float-right w-100'
        target='_blank'
      >
        <img src={Logo} alt="Casechek logo" />
      </Link>
      <p className='my-5'>
        <Link to='https://casechek.com' className='text-blue-400' target='_blank'>
          Casechek Inc.
        </Link>{' '}
        automates implant supply chain workflows for hospitals, from procurement through
        payment. Their platform serves <strong>200+ hospitals</strong> including UCLA Health,
        Northwestern Medicine, and University of Iowa Health Care.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        My Role
      </h2>
      <p className='my-5'>
        Founding engineer from inception. Built the entire platform architecture, grew the
        engineering team, and scaled to enterprise-grade infrastructure. Our work earned
        the <strong>2023 Chicago Innovation Award</strong> and <strong>2023 SMI Tom Hughes
        Collaboration Award</strong> with Northwestern Medicine.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        What I Built
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-5'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>CaseDoc Mobile App</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Flutter app for iOS & Android</li>
            <li>Loaner and bill-only management</li>
            <li>Barcode scanning for surgical items</li>
            <li>Real-time tray template management</li>
            <li>Fastlane deployment to app stores</li>
          </ul>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Hospital Portal</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Angular web application</li>
            <li>Case search and bill management</li>
            <li>Auth0 authentication</li>
            <li>PubNub real-time updates</li>
            <li>Multi-environment deployment</li>
          </ul>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Kiosk System</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Angular + Electron desktop app</li>
            <li>Physical kiosk for tray scanning</li>
            <li>Lambda@Edge authentication</li>
            <li>Auto-update capabilities</li>
            <li>C# .NET scanner integration</li>
          </ul>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Backend Platform</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>NestJS microservices (Nx monorepo)</li>
            <li>Symfony/API-Platform APIs</li>
            <li>HL7 hospital system integrations</li>
            <li>Kafka event streaming</li>
            <li>Bill reconciliation automation</li>
          </ul>
        </div>
      </div>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Infrastructure
      </h2>
      <p className='my-5'>
        Built highly available, HIPAA-compliant infrastructure on AWS using
        <strong> Terraform</strong> and <strong>AWS CDK</strong>. Implemented CI/CD
        with GitHub Actions deploying to AWS, App Store, and Google Play.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Tech Stack
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 my-5 text-sm'>
        <div>
          <h4 className='font-semibold'>Frontend</h4>
          <ul className='text-gray-600'>
            <li>Angular 12-17</li>
            <li>Flutter</li>
            <li>Electron</li>
            <li>PrimeNG</li>
            <li>RxJS</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold'>Backend</h4>
          <ul className='text-gray-600'>
            <li>NestJS</li>
            <li>Symfony</li>
            <li>PostgreSQL/Aurora</li>
            <li>Kafka</li>
            <li>OpenSearch</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold'>AWS Services</h4>
          <ul className='text-gray-600'>
            <li>ECS/Fargate</li>
            <li>Lambda@Edge</li>
            <li>RDS/DynamoDB</li>
            <li>CloudFront/WAF</li>
            <li>AppSync/GraphQL</li>
          </ul>
        </div>
      </div>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Integrations
      </h2>
      <p className='text-sm text-gray-600'>
        Auth0, LaunchDarkly, PubNub, Qvera HL7, Sentry, Mailgun, Mailjet
      </p>
    </div>
  );
};

export default Casechek;
