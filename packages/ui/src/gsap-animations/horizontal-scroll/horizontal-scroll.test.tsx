import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HorizontalScroll } from './horizontal-scroll';

describe('HorizontalScroll', () => {
  it('renders all sections', () => {
    render(
      <HorizontalScroll sectionWidth={400}>
        <div>Section A</div>
        <div>Section B</div>
        <div>Section C</div>
      </HorizontalScroll>
    );
    expect(screen.getByText('Section A')).toBeInTheDocument();
    expect(screen.getByText('Section B')).toBeInTheDocument();
    expect(screen.getByText('Section C')).toBeInTheDocument();
  });

  it('sets track width based on sectionWidth and count', () => {
    const { container } = render(
      <HorizontalScroll sectionWidth={500}>
        <div>One</div>
        <div>Two</div>
      </HorizontalScroll>
    );
    const root = container.firstChild as HTMLElement;
    const track = root.firstChild as HTMLElement;
    expect(track.style.width).toBe('1000px');
  });
});
