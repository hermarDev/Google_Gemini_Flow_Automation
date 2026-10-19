import React from 'react';
import ReactDOM from 'react-dom/client';

export const WorkspaceApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <header className="border-b border-zinc-800 pb-4 mb-6">
        <h1 className="text-xl font-bold tracking-tight">AI Media Automator — Full Workspace</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Multi-prompt production and local media catalog.
        </p>
      </header>
      <main>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm text-zinc-300">Workspace initialized. Select a tool to begin.</p>
        </div>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <WorkspaceApp />
    </React.StrictMode>
  );
}
