import { createRouter, createWebHistory } from 'vue-router'
import Result from '../views/Result.vue'
import SingleSongPage from '../views/SingleSongPage.vue'
import SingleProjectPage from '../views/SingleProjectPage.vue'
import SingleArtistPage from '../views/SingleArtistPage.vue'

const routes = [
  {
    path: '/',
    name: 'Catalog Search',
    component: Result
  },
  {
    path: '/song/:id-:title',
    name: 'Single Song',
    component: SingleSongPage,
    props: true
  },
  {
    path: '/project/:name',
    name: 'Single Project',
    component: SingleProjectPage,
    props: true
  },
  {
    path: '/artist/:name',
    name: 'Single Artist',
    component: SingleArtistPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  // scrollBehavior() {
  //   document.getElementById('app').scrollIntoView();
  // }
})

export default router
