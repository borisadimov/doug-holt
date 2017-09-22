var getPortfolioRoutes = require('./db.js').getPortfolioRoutes;

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Doug Holt Photography',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: "author", content: "Doug Holt" },
      { hid: 'description', name: "description", content: "Doug Holt is a commercial product photographer specializing in product photography, still life, lookbook and ecommerce photography in New York City." },
      { name: "Copyright", content: "Doug Holt" },
      { name: "robots", content: "index, follow" },

      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Doug Holt Photography" },
      { property: "og:description", content: "Doug Holt is a commercial product photographer specializing in product photography, still life, lookbook and ecommerce photography in New York City." },
      { property: "og:url", content: "http://dougholtphotography.com" },
      { property: "og:image", content: "http://dougholtphotography.com/doug-holt_photography.jpg" },

      { name: "twitter:card", content: "summary"},
      { name: "twitter:site", content: "@DougHolt"},
      { name: "twitter:title", content: "Doug Holt Studios"},
      { name: "twitter:description", content: "Doug Holt is a commercial product photographer specializing in product photography, still life, lookbook and ecommerce photography in New York City."},
      { name: "twitter:image", content: "http://dougholtphotography.com/doug-holt_photography.jpg" },

      { name: "google-site-verification", content:"XH8A9vU487otKoEhGGovB0Vf79BkXsq1eix9QnGWj0I" }
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
