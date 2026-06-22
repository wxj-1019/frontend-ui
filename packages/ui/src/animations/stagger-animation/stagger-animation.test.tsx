import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StaggerAnimation } from './stagger-animation';

describe('StaggerAnimation', () => {
  it('renders without crashing', () => {
    render(
      <StaggerAnimation>
        <div>Item 1</div>
        <div>Item 2</div>
      </StaggerAnimation>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders children as list items', () => {
    render(
      <StaggerAnimation>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </StaggerAnimation>
    );
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  it('applies custom className', () => {
    render(
      <StaggerAnimation className="custom-class">
        <div>Item</div>
      </StaggerAnimation>
    );
    expect(screen.getByRole('list')).toHaveClass('custom-class');
  });

  it('applies itemClassName to children', () => {
    render(
      <StaggerAnimation itemClassName="item-class">
        <div>Item 1</div>
        <div>Item 2</div>
      </StaggerAnimation>
    );
    const items = screen.getAllByRole('listitem');
    items.forEach((item) => {
      expect(item).toHaveClass('item-class');
    });
  });

  it('has flex layout', () => {
    render(
      <StaggerAnimation>
        <div>Item</div>
      </StaggerAnimation>
    );
    expect(screen.getByRole('list')).toHaveClass('flex');
  });

  it('sets initial opacity to 0 when autoPlay is true', () => {
    render(
      <StaggerAnimation autoPlay={true}>
        <div>Item</div>
      </StaggerAnimation>
    );
    const items = screen.getAllByRole('listitem');
    items.forEach((item) => {
      expect(item).toHaveClass('opacity-0');
    });
  });

  it('does not set opacity to 0 when autoPlay is false', () => {
    render(
      <StaggerAnimation autoPlay={false}>
        <div>Item</div>
      </StaggerAnimation>
    );
    const items = screen.getAllByRole('listitem');
    items.forEach((item) => {
      expect(item).not.toHaveClass('opacity-0');
    });
  });

  it('renders single child as list item', () => {
    render(
      <StaggerAnimation>
        <div>Single Item</div>
      </StaggerAnimation>
    );
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
  });
});
