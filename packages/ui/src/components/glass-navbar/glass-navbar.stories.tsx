import type { Meta, StoryObj } from '@storybook/react';
import { GlassNavbar } from './glass-navbar';

const meta: Meta<typeof GlassNavbar> = {
  title: 'Components/GlassNavbar',
  component: GlassNavbar,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof GlassNavbar>;

export const Default: Story = {
  args: {
    children: (
      <>
        <span className="font-semibold">Logo</span>
        <div className="flex gap-4">
          <span>Docs</span>
          <span>Components</span>
        </div>
      </>
    ),
  },
};

export const Scrolled: Story = {
  args: {
    blur: 20,
    opacity: 0.25,
    children: (
      <>
        <span className="font-semibold">Logo</span>
        <div className="flex gap-4">
          <span>Docs</span>
          <span>Components</span>
        </div>
      </>
    ),
  },
};
