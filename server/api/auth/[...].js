import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',

      async authorize(credentials) {
        try {
          const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
          })

          if (data.user) {
            const userData = {
              name: data.user.name,
              email: data.user.email,
              image: data.user.image,
              role: data.user.role
            }

            return userData;
          }

        } catch ({ message }) {
          console.log(message);
          throw new Error(
            message?.trim()?.split(" ")?.slice(3)?.join(" ")
          );
        }
      },

    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.role = user ? user.role || '' : '';
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user.role = token.role;
      return Promise.resolve(session);
    },
  },
})
