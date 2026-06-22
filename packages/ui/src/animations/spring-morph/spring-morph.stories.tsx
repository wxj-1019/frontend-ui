import type { Meta, StoryObj } from '@storybook/react';
import { SpringMorph } from './spring-morph';
import { useState } from 'react';

const meta: Meta<typeof SpringMorph> = {
  title: 'Animations/SpringMorph',
  component: SpringMorph,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpringMorph>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0);
    return (
      <div className="text-center">
        <SpringMorph morphKey={key}>
          <div className="rounded-lg bg-blue-500/20 px-8 py-6 text-lg text-blue-300">
            Content {key + 1}
          </div>
        </SpringMorph>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => setKey((k) => k + 1)}
        >
          Switch
        </button>
      </div>
    );
  },
};

export const Cards: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0);
    const cards = [
      { title: 'First', color: 'bg-blue-500/20', text: 'text-blue-300' },
      { title: 'Second', color: 'bg-purple-500/20', text: 'text-purple-300' },
      { title: 'Third', color: 'bg-green-500/20', text: 'text-green-300' },
    ];
    return (
      <div className="text-center">
        <SpringMorph morphKey={key}>
          <div
            className={`rounded-lg ${cards[key].color} px-8 py-6 ${cards[key].text} text-lg`}
          >
            {cards[key].title} Card
          </div>
        </SpringMorph>
        <button
          className="mt-4 rounded bg-purple-500 px-4 py-2 text-white"
          onClick={() => setKey((k) => (k + 1) % 3)}
        >
          Next Card
        </button>
      </div>
    );
  },
};
