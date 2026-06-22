import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Accordion } from './accordion';

describe('Accordion', () => {
  const items = [
    { title: 'First', content: <span>First content</span> },
    { title: 'Second', content: <span>Second content</span> },
    { title: 'Third', content: <span>Third content</span> },
  ];

  it('renders all titles', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('expands default open item', () => {
    render(<Accordion items={items} defaultOpen={0} />);
    expect(screen.getByText('First content')).toBeInTheDocument();
  });

  it('collapses expanded item on second click', async () => {
    render(<Accordion items={items} defaultOpen={0} />);
    expect(screen.getByText('First content')).toBeInTheDocument();
    fireEvent.click(screen.getByText('First'));
    await waitFor(() => {
      expect(screen.queryByText('First content')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('expands item on click when closed', () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText('First content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('First'));
    expect(screen.getByText('First content')).toBeInTheDocument();
  });

  it('only one item open by default (allowMultiple=false)', async () => {
    render(<Accordion items={items} defaultOpen={0} />);
    fireEvent.click(screen.getByText('Second'));
    expect(screen.getByText('Second content')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('First content')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('allows multiple items open when allowMultiple=true', () => {
    render(<Accordion items={items} defaultOpen={0} allowMultiple />);
    fireEvent.click(screen.getByText('Second'));
    expect(screen.getByText('First content')).toBeInTheDocument();
    expect(screen.getByText('Second content')).toBeInTheDocument();
  });

  it('has proper aria attributes', () => {
    render(<Accordion items={items} defaultOpen={0} />);
    const triggers = screen.getAllByRole('button');
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
    expect(triggers[0]).toHaveAttribute('aria-controls');
  });

  it('sets aria-expanded=false on collapsed items', () => {
    render(<Accordion items={items} defaultOpen={0} />);
    const triggers = screen.getAllByRole('button');
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'false');
  });
});
