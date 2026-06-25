import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RotatingText } from './rotating-text';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('RotatingText', () => {
  it('renders text content', () => {
    render(<RotatingText text="Rotate" />);
    // 组件按字符拆分文本，使用 aria-label 查询
    expect(screen.getByLabelText('Rotate')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<RotatingText text="Accessible" />);
    await expectNoA11yViolations(container);
  });

  it('applies custom className', () => {
    const { container } = render(
      <RotatingText text="Styled" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('supports counter-clockwise direction', () => {
    render(<RotatingText text="CCW" direction="counter-clockwise" />);
    expect(screen.getByLabelText('CCW')).toBeInTheDocument();
  });

  it('has aria-label for screen readers', () => {
    render(<RotatingText text="Accessible" />);
    expect(screen.getByLabelText('Accessible')).toBeInTheDocument();
  });
});
