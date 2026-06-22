import type { Meta, StoryObj } from '@storybook/react';
import { SpringNumber } from './spring-number';

const meta: Meta<typeof SpringNumber> = {
  title: 'Text Animations/SpringNumber',
  component: SpringNumber,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 10000 } },
    precision: { control: { type: 'number', min: 0, max: 6 } },
    delay: { control: { type: 'number', min: 0, max: 3000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof SpringNumber>;

export const Default: Story = {
  args: { value: 100 },
};

export const WithPrefix: Story = {
  args: { value: 42, prefix: 'Total: ', precision: 2 },
};

export const Currency: Story = {
  args: { value: 999.99, prefix: '$', precision: 2 },
};

export const LargeNumber: Story = {
  args: {
    value: 1000000,
    format: (v) => v.toLocaleString(),
    suffix: ' 用户',
  },
};

export const Percentage: Story = {
  args: { value: 87.5, precision: 1, suffix: '%' },
};
