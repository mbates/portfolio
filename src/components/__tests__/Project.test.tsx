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

    expect(screen.getByText(/bill-only and consignment side of surgery/i)).toBeInTheDocument();
  });

  it('renders OpsKwan project', () => {
    render(
      <BrowserRouter>
        <Project project="opskwan" />
      </BrowserRouter>
    );

    expect(screen.getByText(/logistics platform for an orthopaedic implant distributor/i)).toBeInTheDocument();
  });

  it('renders Mickles project', () => {
    render(
      <BrowserRouter>
        <Project project="mickles" />
      </BrowserRouter>
    );

    expect(screen.getByText(/turned that store into/i)).toBeInTheDocument();
  });

  it('renders Bates project', () => {
    render(
      <BrowserRouter>
        <Project project="bates" />
      </BrowserRouter>
    );

    expect(screen.getByText(/consultancy and product studio/i)).toBeInTheDocument();
  });

  it('renders JB Karting project', () => {
    render(
      <BrowserRouter>
        <Project project="jbkarting" />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'JB Karting' })).toBeInTheDocument();
    expect(screen.getByText(/sponsors want to see results/i)).toBeInTheDocument();
  });

  it('renders Zeepler project', () => {
    render(
      <BrowserRouter>
        <Project project="zeepler" />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Zeepler' })).toBeInTheDocument();
    expect(screen.getByText(/takes the label as json/i)).toBeInTheDocument();
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
