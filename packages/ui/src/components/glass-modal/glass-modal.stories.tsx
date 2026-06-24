import type { Meta, StoryObj } from '@storybook/react';
import { GlassModal } from './glass-modal';

const meta: Meta<typeof GlassModal> = {
  title: 'Components/GlassModal',
  component: GlassModal,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof GlassModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: <div className="p-4 text-center">Modal Content</div>,
  },
};
