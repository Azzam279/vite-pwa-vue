import { cleanupOutdatedCaches, precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
// })

cleanupOutdatedCaches()

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

let allowlist
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist }
))

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDweEFNR0GAvxf0MP_VBeYVdIxoSjXnPnU",
  authDomain: "vite-pwa-vuejs.firebaseapp.com",
  projectId: "vite-pwa-vuejs",
  storageBucket: "vite-pwa-vuejs.appspot.com",
  messagingSenderId: "361924186998",
  appId: "1:361924186998:web:34cf5de266c779f5c7a057",
  measurementId: "G-C0070TFQ3Y"
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/img/icons/apple-touch-icon-60x60.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions);
})

self.skipWaiting()
clientsClaim()
