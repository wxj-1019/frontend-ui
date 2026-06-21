import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Masonry } from './masonry';

describe('Masonry', () => {
  it('renders children content', () => {
    render(
      <Masonry>
        <div>Item One</div>
        <div>Item Two</div>
        <div>Item Three</div>
      </Masonry>
    );
    expect(screen.getByText('Item One')).toBeInTheDocument();
    expect(screen.getByText('Item Two')).toBeInTheDocument();
    expect(screen.getByText('Item Three')).toBeInTheDocument();
  });

  it('applies default columns and gap via inline style', () => {
    const { container } = render(
      <Masonry>
        <div>Item</div>
      </Masonry>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.columnCount).toBe('3');
    expect(wrapper.style.columnGap).toBe('16px');
  });
});
