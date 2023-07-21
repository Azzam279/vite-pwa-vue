import { cleanupOutdatedCaches, precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { set, get } from 'idb-keyval'

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

function omdbApi(url) {
  let value = {}
  get('omdbapi').then(val => value = val)

  return fetch(url)
    .then(response => {
      response.clone().json().then(data => {
        set('omdbapi', data)
      }).catch(e => console.log(e, 'err clone'))

      return response
    })
    .catch(error => {
      console.log(error)
      return new Response(JSON.stringify(value), {
        headers: {'Content-Type': 'application/json'}
      })
    })
}

self.addEventListener('fetch', (evt) => {
  if (evt.request.url.includes('https://www.omdbapi.com/?apikey=15b675db')) {
    evt.respondWith(omdbApi(evt.request.url))
  }
})

self.skipWaiting()
clientsClaim()
