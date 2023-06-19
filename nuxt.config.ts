// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss", "@nuxt/image-edge", 
    "nuxt-icon", "@nuxt/content", "nuxt-simple-sitemap",
    "nuxt-simple-robots"
  ],
  runtimeConfig: {
    DATABASE_URI: process.env.DATABASE_CONNECTION_URI,
    REFERRAL_ID_BYTES: process.env.REFERRAL_ID_BYTES,
    indexable: true,
    public: {
      siteUrl: process.env.HRESS_BASE_URL,
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
  robots: {
    // sitemap: "/sitemap.xml",
    disallow: ['/api'],
  }
})
