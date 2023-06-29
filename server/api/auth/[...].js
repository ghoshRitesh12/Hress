import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { setPopupMessage } from "~/store/popup";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().AUTH_SECRET,
  // pages: {
  //   signIn: '/api/auth/login',
  //   error: null  
  // },

  providers: [
    CredentialsProvider.default({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      async authorize(credentials) {

        console.log('Credentials', credentials);

        const { data, error } = await $fetch('/api/auth/login', {
          method: 'POST', 
          body: JSON.stringify(credentials)
        })

        if(data?.value) {
          useRouter().push('/login');
          setPopupMessage(data?.value?.message);
          formStep.value = 0;

          return data.value.user; 

        } else {
          setPopupMessage(error?.value?.statusMessage);
          return null; 
        }

      }
    }),
  ],  
})
