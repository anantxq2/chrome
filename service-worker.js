self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        './',
        './index.html',
        './manifest.json',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyOp3vaPTbklDOR2cLt7Xfh9HZvSJLh88OXaHzpNv3gHA2_cKrwrvQEJpdzxJ7UCVkrEL7NbWE7MbmbxwygC06M_hDCY5twjYG5KdKoLjgbWmU7Pmlwale5ILETBIFLs5_IXX3Y_yz1lIaGpFdHPsDdRAppNzmMmT27Rs2Yh57XXqKAor96O4BX38O-PE/s1600/cropped.png',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuGyrB_i5zEbz9KNl3b6Y46Uc5Wk-TQnT_fd6KrjDuviqHFslfQBzOIMqserZAa87Nu1in0CYeTktQLzoJjTFxvDhRH_LYjPxfN0_xIbHruQnqUd3v9JYr4MJj9luVgJ3ALn2bXRxMZH29Hz2LUiMxKCYhGoBXULbQPwfDDq__1TgOo-yQO-9ryc96lXs/s1600/imresizer-1738395568042.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
