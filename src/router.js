import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: defineAsyncComponent(() => import('./pages/Home.vue')) },
    { path: '/about', component: defineAsyncComponent(() => import('./pages/About.vue')) },
    { path: '/contact', component: defineAsyncComponent(() => import('./pages/Contact.vue')) },
  ]
})

export default router
