var CACHE = 'shani-money-v20260872';

// Allow the page to force an immediately-waiting worker to activate.
self.addEventListener('message', function(e){
  if(e.data === 'skipWaiting') self.skipWaiting();
});
var SHELL = [
  '/manifest.json',
  '/icon-180.png',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.png'
];

// Install — pre-cache static assets (NOT index.html — always network-first)
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(SHELL); })
  );
  self.skipWaiting();
});

// Activate — delete old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch strategy:
// - index.html (/  or /index.html): NETWORK-FIRST, fall back to cache
// - Other same-origin assets: cache-first, update in background
// - Cross-origin (Firebase, Google): pass through
self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  if (e.request.method !== 'GET') return;

  // Pass through cross-origin (Firebase, Google Fonts, gstatic, CDN)
  if (url.indexOf('firestore.googleapis.com') !== -1 ||
      url.indexOf('googleapis.com') !== -1 ||
      url.indexOf('gstatic.com') !== -1 ||
      url.indexOf('fonts.goog') !== -1 ||
      url.indexOf('cdn.jsdelivr.net') !== -1 ||
      url.indexOf('accounts.google.com') !== -1) return;

  // Network-first for the HTML shell — always serve latest code
  var path = url.split('?')[0];
  if (path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('/shani-finance.html')) {
    e.respondWith(
      fetch(e.request).then(function(res) {
        if (res && res.status === 200) {
          caches.open(CACHE).then(function(c) { c.put(e.request, res.clone()); });
        }
        return res;
      }).catch(function() {
        return caches.match(e.request) || caches.match('/index.html');
      })
    );
    return;
  }

  // Cache-first for other same-origin assets (icons, manifest)
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      var net = fetch(e.request).then(function(res) {
        if (res && res.status === 200 && res.type !== 'opaque') {
          caches.open(CACHE).then(function(c) { c.put(e.request, res.clone()); });
        }
        return res;
      }).catch(function() { return null; });
      return cached || net;
    })
  );
});
