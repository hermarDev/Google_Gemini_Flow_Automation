import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WorkspaceApp } from '../WorkspaceApp.tsx';
import { SidePanel } from '../../sidepanel/SidePanel.tsx';
import { clearStoredJobs, getStoredJobs, addMockJob } from '../../shared/jobs.ts';
import { VEO_FAST_PRESET, OMNI_BUDGET_PRESET } from '../../shared/profiles.ts';

describe('Sprint 1 Vertical Slice End-to-End Component Integration (CORE-020)', () => {
  beforeEach(async () => {
    localStorage.clear();
    await clearStoredJobs();
    window.location.hash = '';
  });

  it('selects dummy profile in Workspace, queues mock job, and views persistent status in Queue tab', async () => {
    render(<WorkspaceApp initialTab="create" />);

    // Check default profile
    const profileSelect = screen.getByTestId('workspace-profile-select') as HTMLSelectElement;
    expect(profileSelect.value).toContain('omni-flash-720p');

    // Switch to Veo Fast preset
    fireEvent.change(profileSelect, { target: { value: VEO_FAST_PRESET.id } });
    await waitFor(() => {
      expect(screen.getByText('25')).toBeDefined();
    });

    // Type prompt
    const promptInput = screen.getByPlaceholderText(/enter prompt description/i);
    fireEvent.change(promptInput, { target: { value: 'Aerial shot of misty pine mountains' } });

    // Click Queue Jobs
    const queueBtn = screen.getByRole('button', { name: /queue jobs/i });
    expect((queueBtn as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(queueBtn);

    // Verify transition to Queue view
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /generation queue/i })).toBeDefined();
    });

    // Check queued job details
    expect(screen.getByText('Aerial shot of misty pine mountains')).toBeDefined();
    expect(screen.getByText(VEO_FAST_PRESET.name)).toBeDefined();

    // Verify persistent storage
    const jobs = await getStoredJobs();
    expect(jobs).toHaveLength(1);
    expect(jobs[0].prompt).toBe('Aerial shot of misty pine mountains');
    expect(jobs[0].profileId).toBe(VEO_FAST_PRESET.id);
  });

  it('safely handles simulated policy refusal in Workspace queue', async () => {
    render(<WorkspaceApp initialTab="create" />);

    // Select policy refusal simulation
    const failureSelect = screen.getByTestId('workspace-failure-mode-select');
    fireEvent.change(failureSelect, { target: { value: 'policy-refusal' } });

    // Type prompt and queue
    const promptInput = screen.getByPlaceholderText(/enter prompt description/i);
    fireEvent.change(promptInput, { target: { value: 'Dangerous restricted prompt' } });
    fireEvent.click(screen.getByRole('button', { name: /queue jobs/i }));

    // Wait for policy refusal badge
    await waitFor(
      () => {
        expect(screen.getByText(/policy-refusal/i)).toBeDefined();
      },
      { timeout: 3000 }
    );

    // Ensure truthful error message displayed
    expect(screen.getByText(/Safety policy refusal/i)).toBeDefined();
  });

  it('selects dummy profile in SidePanel and adds mock job with status visible in shell', async () => {
    render(
      <SidePanel
        initialConnection={{
          connected: true,
          provider: 'flow',
          title: 'Flow Canvas Demo',
          url: 'https://flow.google.com',
        }}
      />
    );

    // Select budget profile
    const profileSelect = screen.getByTestId('profile-select') as HTMLSelectElement;
    fireEvent.change(profileSelect, { target: { value: OMNI_BUDGET_PRESET.id } });
    await waitFor(() => {
      expect(screen.getByText('10 credits/item')).toBeDefined();
    });

    // Type prompt
    const promptInput = screen.getByPlaceholderText(/describe camera movement/i);
    fireEvent.change(promptInput, { target: { value: 'Neon origami crane taking flight' } });

    // Click Generate
    const generateBtn = screen.getByRole('button', { name: /generate/i });
    fireEvent.click(generateBtn);

    // Verify recent persistent jobs section appears in sidepanel
    await waitFor(() => {
      expect(screen.getByText(/Persistent Jobs/i)).toBeDefined();
    });

    expect(screen.getAllByText('Neon origami crane taking flight').length).toBeGreaterThanOrEqual(
      1
    );
  });

  it('synchronizes persistent jobs added via background or other shell into Workspace Queue', async () => {
    // Add job directly into storage (simulating SidePanel or worker creation)
    await addMockJob({
      prompt: 'Synchronized job from companion shell',
      profile: VEO_FAST_PRESET,
    });

    render(<WorkspaceApp initialTab="queue" />);

    await waitFor(() => {
      expect(screen.getByText('Synchronized job from companion shell')).toBeDefined();
    });
    expect(screen.getByText(VEO_FAST_PRESET.name)).toBeDefined();
  });
});
