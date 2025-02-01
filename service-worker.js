self.addEventListener('install', function(event) {
    // Cache important files, including iframe code
    event.waitUntil(
        caches.open('iframe-cache').then(function(cache) {
            return cache.addAll([
                '/index.html',   // Main app page (index)
                '/iframe.html',  // Iframe code (separate page)
                '/styles.css'    // App styles (if any)
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Intercepting the page load to inject iframe
self.addEventListener('fetch', function(event) {
    if (event.request.url.includes('your-pwa-url.com')) {
        event.respondWith(
            caches.match('/iframe.html').then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
