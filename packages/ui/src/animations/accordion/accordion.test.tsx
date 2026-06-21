import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Accordion } from './accordion';

describe('Accordion', () => {
  const items = [
    { title: 'First', content: <span>First content</span> },
    { title: 'Second', content: <span>Second content</span> },
  ];

  it('renders all titles', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('expands default open item', () => {
    render(<Accordion items={items} defaultOpen={0} />);
    expect(screen.getByText('First content')).toBeInTheDocument();
  });

  it('has proper aria attributes', () => {
    render(<Accordion items={items} defaultOpen={0} />);
    const triggers = screen.getAllByRole('button');
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
    expect(triggers[0]).toHaveAttribute('aria-controls');
  });
});
