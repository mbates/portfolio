import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Project from '../Project';

describe('Project', () => {
  it('renders Casechek project', () => {
    render(
      <BrowserRouter>
        <Project project="casechek" />
      </BrowserRouter>
    );

    expect(screen.getByText(/casechek inc/i)).toBeInTheDocument();
  });

  it('renders OpsKwan project', () => {
    render(
      <BrowserRouter>
        <Project project="opskwan" />
      </BrowserRouter>
    );

    expect(screen.getByText(/opskwan was founded/i)).toBeInTheDocument();
  });

  it('renders Mickles project', () => {
    render(
      <BrowserRouter>
        <Project project="mickles" />
      </BrowserRouter>
    );

    expect(screen.getByText(/mickles canning/i)).toBeInTheDocument();
  });

  it('renders Bates project', () => {
    render(
      <BrowserRouter>
        <Project project="bates" />
      </BrowserRouter>
    );

    expect(screen.getByText(/bates solutiuons/i)).toBeInTheDocument();
  });

  it('shows message for unknown project', () => {
    render(
      <BrowserRouter>
        <Project project="unknown" />
      </BrowserRouter>
    );

    expect(screen.getByText(/project "unknown" doesn't exist/i)).toBeInTheDocument();
  });
});
