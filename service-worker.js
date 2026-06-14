const CACHE_NAME = "arrow-escape-puzzle-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./src/main.js",
  "./src/styles.css",
  "./src/core/engine.js",
  "./src/core/levelGenerator.js",
  "./src/core/objectPool.js",
  "./src/data/achievements.js",
  "./src/data/themes.js",
  "./src/services/adService.js",
  "./src/services/analytics.js",
  "./src/services/audio.js",
  "./src/services/leaderboard.js",
  "./src/services/save.js",
  "./src/ui/components.js",
  "./src/ui/screens.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
