import React, { useState, useEffect } from 'react';
import {
  Clapperboard,
  ListChecks,
  Images,
  History,
  Settings,
  LayoutDashboard,
  Search,
  FolderOpen,
  Download,
  Play,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Clock,
} from 'lucide-react';
import { useWorkspaceRouter, RouteView } from './router.ts';
import { DEFAULT_OMNI_PRESET, VideoPreset } from '../shared/types.ts';
import { AVAILABLE_PROFILES, getActiveProfile, setActiveProfile } from '../shared/profiles.ts';
import {
  JobItem,
  getStoredJobs,
  addMockJob,
  clearStoredJobs,
  subscribeToJobs,
} from '../shared/jobs.ts';

export type WorkspaceRoute = RouteView;

export interface WorkspaceTab {
  id: string;
  title: string;
  provider: 'flow' | 'gemini' | null;
  connected: boolean;
}

export const WORKSPACE_NAV: Array<{
  id: WorkspaceRoute;
  label: string;
  icon: React.FC<{ className?: string }>;
}> = [
  { id: 'create', label: 'Create', icon: Clapperboard },
  { id: 'queue', label: 'Queue', icon: ListChecks },
  { id: 'library', label: 'Library', icon: Images },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export interface WorkspaceAppProps {
  initialTab?: WorkspaceRoute;
  initialConnectedTab?: WorkspaceTab | null;
}

export const WorkspaceApp: React.FC<WorkspaceAppProps> = ({
  initialTab = 'create',
  initialConnectedTab = null,
}) => {
  const { route: activeTab, navigate } = useWorkspaceRouter(initialTab);
  const [connectedTab] = useState<WorkspaceTab | null>(initialConnectedTab);
  const [selectedProfile, setSelectedProfile] = useState<VideoPreset>(DEFAULT_OMNI_PRESET);
  const [promptInput, setPromptInput] = useState('');
  const [failureMode, setFailureMode] = useState<
    'none' | 'policy-refusal' | 'ambiguous-submission' | 'selector-not-found'
  >('none');
  const [storedJobs, setStoredJobs] = useState<JobItem[]>([]);

  useEffect(() => {
    getActiveProfile().then(setSelectedProfile);
    getStoredJobs().then(setStoredJobs);
    const unsubscribe = subscribeToJobs((jobs) => {
      setStoredJobs(jobs);
    });
    return unsubscribe;
  }, []);

  const handleProfileChange = async (profileId: string) => {
    const updated = await setActiveProfile(profileId);
    setSelectedProfile(updated);
  };

  const handleQueueJob = async () => {
    if (!promptInput.trim()) return;
    const prompt = promptInput.trim();
    setPromptInput('');
    await addMockJob({
      prompt,
      profile: selectedProfile,
      failureMode,
    });
    navigate('queue');
  };

  const handleClearQueue = async () => {
    await clearStoredJobs();
  };

  const openSidePanel = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.sidePanel) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId) {
          chrome.sidePanel.open({ tabId });
        }
      });
    }
  };

  const renderStatusBadge = (status: JobItem['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'generating':
      case 'submitting':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-950/60 border border-blue-800/80 px-2 py-0.5 rounded">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {status}
          </span>
        );
      case 'policy-refusal':
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400 bg-rose-950/60 border border-rose-800/80 px-2 py-0.5 rounded">
            <ShieldAlert className="w-3.5 h-3.5" /> {status}
          </span>
        );
      case 'needs-review':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">
            <AlertCircle className="w-3.5 h-3.5" /> Needs Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-zinc-800/60 border border-zinc-700/80 px-2 py-0.5 rounded">
            <Clock className="w-3.5 h-3.5" /> {status}
          </span>
        );
    }
  };

  const renderEmptyState = (title: string, message: string, action?: string) => (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
        <LayoutDashboard className="w-5 h-5 text-zinc-400" aria-hidden="true" />
      </div>
      <h2 className="text-base font-semibold text-zinc-200">{title}</h2>
      <p className="text-sm text-zinc-400 mt-1 max-w-md">{message}</p>
      {action && (
        <button
          onClick={() => navigate('create')}
          className="mt-4 px-3 py-1.5 rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm"
        >
          {action}
        </button>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return (
          <section aria-labelledby="create-heading">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 id="create-heading" className="text-lg font-semibold text-zinc-100">
                  Create
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Prepare a new generation job for your active Google tab.
                </p>
              </div>
              <button
                onClick={openSidePanel}
                disabled={!connectedTab}
                className="flex items-center gap-2 px-3 py-2 rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                Open Side Panel
              </button>
            </div>

            <div className="max-w-3xl border border-zinc-800 bg-zinc-900/50 rounded-lg p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="workspace-profile-select"
                    className="block text-xs font-medium text-zinc-400 mb-1.5"
                  >
                    Generation Profile
                  </label>
                  <select
                    id="workspace-profile-select"
                    data-testid="workspace-profile-select"
                    aria-label="Generation profile"
                    value={selectedProfile.id}
                    onChange={(e) => handleProfileChange(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200"
                  >
                    {AVAILABLE_PROFILES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="block text-xs font-medium text-zinc-400 mb-1.5">Target Tab</span>
                  <div className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        connectedTab ? 'bg-emerald-500' : 'bg-zinc-600'
                      }`}
                    />
                    <span className="truncate text-zinc-300">
                      {connectedTab?.title ?? 'Flow Project (Mock Mode)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Details Card */}
              <div className="rounded border border-zinc-800 bg-zinc-950 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-zinc-500">Model:</span>{' '}
                  <span className="font-mono text-zinc-300">{selectedProfile.model}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Aspect:</span>{' '}
                  <span className="font-mono text-zinc-300">{selectedProfile.aspect}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Duration:</span>{' '}
                  <span className="font-mono text-zinc-300">{selectedProfile.duration}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Resolution:</span>{' '}
                  <span className="font-mono text-zinc-300">{selectedProfile.resolution}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Est. Credits:</span>{' '}
                  <span className="font-mono text-amber-400 font-semibold">
                    {selectedProfile.creditsPerOutput}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="batch-prompts"
                  className="block text-xs font-medium text-zinc-400 mb-1.5"
                >
                  Prompt Text
                </label>
                <textarea
                  id="batch-prompts"
                  rows={4}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Enter prompt description for camera motion, lighting, and action..."
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 resize-y focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Test failure simulation */}
              <div>
                <label
                  htmlFor="workspace-failure-mode-select"
                  className="block text-xs font-medium text-zinc-500 mb-1.5"
                >
                  Test Mode / Failure Simulation
                </label>
                <select
                  id="workspace-failure-mode-select"
                  data-testid="workspace-failure-mode-select"
                  aria-label="Test mode failure simulation"
                  value={failureMode}
                  onChange={(e) =>
                    setFailureMode(
                      e.target.value as
                        'none' | 'policy-refusal' | 'ambiguous-submission' | 'selector-not-found'
                    )
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-400"
                >
                  <option value="none">Standard Execution (Normal Mock)</option>
                  <option value="policy-refusal">Simulate Policy Refusal (Safety stop)</option>
                  <option value="ambiguous-submission">
                    Simulate Ambiguous Submission (Needs review)
                  </option>
                  <option value="selector-not-found">Simulate Missing Selector (Failure)</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-500">
                  Cost is estimated per output; mock runs do not consume live Google credits.
                </span>
                <button
                  onClick={handleQueueJob}
                  disabled={!promptInput.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
                >
                  <Play className="w-4 h-4" aria-hidden="true" /> Queue Jobs
                </button>
              </div>
            </div>
          </section>
        );
      case 'queue':
        if (storedJobs.length === 0) {
          return renderEmptyState(
            'No jobs queued',
            'Your queued generation jobs will appear here with their actual processing states.',
            'Go to Create'
          );
        }
        return (
          <section aria-labelledby="queue-heading">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 id="queue-heading" className="text-lg font-semibold text-zinc-100">
                  Generation Queue ({storedJobs.length})
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Active, rendering, and completed jobs stored persistently in local extension
                  storage.
                </p>
              </div>
              <button
                onClick={handleClearQueue}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Queue
              </button>
            </div>

            <div data-testid="queue-job-list" className="space-y-3 max-w-4xl">
              {storedJobs.map((job) => (
                <div
                  key={job.id}
                  data-testid={`queue-job-row-${job.id}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-400">{job.id}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-xs font-medium text-zinc-300">{job.profileName}</span>
                    </div>
                    {renderStatusBadge(job.status)}
                  </div>

                  <p className="text-sm text-zinc-200 font-mono bg-zinc-950 p-2.5 rounded border border-zinc-800/80">
                    {job.prompt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <div className="flex items-center gap-3">
                      <span>Aspect: {job.aspect}</span>
                      <span>Duration: {job.duration}</span>
                      <span>Credits: {job.credits}</span>
                    </div>
                    {job.progressPercent !== undefined && job.status === 'generating' && (
                      <span className="text-blue-400">{job.progressPercent}%</span>
                    )}
                  </div>

                  {job.status === 'generating' && (
                    <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full transition-all duration-300"
                        style={{ width: `${job.progressPercent ?? 30}%` }}
                      />
                    </div>
                  )}

                  {job.errorMessage && (
                    <div className="text-xs text-rose-400 bg-rose-950/30 border border-rose-900/40 p-2 rounded">
                      {job.errorMessage}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      case 'library':
        return (
          <section aria-labelledby="library-heading">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 id="library-heading" className="text-lg font-semibold">
                  Media Library
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Generated assets saved to your local Downloads folder.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search
                    className="absolute left-2 top-2.5 w-4 h-4 text-zinc-500"
                    aria-hidden="true"
                  />
                  <input
                    aria-label="Search library"
                    placeholder="Search prompt text..."
                    className="bg-zinc-950 border border-zinc-700 rounded py-2 pl-8 pr-3 text-sm"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm">
                  <FolderOpen className="w-4 h-4" aria-hidden="true" /> Open Downloads
                </button>
              </div>
            </div>
            {renderEmptyState(
              'Your library is empty',
              'Verified downloads and their generation metadata will appear here.',
              'Create your first job'
            )}
          </section>
        );
      case 'history':
        return renderEmptyState(
          'No completed runs',
          'Completed, canceled, or review-required batches will be recorded here.'
        );
      case 'settings':
        return (
          <section aria-labelledby="settings-heading" className="max-w-2xl">
            <h2 id="settings-heading" className="text-lg font-semibold mb-1">
              Settings
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Local-only preferences. No account credentials are stored.
            </p>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              <div className="flex items-start justify-between py-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium">Default download folder</h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Media is saved under Downloads/AI-Media-Automator.
                  </p>
                </div>
                <button className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm">
                  <Download className="w-4 h-4" aria-hidden="true" /> Choose folder
                </button>
              </div>
              <div className="flex items-start justify-between py-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium">Target Google tab</h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {connectedTab ? connectedTab.title : 'No Google Flow or Gemini tab selected.'}
                  </p>
                </div>
                <span className="text-xs text-zinc-500">
                  {connectedTab?.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans relative">
      <a
        href="#workspace-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-white text-xs font-medium"
      >
        Skip to main content
      </a>
      <aside
        className="w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col"
        aria-label="Workspace navigation"
      >
        <div className="h-14 flex items-center gap-2 px-4 border-b border-zinc-800">
          <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center">
            <Clapperboard className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Media Automator</span>
        </div>
        <nav className="p-3 space-y-1 flex-1" aria-label="Main menu">
          {WORKSPACE_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                activeTab === id
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-2">
            Active target
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-zinc-900 border border-zinc-800">
            <span
              className={`w-2 h-2 rounded-full ${connectedTab ? 'bg-emerald-500' : 'bg-zinc-600'}`}
            />
            <span className="text-xs truncate text-zinc-300">
              {connectedTab?.title ?? 'Not connected'}
            </span>
          </div>
        </div>
      </aside>

      <main id="workspace-main" className="flex-1 min-w-0 p-8" tabIndex={-1}>
        {renderContent()}
      </main>
    </div>
  );
};
