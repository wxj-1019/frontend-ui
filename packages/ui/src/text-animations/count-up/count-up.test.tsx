import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CountUp } from './count-up';

describe('CountUp', () => {
  it('renders the starting value', () => {
    render(<CountUp end={100} start={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders with prefix and suffix', () => {
    render(<CountUp end={99} start={99} prefix="$" suffix="%" />);
    expect(screen.getByText('$99%')).toBeInTheDocument();
  });

  it('renders with separator', () => {
    render(<CountUp end={12345} start={12345} separator />);
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  it('renders with decimals', () => {
    render(<CountUp end={99.5} start={99.5} decimals={2} />);
    expect(screen.getByText('99.50')).toBeInTheDocument();
  });
});
