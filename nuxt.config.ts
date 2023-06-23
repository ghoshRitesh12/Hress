// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss", "@nuxt/image-edge", 
    "nuxt-icon", "@nuxt/content", "nuxt-simple-sitemap",
    "nuxt-simple-robots", "@vee-validate/nuxt"
  ],
  runtimeConfig: {
    DATABASE_URI: process.env.DATABASE_CONNECTION_URI,
    STATE_SECRET: process.env.STATE_SECRET,
    REFERRAL_ID_BYTES: process.env.REFERRAL_ID_BYTES,
    indexable: true,
    public: {
      siteUrl: 'https://hress.in',
      STATE_SECRET: process.env.STATE_SECRET,
    }
  },
  nitro: {
    plugins: ["./db/index.js"]
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VForm',
      Field: 'VField',
      ErrorMessage: 'VErrorMessage'
    }
  },
  app: {
    head: {
      title: 'Hress',
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr',
      },
      meta: [
        {
          name: 'content-language',
          content: 'en'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no'
        }
       
      ]
    },
  },
  routeRules: {
    "/plan": { static: true },
    "/terms": { static: true },
    "/privacy": { static: true },
    "/cookie-policy": { static: true },
    "/profile/**": { ssr: false }
  },
  robots: {
    disallow: ['/api'],
  },

})
