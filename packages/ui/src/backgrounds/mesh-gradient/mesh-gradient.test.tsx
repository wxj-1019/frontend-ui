import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MeshGradient } from './mesh-gradient';

describe('MeshGradient', () => {
  it('renders without errors', () => {
    const { container } = render(<MeshGradient />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom colors', () => {
    const { container } = render(
      <MeshGradient colors={['#ff0000', '#00ff00', '#0000ff']} />
    );
    const el = container.firstChild as HTMLElement;
    // jsdom 将 hex 规范化为 rgb，检查所有三种颜色都被写入背景层
    expect(el.style.background).toContain('rgb(255, 0, 0)');
    expect(el.style.background).toContain('rgb(0, 255, 0)');
    expect(el.style.background).toContain('rgb(0, 0, 255)');
  });

  it('disables animation when animated is false', () => {
    const { container } = render(<MeshGradient animated={false} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.animation).toBe('');
  });
});
