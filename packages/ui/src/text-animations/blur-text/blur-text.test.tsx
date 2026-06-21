import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlurText } from './blur-text';

describe('BlurText', () => {
  it('renders text content', () => {
    render(<BlurText text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
