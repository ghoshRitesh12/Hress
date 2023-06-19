// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss", "@nuxt/image-edge", 
    "nuxt-icon", "@nuxt/content", "nuxt-simple-sitemap"
  ],
  runtimeConfig: {
    DATABASE_URI: process.env.DATABASE_CONNECTION_URI,
    REFERRAL_ID_BYTES: process.env.REFERRAL_ID_BYTES,
    public: {
      siteUrl: process.env.APP_BASE_URL,
      siteName: "Hress",
      siteDescription: "bruh thisis good",
      language: "en"
    }
  },
  nitro: {
    plugins: ["./db/index.js"]
  },
  extends: ["nuxt-seo-kit"],
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
  },
  // ssr: false,

})
