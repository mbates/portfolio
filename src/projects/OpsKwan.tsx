import Logo from '../assets/opskwan-logo.png';
import ProjectLayout from '../components/ProjectLayout';

// Facts match the company case study (bates-solutions.com/work/opskwan) and the resume.
const OpsKwan: React.FC = () => (
  <ProjectLayout
    logo={<img src={Logo} className='w-32' alt='OpsKwan logo' />}
    name='OpsKwan'
    tagline='Director of Development, 2009 to 2024: SaaS logistics for medical device distribution.'
    links={[{ label: 'Case study', url: 'https://bates-solutions.com/work/opskwan' }]}
    metrics={['Deployed with Zimmer in 2011', '40%+ of Canadian hospitals', 'Every commit on the shared platform']}
    overview={
      <p>
        A logistics platform for an orthopaedic implant distributor: stock placed on consignment
        in hospitals, tracked down to lot and expiry. Deployed with Zimmer, now Zimmer Biomet, in
        2011, it ran their logistics for <strong>over 40% of Canadian hospitals</strong>.{' '}
        <em>(OpsKwan shut down in mid 2024.)</em>
      </p>
    }
    role={[
      {
        title: 'Consignment and loans',
        items: [
          'Hospitals, stock by lot and expiry, transfers and loaner sets',
          'Surgery bookings and what each case used',
          'Sterilisation and biologics tracked back to their donors',
        ],
      },
      {
        title: 'Barcodes and audits',
        items: [
          'HIBC and GS1 label parsing on the server and in the browser',
          'Offline stock audits in IndexedDB',
          'Recalled lots caught at the scanner, online or offline',
        ],
      },
      {
        title: 'Data',
        items: [
          'Manufacturer imports for Zimmer, DePuy and Wright',
          'One MySQL database per client beside a shared master',
          'Wrote every commit in the shared code base, 2011 to 2023',
        ],
      },
    ]}
    techStack={[
      { category: 'Backend', items: ['PHP', 'CakePHP', 'MySQL'] },
      { category: 'Frontend', items: ['JavaScript', 'jQuery', 'jQuery Mobile', 'IndexedDB'] },
      { category: 'Infrastructure', items: ['AWS S3', 'Amazon SQS', 'GitHub Actions'] },
    ]}
  />
);

export default OpsKwan;
