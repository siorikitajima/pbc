import storageURL from './assets/storage-url.js'
// let development = process.env.NODE_ENV !== 'production'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PatternBased Catalog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', 
      content: 'width=device-width, initial-scale=1' },
      { hid: 'og:type', 
      name: 'og:type', 
      content: 'music.song'},
      { 
        hid: 'description', 
        name: 'description', 
        content: 'The PatternBased Catalog is an ever expanding collection of textural/emotive sound & music that ranges from sparse tones and drones to rhythmic works over a variety of styles and moods.' 
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'The PatternBased Catalog is an ever expanding collection of textural/emotive sound & music that ranges from sparse tones and drones to rhythmic works over a variety of styles and moods.'
    },
      { name: 'format-detection', 
      content: 'telephone=no' },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'PatternBased Catalog'
    },
    {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://catalog.patternbased.com/'
    },
    {
        hid: 'og:image',
        name: 'og:image',
        content: storageURL + 'global/patternbased-catalog.jpg'
    }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/touch.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // axios: {
  //   baseURL: development ? 'http://localhost:9000/api' : '/api'
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
  // server: {
  //   port: process.env.PORT || 3000,
  //   host: '0.0.0.0'
  // } /// Prod
}
