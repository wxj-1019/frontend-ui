import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GridMotion } from './grid-motion';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('GridMotion', () => {
  it('renders the correct number of grid items', () => {
    const { container } = render(<GridMotion columns={3} rows={2} />);
    const items = container.firstElementChild?.children ?? [];
    expect(items.length).toBe(6);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<GridMotion columns={2} rows={2} />);
    await expectNoA11yViolations(container);
  });

  it('applies custom className', () => {
    const { container } = render(<GridMotion className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has aria-hidden for decorative content', () => {
    const { container } = render(<GridMotion />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
