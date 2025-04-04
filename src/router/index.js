import { createRouter, createWebHistory } from 'vue-router'
import JobBoard from '@/components/JobBoard.vue'
import Stats from '@/components/Stats.vue'
import JobTable from '@/components/JobTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Stats,
    },
    {
      path: '/board',
      name: 'board',
      component: JobBoard,
    },
    {
      path: '/list',
      name: 'list',
      component: JobTable,
    },
  ],
})

export default router
