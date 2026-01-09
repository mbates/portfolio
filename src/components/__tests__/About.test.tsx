import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../About';

describe('About', () => {
  it('renders about content', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText(/custom software development/i)).toBeInTheDocument();
  });

  it('contains technology links', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /react/i })).toBeInTheDocument();
    // Angular appears multiple times in About page
    expect(screen.getAllByRole('link', { name: /angular/i }).length).toBeGreaterThan(0);
  });
});
