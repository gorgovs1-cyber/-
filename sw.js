var CACHE = 'shani-money-v20260783';
var SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-180.png',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.png'
];

// Install — pre-cache app shell
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

// Fetch — cache-first for same-origin assets, pass-through for Firebase/Google
self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  // Pass through cross-origin (Firebase, Google Fonts, gstatic)
  if (e.request.method !== 'GET' ||
      url.indexOf('firestore.googleapis.com') !== -1 ||
      url.indexOf('googleapis.com') !== -1 ||
      url.indexOf('gstatic.com') !== -1 ||
      url.indexOf('fonts.goog') !== -1) return;

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      // Fetch from network and update cache in background
      var net = fetch(e.request).then(function(res) {
        if (res && res.status === 200 && res.type !== 'opaque') {
          caches.open(CACHE).then(function(c) { c.put(e.request, res.clone()); });
        }
        return res;
      }).catch(function() { return null; });
      // Serve cached immediately; fall back to network
      return cached || net;
    })
  );
});
