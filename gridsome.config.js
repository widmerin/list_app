// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Shopping List',
  plugins: [
    {
      use: 'gridsome-plugin-pwa',
      options: {
        // Service Worker Options
        disableServiceWorker: false,
        serviceWorkerPath: 'service-worker.js',
        cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
        disableTemplatedUrls: false,       // Optional

        // Manifest Options (https://developer.mozilla.org/en-US/docs/Web/Manifest)
        manifestPath: 'manifest.json',
        title: 'Shopping List 123',
        startUrl: '/',
        display: 'standalone',
        statusBarStyle: 'default',
        themeColor: '#614051',
        backgroundColor: '#ffffff',
        icon: '',
        shortName: 'List',              // Optional
        description: 'Shopping List!',// Optional
        lang: 'de-DE',                      // Optional
        dir: 'auto',                        // Optional
        maskableIcon: true,                 // Optional


        icons: [
          {
            "src": "assets/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    }
  ]
}
