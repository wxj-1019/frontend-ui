import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FullscreenNav } from './index';

const mockLinks = [
  { label: '首页', href: '/' },
  { label: '组件', href: '/components' },
  { label: '关于', href: '/about' },
];

describe('FullscreenNav', () => {
  it('renders trigger button', () => {
    render(<FullscreenNav links={mockLinks} prefersReducedMotion />);
    expect(
      screen.getByRole('button', { name: /打开导航菜单/i })
    ).toBeInTheDocument();
  });

  it('opens menu on trigger click', () => {
    render(<FullscreenNav links={mockLinks} prefersReducedMotion />);
    const trigger = screen.getByRole('button', { name: /打开导航菜单/i });
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('首页')).toBeInTheDocument();
  });

  it('toggles aria-expanded on trigger click', () => {
    render(<FullscreenNav links={mockLinks} prefersReducedMotion />);
    const trigger = screen.getByRole('button', { name: /打开导航菜单/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders sub-links when provided', () => {
    const linksWithChildren = [
      {
        label: '文档',
        href: '/docs',
        children: [{ label: '快速开始', href: '/docs/quickstart' }],
      },
    ];
    render(<FullscreenNav links={linksWithChildren} prefersReducedMotion />);
    fireEvent.click(screen.getByRole('button', { name: /打开导航菜单/i }));
    expect(screen.getByText('快速开始')).toBeInTheDocument();
  });

  it('supports custom trigger label', () => {
    render(
      <FullscreenNav
        links={mockLinks}
        triggerLabel="导航"
        prefersReducedMotion
      />
    );
    expect(screen.getByText('导航')).toBeInTheDocument();
  });
});
