/**
 * Typed content module for the player-profile portfolio.
 *
 * This is the sole source of professional content on the site. Every string
 * traces to `Jose_Cabarcas_Portfolio_Context.md` via the SDD design (§2).
 * No metric, employer, technology, project, or outcome may be added beyond
 * this transcription.
 */

export type AttributeLevel = 'Primary' | 'Strong' | 'Working / Applied';
export type AttributeExperience = 'production' | 'learning';
export type LinkKind = 'github' | 'linkedin' | 'email';
export type StatScope = 'career' | 'elenas-history' | 'performance' | 'delivery';
export type HighlightPhase = 'moment' | 'challenge' | 'result';

export interface HeadshotAsset {
  alt: string;
  fallback: string;
  width: 960;
  height: 1440;
  aspectRatio: '2 / 3';
  sources: ReadonlyArray<{
    type: 'image/avif' | 'image/webp';
    srcSet: string;
  }>;
}

export interface HeroIdentity {
  name: string;
  role: 'Senior Software Engineer';
  status: 'Open to new opportunities';
  location: 'Barranquilla, Colombia';
  positioning: string;
  bio: ReadonlyArray<string>;
  headshot: HeadshotAsset;
  heroStatKeys: ReadonlyArray<string>;
}

export interface CareerStat {
  key: string;
  value: string;
  label: string;
  detail: string;
  scope: StatScope;
  historical?: boolean;
}

export interface SeasonRole {
  title: string;
  dates: string;
  summary: string;
}

export interface SeasonLogEntry {
  id: string;
  employer: string;
  dates: string;
  location?: 'Barranquilla' | 'Bogotá' | 'Remote, Colombia';
  summary: string;
  roles: ReadonlyArray<SeasonRole>;
}

export interface AttributeItem {
  name: string;
  experience: AttributeExperience;
  note?: string;
}

export interface AttributeGroup {
  id: string;
  title: string;
  level: AttributeLevel;
  description: string;
  items: ReadonlyArray<AttributeItem>;
}

export interface Highlight {
  id: string;
  title: string;
  moment: string;
  challenge: string;
  result: string;
}

export interface GameLogCaseStudy {
  id: string;
  name: string;
  context: string;
  role: string;
  stack: ReadonlyArray<string>;
  outcomeLabel: 'Outcome' | 'Responsibility';
  outcome: string;
}

export interface ProfileLink {
  kind: LinkKind;
  label: string;
  href:
    | 'https://github.com/joseocabarcas'
    | 'https://linkedin.com/in/jose-cabarcas'
    | 'mailto:josecabarcas94@gmail.com';
  external: boolean;
}

export interface ProfileContent {
  hero: HeroIdentity;
  stats: ReadonlyArray<CareerStat>;
  seasonLog: ReadonlyArray<SeasonLogEntry>;
  attributes: ReadonlyArray<AttributeGroup>;
  highlights: ReadonlyArray<Highlight>;
  gameLog: ReadonlyArray<GameLogCaseStudy>;
  links: ReadonlyArray<ProfileLink>;
}

const headshot: HeadshotAsset = {
  alt: 'Professional portrait of José Cabarcas',
  fallback: '/images/jose-cabarcas-portrait-960.jpg',
  width: 960,
  height: 1440,
  aspectRatio: '2 / 3',
  sources: [
    {
      type: 'image/avif',
      srcSet:
        '/images/jose-cabarcas-portrait-640.avif 640w, /images/jose-cabarcas-portrait-960.avif 960w, /images/jose-cabarcas-portrait-1200.avif 1200w',
    },
    {
      type: 'image/webp',
      srcSet:
        '/images/jose-cabarcas-portrait-640.webp 640w, /images/jose-cabarcas-portrait-960.webp 960w, /images/jose-cabarcas-portrait-1200.webp 1200w',
    },
  ],
};

