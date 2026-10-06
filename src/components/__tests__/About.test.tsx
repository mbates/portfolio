import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../About';
import { about } from '../../content/about';

describe('About', () => {
  it('renders every paragraph of the About copy, in the first person', () => {
    render(<About />);
    for (const paragraph of about) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    expect(screen.getByText(/full stack engineer in Vancouver/i)).toBeInTheDocument();
  });

  it('no longer speaks for the company', () => {
    const { container } = render(<About />);
    expect(container.textContent).not.toMatch(/\bwe\b|\bour\b|Bates Solutions has/i);
  });

  it('points to the contact command', () => {
    render(<About />);
    expect(screen.getByText('contact')).toBeInTheDocument();
  });
});

describe('static <main>', async () => {
  const { staticMain } = await import('../../content/staticMain');
  const html = staticMain();

  it('carries the About copy and every project, escaped', () => {
    expect(html).toContain('<main class="sr-only">');
    expect(html).toContain("Guy's and St Thomas'");
    expect(html).toContain('<strong>Mandi\'s Mickles</strong>');
    expect(html).toContain('<strong>OpsKwan</strong>');
    expect(html).not.toMatch(/<(?!\/?(main|h1|h2|p|ul|li|strong|a)\b)/);
  });
});
