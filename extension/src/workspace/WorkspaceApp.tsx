import React, { useState } from 'react';
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
} from 'lucide-react';

export type WorkspaceRoute = 'create' | 'queue' | 'library' | 'history' | 'settings';

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
  const [activeTab, setActiveTab] = useState<WorkspaceRoute>(initialTab);
  const [connectedTab] = useState<WorkspaceTab | null>(initialConnectedTab);

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

  const renderEmptyState = (title: string, message: string, action?: string) => (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
        <LayoutDashboard className="w-5 h-5 text-zinc-400" aria-hidden="true" />
      </div>
      <h2 className="text-base font-semibold text-zinc-200">{title}</h2>
      <p className="text-sm text-zinc-400 mt-1 max-w-md">{message}</p>
      {action && (
        <button className="mt-4 px-3 py-1.5 rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm">
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

            <div className="max-w-3xl border border-zinc-800 bg-zinc-900/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="provider-select"
                    className="block text-xs font-medium text-zinc-400 mb-1.5"
                  >
                    Provider
                  </label>
                  <select
                    id="provider-select"
                    className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm"
                  >
                    <option>Google Flow</option>
                    <option>Google Gemini Chat</option>
                  </select>
                </div>
                <div className="flex-1">
                  <span className="block text-xs font-medium text-zinc-400 mb-1.5">Target Tab</span>
                  <div className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${connectedTab ? 'bg-emerald-500' : 'bg-zinc-600'}`}
                    />
                    <span className="truncate text-zinc-300">
                      {connectedTab?.title ?? 'No Google tab selected'}
                    </span>
                  </div>
                </div>
              </div>

              <label
                htmlFor="batch-prompts"
                className="block text-xs font-medium text-zinc-400 mb-1.5"
              >
                Prompts (one per line)
              </label>
              <textarea
                id="batch-prompts"
                rows={8}
                placeholder="Enter one prompt per line..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 resize-y"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-zinc-500">
                  Cost is estimated per output; final cost depends on selected model and variations.
                </span>
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 rounded bg-blue-700 text-white text-sm font-medium opacity-50 cursor-not-allowed"
                >
                  <Play className="w-4 h-4" aria-hidden="true" /> Queue Jobs
                </button>
              </div>
            </div>
          </section>
        );
      case 'queue':
        return renderEmptyState(
          'No jobs queued',
          'Your queued generation jobs will appear here with their actual processing states.',
          'Go to Create'
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
    <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans">
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
              onClick={() => setActiveTab(id)}
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
