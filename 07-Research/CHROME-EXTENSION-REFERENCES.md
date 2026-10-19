# Browser platform references and feasibility

## Official source URLs

- [Chrome Manifest V3 manifest](https://developer.chrome.com/docs/extensions/mv3/manifest)
- [Chrome service worker lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle)
- [Chrome downloads API](https://developer.chrome.com/docs/extensions/reference/api/downloads)
- [Chrome permissions / optional permissions](https://developer.chrome.com/docs/extensions/reference/api/permissions)

## MV3 constraints with design implications

- Service worker is ephemeral; do not build a permanent while-loop waiting for videos. State in IndexedDB, events/alarms and adapter reconciliation are necessary.
- Browser downloads API filename is a relative path under Downloads, not an arbitrary `/home/hrmr/...` path.
- Extension UI and service worker can use Chrome extension APIs, but content scripts are not a trusted database for authenticated site secrets.
- Optional host/privilege requests should be justified in UI when user activates corresponding feature.
- Google Flow and Gemini UI stability is not guaranteed by any Chrome API. Prefer robust semantic selector checks plus safe stop on ambiguity.

The plan does not include running a remote server, bypassing Google authentication, borrowing another extension's host permissions or forcing a persistent debugger session.
