//declaraciones prinicipales de la aplicacion

//variables
var deferredPrompt; // para que instale la aplicacion

// //para agregar el service worker al navegador
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then(function () {
//         console.log('Service worker registered!');
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//   }

  window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
  });