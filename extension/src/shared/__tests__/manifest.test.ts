import { describe, it, expect } from 'vitest';
import manifest from '../../../manifest.json';

describe('Manifest V3 Compliance & Permissions', () => {
  it('declares manifest version 3', () => {
    expect(manifest.manifest_version).toBe(3);
  });

  it('restricts host_permissions strictly to Google Flow and Gemini', () => {
    expect(manifest.host_permissions).toEqual([
      'https://flow.google.com/*',
      'https://gemini.google.com/*',
    ]);
    // Ensure no wildcard or all_urls permissions
    expect(manifest.host_permissions).not.toContain('<all_urls>');
    expect(manifest.host_permissions).not.toContain('*://*/*');
  });

  it('declares minimum required API permissions', () => {
    expect(manifest.permissions).toContain('sidePanel');
    expect(manifest.permissions).toContain('storage');
    expect(manifest.permissions).toContain('downloads');
    expect(manifest.permissions).toContain('activeTab');

    // Strict security check: No cookies, no debugger, no webRequestBlocking
    expect(manifest.permissions).not.toContain('cookies');
    expect(manifest.permissions).not.toContain('debugger');
    expect(manifest.permissions).not.toContain('webRequest');
    expect(manifest.permissions).not.toContain('webRequestBlocking');
  });

  it('declares isolated content scripts matching specific domains', () => {
    expect(manifest.content_scripts).toHaveLength(2);
    expect(manifest.content_scripts[0].matches).toContain('https://flow.google.com/*');
    expect(manifest.content_scripts[1].matches).toContain('https://gemini.google.com/*');
  });

  it('configures strict content security policy without eval or remote scripts', () => {
    expect(manifest.content_security_policy?.extension_pages).toBe(
      "script-src 'self'; object-src 'self';"
    );
  });
});
