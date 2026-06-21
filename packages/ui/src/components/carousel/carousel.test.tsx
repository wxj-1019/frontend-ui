import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Carousel } from './carousel';

describe('Carousel', () => {
  it('renders first slide by default', () => {
    render(
      <Carousel showArrows={false} showDots={false}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>
    );
    expect(screen.getByText('Slide One')).toBeInTheDocument();
  });

  it('renders navigation arrows when enabled', () => {
    render(
      <Carousel showArrows showDots={false}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>
    );
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('renders dots when enabled', () => {
    render(
      <Carousel showArrows={false} showDots>
        <div>Slide One</div>
        <div>Slide Two</div>
        <div>Slide Three</div>
      </Carousel>
    );
    expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument();
  });
});
