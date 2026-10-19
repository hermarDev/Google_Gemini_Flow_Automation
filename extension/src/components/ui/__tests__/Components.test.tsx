import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  StatusBadge,
  ProgressIndicator,
  EmptyState,
  NoticeBanner,
  ModalDialog,
  Card,
} from '../Components.tsx';

describe('UI Primitives (CORE-012 / RES-014)', () => {
  describe('StatusBadge', () => {
    it('renders truthful labels for pending, generating, and completed states', () => {
      const { rerender } = render(<StatusBadge status="pending" />);
      expect(screen.getByText('Pending')).toBeDefined();

      rerender(<StatusBadge status="generating" />);
      expect(screen.getByText('Generating')).toBeDefined();

      rerender(<StatusBadge status="completed" />);
      expect(screen.getByText('Completed')).toBeDefined();
    });

    it('renders distinctive truth-in-state badges for needs-review and policy-refusal', () => {
      const { rerender } = render(<StatusBadge status="needs-review" />);
      expect(screen.getByText('Needs Review')).toBeDefined();

      rerender(<StatusBadge status="policy-refusal" />);
      expect(screen.getByText('Policy Refusal')).toBeDefined();
    });
  });

  describe('ProgressIndicator', () => {
    it('renders exact integer count and calculated percentage', () => {
      render(<ProgressIndicator completed={3} total={10} label="Render Progress" />);
      expect(screen.getByText('Render Progress')).toBeDefined();
      expect(screen.getByText('3 of 10 (30%)')).toBeDefined();

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar.getAttribute('aria-valuenow')).toBe('3');
      expect(progressbar.getAttribute('aria-valuemax')).toBe('10');
    });

    it('handles zero total safely without division by zero NaN', () => {
      render(<ProgressIndicator completed={0} total={0} />);
      expect(screen.getByText('0 of 0 (0%)')).toBeDefined();
    });
  });

  describe('EmptyState', () => {
    it('renders title, description and calls action when clicked', () => {
      const handleAction = vi.fn();
      render(
        <EmptyState
          title="No Media Found"
          description="Your downloads folder does not contain generated media."
          actionLabel="Refresh Folder"
          onAction={handleAction}
        />
      );

      expect(screen.getByText('No Media Found')).toBeDefined();
      expect(
        screen.getByText('Your downloads folder does not contain generated media.')
      ).toBeDefined();

      fireEvent.click(screen.getByRole('button', { name: 'Refresh Folder' }));
      expect(handleAction).toHaveBeenCalled();
    });
  });

  describe('NoticeBanner', () => {
    it('renders notice text and responds to dismiss', () => {
      const handleDismiss = vi.fn();
      render(
        <NoticeBanner
          title="Account Credit Depleted"
          message="Google Flow has 0 credits remaining."
          variant="error"
          onDismiss={handleDismiss}
        />
      );

      expect(screen.getByText('Account Credit Depleted')).toBeDefined();
      expect(screen.getByText('Google Flow has 0 credits remaining.')).toBeDefined();

      fireEvent.click(screen.getByRole('button', { name: 'Dismiss notice' }));
      expect(handleDismiss).toHaveBeenCalled();
    });
  });

  describe('Card', () => {
    it('renders header, body and footer slots', () => {
      render(
        <Card header={<span>Card Title</span>} footer={<span>Footer Note</span>}>
          <p>Card content body</p>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeDefined();
      expect(screen.getByText('Card content body')).toBeDefined();
      expect(screen.getByText('Footer Note')).toBeDefined();
    });
  });

  describe('ModalDialog', () => {
    it('renders dialog when open and triggers onClose on escape key', () => {
      const handleClose = vi.fn();
      const { rerender } = render(
        <ModalDialog isOpen={true} onClose={handleClose} title="Confirm Batch Launch">
          <p>You are about to launch 10 prompts costing 150 credits.</p>
        </ModalDialog>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeDefined();
      expect(dialog.getAttribute('aria-modal')).toBe('true');
      expect(screen.getByText('Confirm Batch Launch')).toBeDefined();

      // Trigger Escape key
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();

      // Close modal
      rerender(
        <ModalDialog isOpen={false} onClose={handleClose} title="Confirm Batch Launch">
          <p>Content</p>
        </ModalDialog>
      );
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });
});
