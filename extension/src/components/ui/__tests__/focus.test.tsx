import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { WorkspaceApp } from '../../workspace/WorkspaceApp.tsx';
import { SidePanel } from '../../sidepanel/SidePanel.tsx';
import { ModalDialog } from '../Components.tsx';

describe('Keyboard Navigation & Accessible Focus (CORE-018 / RES-017)', () => {
  describe('Skip-to-Content Links', () => {
    it('renders accessible skip-to-content link in WorkspaceApp', () => {
      render(<WorkspaceApp />);
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeDefined();
      expect(skipLink.getAttribute('href')).toBe('#workspace-main');
    });

    it('renders accessible skip-to-content link in SidePanel', () => {
      render(<SidePanel />);
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeDefined();
      expect(skipLink.getAttribute('href')).toBe('#sidepanel-main');
    });
  });

  describe('ModalDialog Focus Trapping', () => {
    const ModalHarness: React.FC = () => {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button id="trigger-btn" onClick={() => setOpen(true)}>
            Open Modal
          </button>
          <ModalDialog
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Batch Confirmation"
            footer={
              <button id="confirm-btn" onClick={() => setOpen(false)}>
                Confirm
              </button>
            }
          >
            <input id="modal-input" placeholder="Notes" />
          </ModalDialog>
        </div>
      );
    };

    it('traps focus forward and backward within modal dialog', () => {
      render(<ModalHarness />);

      const triggerBtn = screen.getByRole('button', { name: 'Open Modal' });
      triggerBtn.focus();
      expect(document.activeElement?.id).toBe('trigger-btn');

      // Open Modal
      fireEvent.click(triggerBtn);

      const closeBtn = screen.getByRole('button', { name: 'Close dialog' });
      const confirmBtn = screen.getByRole('button', { name: 'Confirm' });

      // First focusable element should receive focus
      expect(document.activeElement).toBe(closeBtn);

      // Simulate Tab key on the last focusable element (confirmBtn)
      confirmBtn.focus();
      expect(document.activeElement).toBe(confirmBtn);

      fireEvent.keyDown(confirmBtn, { key: 'Tab', shiftKey: false });
      expect(document.activeElement).toBe(closeBtn);

      // Simulate Shift+Tab on the first focusable element (closeBtn)
      fireEvent.keyDown(closeBtn, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(confirmBtn);
    });

    it('restores focus to trigger button after modal is closed via Escape', () => {
      render(<ModalHarness />);

      const triggerBtn = screen.getByRole('button', { name: 'Open Modal' });
      triggerBtn.focus();

      fireEvent.click(triggerBtn);
      expect(screen.getByRole('dialog')).toBeDefined();

      // Press Escape
      fireEvent.keyDown(window, { key: 'Escape' });

      // Modal unmounted, focus restored to trigger
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(document.activeElement).toBe(triggerBtn);
    });
  });
});
