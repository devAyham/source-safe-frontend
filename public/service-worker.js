/* eslint-disable no-restricted-globals */
// service-worker.js
self.addEventListener("install", (event) => {
  //   ("Service worker installed");
  //   event.waitUntil(
  //     caches
  //       .open("my-cache")
  //       .then((cache) => {
  //         return cache.addAll(["/index.html"]);
  //       })
  //       .then(() => {
  //         // Force the new service worker to take over
  //         self.skipWaiting();
  //       })
  //   );
});

self.addEventListener("activate", (event) => {
  //   ("Service worker activated");
  //   event.waitUntil(
  //     // Clean up old caches or perform other activation tasks
  //     self.clients.claim()
  //   );
});

self.addEventListener("fetch", (event) => {
  //   ("Service worker handling fetch event:", event.request.url);
  //   const isBrowserSupported = () => {
  //     const ua = navigator.userAgent.toLowerCase();
  //     const isIE = ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1;
  //     const isOpera = ua.indexOf("opr/") !== -1 || ua.indexOf("opera/") !== -1;
  //     const isEdge = ua.indexOf("edg/") !== -1;
  //     const isChrome = ua.indexOf("chrome/") !== -1;
  //     const isFirefox = ua.indexOf("firefox/") !== -1;
  //     const isSamsungBrowser = ua.indexOf("samsungbrowser/") !== -1;
  //     const isSafari =
  //       ua.indexOf("safari/") !== -1 || ua.indexOf("version/") !== -1;
  //     if (isIE) {
  //       return false; // IE is not supported
  //     } else if (isEdge && parseInt(ua.split("edg/")[1]) < 90) {
  //       return false; // Edge versions older than 88 are not supported
  //     } else if (
  //       isOpera &&
  //       (parseInt(ua.split("opr/")[1]) || parseInt(ua.split("opera/")[1])) < 74
  //     ) {
  //       return false; // Opera versions older than 74 are not supported
  //     } else if (isChrome && parseInt(ua.split("chrome/")[1]) < 88) {
  //       return false; // Chrome versions older than 88 are not supported
  //     } else if (isFirefox && parseInt(ua.split("firefox/")[1]) < 78) {
  //       return false; // Firefox versions older than 78 are not supported
  //     } else if (
  //       isSamsungBrowser &&
  //       parseInt(ua.split("samsungbrowser/")[1]) < 15
  //     ) {
  //       return false; // Samsung Browser versions older than 15 are not supported
  //     } else if (
  //       isSafari &&
  //       (parseInt(ua.split("safari/")[1]) || parseInt(ua.split("version/")[1])) <
  //         15
  //     ) {
  //       return false; // Safari versions older than 15 are not supported
  //     }
  //     return true;
  //   };
  //   if (!isBrowserSupported()) {
  //     event.respondWith(
  //       fetch("/outdated-browser.html")
  //         .then((response) => {
  //           return response.text();
  //         })
  //         .then((html) => {
  //           return new Response(html, {
  //             headers: { "Content-Type": "text/html" },
  //           });
  //         })
  //     );
  //   }
});
