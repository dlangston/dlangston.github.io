import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Nav from './Nav';

describe('Nav', () => {
  it('hides HOME on the home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.queryByRole('link', { name: /home/i })).not.toBeInTheDocument();
  });

  it('shows HOME when navigating away from home', () => {
    render(
      <MemoryRouter initialEntries={['/video']}>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});
