import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

describe('Vite Multi-Entry Build Output Verification', () => {
  const extensionDir = path.resolve(__dirname, '../../..');
  const distDir = path.resolve(extensionDir, 'dist');

  beforeAll(() => {
    if (!fs.existsSync(path.join(distDir, 'manifest.json'))) {
      execSync('npm run build', { cwd: extensionDir, stdio: 'pipe' });
    }
  });

  it('generates dist directory with required entry artifacts', () => {
    expect(fs.existsSync(distDir)).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'manifest.json'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'src/sidepanel/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'src/workspace/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'src/background/index.js'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'src/content/flow.js'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'src/content/gemini.js'))).toBe(true);
  });

  it('ensures dist/manifest.json matches all generated entrypoints', () => {
    const raw = fs.readFileSync(path.join(distDir, 'manifest.json'), 'utf-8');
    const manifest = JSON.parse(raw);
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.background.service_worker).toBe('src/background/index.js');
    expect(manifest.content_scripts[0].js).toContain('src/content/flow.js');
    expect(manifest.content_scripts[1].js).toContain('src/content/gemini.js');
  });

  it('ensures static assets contain no remote CDN URLs or eval', () => {
    const bgCode = fs.readFileSync(path.join(distDir, 'src/background/index.js'), 'utf-8');
    expect(bgCode).not.toContain('eval(');
    expect(bgCode).not.toContain('https://cdn');
  });
});
