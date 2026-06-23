import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MagneticButton } from './magnetic-button';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('MagneticButton', () => {
  it('renders children', () => {
    render(<MagneticButton>Click Me</MagneticButton>);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MagneticButton>Accessible</MagneticButton>);
    await expectNoA11yViolations(container);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MagneticButton className="custom-class">Styled</MagneticButton>
    );
    expect(container.querySelector('button')).toHaveClass('custom-class');
  });

  it('triggers onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<MagneticButton onClick={handleClick}>Click</MagneticButton>);
    const button = screen.getByRole('button', { name: 'Click' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn();
    render(<MagneticButton onClick={handleClick}>Press</MagneticButton>);
    const button = screen.getByRole('button', { name: 'Press' });
    await userEvent.tab();
    expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
