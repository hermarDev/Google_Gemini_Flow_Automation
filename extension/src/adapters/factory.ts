import { SiteAdapter } from './types.ts';
import { FlowSiteAdapter } from './flow.ts';
import { GeminiSiteAdapter } from './gemini.ts';
import { MockSiteAdapter, MockAdapterOptions } from './mock.ts';
import { Provider } from '../shared/types.ts';

export interface AdapterFactoryOptions {
  useMock?: boolean;
  mockOptions?: MockAdapterOptions;
}

/**
 * Creates and returns the appropriate SiteAdapter instance.
 * Allows transparent swapping of Flow, Gemini, and Mock implementations.
 */
export function createSiteAdapter(
  provider: Provider,
  options: AdapterFactoryOptions = {}
): SiteAdapter {
  if (options.useMock) {
    return new MockSiteAdapter({ provider, ...options.mockOptions });
  }

  switch (provider) {
    case 'flow':
      return new FlowSiteAdapter();
    case 'gemini':
      return new GeminiSiteAdapter();
    default:
      throw new Error(`Unsupported provider: "${provider}"`);
  }
}
