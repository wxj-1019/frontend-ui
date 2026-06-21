import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Aurora } from './aurora';

describe('Aurora', () => {
  it('renders without errors', () => {
    const { container } = render(<Aurora />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
