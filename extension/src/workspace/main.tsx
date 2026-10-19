import React from 'react';
import ReactDOM from 'react-dom/client';
import { WorkspaceApp } from './WorkspaceApp.tsx';
import '../styles/globals.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <WorkspaceApp />
    </React.StrictMode>
  );
}
