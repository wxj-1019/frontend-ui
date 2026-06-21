import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Draggable } from './draggable';

describe('Draggable', () => {
  it('renders children content', () => {
    render(
      <Draggable>
        <span>Drag Me</span>
      </Draggable>,
    );
    expect(screen.getByText('Drag Me')).toBeInTheDocument();
  });

  it('has accessible role and label', () => {
    render(
      <Draggable>
        <span>Content</span>
      </Draggable>,
    );
    expect(screen.getByRole('button', { name: '可拖拽元素' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Draggable className="custom-class">
        <span>X</span>
      </Draggable>,
    );
    expect(screen.getByRole('button').className).toContain('custom-class');
  });
});
