import { useEffect, useState, useCallback } from 'react';

export type RouteView = 'create' | 'queue' | 'library' | 'history' | 'settings';

export const VALID_ROUTES: RouteView[] = ['create', 'queue', 'library', 'history', 'settings'];

export interface ParsedRoute {
  route: RouteView;
  params: Record<string, string>;
  rawHash: string;
}

/**
 * Parses window.location.hash into a typed route and parameter map.
 * Examples:
 *   "#/queue" -> { route: 'queue', params: {} }
 *   "#/create?model=omni" -> { route: 'create', params: { model: 'omni' } }
 *   "" or "#/" -> { route: 'create', params: {} }
 */
export function parseHash(hash: string, defaultRoute: RouteView = 'create'): ParsedRoute {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean) {
    return { route: defaultRoute, params: {}, rawHash: hash };
  }

  const [pathPart, queryPart] = clean.split('?');
  const routeCandidate = pathPart.toLowerCase() as RouteView;
  const route: RouteView = VALID_ROUTES.includes(routeCandidate) ? routeCandidate : defaultRoute;

  const params: Record<string, string> = {};
  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
  }

  return { route, params, rawHash: hash };
}

/**
 * Formats a route and optional parameters into a standard hash string.
 */
export function formatHash(route: RouteView, params?: Record<string, string>): string {
  let hash = `#/${route}`;
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    for (const [key, val] of Object.entries(params)) {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.set(key, val);
      }
    }
    const query = searchParams.toString();
    if (query) {
      hash += `?${query}`;
    }
  }
  return hash;
}

/**
 * React hook providing hash-based routing with deep-link and browser history support.
 */
export function useWorkspaceRouter(defaultRoute: RouteView = 'create') {
  const [currentRoute, setCurrentRoute] = useState<ParsedRoute>(() => {
    if (typeof window !== 'undefined') {
      return parseHash(window.location.hash, defaultRoute);
    }
    return { route: defaultRoute, params: {}, rawHash: '' };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const parsed = parseHash(window.location.hash, defaultRoute);
      setCurrentRoute(parsed);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [defaultRoute]);

  const navigate = useCallback(
    (newRoute: RouteView, params?: Record<string, string>, replace = false) => {
      if (typeof window === 'undefined') return;

      const newHash = formatHash(newRoute, params);
      if (replace) {
        window.history.replaceState(null, '', newHash);
      } else {
        window.history.pushState(null, '', newHash);
      }
      setCurrentRoute(parseHash(newHash, defaultRoute));
    },
    [defaultRoute]
  );

  return {
    route: currentRoute.route,
    params: currentRoute.params,
    rawHash: currentRoute.rawHash,
    navigate,
  };
}
