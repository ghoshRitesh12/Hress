// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss", "@nuxt/image-edge", 
    "nuxt-icon", "@nuxt/content"
  ],
  runtimeConfig: {
    DATABASE_URI: process.env.DATABASE_CONNECTION_URI,
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
      }
    },
  }
})