const hero: HeroIdentity = {
  name: 'José Cabarcas',
  role: 'Senior Software Engineer',
  status: 'Open to new opportunities',
  location: 'Barranquilla, Colombia',
  positioning:
    'Senior Software Engineer with 11+ years shipping frontend and mobile products used by millions — leading teams and architecture, and deliberately crossing into backend when the problem demands it.',
  bio: [
    '11+ years across six teams: from broad early-career exposure — backend, frontend, mobile testing — at Janus IT, to leading 5–7 engineers as Tech Lead and Frontend Staff Engineer at Elenas, a social commerce platform that reached 3M+ downloads and 200K+ daily active users.',
    'Today I ship with Spec-Driven Development: precise acceptance criteria, AI-generated first passes, and layer-by-layer validation before anything integrates. Backend (Node.js, Go, Rails) whenever the problem needs it.',
  ],
  headshot,
  heroStatKeys: ['experience', 'led-team'],
};

const stats: ReadonlyArray<CareerStat> = [
  {
    key: 'experience',
    value: '11+',
    label: 'Years of experience',
    detail: 'Since October 2014.',
    scope: 'career',
  },
  {
    key: 'employers',
    value: '6',
    label: 'Employers',
    detail: 'Six employer chapters; Elenas also includes a three-role progression.',
    scope: 'career',
  },
  {
    key: 'led-team',
    value: '5–7',
    label: 'Engineers led',
    detail: 'Team size led at Elenas under Scrum.',
    scope: 'career',
  },
  {
    key: 'downloads',
    value: '3M+',
    label: 'App downloads',
    detail:
      'Historical Elenas figure by the time José left in 2024; the company later shut down.',
    scope: 'elenas-history',
    historical: true,
  },
  {
    key: 'daily-active',
    value: '200K+',
    label: 'Daily active users',
    detail:
      'Historical Elenas figure by the time José left in 2024; not a current app-store claim.',
    scope: 'elenas-history',
    historical: true,
  },
  {
    key: 'startup-time',
    value: '24s → 7s',
    label: 'Startup time on low-end devices',
    detail: 'Performance result from the Elenas work.',
    scope: 'performance',
  },
  {
    key: 'checkout-time',
    value: '14s → 5s',
    label: 'Checkout time',
    detail: 'Performance result from the Elenas work.',
    scope: 'performance',
  },
  {
    key: 'bundle-optimization',
    value: '~30%',
    label: 'Bundle/build optimization reduction',
    detail: 'Rollup build-time optimization and code splitting at Monokera.',
    scope: 'performance',
  },
  {
    key: 'test-execution',
    value: '~25%',
    label: 'Faster test execution',
    detail: 'After the Jest → Vitest migration at Monokera.',
    scope: 'performance',
  },
  {
    key: 'stores-published',
    value: '2',
    label: 'Stores published',
    detail: 'The Elenas app was published to Google Play and the App Store.',
    scope: 'delivery',
  },
];

const seasonLog: ReadonlyArray<SeasonLogEntry> = [
  {
    id: 'janus-it',
    employer: 'Janus IT',
    dates: 'Oct 2014 – Feb 2016',
    location: 'Barranquilla',
    summary:
      'First development role: broad exposure across back-end, front-end, and mobile testing — the origin of the UX interest and of the comfort with not being boxed into one layer of the stack.',
    roles: [
      {
        title: 'Frontend and Android Developer',
        dates: 'Oct 2014 – Feb 2016',
        summary: '',
      },
    ],
  },
  {
    id: 'joonik',
    employer: 'Joonik',
    dates: 'Mar 2016 – Mar 2019',
    location: 'Barranquilla',
    summary: 'Migrated a legacy web app to a new version using Vue.js.',
    roles: [
      {
        title: 'Frontend and Android Developer',
        dates: 'Mar 2016 – Mar 2019',
        summary: '',
      },
    ],
  },
  {
    id: 'merqueo',
    employer: 'Merqueo',
    dates: 'Mar 2019 – Sep 2019',
    location: 'Bogotá',
    summary:
      'Backend-heavy role: built the initial microservices for an order-rating feature using Node.js, Go, and DynamoDB, plus the ratings UI in Vue.js.',
    roles: [
      {
        title: 'Full Stack Developer',
        dates: 'Mar 2019 – Sep 2019',
        summary: '',
      },
    ],
  },
  {
    id: 'picap',
    employer: 'Picap',
    dates: 'Oct 2019 – Apr 2020',
    location: 'Bogotá',
    summary:
      'Real-time systems work: architectural patterns for Firebase communication, a driver–customer chat system, live order tracking with Firestore, and a live video chat feature for an online medical appointments vertical.',
    roles: [
      {
        title: 'Frontend Developer',
        dates: 'Oct 2019 – Apr 2020',
        summary: '',
      },
    ],
  },
  {
    id: 'elenas',
    employer: 'Elenas',
    dates: 'May 2020 – Oct 2024',
    location: 'Remote, Colombia',
    summary:
      'Four years on a social commerce platform across three roles: mobile architecture, EAS delivery, technical leadership, the performance project, migration of key mobile features to the web, and production-scale work.',
    roles: [
      {
        title: 'Senior Frontend Developer',
        dates: 'May 2020 – Oct 2021',
        summary: '',
      },
      {
        title: 'Tech Lead',
        dates: 'Oct 2021 – Aug 2023',
        summary: '',
      },
      {
        title: 'Frontend Staff Engineer',
        dates: 'Aug 2023 – Oct 2024',
        summary: '',
      },
    ],
  },
  {
    id: 'monokera',
    employer: 'Monokera',
    dates: 'Oct 2024 – Jul 2026',
    location: 'Remote, Colombia',
    summary:
      'Insurance management and sales platform: micro-frontend/monorepo architecture, reusable design-system components, test and build optimization, the Sales Builder Rails service, and Datadog-backed production work.',
    roles: [
      {
        title: 'Senior Frontend Developer',
        dates: 'Oct 2024 – Jul 2026',
        summary: '',
      },
    ],
  },
];

