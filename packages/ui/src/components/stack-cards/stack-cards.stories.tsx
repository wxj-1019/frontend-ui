import type { Meta, StoryObj } from '@storybook/react';
import { StackCards } from './stack-cards';

const meta: Meta<typeof StackCards> = {
  title: 'Components/StackCards',
  component: StackCards,
  argTypes: {
    cardHeight: { control: { type: 'range', min: 200, max: 600, step: 10 } },
    gap: { control: { type: 'range', min: 0, max: 80, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof StackCards>;

const cards = [
  { label: '01', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { label: '02', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { label: '03', gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)' },
  { label: '04', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
];

export const Default: Story = {
  args: {
    cardHeight: 320,
    gap: 20,
  },
  render: (args) => (
    <div style={{ minHeight: '400vh' }}>
      <StackCards {...args}>
        {cards.map((c) => (
          <div
            key={c.label}
            style={{
              height: '100%',
              width: '100%',
              background: c.gradient,
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 64,
              fontWeight: 800,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
            }}
          >
            {c.label}
          </div>
        ))}
      </StackCards>
    </div>
  ),
};
