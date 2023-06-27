import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',

      async authorize(credentials) {

        const res = await fetch("api/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ]
})
