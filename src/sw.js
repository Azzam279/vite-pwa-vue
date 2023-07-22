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

async function omdbApi(url) {
  const fetchRequest = async (url, value) => {
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

  return get('omdbapi')
    .then(val => fetchRequest(url, val))
    .catch(val => fetchRequest(url, val))
}

self.addEventListener('fetch', (evt) => {
  if (evt.request.url.includes('https://www.omdbapi.com/?apikey=15b675db')) {
    evt.respondWith(omdbApi(evt.request.url))
  }
})

self.skipWaiting()
clientsClaim()
