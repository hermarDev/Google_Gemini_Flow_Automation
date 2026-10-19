import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { parseHash, formatHash } from '../router.ts';
import { WorkspaceApp } from '../WorkspaceApp.tsx';

describe('Global Navigation & Route State (CORE-014)', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  describe('parseHash', () => {
    it('defaults to create on empty or root hash', () => {
      expect(parseHash('').route).toBe('create');
      expect(parseHash('#/').route).toBe('create');
    });

    it('parses valid route targets', () => {
      expect(parseHash('#/queue').route).toBe('queue');
      expect(parseHash('#/library').route).toBe('library');
      expect(parseHash('#/history').route).toBe('history');
      expect(parseHash('#/settings').route).toBe('settings');
    });

    it('parses query parameters into key-value map', () => {
      const parsed = parseHash('#/create?model=omni-flash&aspect=9:16');
      expect(parsed.route).toBe('create');
      expect(parsed.params.model).toBe('omni-flash');
      expect(parsed.params.aspect).toBe('9:16');
    });

    it('falls back to default route on invalid or malicious hash', () => {
      expect(parseHash('#/exploit', 'create').route).toBe('create');
      expect(parseHash('#/../../etc/passwd', 'create').route).toBe('create');
    });
  });

  describe('formatHash', () => {
    it('formats plain route without parameters', () => {
      expect(formatHash('queue')).toBe('#/queue');
    });

    it('formats route with query parameters', () => {
      const formatted = formatHash('create', { preset: 'omni', count: '5' });
      expect(formatted).toBe('#/create?preset=omni&count=5');
    });
  });

  describe('WorkspaceApp Integration with Hash Router', () => {
    it('restores initial view based on window.location.hash deep link', () => {
      window.location.hash = '#/settings';
      render(<WorkspaceApp />);

      expect(screen.getByRole('heading', { level: 2, name: /^settings$/i })).toBeDefined();
    });

    it('updates URL hash when navigation items are clicked', () => {
      window.location.hash = '#/create';
      render(<WorkspaceApp />);

      const queueBtn = screen.getByRole('button', { name: /^queue$/i });
      fireEvent.click(queueBtn);

      expect(window.location.hash).toBe('#/queue');
      expect(screen.getByText('No jobs queued')).toBeDefined();
    });

    it('restores view when hashchange event fires (simulating browser back/forward)', () => {
      window.location.hash = '#/create';
      render(<WorkspaceApp />);

      // Simulate browser back/forward navigation to #/library
      window.location.hash = '#/library';
      window.dispatchEvent(new HashChangeEvent('hashchange'));

      expect(screen.getByRole('heading', { level: 2, name: /media library/i })).toBeDefined();
    });
  });
});