const attributes: ReadonlyArray<AttributeGroup> = [
  {
    id: 'frontend-mobile-primary',
    title: 'Frontend & mobile',
    level: 'Primary',
    description: 'The core of the career: production frontend and mobile work.',
    items: [
      { name: 'React', experience: 'production' },
      { name: 'React Native', experience: 'production' },
      { name: 'Next.js', experience: 'production' },
      { name: 'TypeScript', experience: 'production' },
      { name: 'Expo', experience: 'production' },
    ],
  },
  {
    id: 'architecture-leadership-primary',
    title: 'Architecture & leadership',
    level: 'Primary',
    description: 'Staff-level ownership of frontend architecture and team leadership.',
    items: [
      { name: 'Frontend architecture', experience: 'production' },
      { name: 'Design systems', experience: 'production' },
      { name: 'Monorepos / micro-frontends', experience: 'production' },
      { name: 'Technical leadership', experience: 'production' },
    ],
  },
  {
    id: 'ai-assisted-primary',
    title: 'AI-assisted development',
    level: 'Primary',
    description: 'Core workflow using AI tools for spec-driven development and code generation.',
    items: [
      { name: 'Claude Code', experience: 'production' },
      { name: 'Cursor', experience: 'production' },
      { name: 'Codex', experience: 'production' },
      { name: 'Spec-Driven Development', experience: 'production' },
    ],
  },
  {
    id: 'state-data-strong',
    title: 'State & data',
    level: 'Strong',
    description: 'Client and server state kept deliberately separate in production apps.',
    items: [
      { name: 'Zustand', experience: 'production' },
      { name: 'TanStack Query', experience: 'production' },
      { name: 'GraphQL', experience: 'production' },
    ],
  },
  {
    id: 'backend-platform-strong',
    title: 'Backend & platform',
    level: 'Strong',
    description: 'Deliberate backend work taken on when the problem required it.',
    items: [
      { name: 'Node.js', experience: 'production' },
      { name: 'Go', experience: 'production' },
      { name: 'Ruby on Rails', experience: 'production' },
      { name: 'Python', experience: 'production' },
      { name: 'Kotlin / Android modules', experience: 'production' },
      { name: 'AWS Lambda / CloudFront / S3', experience: 'production' },
    ],
  },
  {
    id: 'quality-delivery-strong',
    title: 'Quality & delivery',
    level: 'Strong',
    description: 'Testing strategy and release tooling built around real products.',
    items: [
      { name: 'Playwright', experience: 'production' },
      { name: 'Vitest', experience: 'production' },
      { name: 'Storybook', experience: 'production' },
      { name: 'Observability tooling', experience: 'production' },
      { name: 'CI/CD', experience: 'production' },
    ],
  },
  {
    id: 'applied-tooling',
    title: 'Working / applied',
    level: 'Working / Applied',
    description: 'Adjacent technologies and practices evidenced in production roles.',
    items: [
      { name: 'JavaScript', experience: 'production' },
      { name: 'NestJS', experience: 'production' },
      { name: 'PostgreSQL', experience: 'production' },
      { name: 'DynamoDB', experience: 'production' },
      { name: 'Docker', experience: 'production' },
      { name: 'GitHub Actions', experience: 'production' },
      { name: 'GitLab CI/CD', experience: 'production' },
      { name: 'Jenkins', experience: 'production' },
      { name: 'Detox', experience: 'production' },
      { name: 'Cypress', experience: 'production' },
      { name: 'Firebase / Firestore', experience: 'production' },
      { name: 'SASS', experience: 'production' },
      { name: 'Segment', experience: 'production' },
      { name: 'CleverTap', experience: 'production' },
      { name: 'Amplitude', experience: 'production' },
      { name: 'Agile / Scrum', experience: 'production' },
      { name: 'Code reviews', experience: 'production' },
      { name: 'Technical mentoring', experience: 'production' },
    ],
  },
  {
    id: 'learning-exploration',
    title: 'Learning / exploration',
    level: 'Working / Applied',
    description:
      'Studied and practiced outside production — never presented as production experience.',
    items: [
      { name: 'WatermelonDB', experience: 'learning', note: 'Learning / exploration' },
      { name: 'MMKV', experience: 'learning', note: 'Learning / exploration' },
      { name: 'CQRS / Event Sourcing', experience: 'learning', note: 'Learning / exploration' },
    ],
  },
];

