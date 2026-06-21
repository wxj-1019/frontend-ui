import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GradientText } from './gradient-text';

describe('GradientText', () => {
  it('renders text content', () => {
    render(<GradientText text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
