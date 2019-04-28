import pkg from './package'

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/components.js'],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/apollo', '@nuxtjs/auth', '@nuxtjs/axios'],

  /*
   ** Build configuration
   */
  build: {
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
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js'
    }
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/callback',
      home: '/'
    },
    strategies: {
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['read:user']
      }
    }
  },

  router: {
    middleware: ['auth']
  }
}
