import pkg from './package'
require('dotenv').config()

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Huck Otranto Camargo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700,700i'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'transparent',
    continuous: true
  },

  /*
   ** Global CSS
   */
  css: ['~assets/styles/style.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/veevalidate.js' },
    { src: '@/plugins/vue-affix.js', ssr: false },
    { src: '@/plugins/vue-carousel.js', ssr: false },
    { src: '@/plugins/vue-moment.js' },
    { src: '@/plugins/vue-textarea-autosize.js' },
    { src: '@/plugins/vue-the-mask.js' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/dotenv',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome',
    'nuxt-svg-loader',
    'vue-scrollto/nuxt'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.BaseUrl
  },
  /*
   ** bootstrapVue module configuration
   */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: ['Layout', 'Tabs', 'Collapse', 'Spinner'],
    directivePlugins: []
  },
  /*
   ** fontawesome module configuration
   */
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },
  /*
   ** svgLoader module configuration
   */
  svgLoader: {
    svgoConfig: {
      plugins: [
        { prefixIds: false } // Disables prefixing for SVG IDs
      ]
    }
  },
  /*
   ** styleResources module configuration
   */
  styleResources: {
    scss: [
      '~assets/styles/_variables.scss' // use underscore "_" & also file extension ".scss"
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** Extract CSS
     */
    extractCSS: true,
    /*
     ** Transpile modules
     */
    transpile: ['lodash-es'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
