// Content Script: Google Gemini Chat Adapter
console.log('[AI Media Automator] Gemini Content Script loaded in:', window.location.href);

export function isGeminiChat(): boolean {
  return window.location.hostname === 'gemini.google.com';
}
