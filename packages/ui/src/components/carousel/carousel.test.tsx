import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from './carousel';

describe('Carousel', () => {
  it('renders first slide by default', () => {
    render(
      <Carousel showArrows={false} showDots={false}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );
    expect(screen.getByText('Slide One')).toBeInTheDocument();
  });

  it('renders navigation arrows when enabled', () => {
    render(
      <Carousel showArrows showDots={false}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('hides arrows when showArrows=false', () => {
    render(
      <Carousel showArrows={false} showDots={false}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });

  it('renders dots when enabled', () => {
    render(
      <Carousel showArrows={false} showDots>
        <div>Slide One</div>
        <div>Slide Two</div>
        <div>Slide Three</div>
      </Carousel>,
    );
    expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument();
  });

  it('navigates to next slide', () => {
    render(
      <Carousel showArrows showDots={false}>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );
    expect(screen.getByText('Slide One')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Next slide'));
    expect(screen.getByText('Slide Two')).toBeInTheDocument();
  });

  it('navigates to previous slide', () => {
    render(
      <Carousel showArrows showDots={false} loop>
        <div>Slide One</div>
        <div>Slide Two</div>
      </Carousel>,
    );
    fireEvent.click(screen.getByLabelText('Previous slide'));
    expect(screen.getByText('Slide Two')).toBeInTheDocument();
  });

  it('navigates via dot click', () => {
    render(
      <Carousel showArrows={false} showDots>
        <div>Slide One</div>
        <div>Slide Two</div>
        <div>Slide Three</div>
      </Carousel>,
    );
    fireEvent.click(screen.getByLabelText('Go to slide 3'));
    expect(screen.getByText('Slide Three')).toBeInTheDocument();
  });

  it('returns null when no children', () => {
    const { container } = render(
      <Carousel showArrows={false} showDots={false}>
        {[]}
      </Carousel>,
    );
    expect(container.firstChild).toBeNull();
  });
});
