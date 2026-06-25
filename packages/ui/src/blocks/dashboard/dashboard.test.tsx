import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dashboard } from './index';

const mockRows = [
  {
    title: '核心指标',
    description: '今日概览',
    layout: 'kpi' as const,
    cards: [
      {
        id: '1',
        title: '总访问量',
        value: '128.4K',
        change: '+12.5%',
        changeDirection: 'up' as const,
      },
      { id: '2', title: '活跃用户', value: '3,842', color: 'success' as const },
    ],
  },
  {
    title: '趋势图表',
    layout: 'chart' as const,
  },
];

describe('Dashboard', () => {
  it('renders title and subtitle', () => {
    render(
      <Dashboard
        title="仪表盘"
        subtitle="实时数据"
        rows={mockRows}
        prefersReducedMotion
      />
    );
    expect(screen.getByText('仪表盘')).toBeInTheDocument();
    expect(screen.getByText('实时数据')).toBeInTheDocument();
  });

  it('renders all row titles', () => {
    render(<Dashboard title="仪表盘" rows={mockRows} prefersReducedMotion />);
    expect(screen.getByText('核心指标')).toBeInTheDocument();
    expect(screen.getByText('趋势图表')).toBeInTheDocument();
  });

  it('renders KPI cards with values', () => {
    render(<Dashboard title="仪表盘" rows={mockRows} prefersReducedMotion />);
    expect(screen.getByText('128.4K')).toBeInTheDocument();
    expect(screen.getByText('3,842')).toBeInTheDocument();
  });

  it('renders chart placeholder for chart rows', () => {
    render(<Dashboard title="仪表盘" rows={mockRows} prefersReducedMotion />);
    expect(screen.getByText(/图表区域/)).toBeInTheDocument();
  });

  it('renders aria-label on section', () => {
    render(<Dashboard title="仪表盘" rows={mockRows} prefersReducedMotion />);
    expect(screen.getByLabelText('仪表盘')).toBeInTheDocument();
  });
});
