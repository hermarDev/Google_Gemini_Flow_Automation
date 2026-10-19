// Content Script: Google Flow Adapter
console.log('[AI Media Automator] Flow Content Script loaded in:', window.location.href);

export function isFlowCanvas(): boolean {
  return window.location.hostname === 'flow.google.com';
}
