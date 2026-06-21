import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dock } from './dock';

describe('Dock', () => {
  it('renders items', () => {
    const items = [
      { icon: <span>Icon1</span>, label: 'Item 1' },
      { icon: <span>Icon2</span>, label: 'Item 2' },
    ];
    render(<Dock items={items} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
