// The About copy and the project summaries, in one place: the `about` dialog renders them, and
// the build writes them into index.html as a static <main> for crawlers and screen readers
// (vite.config.ts), so the two can't drift. Every fact comes from the bates-solutions monorepo's
// libs/content: career/master.md and the projects' case studies.

export const about: string[] = [
  "I'm a full stack engineer in Vancouver. I've been shipping production software since 2000: first in the UK, where I built out an NHS medical record system at hospitals including Guy's and St Thomas', then in Canada from 2003.",
  'From 2009 to 2024 I was Director of Development at OpsKwan, the logistics platform Zimmer Biomet used for over 40% of Canadian hospitals. From 2013 I was also the founding engineer at Casechek, and scaled its HIPAA-regulated surgical device procurement platform from its first customer to 200+ US hospitals.',
  "Today I work through my consultancy, Bates Solutions. I'm lead backend engineer on Ocean Wise's Whale Report platform and a senior engineer on Well-Plated's clinical apps. I also build my own products: getMickled, a multi-tenant commerce platform; Zeepler, a label-printing API; and the JB Karting race platform.",
  "Most of my work is TypeScript on AWS, with Terraform, React and React Native. At Ocean Wise I built the team's shared AI workflows: one version-controlled set of skills, commands and playbooks that runs in both Claude Code and Cursor.",
];

// One line per project the terminal's `show` command opens.
export const projectSummaries: { name: string; summary: string }[] = [
  {
    name: 'Bates Solutions',
    summary:
      'My consultancy since 2013, and its products: getMickled, Zeepler, the JB Karting race platform and open-source TypeScript SDKs for Square, Stripe and Clover.',
  },
  {
    name: 'Casechek',
    summary:
      'Founding engineer, 2013 to 2024: a HIPAA-regulated surgical device procurement platform, scaled to 200+ US hospitals.',
  },
  {
    name: 'OpsKwan',
    summary:
      'Director of Development, 2009 to 2024: the logistics platform Zimmer Biomet used for over 40% of Canadian hospitals.',
  },
  {
    name: 'JB Karting',
    summary:
      'Built solo since 2026: a race site for a junior kart racer in the UK, with an admin the family publish from and race results fetched every race weekend.',
  },
  {
    name: "Mandi's Mickles",
    summary:
      "Custom e-commerce since 2019 for a Vancouver pickle business, getMickled's first customer.",
  },
  {
    name: 'Zeepler',
    summary:
      'My JSON-to-ZPL label API since 2025: accounts, hashed API keys, per-label metering and Square billing, run in two AWS regions.',
  },
  {
    name: 'Payment SDKs',
    summary:
      'Open-source TypeScript SDKs for Square, Stripe and Clover since 2026, MIT on JSR, with one shared design; squareup is the payment layer under getMickled.',
  },
  {
    name: 'Well-Plated',
    summary:
      'Senior software engineer since December 2025 on an eating-disorder recovery platform: the release pipeline that ships its three apps to the App Store and Google Play.',
  },
  {
    name: 'FirstPoint Energy',
    summary:
      'Contract, December 2025 to February 2026: a peak-shaving optimiser on the HiGHS solver in Lambda, and the battery-site platform around it, built solo as a prototype.',
  },
];
