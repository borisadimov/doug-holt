module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
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
  loading: { color: '#3B8070' },
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
      middleware: ['toggleMenu']
    },

    extend (config, ctx) {
      if (ctx.isClient) {

      }
    }
  }
}
