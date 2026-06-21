import type { Meta, StoryObj } from '@storybook/react';
import { Masonry } from './masonry';

const meta: Meta<typeof Masonry> = {
  title: 'Components/Masonry',
  component: Masonry,
  argTypes: {
    columns: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    gap: { control: { type: 'range', min: 0, max: 48, step: 2 } },
  },
};

export default meta;
type Story = StoryObj<typeof Masonry>;

const items = Array.from({ length: 9 }).map((_, i) => ({
  height: 120 + ((i * 37) % 160),
  color: `hsl(${(i * 40) % 360} 70% 55%)`,
  label: `Card ${i + 1}`,
}));

export const Default: Story = {
  args: {
    columns: 3,
    gap: 16,
  },
  render: (args) => (
    <Masonry {...args}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            height: item.height,
            background: item.color,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
          }}
        >
          {item.label}
        </div>
      ))}
    </Masonry>
  ),
};

export const Responsive: Story = {
  args: {
    columns: 1,
    gap: 12,
    breakpointCols: { 640: 2, 1024: 3, 1280: 4 },
  },
  render: (args) => (
    <Masonry {...args}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            height: item.height,
            background: item.color,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
          }}
        >
          {item.label}
        </div>
      ))}
    </Masonry>
  ),
};
