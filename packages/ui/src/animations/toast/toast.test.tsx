import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast } from './toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children when open', () => {
    render(
      <Toast open onClose={() => {}}>
        <span>Toast Message</span>
      </Toast>,
    );
    expect(screen.getByText('Toast Message')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Toast open={false} onClose={() => {}}>
        <span>Hidden</span>
      </Toast>,
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <Toast open onClose={onClose} duration={0}>
        <span>Content</span>
      </Toast>,
    );
    fireEvent.click(screen.getByLabelText('关闭通知'));
    expect(onClose).toHaveBeenCalled();
  });

  it('auto-dismisses after duration', () => {
    const onClose = vi.fn();
    render(
      <Toast open onClose={onClose} duration={2000}>
        <span>Auto</span>
      </Toast>,
    );
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('has status role', () => {
    render(
      <Toast open onClose={() => {}}>
        <span>X</span>
      </Toast>,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
