import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Card3D } from './card-3d';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('Card3D', () => {
  it('renders children', () => {
    render(
      <Card3D>
        <div>Card Content</div>
      </Card3D>
    );
    expect(document.body.textContent).toContain('Card Content');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card3D>
        <div>Accessible</div>
      </Card3D>
    );
    await expectNoA11yViolations(container);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card3D className="custom-class">
        <div>Content</div>
      </Card3D>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
