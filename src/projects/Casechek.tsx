import Logo from '../assets/casechek-logo.png';
import ProjectLayout from '../components/ProjectLayout';

// Facts match the company case study (bates-solutions.com/work/casechek) and the resume.
const Casechek: React.FC = () => (
  <ProjectLayout
    logo={<img src={Logo} className='w-40' alt='' />}
    name='Casechek'
    tagline='Founding engineer, 2013 to 2024: a HIPAA-regulated platform for the surgical devices vendors bring into hospitals.'
    links={[
      { label: 'casechek.com', url: 'https://www.casechek.com' },
      { label: 'Case study', url: 'https://bates-solutions.com/work/casechek' },
    ]}
    metrics={[
      '200+ US hospitals',
      '2023 Chicago Innovation Award (Up-and-Comer)',
      '2023 SMI Tom Hughes Collaboration Award',
    ]}
    overview={
      <p>
        Casechek runs the bill-only and consignment side of surgery: the implants and loaner trays
        that device vendors bring into a hospital for a case. I was its founding engineer, wrote
        the original platform from its first commit, and scaled it from the first customer to more
        than <strong>200 US hospitals</strong>.
      </p>
    }
    role={[
      {
        title: 'The original platform',
        items: [
          'Wrote the first API from its first commit in 2014: 4,501 of its 4,743 commits',
          'Surgeries, hospitals, vendors, notifications, sterilisation, printing and billing',
          'In production for ten years',
        ],
      },
      {
        title: 'Label printing',
        items: [
          'Label engine: Zebra ZPL in seven formats, plus IPL for Intermec printers',
          'Moved printing to the second API while older .NET warehouse kiosks kept printing',
        ],
      },
      {
        title: 'The hospital kiosk',
        items: [
          'Started the Angular kiosk app in 2018',
          'In 2023 separated it from Electron and moved it from Angular 13 to 16',
          'Its hosting as a Terraform module: CloudFront, S3 and WAF in four environments',
        ],
      },
      {
        title: 'Team and integrations',
        items: [
          'Hired, mentored and managed a team of up to 7 engineers',
          'HL7 integrations with hospital systems through Qvera',
          'Moved live systems from Travis CI to GitHub Actions, AWS CDK to Terraform, OAuth to Auth0',
        ],
      },
    ]}
    techStack={[
      { category: 'Backend', items: ['PHP', 'Symfony', 'API Platform', 'MySQL / Aurora'] },
      { category: 'Frontend', items: ['Angular', 'Electron'] },
      {
        category: 'Infrastructure',
        items: ['AWS', 'EKS', 'Elastic Beanstalk', 'CloudFront + WAF', 'Terraform', 'Helm', 'GitHub Actions'],
      },
      { category: 'Integrations', items: ['Auth0', 'PubNub', 'Qvera HL7', 'Zebra ZPL'] },
    ]}
  />
);

export default Casechek;
