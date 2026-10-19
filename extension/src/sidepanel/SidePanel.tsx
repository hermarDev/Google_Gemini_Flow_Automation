import React, { useState } from 'react';
import {
  Play,
  Pause,
  Square,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { DEFAULT_OMNI_PRESET, VideoPreset } from '../shared/types.ts';

export interface TabConnection {
  connected: boolean;
  provider: 'flow' | 'gemini' | null;
  title?: string;
  url?: string;
}

export interface SidePanelProps {
  initialConnection?: TabConnection;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  initialConnection = {
    connected: true,
    provider: 'flow',
    title: 'Flow - Project 01',
    url: 'https://flow.google.com/project/demo',
  },
}) => {
  const [connection] = useState<TabConnection>(initialConnection);
  const [preset] = useState<VideoPreset>(DEFAULT_OMNI_PRESET);
  const [prompt, setPrompt] = useState('');
  const [isQueueActive, setIsQueueActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeStatus, setActiveStatus] = useState<
    'idle' | 'rendering' | 'needs-review' | 'completed'
  >('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const handleStart = () => {
    if (!prompt.trim() || !connection.connected) return;
    setIsQueueActive(true);
    setActiveStatus('rendering');
    setElapsedSeconds(1);
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleStop = () => {
    setIsQueueActive(false);
    setActiveStatus('idle');
    setElapsedSeconds(0);
    setIsPaused(false);
  };

  const openWorkspace = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: chrome.runtime.getURL('src/workspace/index.html') });
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-[480px] w-full bg-zinc-950 text-zinc-100 border-r border-zinc-800 text-xs">
      {/* Top Connection & Header Bar */}
      <header className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              connection.connected ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
            aria-hidden="true"
          />
          <span className="font-semibold truncate text-zinc-200">
            {connection.connected ? connection.title || 'Connected' : 'Disconnected'}
          </span>
        </div>

        <button
          onClick={openWorkspace}
          className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 px-2 py-1 rounded transition-colors shrink-0"
          title="Open Full-Page Workspace"
          aria-label="Open Full-Page Workspace"
        >
          <span>Workspace</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Connection Warning Banner */}
        {!connection.connected && (
          <div className="flex items-start gap-2 p-2.5 rounded border border-rose-900/50 bg-rose-950/30 text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div className="leading-tight">
              <p className="font-medium">No Active Google Session</p>
              <p className="text-[11px] text-rose-400/90 mt-0.5">
                Navigate to flow.google.com or gemini.google.com to begin.
              </p>
            </div>
          </div>
        )}

        {/* Preset Configuration Card */}
        <section className="rounded border border-zinc-800 bg-zinc-900/40 p-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
              Active Profile
            </label>
            <span className="text-[11px] text-zinc-400 font-mono">
              {preset.creditsPerOutput} credits/item
            </span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 flex items-center justify-between">
            <span className="font-medium text-zinc-200">{preset.name}</span>
            <span className="text-zinc-400 font-mono text-[11px]">{preset.duration}</span>
          </div>
        </section>

        {/* Prompt Input Area */}
        <section className="space-y-1.5">
          <label
            htmlFor="prompt-input"
            className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400"
          >
            Prompt
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={!connection.connected || isQueueActive}
            placeholder="Describe camera movement, subject, atmosphere, and lighting..."
            rows={3}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded p-2 text-zinc-100 placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
          />
        </section>

        {/* Active Queue Status / Live Monitor */}
        {isQueueActive && (
          <section className="rounded border border-zinc-800 bg-zinc-900/60 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
                Queue Status
              </span>
              <div className="flex items-center gap-1.5">
                {activeStatus === 'rendering' && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/50">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Rendering ({elapsedSeconds}s)
                  </span>
                )}
                {activeStatus === 'completed' && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                    <CheckCircle2 className="w-3 h-3" />
                    Complete
                  </span>
                )}
                {activeStatus === 'needs-review' && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800/50">
                    <AlertCircle className="w-3 h-3" />
                    Needs Review
                  </span>
                )}
              </div>
            </div>

            <p className="font-mono text-[11px] text-zinc-300 truncate bg-zinc-950 p-1.5 rounded border border-zinc-800/70">
              {prompt}
            </p>
          </section>
        )}
      </main>

      {/* Footer Controls & Execution Trigger */}
      <footer className="p-3 border-t border-zinc-800 bg-zinc-900/40">
        {!isQueueActive ? (
          <button
            onClick={handleStart}
            disabled={!connection.connected || !prompt.trim()}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-medium py-2 px-3 rounded transition-colors text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Generate ({preset.creditsPerOutput} Credits)</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePause}
              className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2 px-3 rounded transition-colors font-medium"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button
              onClick={handleStop}
              className="flex-1 flex items-center justify-center gap-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800/60 py-2 px-3 rounded transition-colors font-medium"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};
