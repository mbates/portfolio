import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Project, { projects } from '../Project';
import { projectSummaries } from '../../content/about';

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

  it.each(projects)('renders a dialog for every listed project: %s', (project) => {
    render(
      <BrowserRouter>
        <Project project={project} />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.queryByText(/doesn't exist/i)).not.toBeInTheDocument();
  });

  it('gives every listed project a summary for the About dialog and the static page', () => {
    expect(projectSummaries).toHaveLength(projects.length);
  });

  it('lists the projects the terminal can show', () => {
    expect(projects).toEqual([
      'bates',
      'casechek',
      'firstpoint',
      'jbkarting',
      'mickles',
      'opskwan',
      'sdks',
      'wellplated',
      'zeepler',
    ]);
  });

  it('renders the payment SDKs project', () => {
    render(
      <BrowserRouter>
        <Project project="sdks" />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Payment SDKs' })).toBeInTheDocument();
    expect(screen.getByText(/share one design/i)).toBeInTheDocument();
  });

  it('renders the Well-Plated project, framed as my part of a team', () => {
    render(
      <BrowserRouter>
        <Project project="wellplated" />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Well-Plated' })).toBeInTheDocument();
    expect(screen.getByText(/largely my colleagues/i)).toBeInTheDocument();
  });

  it('renders the FirstPoint project', () => {
    render(
      <BrowserRouter>
        <Project project="firstpoint" />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'FirstPoint Energy' })).toBeInTheDocument();
    expect(screen.getByText(/took it\s+in-house/i)).toBeInTheDocument();
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
