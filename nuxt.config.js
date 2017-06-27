var getPortfolioRoutes = require('./db.js').getPortfolioRoutes;

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Doug Holt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading:'~components/Loader.vue',
  /*
  ** Build configuration
  */
  css: ['assets/main.css'],

  build: {
    /*
    ** Run ESLINT on save
    */

    babel: {
      presets: ['es2015', 'vue-app'],
      plugins: ['transform-class-properties']
    },

    router: {
      middleware: 'switchPortfolioItems'
    },

    extend (config, ctx) {
      if (ctx.isClient) {

      }
    }
  },
  generate: {
    routes: getPortfolioRoutes
  }
}
