import type { Meta, StoryObj } from '@storybook/react';
import { GlowCard } from './glow-card';

const meta: Meta<typeof GlowCard> = {
  title: 'Components/GlowCard',
  component: GlowCard,
  tags: ['autodocs'],
  argTypes: {
    glowColor: { control: 'color' },
    intensity: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    borderColor: { control: 'color' },
    enableTilt: { control: 'boolean' },
    tiltRange: { control: { type: 'number', min: 5, max: 30, step: 5 } },
    showGlow: { control: 'boolean' },
    glowSize: { control: { type: 'number', min: 50, max: 400, step: 50 } },
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof GlowCard>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-white">Glow Card</h3>
        <p className="text-gray-400">Hover over this card to see the glow effect follow your cursor.</p>
      </div>
    ),
    glowColor: 'var(--color-accent)',
    intensity: 1,
    enableTilt: true,
    tiltRange: 10,
    showGlow: true,
    glowSize: 200,
  },
};

export const PurpleGlow: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-white">Purple Glow</h3>
        <p className="text-gray-400">Custom purple glow effect with border.</p>
      </div>
    ),
    glowColor: '#a855f7',
    borderColor: '#a855f7',
  },
};

export const NoTilt: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-white">No Tilt</h3>
        <p className="text-gray-400">Glow effect without 3D tilt.</p>
      </div>
    ),
    enableTilt: false,
  },
};

export const LargeGlow: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-white">Large Glow</h3>
        <p className="text-gray-400">Larger glow radius for bigger cards.</p>
      </div>
    ),
    glowSize: 400,
    intensity: 1.5,
  },
};

export const WithBorder: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-white">Border Glow</h3>
        <p className="text-gray-440">Card with glowing border effect.</p>
      </div>
    ),
    borderColor: '#22c55e',
    glowColor: '#22c55e',
  },
};

export const MinimalGlow: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-white">Minimal</h3>
        <p className="text-gray-400">Subtle glow with low intensity.</p>
      </div>
    ),
    intensity: 0.5,
    glowSize: 150,
  },
};

export const DarkBackground: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-white">Dark Background</h3>
        <p className="text-gray-400">Custom dark background with glow.</p>
      </div>
    ),
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    glowColor: '#f59e0b',
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[
        { color: '#ef4444', title: 'Red' },
        { color: '#3b82f6', title: 'Blue' },
        { color: '#22c55e', title: 'Green' },
      ].map(({ color, title }) => (
        <GlowCard key={title} glowColor={color} borderColor={color}>
          <h3 className="mb-2 text-lg font-semibold text-white">{title} Glow</h3>
          <p className="text-gray-400">Hover to see effect</p>
        </GlowCard>
      ))}
    </div>
  ),
  args: {
    children: <div>Placeholder</div>,
  },
};
