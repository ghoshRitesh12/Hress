<template>

  <div 
    class="
    flex items-center justify-center
    px-4 py-6 min-h-full mt-auto text-base
    "
    >

    <div class="border-2 px-5 sm:px-6 py-12 md:px-8 rounded-2xl border-zinc-800">

      <div class="text-center mb-10">
        <div class="mb-8 text-2xl font-semibold">
          Welcome back
        </div>

        <p class="max-w-[40ch] leading-[1.4]">
          Enter your credentials to access your account.
        </p>
      </div>

      <form 
        @submit.prevent="submitLoginForm"
        class="" 
      >
        <div class="relative">

          <label for="email" class="block">
            Email address
          </label>

          <input 
            type="email"
            placeholder="name@email.com"
            v-model.lazy.trim="formData.email"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full mt-3
            "
            autocapitalize="false" autocomplete="false"
          />

        </div>


        <div class="relative mt-4">

          <label for="password" class="block">
            Password
          </label>

          <div class="relative w-full">
            <input 
              :type="`${pwdVisible ? 'text': 'password'}`"
              placeholder="secret password"
              v-model.lazy.trim="formData.password"
              required autocorrect="false"
              class="
              pl-4 pr-14 py-3 rounded-xl bg-zinc-800 mt-3
              focus:outline-none focus:outline-green-300
              focus:outline-1 focus:outline-offset-0 w-full
              "
              autocapitalize="false" autocomplete="false"
            />
  
            <button
              @click="togglePwdField"
              type="button"
              class="
              absolute top-[50%] translate-y-[-36%] right-1
              border-[0px] py-2 px-3
              "
              aria-label="password visibility toggler"
            >
              <Icon :name="pwdIcon" class="text-2xl text-zinc-300"/>
            </button>
          </div>


          <div class="ml-auto w-fit">
            <button 
              class="
              text-[.9rem] pl-4 pr-1 mt-4 cursor-pointer
              text-green-200
              "
              type="button"
            >
              Forgot password?
            </button>
          </div>

        </div>


        <div class="mt-10">

          <button
            type="submit"
            class="
            w-full bg-accent-200 hover:bg-green-400
            px-4 py-3 rounded-2xl text-primary-900
            font-semibold transition ease-in duration-100
            "
          >
            Login
          </button>

        </div>
      </form>

      <div class="mt-6 text-center">
        Don't have an account yet? 
        
        <NuxtLink to="/signup" class="text-accent-100">
          Create one
        </NuxtLink>

      </div>

    </div>

  </div>

</template>


<script setup>

definePageMeta({
  layout: 'auth'
})
useHead({
  title: 'Login | Hress'
})


const pwdVisible = ref(false);
const pwdIcon = ref('mdi:eye-off-outline');

const togglePwdField = () => {
  pwdVisible.value = !pwdVisible.value;
  if(pwdVisible.value) {
    pwdIcon.value = 'mdi:eye-outline';
    return;
  }
  pwdIcon.value = 'mdi:eye-off-outline';
  // pwdVisible.value = !pwdVisible.value;

}


const formData = ref({
  email: '',
  password: ''
})
const submitLoginForm = async () => {
  try {
    if(!formData.value.email || !formData.value.password) return;
    console.log(formData.value);


  } catch (err) {
    console.log(err);
    throw createError({
      message: err.message
    })
  }
}




</script>


<style>

</style>
