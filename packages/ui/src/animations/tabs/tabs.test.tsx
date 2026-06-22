import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './tabs';

describe('Tabs', () => {
  const tabs = [
    { label: 'First', content: <span>Panel One</span> },
    { label: 'Second', content: <span>Panel Two</span> },
    { label: 'Third', content: <span>Panel Three</span> },
  ];

  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('shows default active panel', () => {
    render(<Tabs tabs={tabs} defaultIndex={1} />);
    expect(screen.getByText('Panel Two')).toBeInTheDocument();
  });

  it('shows first panel by default', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Panel One')).toBeInTheDocument();
  });

  it('switches panel on click', async () => {
    render(<Tabs tabs={tabs} defaultIndex={0} />);
    fireEvent.click(screen.getByText('Second'));
    expect(await screen.findByText('Panel Two')).toBeInTheDocument();
  });

  it('switches between multiple tabs', async () => {
    render(<Tabs tabs={tabs} defaultIndex={0} />);
    fireEvent.click(screen.getByText('Third'));
    expect(await screen.findByText('Panel Three')).toBeInTheDocument();
    fireEvent.click(screen.getByText('First'));
    expect(await screen.findByText('Panel One')).toBeInTheDocument();
  });

  it('has tablist and tab roles', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('sets aria-selected on active tab', () => {
    render(<Tabs tabs={tabs} defaultIndex={1} />);
    const tabButtons = screen.getAllByRole('tab');
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true');
  });
});
