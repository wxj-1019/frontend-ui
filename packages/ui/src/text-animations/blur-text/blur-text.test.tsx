import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlurText } from './blur-text';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('BlurText', () => {
  it('renders text content', () => {
    render(<BlurText text="Hello" />);
    // 默认 animateBy="characters" 时文本按字符拆分，使用 aria-label 查询
    expect(screen.getByLabelText('Hello')).toBeInTheDocument();
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

  it('supports words animation mode', () => {
    render(<BlurText text="Hello World" animateBy="words" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('supports none animation mode', () => {
    render(<BlurText text="Hello" animateBy="none" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
