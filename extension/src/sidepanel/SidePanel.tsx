import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { DEFAULT_OMNI_PRESET, VideoPreset } from '../shared/types.ts';
import { AVAILABLE_PROFILES, getActiveProfile, setActiveProfile } from '../shared/profiles.ts';
import {
  JobItem,
  getStoredJobs,
  addMockJob,
  subscribeToJobs,
  createJobExecutionControl,
  updateJobStatus,
} from '../shared/jobs.ts';

export interface TabConnection {
  connected: boolean;
  provider: 'flow' | 'gemini' | null;
  title?: string;
  url?: string;
}

export interface SidePanelProps {
  initialConnection?: TabConnection;
}

export const SidePanel: React.FC<SidePanelProps> = ({ initialConnection }) => {
  const [connection, setConnection] = useState<TabConnection>(
    initialConnection ?? { connected: false, provider: null }
  );
  const [preset, setPreset] = useState<VideoPreset>(DEFAULT_OMNI_PRESET);
  const [prompt, setPrompt] = useState('');
  const [failureMode, setFailureMode] = useState<
    'none' | 'policy-refusal' | 'ambiguous-submission' | 'selector-not-found'
  >('none');
  const [isQueueActive, setIsQueueActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeStatus, setActiveStatus] = useState<'idle' | 'submitting'>('idle');
  const [storedJobs, setStoredJobs] = useState<JobItem[]>([]);
  const [pausedJobIds, setPausedJobIds] = useState<Set<string>>(() => new Set());
  const activeExecution = useRef<ReturnType<typeof createJobExecutionControl> | null>(null);
  const executionById = useRef(new Map<string, ReturnType<typeof createJobExecutionControl>>());

  useEffect(() => {
    getActiveProfile().then(setPreset);
    getStoredJobs().then(setStoredJobs);
    const unsubscribe = subscribeToJobs((jobs) => {
      setStoredJobs(jobs);
    });

    if (initialConnection) return unsubscribe;

    const tabsApi = typeof chrome !== 'undefined' ? chrome.tabs : undefined;
    const runtimeApi = typeof chrome !== 'undefined' ? chrome.runtime : undefined;
    if (!tabsApi) return unsubscribe;

    const detectActiveTab = () => {
      if (!tabsApi.query) return;
      tabsApi.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (runtimeApi?.lastError) {
          setConnection({ connected: false, provider: null });
          return;
        }
        const tab = tabs[0];
        if (!tab?.url) {
          setConnection({ connected: false, provider: null });
          return;
        }
        try {
          const url = new URL(tab.url);
          const provider =
            url.protocol === 'https:' && url.hostname === 'flow.google.com'
              ? 'flow'
              : url.protocol === 'https:' && url.hostname === 'gemini.google.com'
                ? 'gemini'
                : null;
          setConnection(
            provider
              ? { connected: true, provider, title: tab.title, url: tab.url }
              : { connected: false, provider: null, title: tab.title, url: tab.url }
          );
        } catch {
          setConnection({ connected: false, provider: null });
        }
      });
    };

    detectActiveTab();
    tabsApi.onActivated?.addListener(detectActiveTab);
    tabsApi.onUpdated?.addListener(detectActiveTab);
    return () => {
      unsubscribe();
      tabsApi.onActivated?.removeListener(detectActiveTab);
      tabsApi.onUpdated?.removeListener(detectActiveTab);
    };
  }, [initialConnection]);

  const handleProfileChange = async (profileId: string) => {
    const updated = await setActiveProfile(profileId);
    setPreset(updated);
  };

  const handleStart = async () => {
    if (!prompt.trim() || !connection.connected) return;
    const execution = createJobExecutionControl();
    activeExecution.current = execution;
    setIsPaused(false);
    setIsQueueActive(true);
    setActiveStatus('submitting');

    try {
      const job = await addMockJob({
        prompt,
        profile: preset,
        failureMode,
        control: execution,
      });
      if (execution.signal.aborted) {
        await updateJobStatus(
          job.id,
          'failed',
          { errorMessage: 'Cancelled by user before mock execution finished.' },
          { expectedStatuses: ['pending', 'submitting', 'generating'] }
        );
        return;
      }
      executionById.current.set(job.id, execution);
    } catch {
      if (activeExecution.current === execution) {
        activeExecution.current = null;
        setIsQueueActive(false);
        setActiveStatus('idle');
      }
    }
  };

  const handleTogglePause = () => {
    const execution = activeExecution.current;
    if (!execution) return;
    const activeJobId = [...executionById.current].find(
      ([, jobExecution]) => jobExecution === execution
    )?.[0];
    const shouldPause = !isPaused;
    if (shouldPause) execution.pause();
    else execution.resume();
    if (activeJobId) {
      setPausedJobIds((current) => {
        const next = new Set(current);
        if (shouldPause) next.add(activeJobId);
        else next.delete(activeJobId);
        return next;
      });
    }
    setIsPaused(shouldPause);
  };

  const handleStop = async () => {
    const execution = activeExecution.current;
    if (execution) {
      execution.cancel();
      activeExecution.current = null;
      setIsQueueActive(false);
      setIsPaused(false);
      setActiveStatus('idle');

      try {
        const activeJobId = [...executionById.current].find(
          ([, jobExecution]) => jobExecution === execution
        )?.[0];
        if (activeJobId) {
          await updateJobStatus(
            activeJobId,
            'failed',
            { errorMessage: 'Cancelled by user before mock execution finished.' },
            { expectedStatuses: ['pending', 'submitting', 'generating'] }
          );
        }
      } finally {
        for (const [jobId, jobExecution] of executionById.current) {
          if (jobExecution === execution) executionById.current.delete(jobId);
        }
      }
      return;
    }

    setIsQueueActive(false);
    setIsPaused(false);
  };

  const toggleJobPause = (jobId: string) => {
    const execution = executionById.current.get(jobId);
    if (!execution || execution.signal.aborted) return;
    execution.pause();
    setPausedJobIds((current) => new Set(current).add(jobId));
  };

  const resumeJob = (jobId: string) => {
    executionById.current.get(jobId)?.resume();
    setPausedJobIds((current) => {
      const next = new Set(current);
      next.delete(jobId);
      return next;
    });
  };

  const toggleJobPauseState = (jobId: string) => {
    if (pausedJobIds.has(jobId)) resumeJob(jobId);
    else toggleJobPause(jobId);
  };

  const cancelJob = async (jobId: string) => {
    const execution = executionById.current.get(jobId);
    if (!execution) return;

    execution.cancel();
    executionById.current.delete(jobId);
    setPausedJobIds((current) => {
      const next = new Set(current);
      next.delete(jobId);
      return next;
    });
    if (activeExecution.current === execution) {
      activeExecution.current = null;
      setIsQueueActive(false);
      setIsPaused(false);
      setActiveStatus('idle');
    }

    await updateJobStatus(
      jobId,
      'failed',
      { errorMessage: 'Cancelled by user before mock execution finished.' },
      { expectedStatuses: ['pending', 'submitting', 'generating'] }
    );
  };

  const openWorkspace = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: chrome.runtime.getURL('src/workspace/index.html') });
    }
  };

  const renderStatusBadge = (status: JobItem['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case 'generating':
      case 'submitting':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-400 bg-blue-950/60 border border-blue-800/80 px-1.5 py-0.5 rounded">
            <RefreshCw className="w-3 h-3 animate-spin" /> {status}
          </span>
        );
      case 'policy-refusal':
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose-400 bg-rose-950/60 border border-rose-800/80 px-1.5 py-0.5 rounded">
            <ShieldAlert className="w-3 h-3" /> {status}
          </span>
        );
      case 'needs-review':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-950/60 border border-amber-800/80 px-1.5 py-0.5 rounded">
            <AlertCircle className="w-3 h-3" /> Needs Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 bg-zinc-800/60 border border-zinc-700/80 px-1.5 py-0.5 rounded">
            <Clock className="w-3 h-3" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-zinc-950 text-zinc-100 font-sans select-none overflow-hidden text-xs relative">
      <a
        href="#sidepanel-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-2.5 focus:py-1 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-white text-xs font-medium"
      >
        Skip to main content
      </a>
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-800 bg-zinc-900/60 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <h1 className="font-semibold text-zinc-100 tracking-wide text-xs">AI Media Automator</h1>
        </div>
        <button
          onClick={openWorkspace}
          className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
          title="Open Workspace"
          aria-label="Open full workspace"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Body */}
      <main id="sidepanel-main" tabIndex={-1} className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Connection Status Card */}
        <div
          className={`p-2.5 rounded border ${
            connection.connected
              ? 'bg-zinc-900/40 border-zinc-800'
              : 'bg-rose-950/20 border-rose-900/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              Target Tab
            </span>
            <span
              className={`flex items-center gap-1.5 text-[11px] ${
                connection.connected ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  connection.connected ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
              {connection.connected ? 'Attached' : 'Disconnected'}
            </span>
          </div>

          <div className="mt-1">
            <div className="font-medium text-zinc-200 truncate" title={connection.title}>
              {connection.title || 'No active tab detected'}
            </div>
            {connection.url && (
              <div className="text-[10px] text-zinc-500 font-mono truncate">{connection.url}</div>
            )}
          </div>
        </div>

        {/* Disconnected Warning Banner */}
        {!connection.connected && (
          <div className="p-2.5 rounded bg-amber-950/30 border border-amber-800/50 flex gap-2 items-start text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-tight">
              <span className="font-semibold block mb-0.5">No Active Google Session</span>
              Navigate to an active Google Flow or Gemini session to enable automated submission.
            </div>
          </div>
        )}

        {/* Preset Configuration Card */}
        <section className="rounded border border-zinc-800 bg-zinc-900/40 p-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="profile-select"
              className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400"
            >
              Active Profile
            </label>
            <span className="text-[11px] text-zinc-400 font-mono">
              {preset.creditsPerOutput} credits/item
            </span>
          </div>

          <select
            id="profile-select"
            data-testid="profile-select"
            aria-label="Select generation profile"
            value={preset.id}
            onChange={(e) => handleProfileChange(e.target.value)}
            disabled={isQueueActive}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {AVAILABLE_PROFILES.map((p) => (
              <option key={p.id} value={p.id} className="bg-zinc-950 text-zinc-200">
                {p.model} · {p.resolution} ({p.creditsPerOutput} cr)
              </option>
            ))}
          </select>

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

        {/* Failure Mode Simulator (for truthful verification testing) */}
        <section className="space-y-1">
          <label
            htmlFor="failure-mode-select"
            className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500"
          >
            Test Mode / Failure Simulation
          </label>
          <select
            id="failure-mode-select"
            data-testid="failure-mode-select"
            aria-label="Test mode simulation"
            value={failureMode}
            onChange={(e) =>
              setFailureMode(
                e.target.value as
                  'none' | 'policy-refusal' | 'ambiguous-submission' | 'selector-not-found'
              )
            }
            disabled={isQueueActive}
            className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-2 py-1 text-zinc-400 text-[11px] focus:outline-none focus:border-blue-500"
          >
            <option value="none">Standard Execution (Normal Mock)</option>
            <option value="policy-refusal">Simulate Policy Refusal (Safety stop)</option>
            <option value="ambiguous-submission">
              Simulate Ambiguous Submission (Needs review)
            </option>
            <option value="selector-not-found">Simulate Missing Selector (Failure)</option>
          </select>
        </section>

        {/* Determinate simulation status for offline mock execution */}
        {isQueueActive && (
          <section className="rounded border border-zinc-800 bg-zinc-900/60 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
                Mock Job Simulation
              </span>
              <span className="text-[10px] text-zinc-400">No Google job was submitted.</span>
            </div>
            <div className="font-mono text-[11px] text-zinc-200">
              {isPaused ? 'Paused' : activeStatus}
            </div>
            <div className="text-[10px] text-zinc-500">
              Progress and timing shown here are local test simulation only.
            </div>
          </section>
        )}

        {/* Persistent Jobs Status Section */}
        {storedJobs.length > 0 && (
          <section className="rounded border border-zinc-800 bg-zinc-900/40 p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
                Persistent Jobs ({storedJobs.length})
              </span>
              <button
                onClick={openWorkspace}
                className="text-[10px] text-blue-400 hover:text-blue-300 underline"
              >
                View in Workspace
              </button>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {storedJobs.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  data-testid={`sidepanel-job-${job.id}`}
                  className="p-1.5 rounded bg-zinc-950 border border-zinc-800 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-zinc-400">{job.profileName}</span>
                    {renderStatusBadge(job.status)}
                  </div>
                  <div className="text-[11px] text-zinc-300 truncate">{job.prompt}</div>
                  {job.errorMessage && (
                    <div className="text-[10px] text-rose-400 italic truncate">
                      {job.errorMessage}
                    </div>
                  )}
                  {['pending', 'submitting', 'generating'].includes(job.status) &&
                    executionById.current.has(job.id) && (
                      <div className="flex gap-2">
                        {pausedJobIds.has(job.id) ? (
                          <button
                            type="button"
                            onClick={() => toggleJobPauseState(job.id)}
                            className="text-[10px] text-amber-300 underline"
                            aria-label={`Resume ${job.prompt}`}
                          >
                            Resume
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleJobPauseState(job.id)}
                            className="text-[10px] text-amber-300 underline"
                            aria-label={`Pause ${job.prompt}`}
                          >
                            Pause
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => cancelJob(job.id)}
                          className="text-[10px] text-rose-300 underline"
                          aria-label={`Cancel ${job.prompt}`}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Control Footer */}
      <footer className="p-3 border-t border-zinc-800 bg-zinc-900/40 text-xs">
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
