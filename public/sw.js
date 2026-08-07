const CACHE_NAME = 'patitas-cache-v3';
const OFFLINE_URL = '/offline';

const PRECACHE_ASSETS = [
  '/',
  OFFLINE_URL,
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forza la activación del nuevo SW inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Manual fetch for each asset to include bypass headers for tunnels (ngrok/localtunnel)
      const headers = new Headers();
      headers.set('ngrok-skip-browser-warning', 'true');
      headers.set('Bypass-Tunnel-Reminder', 'true');
      
      for (const asset of PRECACHE_ASSETS) {
        try {
          const req = new Request(asset, { headers });
          const res = await fetch(req);
          if (res.ok) await cache.put(req, res);
        } catch (e) {
          console.warn('[SW] Failed to precache:', asset, e);
        }
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando v3...');
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
  const url = new URL(event.request.url);

  // 1. Excluir Formularios y métodos que no sean GET
  if (event.request.method !== 'GET') {
    return; // Bypass (Network only)
  }

  // Helper function to handle cache update in background
  const fetchAndUpdateCache = async (request) => {
    try {
      // Agregamos headers para saltar las pantallas de advertencia de ngrok/localtunnel
      // SOLO si no es una llamada a la API (para evitar fallos de CORS Preflight)
      const newHeaders = new Headers(request.headers);
      const requestUrl = new URL(request.url);
      if (!requestUrl.pathname.includes('/public/animals') && !requestUrl.pathname.includes('/api/')) {
        newHeaders.set('ngrok-skip-browser-warning', 'true');
        newHeaders.set('Bypass-Tunnel-Reminder', 'true');
      }
      
      const newRequest = new Request(request, { headers: newHeaders });
      const response = await fetch(newRequest);
      
      if (response && response.status === 200 && (response.type === 'basic' || response.type === 'cors')) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (e) {
      console.warn('[SW] Error actualizando cache en background', e);
    }
  };

  // 2. Catálogo de animalitos (Stale While Revalidate)
  if (url.pathname.includes('/public/animals') && url.searchParams.has('page')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const networkFetch = fetchAndUpdateCache(event.request);
        // Si hay caché, retornar inmediato y actualizar en background. Si no, esperar la red.
        return cachedResponse || networkFetch.then(res => res || Response.error());
      })
    );
    return;
  }

  // 3. Detalle de animalito (Network First con fallback a caché)
  if (url.pathname.includes('/public/animals') && !url.searchParams.has('page')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Si la respuesta es exitosa, guardamos en caché
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Si falla la red, buscar en caché
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return Response.error(); // Para que lance error y lo atrape la UI
          });
        })
    );
    return;
  }

  // 4. App Shell (Static Assets de Next.js, iconos, fuentes) - Cache First
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/icons/') || 
      url.pathname.startsWith('/pwa-images/') ||
      url.pathname.match(/\.(woff2|woff|ttf|otf)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetchAndUpdateCache(event.request).then(res => res || Response.error());
      })
    );
    return;
  }

  // 5. Imágenes (Supabase / fotos / doodles generales) - Cache First o Stale While Revalidate
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp)$/) || url.hostname.includes('supabase')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Stale-While-Revalidate para imágenes asegura que se mantengan visibles,
        // pero se actualicen si cambian (poco probable, pero seguro)
        const networkFetch = fetchAndUpdateCache(event.request);
        return cachedResponse || networkFetch.then(res => res || Response.error());
      })
    );
    return;
  }

  // 6. Navegación HTML genérica (Network First con fallback a offline page)
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      (async () => {
        try {
          const newHeaders = new Headers(event.request.headers);
          newHeaders.set('ngrok-skip-browser-warning', 'true');
          newHeaders.set('Bypass-Tunnel-Reminder', 'true');
          const newRequest = new Request(event.request, { headers: newHeaders });
          
          const response = await fetch(newRequest);
          
          // Si es un redireccionamiento (opaqueredirect), retornarlo inmediatamente
          // para que el navegador lo siga, y evitar el error al hacer .text()
          if (response.type === 'opaqueredirect' || response.status >= 300 && response.status < 400) {
            return response;
          }
          
          const responseClone = response.clone();
          
          // Verificar que no sea el HTML de error/advertencia del túnel antes de cachear
          const text = await responseClone.text();
          if (!text.includes('Bypass Tunnel Reminder') && !text.includes('Pinggy')) {
             const cacheResponse = new Response(text, {
               status: response.status,
               statusText: response.statusText,
               headers: response.headers
             });
             const cache = await caches.open(CACHE_NAME);
             await cache.put(event.request, cacheResponse);
          }
          return response;
        } catch (e) {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;
          return caches.match(OFFLINE_URL);
        }
      })()
    );
    return;
  }

  // Fallback genérico para el resto de peticiones (Network First)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cachear las respuestas genéricas exitosas también
        if (response && response.status === 200 && event.request.method === 'GET' && !url.pathname.includes('/api/')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => cached || Response.error()))
  );
});
