import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal';

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal open onClose={() => {}}>
        <span>Modal Content</span>
      </Modal>,
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <span>Hidden</span>
      </Modal>,
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        <span>Content</span>
      </Modal>,
    );
    fireEvent.click(screen.getByLabelText('关闭'));
    expect(onClose).toHaveBeenCalled();
  });

  it('has dialog role', () => {
    render(
      <Modal open onClose={() => {}}>
        <span>X</span>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
