if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    })
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed; waiting");
      } else if (registration.active) {
        console.log("Service worker active");
      }

      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        };
      });

    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log("Received Message from SW:", event.data);
    });
  });

  let refreshing: boolean;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });

}