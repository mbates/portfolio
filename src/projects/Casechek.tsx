import { Link } from 'react-router-dom';

const Casechek: React.FC = () => {
  return (
    <div className='w-f h-80'>
      <h2 className='text-5xl font-semibold tracking-tight'>Casechek</h2>
      <Link to='https://casechek.com' className='text-blue-500'>
        https://casechek.com
      </Link>
      <p className='my-5'>
        Casechek was founded to solve problems hospitals experience when
        procuring medical devices for surgical procedures. They were the first
        to market in this area.
      </p>
      <p className='my-5'>
        Bates Solutions was contracted to work with Casechek from its inception.
        We built novel, industry first solutions with limited initial resources.
        Helped grow an in house engineering team and built a robust enterprise
        ready system with that team. The platform was extended and scaled to
        over 200 hospitals across the US, adding integrations with a variety of
        hospital systems, automating numerous processes for them.
      </p>
      <p className='my-5'>
        While working with Casechek, they were recognized in the industry,
        winning the 2023 Chicago Innovation award for newcomers, and the 2023
        SMI Tom Hughes Collaboration award with Northwestern Medicine.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Services Provided
      </h2>
      <p className='my-5'>
        Architected, built and deployed numerous highly available, secure,
        resilient backend systems, and numerous easy to use web, mobile and
        desktop applications.
      </p>

      <p className='my-5'>
        Implemented CI to deploy the applications to AWS, iTunes and Play
        stores. Utilizing tools like Github Actions, CDK and Terraform.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Technologies
      </h2>
      <ul className='list-disc'>
        <li>
          Symfony, Doctrine, API-Platform, NestJS, TypeORM, Jest, PHPUnit,
          Behat, Docker, Guzzle, Oauth, Auth0, Bash Scripts
        </li>
        <li>C#, Visual Basic, ZPL, IPL</li>
        <li>
          AngularJS, Angular, Flutter, Rxjs, PhoneGap/Voltbuilder, Google
          Materials, PrimeNG, Electron, Cypress, Karma, Jasmine, Google Tag
          Manager, JWT, Superblocks
        </li>
        <li>
          Github Actions, Azure Pipelines, Travis CI, Composer, Node, Grunt,
          Bower
        </li>
        <li>Terraform, AWS CDK</li>
        <li>
          Airbrake, Sentry, LaunchDarkly, Pubnub, Qvera & HL7, Mailgun, Mailjet,
          Confluence, Jira, OpenSSH
        </li>
        <li>
          Amazon Web Services: EC2 & ALB, RDS (Aurora, MySQL & Postgres),
          Route53, S3, Cloudfront, Cloudformation, ECS, ECR, Fargate, Beanstalk,
          Lambda, Lambda@Edge, Athena, Glue, Certificate Manager, Secrets
          Manager, VPC, API Gateway, AppSync & GraphQL, DynamoDB, ElastiCache,
          WAF, IAM, SES, SQS
        </li>
      </ul>
    </div>
  );
};

export default Casechek;
