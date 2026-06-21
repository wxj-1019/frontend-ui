import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Magnet } from './magnet';

describe('Magnet', () => {
  it('renders children content', () => {
    render(<Magnet><span>Test Content</span></Magnet>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
