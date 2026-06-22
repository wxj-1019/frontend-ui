import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DecryptedText } from './decrypted-text';

describe('DecryptedText', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<DecryptedText text="Hello" />);
    expect(screen.getByRole('text')).toBeInTheDocument();
  });

  it('displays target text when autoPlay is false', () => {
    render(<DecryptedText text="Hello" autoPlay={false} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('starts animation automatically when autoPlay is true', () => {
    render(
      <DecryptedText text="Hello" autoPlay={true} duration={500} speed={50} />
    );
    const element = screen.getByRole('text');

    // Initially should show some random characters
    expect(element.textContent?.length).toBe(5);
  });

  it('applies custom className', () => {
    render(<DecryptedText text="Hello" className="custom-class" />);
    const element = screen.getByRole('text');
    expect(element).toHaveClass('custom-class');
  });

  it('calls onComplete when animation finishes', () => {
    const onComplete = vi.fn();
    render(
      <DecryptedText
        text="Hi"
        autoPlay={true}
        duration={100}
        speed={50}
        onComplete={onComplete}
      />
    );

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(onComplete).toHaveBeenCalled();
  });

  it('uses custom characters set', () => {
    const customChars = '01';
    render(
      <DecryptedText
        text="Hello"
        autoPlay={true}
        duration={500}
        speed={50}
        characters={customChars}
      />
    );

    const element = screen.getByRole('text');
    const text = element.textContent || '';

    // All characters should be either from custom set or target text
    for (const char of text) {
      expect('01Helo'.includes(char)).toBe(true);
    }
  });

  it('has correct aria-label for accessibility', () => {
    render(<DecryptedText text="Hello World" />);
    const element = screen.getByRole('text');
    expect(element).toHaveAttribute('aria-label', 'Hello World');
  });

  it('applies monospace font class', () => {
    render(<DecryptedText text="Hello" />);
    const element = screen.getByRole('text');
    expect(element).toHaveClass('font-mono');
  });
});
