import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FadeContent } from './fade-content';

describe('FadeContent', () => {
  it('renders children content', () => {
    render(<FadeContent><span>Test Content</span></FadeContent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
