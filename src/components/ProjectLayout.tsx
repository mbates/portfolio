import type { ReactNode } from 'react';

export interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

// A group of role bullets. Groups with a title render as cards side by side; a single untitled
// group renders as one list.
export interface RoleGroup {
  title?: string;
  items: string[];
}

export interface StackGroup {
  category: string;
  items: string[];
}

export interface ProjectLayoutProps {
  // Decorative: the name is the heading beside it, so give an <img> an empty alt.
  logo: ReactNode;
  name: string;
  tagline: string;
  links?: ProjectLink[];
  metrics?: string[];
  overview: ReactNode;
  role: RoleGroup[];
  techStack: StackGroup[];
}

// The shared structure of every project dialog (plan 05): hero, overview with metric badges,
// my role, and the stack grouped by category.
const ProjectLayout: React.FC<ProjectLayoutProps> = ({
  logo,
  name,
  tagline,
  links = [],
  metrics = [],
  overview,
  role,
  techStack,
}) => {
  const grouped = role.some((group) => group.title);
  return (
    <div className='w-full p-3 pr-5'>
      <header className='flex flex-wrap items-center gap-4 border-b border-gray-200 pb-4'>
        <div className='shrink-0'>{logo}</div>
        <div className='min-w-0 flex-1'>
          <h2 className='text-3xl font-semibold tracking-tight'>{name}</h2>
          <p className='mt-1 text-gray-600'>{tagline}</p>
        </div>
      </header>

      {links.length > 0 && (
        <ul className='mt-4 flex flex-wrap gap-2' aria-label='Links'>
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-sm text-blue-600 hover:underline'
              >
                {link.icon && <img src={link.icon} className='h-4 w-4' alt='' />}
                {link.label}
                <span className='sr-only'> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <section className='my-5' aria-label='Overview'>
        {metrics.length > 0 && (
          <ul className='mb-4 flex flex-wrap gap-2' aria-label='Key figures'>
            {metrics.map((metric) => (
              <li
                key={metric}
                className='rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800'
              >
                {metric}
              </li>
            ))}
          </ul>
        )}
        <div className='space-y-3'>{overview}</div>
      </section>

      <section className='my-5'>
        <h3 className='my-3 text-2xl font-semibold tracking-tight'>My Role</h3>
        {grouped ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {role.map((group, g) => (
              <div key={g} className='rounded-lg bg-gray-50 p-4'>
                {group.title && <h4 className='mb-2 text-lg font-semibold'>{group.title}</h4>}
                <ul className='list-disc space-y-1 pl-5 text-sm'>
                  {group.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className='list-disc space-y-1 pl-5'>
            {role.flatMap((group) => group.items).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      <section className='my-5'>
        <h3 className='my-3 text-2xl font-semibold tracking-tight'>Tech Stack</h3>
        <dl className='space-y-3'>
          {techStack.map((group) => (
            <div key={group.category}>
              <dt className='text-sm font-semibold'>{group.category}</dt>
              <dd>
                <ul className='mt-1 flex flex-wrap gap-1.5'>
                  {group.items.map((item, i) => (
                    <li key={i} className='rounded-full bg-gray-100 px-2 py-0.5 text-sm'>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};

export default ProjectLayout;
