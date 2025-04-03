import { createRouter, createWebHistory } from 'vue-router'
import JobBoard from '@/components/JobBoard.vue'
import Dashboard from '@/components/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
    },
    {
      path: '/applications',
      name: 'applications',
      component: JobBoard,
    },
  ],
})

export default router
