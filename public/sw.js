// Service Worker - Patitas Caminando
// Fase inicial: Arquitectura base.
// La lógica completa de caché se implementará en la próxima fase.

const CACHE_NAME = 'patitas-cache-v1';

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     console.log('[Service Worker] Pre-caching app shell');
  //     return cache.addAll(['/']);
  //   })
  // );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activado...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Placeholder para la lógica de caché offline
  // console.log('[Service Worker] Fetching', event.request.url);
});
