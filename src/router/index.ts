import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BracketPairingPage from '@/views/BracketPairingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bracket-pairing',
      name: '括号配对',
      component: BracketPairingPage
    },
  ]
})

export default router
