<script setup>
import { onErrorCaptured, onMounted, ref } from 'vue'
import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { useOnline } from '@vueuse/core'
import HelloWorld from '@/components/HelloWorld.vue'
import Offline from '@/components/Offline.vue'
// import ReloadPWA from "@/components/ReloadPWA.vue"

const firebaseConfig = {
  apiKey: "AIzaSyDweEFNR0GAvxf0MP_VBeYVdIxoSjXnPnU",
  authDomain: "vite-pwa-vuejs.firebaseapp.com",
  projectId: "vite-pwa-vuejs",
  storageBucket: "vite-pwa-vuejs.appspot.com",
  messagingSenderId: "361924186998",
  appId: "1:361924186998:web:34cf5de266c779f5c7a057",
  measurementId: "G-C0070TFQ3Y"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BHpTqQ3Fy7Otl49rSX7Jx11NwHd5AVRuR1GRlj3dxZENUpGAXNSXQCVDUKNsb73w0N-3b11LFGbeVAqFcnVzXsA' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("Token is: ", currentToken);
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

const online = useOnline()
const isOnline = ref(online)
const errorMsg = ref('')

const clearErrorMsg = function () {
  errorMsg = ''
}

onMounted(() => {
  onErrorCaptured((error) => {
    if (!isOnline && error.message.includes('Failed to fetch dynamically imported module')) {
      errorMsg = 'Failed to fetch dynamically imported module'
    } else {
      errorMsg = ''
    }
  })
})

// export default defineComponent({
//   name: "App",
//   components: {
//     HelloWorld,
//     Offline,
//     // ReloadPWA,
//   },
//   data: function () {
//     return {
//       isOnline: online,
//       errorMsg: ''
//     }
//   },
//   methods: {
//     clearErrorMsg: function () {
//       this.errorMsg = ''
//     }
//   },
//   mounted: function () {
//     onErrorCaptured((error) => {
//       if (!this.isOnline && error.message.includes('Failed to fetch dynamically imported module')) {
//         this.errorMsg = 'Failed to fetch dynamically imported module'
//       } else {
//         this.errorMsg = ''
//       }
//     })
//   }
// });
</script>

<template>
  <!-- <ReloadPWA /> -->
  {{ errorMsg }}
  <div class="row" v-if="isOnline || !errorMsg">
    <div class="col-6 left-section">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue" />
    </div>
    <div class="col-6 right-section">
      <nav>
        <router-link to="/">Home</router-link>
        <span class="divider">|</span>
        <router-link to="/about">About</router-link>
        <span class="divider">|</span>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <hr>
      <div class="pages">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div class="row" v-else>
    <Offline v-on:go-back="clearErrorMsg($event)" />
  </div>
</template>

<style lang="scss" scoped>
.row {
  width: 100%;

  .col-6 {
    display: inline-block;
    vertical-align: top;
    width: 50%;
  }

  .right-section {
    background: #fff;
    border-radius: 20px;
    margin-top: 30px;

    nav {
      padding-top: 1.5rem;

      a {
        margin-left: 20px;
        margin-right: 20px;
      }

      .divider {
        color: #646cff;
      }
    }

    hr {
      margin-top: 20px;
      border-color: #646cff;
      border-width:  0.5px;
    }

    .pages {
      color: #333;
    }
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
