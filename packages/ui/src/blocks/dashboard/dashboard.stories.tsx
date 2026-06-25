import { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './dashboard';

const meta: Meta<typeof Dashboard> = {
  title: 'Blocks/Dashboard',
  component: Dashboard,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

const mockRows = [
  {
    title: '核心指标',
    description: '今日实时数据概览',
    layout: 'kpi' as const,
    cards: [
      {
        id: '1',
        title: '总访问量',
        value: '128.4K',
        change: '+12.5%',
        changeDirection: 'up' as const,
        color: 'accent' as const,
      },
      {
        id: '2',
        title: '活跃用户',
        value: '3,842',
        change: '+5.2%',
        changeDirection: 'up' as const,
        color: 'success' as const,
      },
      {
        id: '3',
        title: '转化率',
        value: '3.24%',
        change: '-0.8%',
        changeDirection: 'down' as const,
        color: 'warning' as const,
      },
      {
        id: '4',
        title: '平均时长',
        value: '4m 32s',
        subtitle: '每会话',
        change: '+2.1%',
        changeDirection: 'up' as const,
      },
    ],
  },
  {
    title: '趋势图表',
    description: '近 30 天数据趋势',
    layout: 'chart' as const,
  },
];

export const Default: Story = {
  args: {
    title: '数据仪表盘',
    subtitle: '实时监控你的业务指标',
    rows: mockRows,
    prefersReducedMotion: true,
  },
};

export const TwoColumns: Story = {
  args: {
    title: '数据仪表盘',
    rows: mockRows,
    columns: 2,
    prefersReducedMotion: true,
  },
};