const highlights: ReadonlyArray<Highlight> = [
  {
    id: 'store-compliance',
    title: 'Store compliance rescue',
    moment: 'An App Store rejection and a Google compliance deadline hit the Elenas app.',
    challenge: 'An outdated Segment SDK shipped with outdated Google Play Services versions.',
    result:
      'Patched the library to restore compliance under time pressure, then led migration to a modern Segment version once there was more runway.',
  },
  {
    id: 'eas-pipeline',
    title: 'Expo Classic Updates → EAS',
    moment: 'Elenas moved off Expo Classic Updates.',
    challenge: 'Releases required a stronger delivery workflow.',
    result:
      'Led the Expo Classic Updates → EAS migration and the CI/CD pipeline around it, enabling OTA updates without full store republishing.',
  },
  {
    id: 'expo-migration',
    title: 'Expo 47 → Expo 51',
    moment: 'The Elenas app moved from Expo 47 to Expo 51.',
    challenge: 'Breaking changes affected core functionality.',
    result: 'Led the migration under those breaking changes.',
  },
  {
    id: 'clean-architecture',
    title: 'Clean Architecture on mobile',
    moment: 'The most recent Elenas mobile architecture.',
    challenge: 'Maintainability and testability across mobile concerns.',
    result:
      'Separated data, domain, and presentation layers, keeping Zustand, Context API, and TanStack Query concerns distinct.',
  },
  {
    id: 'vite-dashboard',
    title: 'CRA v3 → Vite dashboard',
    moment: 'An internal dashboard still ran on Create React App v3.',
    challenge: 'The dashboard had to move to a current build tool.',
    result: 'Led the CRA v3 → Vite migration.',
  },
  {
    id: 'sales-builder',
    title: 'Sales Builder on Rails',
    moment: 'An assisted insurance-sales micro-frontend needed a service.',
    challenge: 'The service had to manage its rendered components.',
    result: 'Built the Ruby on Rails Sales Builder microservice — and picked up Rails for that need.',
  },
  {
    id: 'performance-project',
    title: 'Startup & checkout performance',
    moment: 'Elenas mobile performance work.',
    challenge: 'Startup and checkout were slow on low-end devices.',
    result: 'Startup moved 24s → 7s and checkout 14s → 5s.',
  },
  {
    id: 'sdd-workflow',
    title: 'Spec-Driven Development',
    moment: 'Current AI-assisted development.',
    challenge: 'Generated code still needs judgment and correction.',
    result:
      'Define acceptance criteria, generate a first pass with Claude Code/Cursor/Codex, validate layer by layer, and describe failures precisely enough for correction.',
  },
];

