const cacheName = 'egy-uae-v1';
const assets = [
  '/',
  '/index.html',
  '/css/style.css', // تأكد من مسار ملف الستايل بتاعك
  '/js/main.js'     // تأكد من مسار ملف الجافاسكريبت
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
