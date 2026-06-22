import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BounceCards } from './bounce-cards';

const mockCards = [
  { id: '1', content: <div>Card 1</div> },
  { id: '2', content: <div>Card 2</div> },
  { id: '3', content: <div>Card 3</div> },
  { id: '4', content: <div>Card 4</div> },
  { id: '5', content: <div>Card 5</div> },
];

describe('BounceCards', () => {
  it('renders without crashing', () => {
    render(<BounceCards cards={mockCards} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders first card content', () => {
    render(<BounceCards cards={mockCards} />);
    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<BounceCards cards={mockCards} />);
    expect(screen.getByLabelText('Previous card')).toBeInTheDocument();
    expect(screen.getByLabelText('Next card')).toBeInTheDocument();
  });

  it('navigates to next card on click', () => {
    render(<BounceCards cards={mockCards} maxStack={3} />);
    const nextBtn = screen.getByLabelText('Next card');
    fireEvent.click(nextBtn);
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('navigates to previous card on click', () => {
    render(<BounceCards cards={mockCards} maxStack={3} />);
    const nextBtn = screen.getByLabelText('Next card');
    const prevBtn = screen.getByLabelText('Previous card');
    
    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });

  it('disables previous button at start', () => {
    render(<BounceCards cards={mockCards} />);
    const prevBtn = screen.getByLabelText('Previous card');
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button at end', () => {
    render(<BounceCards cards={mockCards} maxStack={5} />);
    const nextBtn = screen.getByLabelText('Next card');
    expect(nextBtn).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <BounceCards cards={mockCards} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders cards with images', () => {
    const cardsWithImages = [
      { id: '1', content: <div>Card 1</div>, image: 'test.jpg' },
    ];
    render(<BounceCards cards={cardsWithImages} />);
    const img = screen.getByRole('img', { hidden: true });
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('has correct aria attributes', () => {
    render(<BounceCards cards={mockCards} />);
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('allows looping when enabled', () => {
    render(<BounceCards cards={mockCards} loop={true} maxStack={3} />);
    const nextBtn = screen.getByLabelText('Next card');
    
    // Navigate to end
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    
    // Should loop back
    fireEvent.click(nextBtn);
    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });
});
