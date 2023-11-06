//codigo fuente del trabajador de servicio (service worker) 
//sirve como proxy entre el navegador web y el servidor
//ejemplo para permitir el uso de la aplicacion sin internet

var cacheNombreEstatico = 'estatico';
var cacheNombreDinamico = 'dinamico';

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Instalando Service Worker ...', event);
  event.waitUntil(
    caches.open(cacheNombreEstatico)
      .then(function (cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/index.ejs',
          '/registrarse.ejs',
          '/iniciar_sesion.ejs',
          '/src/js/app.js',
          "https://i.postimg.cc/jdDB0rxw/icono-back.png"

        ]);
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activando Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList){
        return Promise.all(keyList.map(function(key){
          if(key !== cacheNombreEstatico && key !== cacheNombreDinamico){
            console.log('[Service Worker] Borrando cache viejo.', key);
            return caches.delete(key); 
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res){
              return caches.open(cacheNombreDinamico)
                .then(function(cache){
                  cache.put(event.request.url,res.clone());
                  return res;
                })
            });
        }
      })
  );
});