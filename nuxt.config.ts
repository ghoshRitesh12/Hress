// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss", "@nuxt/image-edge", 
    "nuxt-icon", "@nuxt/content"
  ],
  runtimeConfig: {
    DATABASE_URI: process.env.DATABASE_CONNECTION_URI,
    REFERRAL_ID_BYTES: process.env.REFERRAL_ID_BYTES,
    public: {
      
    }
  },
  nitro: {
    plugins: ["./db/index.js"]
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
        }
      ]
    },
  },
  routeRules: {
    "/plan": { static: true },
    "/terms": { static: true },
    "/privacy": { static: true },
    "/cookie-policy": { static: true },
  }
  // ssr: false,

})
