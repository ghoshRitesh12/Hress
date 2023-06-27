// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss", "@nuxt/image-edge", 
    "nuxt-icon", "@nuxt/content", "nuxt-simple-sitemap",
    "nuxt-simple-robots", "@vee-validate/nuxt",
    "@sidebase/nuxt-auth",
  ],
  runtimeConfig: {
    DATABASE_URI: process.env.DATABASE_CONNECTION_URI,
    STATE_SECRET: process.env.STATE_SECRET,
    REFERRAL_ID_BYTES: process.env.REFERRAL_ID_BYTES,
    SENDER_EMAIL_ID: process.env.SENDER_EMAIL_ID,
    SENDER_EMAIL_PWD: process.env.SENDER_EMAIL_PWD,
    authSecret: process.env.NEXTAUTH_SECRET,
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
  auth: {
    isEnabled: true,
    defaultProvider: 'credentials',
    origin: process.env.HRESS_BASE_URL
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
    "/": { static: true },
    "/plan": { static: true },
    "/terms": { static: true },
    "/privacy": { static: true },
    "/cookie-policy": { static: true },
    "/account/**": { ssr: false }
  },
  robots: {
    disallow: ['/api', '/account'],
  },

})
