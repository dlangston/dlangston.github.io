import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Nav from './Nav';

describe('Nav', () => {
  it('shows HOME as active on the home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Nav />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('shows HOME as inactive when navigating away from home', () => {
    render(
      <MemoryRouter initialEntries={['/video']}>
        <Nav />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).not.toHaveAttribute('aria-current', 'page');
  });
});