const gameLog: ReadonlyArray<GameLogCaseStudy> = [
  {
    id: 'elenas-app',
    name: 'Elenas App',
    context:
      'Social commerce platform connecting women-led resellers; grew to 3M+ downloads and 200K+ daily active users by 2024 (historical — company later shut down).',
    role: 'Senior Frontend Developer → Tech Lead → Frontend Staff Engineer; owned mobile architecture, releases to Google Play and the App Store, and the 5–7 person team.',
    stack: ['React Native', 'Expo', 'EAS', 'Clean Architecture', 'Zustand', 'TanStack Query'],
    outcomeLabel: 'Outcome',
    outcome: 'Historical scale: 3M+ app downloads and 200K+ daily active users by the time I left in 2024.',
  },
  {
    id: 'elenas-web',
    name: 'Elenas Web',
    context: 'Migrating key mobile features (Expo/React Native) to the web.',
    role: 'Spearheaded the mobile-to-web migration as Frontend Staff Engineer.',
    stack: ['Next.js App Router', 'Turborepo', 'pnpm', 'Published shared packages'],
    outcomeLabel: 'Outcome',
    outcome: 'Complete migration onto a Turborepo monorepo with published packages for large-scale code reuse.',
  },
  {
    id: 'monokera-core',
    name: 'Monokera-Core',
    context:
      'Core monorepo of shared services, components, utilities, and the design system, consumed across the company\u2019s applications.',
    role: 'Led adoption and architecture work for the Turborepo/pnpm monorepo.',
    stack: ['Turborepo', 'pnpm', 'Design system', 'JFrog'],
    outcomeLabel: 'Outcome',
    outcome: 'Libraries were published and stored in JFrog.',
  },
  {
    id: 'mi-banco',
    name: 'Mi Banco',
    context: 'Insurance management and sales platform.',
    role: 'Designed component/service reuse for the platform\u2019s first phase.',
    stack: ['Component libraries', 'Service reuse', 'Insurance platform'],
    outcomeLabel: 'Responsibility',
    outcome:
      'Establish a reusable foundation for the core platform\u2019s first phase.',
  },
  {
    id: 'sales-builder',
    name: 'Sales Builder',
    context: 'Assisted insurance-sales micro-frontend.',
    role: 'Built the service and picked up Rails for the need.',
    stack: ['Ruby on Rails', 'Microservice', 'Micro-frontend'],
    outcomeLabel: 'Outcome',
    outcome: 'Managed the components rendered by the assisted sales micro-frontend.',
  },
  {
    id: 'stories-feature',
    name: 'Stories Feature',
    context: 'Short videos/photos and product discovery.',
    role: 'Built the native module and bridge.',
    stack: ['Kotlin', 'Android Native Modules', 'React Native', 'Expo Bare'],
    outcomeLabel: 'Outcome',
    outcome: 'Showcased top-selling brands and products through the Stories-like feature.',
  },
  {
    id: 'mobile-cicd-pipeline',
    name: 'Mobile CI/CD pipeline',
    context: 'Mobile release delivery.',
    role: 'Led the Expo tooling migration and later EAS pipeline work.',
    stack: ['Expo Classic Updates', 'EAS', 'CI/CD', 'OTA updates'],
    outcomeLabel: 'Outcome',
    outcome: 'Shipped fixes through OTA updates without full store resubmission.',
  },
];

const links: ReadonlyArray<ProfileLink> = [
  {
    kind: 'github',
    label: 'GitHub profile',
    href: 'https://github.com/joseocabarcas',
    external: true,
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn profile',
    href: 'https://linkedin.com/in/jose-cabarcas',
    external: true,
  },
  {
    kind: 'email',
    label: 'Email José Cabarcas',
    href: 'mailto:josecabarcas94@gmail.com',
    external: false,
  },
];

export const profile: ProfileContent = {
  hero,
  stats,
  seasonLog,
  attributes,
  highlights,
  gameLog,
  links,
};
