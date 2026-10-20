// Content Script: Google Flow Adapter
if (typeof window !== 'undefined') {
  console.log('[AI Media Automator] Flow Content Script loaded in:', window.location.href);
}

export function isFlowCanvas(
  hostname = typeof window === 'undefined' ? '' : window.location.hostname
): boolean {
  return hostname === 'flow.google.com';
}
