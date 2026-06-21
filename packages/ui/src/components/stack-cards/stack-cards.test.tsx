import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StackCards } from './stack-cards';

describe('StackCards', () => {
  it('renders all cards', () => {
    render(
      <StackCards cardHeight={300}>
        <div>Card One</div>
        <div>Card Two</div>
        <div>Card Three</div>
      </StackCards>
    );
    expect(screen.getByText('Card One')).toBeInTheDocument();
    expect(screen.getByText('Card Two')).toBeInTheDocument();
    expect(screen.getByText('Card Three')).toBeInTheDocument();
  });

  it('applies cardHeight to container', () => {
    const { container } = render(
      <StackCards cardHeight={420}>
        <div>Card One</div>
        <div>Card Two</div>
      </StackCards>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe('420px');
  });
});
