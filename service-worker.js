const CACHE_NAME = 'margins-v63';
const ASSETS = [
  '/css/styles.css',
  '/js/app.js',
  '/js/storage.js',
  '/js/covers.js',
  '/js/llm.js',
  '/js/data.js',
  '/js/auth.js',
  '/firebase/firebase-app.js',
  '/firebase/firebase-auth.js',
  '/firebase/firebase-firestore.js',
  '/data/initial-data.json',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install — cache assets (not index.html)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches, take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch strategy:
// - HTML/navigation: network-first (always get latest)
// - Same-origin assets: cache-first with network fallback
// - External: network-only
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // External requests — network only
  if (url.hostname !== location.hostname) {
    event.respondWith(
      fetch(event.request).catch(() => new Response('Offline', { status: 503 }))
    );
    return;
  }

  // HTML / navigation requests — network first
  if (event.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        return caches.match(event.request) || caches.match('/');
      })
    );
    return;
  }

  // All other same-origin assets — cache first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
