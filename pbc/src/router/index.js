import { createRouter, createWebHistory } from 'vue-router'
import Result from '../views/Result.vue'
import SingleSongPage from '../views/SingleSongPage.vue'
import SingleProjectPage from '../views/SingleProjectPage.vue'
import SingleArtistPage from '../views/SingleArtistPage.vue'
import SingleAlbumPage from '../views/SingleAlbumPage.vue'
import ArtistList from '../views/ArtistList.vue'
import AlbumList from '../views/AlbumList.vue'

const routes = [
  {
    path: '/',
    name: 'Result',
    component: Result
  },
  {
    path: '/song/:id-:title',
    name: 'SingleSongPage',
    component: SingleSongPage,
    props: true
  },
  {
    path: '/project/:name',
    name: 'SingleProjectPage',
    component: SingleProjectPage,
    props: true
  },
  {
    path: '/artist/:name',
    name: 'SingleArtistPage',
    component: SingleArtistPage,
    props: true
  },
  {
    path: '/album/:id-:title',
    name: 'SingleAlbumPage',
    component: SingleAlbumPage,
    props: true
  },
  {
    path: '/artists',
    name: 'ArtistList',
    component: ArtistList
  },
  {
    path: '/albums',
    name: 'AlbumList',
    component: AlbumList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})

export default router
