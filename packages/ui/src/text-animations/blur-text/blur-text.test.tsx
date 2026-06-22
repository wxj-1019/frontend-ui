import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlurText } from './blur-text';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('BlurText', () => {
  it('renders text content', () => {
    render(<BlurText text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<BlurText text="Hello World" />);
    await expectNoA11yViolations(container);
  });

  it('applies custom className', () => {
    const { container } = render(
      <BlurText text="Hello" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
