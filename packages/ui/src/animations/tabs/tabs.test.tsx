import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './tabs';

describe('Tabs', () => {
  const tabs = [
    { label: 'First', content: <span>Panel One</span> },
    { label: 'Second', content: <span>Panel Two</span> },
  ];

  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('shows default active panel', () => {
    render(<Tabs tabs={tabs} defaultIndex={1} />);
    expect(screen.getByText('Panel Two')).toBeInTheDocument();
  });

  it('switches panel on click', async () => {
    render(<Tabs tabs={tabs} defaultIndex={0} />);
    fireEvent.click(screen.getByText('Second'));
    expect(await screen.findByText('Panel Two')).toBeInTheDocument();
  });

  it('has tablist and tab roles', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });
});
