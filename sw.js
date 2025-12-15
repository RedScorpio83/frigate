// Minimal service worker to make it installable.
// No caching of the external target; keeps the shell tiny and up to date.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim clients so updates apply immediately
  event.waitUntil(self.clients.claim());
});

// Optional: network-only for all requests (no cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => {
    // Offline fallback: a tiny response explaining the redirect app needs network
    return new Response(
      '<!doctype html><meta charset="utf-8"><title>Offline</title><body style="font-family:sans-serif;background:#0d1117;color:#c9d1d9"><h1>Offline</h1><p>Questa PWA reindirizza a Frigate, serve la rete.</p></body>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }));
});
