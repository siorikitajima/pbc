import { createRouter, createWebHistory } from 'vue-router'
import Result from '../views/Result.vue'

const routes = [
  {
    path: '/',
    name: 'Catalog Search',
    component: Result
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
