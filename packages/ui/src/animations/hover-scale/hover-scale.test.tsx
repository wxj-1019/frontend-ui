import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HoverScale } from './hover-scale';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('HoverScale', () => {
  it('renders children', () => {
    render(
      <HoverScale>
        <div>Hover Me</div>
      </HoverScale>
    );
    expect(document.body.textContent).toContain('Hover Me');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <HoverScale>
        <div>Accessible</div>
      </HoverScale>
    );
    await expectNoA11yViolations(container);
  });

  it('applies custom className', () => {
    const { container } = render(
      <HoverScale className="custom-class">
        <div>Content</div>
      </HoverScale>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
