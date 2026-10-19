import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkspaceApp } from '../WorkspaceApp.tsx';

describe('WorkspaceApp Shell Component', () => {
  it('renders all primary workspace views in left navigation', () => {
    render(<WorkspaceApp initialTab="create" />);

    expect(screen.getByRole('button', { name: /^create$/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /^queue$/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /^library$/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /^history$/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /^settings$/i })).toBeDefined();
  });

  it('switches views cleanly between Create, Queue, and Settings', () => {
    render(<WorkspaceApp initialTab="create" />);

    // Default view is Create
    expect(screen.getByRole('heading', { level: 2, name: /^create$/i })).toBeDefined();

    // Switch to Queue
    fireEvent.click(screen.getByRole('button', { name: /^queue$/i }));
    expect(screen.getByText('No jobs queued')).toBeDefined();

    // Switch to Settings
    fireEvent.click(screen.getByRole('button', { name: /^settings$/i }));
    expect(screen.getByRole('heading', { level: 2, name: /^settings$/i })).toBeDefined();
    expect(screen.getByText(/default download folder/i)).toBeDefined();
  });

  it('reflects connected Google tab status when provided', () => {
    render(
      <WorkspaceApp
        initialConnectedTab={{
          id: 'tab-123',
          title: 'Google Flow Canvas - Project 42',
          provider: 'flow',
          connected: true,
        }}
      />
    );

    expect(screen.getAllByText('Google Flow Canvas - Project 42').length).toBeGreaterThan(0);
  });
});
