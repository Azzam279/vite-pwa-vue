import { cleanupOutdatedCaches, precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { set } from 'idb-keyval'

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

self.addEventListener('fetch', (evt) => {
  if (evt.request.url.includes('https://www.omdbapi.com/?apikey=15b675db')) {
    evt.respondWith(
      fetch(evt.request.url)
        .then(response => {
          response.clone().json().then(data => {
            set('omdbapi', data)
          }).catch(e => console.log(e, 'err clone'))

          return response
        })
        .catch(error => {
          return error
        })
    )
  }
})

self.skipWaiting()
clientsClaim()
