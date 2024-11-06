import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BracketPairingPage from '@/views/BracketPairingPage.vue'
import TreeNodePage from '@/views/TreeNodePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/treenode',
      name: '求二叉树结点的祖先',
      component: TreeNodePage
    },
    {
      path: '/bracket-pairing',
      name: '括号配对分析器',
      component: BracketPairingPage
    },
  ]
})

export default router
