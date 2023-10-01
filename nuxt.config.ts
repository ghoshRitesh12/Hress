// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "nuxt-icon",
    "@nuxt/content",
    "@nuxt/image-edge",
    "@vee-validate/nuxt",
    "nuxt-simple-robots",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "nuxt-simple-sitemap",
  ],
  runtimeConfig: {
    DATABASE_URI_DEV: process.env.DATABASE_URI_DEV,
    DATABASE_URI_PROD: process.env.DATABASE_URI_PROD,
    REFERRAL_ID_BYTES: process.env.REFERRAL_ID_BYTES,
    PWD_SALT: process.env.PWD_SALT,

    SENDER_EMAIL_ID: process.env.SENDER_EMAIL_ID,
    SENDER_EMAIL_PWD: process.env.SENDER_EMAIL_PWD,

    AUTH_SECRET: process.env.NEXTAUTH_SECRET,
    STATE_SECRET: process.env.STATE_SECRET,
    DB_STATE_SECRET: process.env.DB_STATE_SECRET,

    HRESS_SERVICE_SECRET: process.env.HRESS_SERVICE_SECRET,
    HRESS_SERVICE_DOMAIN: process.env.HRESS_SERVICE_DOMAIN,

    indexable: true,
    public: {
      siteUrl: process.env.HRESS_BASE_URL,
    },
  },
  nitro: {
    plugins: ["./db/index.js"],
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VForm",
      Field: "VField",
      ErrorMessage: "VErrorMessage",
    },
  },
  auth: {
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.AUTH_ORIGIN_DEV
        : process.env.AUTH_ORIGIN_PROD,
    isEnabled: true,
    defaultProvider: "credentials",
    enableGlobalAppMiddleware: false,
  },
  app: {
    head: {
      title: "Hress",
      htmlAttrs: { lang: "en", dir: "ltr" },
      meta: [
        {
          name: "content-language",
          content: "en",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=no",
        },
      ],
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/plan": { prerender: true },
    "/terms": { prerender: true },
    "/privacy": { prerender: true },
    "/cookie-policy": { prerender: true },
    // "/account/**": { ssr: true },
    // "/admin/**": { ssr: true },
  },
  robots: {
    disallow: ["/api", "/account", "/admin"],
  },
});
