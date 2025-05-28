import { Link } from 'react-router-dom';

const Casechek: React.FC = () => {
  return (
    <div className='w-f h-80'>
      <h2 className='text-5xl font-semibold tracking-tight'>Casechek</h2>
      <Link to='https://casechek.com' className='text-lg text-blue-500'>
        https://casechek.com
      </Link>
      <p className='my-5'>
        Casechek was founded to solve problems hospitals experience when
        procuring medical devices for surgical procedures. We were the first to
        market in this area and as the founding engineer, I had to architect a
        novel solution that met HIPAA regulatory requirements.
      </p>
      <p className='my-5'>
        During my time with Casechek I gained a broad experience building an
        industry first solution with limited resources. Moving on to growing an
        engineering team and building a robust enterprise ready system with
        them. We extended our platform and scaled to over 200 hospitals across
        the US, adding integrations with a variety of hospital systems
        automating numerous processes for them.
      </p>
      <p className='my-5'>
        We were recognized in the industry, winning the 2023 Chicago Innovation
        award for newcomers, and the 2023 SMI Tom Hughes Collaboration award
        with Northwestern Medicine.
      </p>
      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Responsibilities
      </h2>
      <ul className='list-disc'>
        <li>
          Architecting, building and deploying 3 highly available, secure,
          resilient backend systems
        </li>
        <li>
          Architecting, building and deploying 8 easy to use web, mobile and
          desktop applications
        </li>
        <li>Researching and assessing technologies</li>
        <li>Designing and deploying scalable infrastructure on AWS</li>
        <li>
          Rearchitected technologies used in repositories, Travis CI to Github
          Actions, CDK to Terraform and OAuth to Auth0
        </li>
        <li>
          Supporting internal teams with technical solutions and “lunch and
          learn” sessions
        </li>
        <li>
          Responsible for full cycle employee experience for teams of up to 7
          engineers, including hiring and selection, onboarding, mentorship and
          development, and performance management
        </li>
      </ul>
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
