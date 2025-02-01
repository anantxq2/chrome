const CACHE_NAME = 'pwa-cache-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/iframe.html'
];

// Install event (Cache important files)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Caching files...");
                return cache.addAll(FILES_TO_CACHE);
            })
    );
    self.skipWaiting();
});

// Activate event (Clear old cache)
self.addEventListener('activate', (event) => {
    console.log("Service Worker Activated");
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("Clearing old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event (Serve files from cache first)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Custom logic for forcing iframe to always load from cache
self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'CACHE_IFRAME') {
        caches.open(CACHE_NAME).then((cache) => {
            fetch('/iframe.html').then((response) => {
                cache.put('/iframe.html', response);
            });
        });
    }
});

