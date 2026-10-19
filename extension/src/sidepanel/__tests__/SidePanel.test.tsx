import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SidePanel } from '../SidePanel.tsx';

describe('SidePanel Shell Component', () => {
  it('renders connected Google Flow tab status', () => {
    render(
      <SidePanel
        initialConnection={{
          connected: true,
          provider: 'flow',
          title: 'Flow Canvas - Project Alpha',
          url: 'https://flow.google.com/project/alpha',
        }}
      />
    );

    expect(screen.getByText('Flow Canvas - Project Alpha')).toBeDefined();
    expect(screen.getByText('Omni Flash 720p / 10s / 9:16 Portrait')).toBeDefined();
    expect(screen.getByText('15 credits/item')).toBeDefined();
  });

  it('renders disconnected warning banner and disables generation when disconnected', () => {
    render(
      <SidePanel
        initialConnection={{
          connected: false,
          provider: null,
        }}
      />
    );

    expect(screen.getByText('No Active Google Session')).toBeDefined();
    const generateBtn = screen.getByRole('button', { name: /generate/i });
    expect((generateBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it('transitions to rendering state upon clicking generate with valid prompt', () => {
    render(
      <SidePanel
        initialConnection={{
          connected: true,
          provider: 'flow',
          title: 'Flow Canvas',
          url: 'https://flow.google.com/project/1',
        }}
      />
    );

    const textarea = screen.getByPlaceholderText(/describe camera movement/i);
    fireEvent.change(textarea, { target: { value: 'Cinematic rain on glass' } });

    const generateBtn = screen.getByRole('button', { name: /generate/i });
    expect((generateBtn as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(generateBtn);

    // Queue status should now display rendering
    expect(screen.getByText(/rendering/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /pause/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDefined();
  });
});
