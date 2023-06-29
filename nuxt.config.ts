// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss", "@nuxt/image-edge", 
    "nuxt-icon", "@nuxt/content", "nuxt-simple-sitemap",
    "nuxt-simple-robots", "@vee-validate/nuxt",
    "@sidebase/nuxt-auth",
  ],
  runtimeConfig: {
    DATABASE_URI_DEV: process.env.DATABASE_URI_DEV,
    DATABASE_URI_PROD: process.env.DATABASE_URI_PROD,
    STATE_SECRET: process.env.STATE_SECRET,
    REFERRAL_ID_BYTES: process.env.REFERRAL_ID_BYTES,
    SENDER_EMAIL_ID: process.env.SENDER_EMAIL_ID,
    SENDER_EMAIL_PWD: process.env.SENDER_EMAIL_PWD,
    authSecret: process.env.NEXTAUTH_SECRET,
    indexable: true,
    public: {
      siteUrl: process.env.HRESS_BASE_URL,
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
    origin: process.env.NODE_ENV === 'development' ? 
      process.env.AUTH_ORIGIN_DEV : process.env.AUTH_ORIGIN_PROD,
    isEnabled: true,
    defaultProvider: 'credentials',
    enableGlobalAppMiddleware: false,
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
    "/": { prerender: true },
    "/plan": { static: true },
    "/terms": { prerender: true },
    "/privacy": { static: true },
    "/cookie-policy": { static: true },
    "/account/**": { ssr: false }
  },
  robots: {
    disallow: ['/api', '/account'],
  },

})
