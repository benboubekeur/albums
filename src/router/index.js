import { createRouter, createWebHistory } from 'vue-router'
import Albums from '../views/Albums.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'albums',
      component: Albums
    },
   {
      path: '/album/:id',
      name: 'album',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Album.vue')
    }
  ]
})

export default router
