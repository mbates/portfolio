import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProjectLayout, { type ProjectLayoutProps } from '../ProjectLayout';

const props: ProjectLayoutProps = {
  logo: <img src='logo.png' alt='Acme logo' />,
  name: 'Acme',
  tagline: 'A tagline',
  links: [{ label: 'acme.com', url: 'https://acme.com' }],
  metrics: ['100 customers', 'Founded 2020'],
  overview: <p>The overview.</p>,
  role: [{ items: ['Built the API', 'Ran the team'] }],
  techStack: [
    { category: 'Backend', items: ['Node.js', 'Postgres'] },
    { category: 'Frontend', items: ['React'] },
  ],
};

describe('ProjectLayout', () => {
  it('renders the hero, overview, metrics, role and stack', () => {
    render(<ProjectLayout {...props} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Acme' })).toBeInTheDocument();
    expect(screen.getByText('A tagline')).toBeInTheDocument();
    expect(screen.getByAltText('Acme logo')).toBeInTheDocument();
    expect(screen.getByText('The overview.')).toBeInTheDocument();
    const figures = screen.getByRole('list', { name: 'Key figures' });
    expect(within(figures).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      '100 customers',
      'Founded 2020',
    ]);
    expect(screen.getByRole('heading', { level: 3, name: 'My Role' })).toBeInTheDocument();
    expect(screen.getByText('Built the API')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Postgres')).toBeInTheDocument();
  });

  it('opens links in a new tab without handing over the opener', () => {
    render(<ProjectLayout {...props} />);

    const link = screen.getByRole('link', { name: /acme\.com/ });
    expect(link).toHaveAttribute('href', 'https://acme.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('(opens in a new tab)');
  });

  it('renders titled role groups as separate headed cards', () => {
    render(
      <ProjectLayout
        {...props}
        role={[
          { title: 'Backend', items: ['APIs'] },
          { title: 'Frontend', items: ['Apps'] },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { level: 4, name: 'Backend' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Frontend' })).toBeInTheDocument();
  });

  it('leaves out the links and figures when there are none', () => {
    render(<ProjectLayout {...props} links={undefined} metrics={undefined} />);

    expect(screen.queryByRole('list', { name: 'Links' })).not.toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Key figures' })).not.toBeInTheDocument();
  });
});
