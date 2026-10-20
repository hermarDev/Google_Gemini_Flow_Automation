// Content Script: Google Gemini Chat Adapter
if (typeof window !== 'undefined') {
  console.log('[AI Media Automator] Gemini Content Script loaded in:', window.location.href);
}

export function isGeminiChat(
  hostname = typeof window === 'undefined' ? '' : window.location.hostname
): boolean {
  return hostname === 'gemini.google.com';
}
