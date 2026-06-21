import { Meta, StoryObj } from '@storybook/react';
import { BentoGrid, BentoCard } from './bento-grid';

const meta: Meta<typeof BentoGrid> = {
  title: 'Blocks/BentoGrid',
  component: BentoGrid,
};

export default meta;

export const Default: StoryObj<typeof BentoGrid> = {
  render: () => (
    <div className="p-8">
      <BentoGrid>
        <BentoCard
          title="Fast Performance"
          description="Optimized animations with GPU-accelerated properties"
          variant="default"
        />
        <BentoCard
          title="TypeScript First"
          description="Full type safety with exported prop interfaces"
          variant="accent"
        />
        <BentoCard
          title="Responsive Design"
          description="Works seamlessly across all screen sizes"
          variant="subtle"
        />
      </BentoGrid>
    </div>
  ),
};

export const WithWideCard: StoryObj<typeof BentoGrid> = {
  render: () => (
    <div className="p-8">
      <BentoGrid>
        <BentoCard
          wide
          title="Featured: Multi-Engine Support"
          description="Choose from GSAP, Motion, CSS, and more — each component uses the best engine for its purpose."
          variant="accent"
        />
        <BentoCard
          title="Modular Architecture"
          description="Each component is independent and tree-shakeable"
        />
        <BentoCard
          title="Zero Config"
          description="Sensible defaults that work out of the box"
        />
      </BentoGrid>
    </div>
  ),
};
