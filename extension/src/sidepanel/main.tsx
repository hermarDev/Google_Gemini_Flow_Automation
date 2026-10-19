import React from 'react';
import ReactDOM from 'react-dom/client';

export const SidePanelApp: React.FC = () => {
  return (
    <div className="p-4 font-sans text-sm">
      <h1 className="text-base font-semibold text-zinc-100 mb-2">
        AI Media Automator
      </h1>
      <p className="text-zinc-400">Side Panel Companion Initialized.</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <SidePanelApp />
    </React.StrictMode>
  );
}
