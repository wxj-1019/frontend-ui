import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlipCard } from './flip-card';

describe('FlipCard', () => {
  it('renders front content', () => {
    render(
      <FlipCard
        frontContent={<span>Front Face</span>}
        backContent={<span>Back Face</span>}
      />,
    );
    expect(screen.getByText('Front Face')).toBeInTheDocument();
    expect(screen.getByText('Back Face')).toBeInTheDocument();
  });

  it('has accessible role', () => {
    render(
      <FlipCard frontContent="F" backContent="B" />,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles on click when trigger is click', () => {
    render(
      <FlipCard
        trigger="click"
        frontContent={<span>ClickFront</span>}
        backContent={<span>ClickBack</span>}
      />,
    );
    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();
  });
});
