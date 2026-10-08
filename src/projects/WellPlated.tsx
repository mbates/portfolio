import Logo from '../assets/well-plated-logo.png';
import ProjectLayout from '../components/ProjectLayout';

// Facts match the company case study (bates-solutions.com/work/well-plated) and the resume, and
// claim only my own work: the product and clinical features are largely my colleagues'.
const WellPlated: React.FC = () => (
  <ProjectLayout
    logo={<img src={Logo} className='w-24' alt='' />}
    name='Well-Plated'
    tagline="Senior software engineer, since December 2025: the release pipeline behind an eating-disorder recovery platform's three store apps."
    links={[
      { label: 'wellplated.health', url: 'https://wellplated.health' },
      { label: 'Case study', url: 'https://bates-solutions.com/work/well-plated' },
    ]}
    metrics={['346 merged PRs', '6 store listings live', '67 app releases, July to October 2026']}
    overview={
      <p>
        Well-Plated supports people recovering from eating disorders, with separate apps for
        clients, their caregivers and their clinical providers, on iOS and Android, over one
        Supabase backend. I&apos;m one engineer on a small team: the product and clinical features
        are largely my colleagues&apos; work. Mine is the pipeline that versions, gates and ships the
        three apps, plus auth reliability and the tests that drive all three together.
      </p>
    }
    role={[
      {
        title: 'Release pipeline',
        items: [
          'Wrote most of the CI workflows, including the production deploy',
          'Supabase migrations checked on every PR and deployed on merge to each environment',
          'Per-app versions with Changesets, and a release for each app that changed',
        ],
      },
      {
        title: 'Store gates',
        items: [
          'Android ships on merge, only once the backend it depends on is deployed',
          'iOS builds go to App Store review on their own; a person presses Release',
          'CI skips versions the store already has, and a daily job reports drift',
        ],
      },
      {
        title: 'Tests across the apps',
        items: [
          'Playwright drives all three apps through pairing, safety alerts and sign-in',
          'Staging builds reach TestFlight and Google Play only once those paths pass',
        ],
      },
      {
        title: 'Auth reliability',
        items: [
          'Found and fixed, before launch, an iOS App Attest check that had never worked',
          'Wrote the postmortem, and the prevention work that followed',
        ],
      },
    ]}
    techStack={[
      { category: 'Apps', items: ['React Native', 'Expo', 'TypeScript'] },
      { category: 'Backend', items: ['Supabase', 'Postgres', 'Edge Functions'] },
      { category: 'Release', items: ['GitHub Actions', 'EAS Build and Submit', 'Changesets', 'App Store Connect', 'Google Play'] },
      { category: 'Testing', items: ['Playwright', 'Vitest'] },
    ]}
  />
);

export default WellPlated;
