<template>

  <div 
    class="
    flex items-center justify-center
    px-4 py-6 min-h-full mt-auto text-base
    "
  >

    <div 
      class="
      border-2 px-5 sm:px-6 py-12 md:px-8 
      rounded-2xl border-zinc-800 relative
      overflow-hidden
      "
    >

      <div data-form-progress
        class="
        absolute top-0 left-0 w-full
        flex items-center
        "
      >
        <div 
          class="
          min-h-[.25rem] flex-grow
          "
          :class="`${formStep >= 1 ? 'bg-accent-200': ''}`"
          style="transition: .1s ease-in"
        ></div>
        <div 
          class="
          min-h-[.25rem] flex-grow
          "
          :class="`${formStep >= 2 && formStep <= 3 ? 'bg-accent-200': ''}`"
          style="transition: .1s ease-in"
        ></div>
        <div 
          class="
          min-h-[.25rem] flex-grow
          "
          :class="`${formStep >= 3 ? 'bg-accent-200': ''}`"
          style="transition: .1s ease-in"
        ></div>
      </div>

      <div class="text-center mb-10">
        <div class="mb-8 text-2xl font-semibold">
          Create an account
        </div>

        <p class="max-w-[35ch] leading-[1.4]">
          Register to create your first account and get started.
        </p>
      </div>

      <form 
        @submit.prevent="submitSignupForm"
      >

        <div data-signup-step1 v-if="formStep === 1">

          <div>
            <label class="block">Full name</label>

            <input 
              type="text"
              placeholder="John Doe"
              v-model.lazy.trim="formData.name"
              required autocorrect="false"
              class="
              px-4 py-3 rounded-xl bg-zinc-800 
              focus:outline-none focus:outline-green-300
              focus:outline-1 focus:outline-offset-0 w-full mt-3
              "
              autocapitalize="false" autocomplete="false"
            />
          </div>

          <div class="mt-4">
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


          <div class="mt-10">
            <button
              type="button"
              @click="changeFormStep('+')"
              class="
              w-full bg-accent-200 hover:bg-green-400
              px-4 py-3 rounded-2xl text-primary-900
              font-semibold transition ease-in duration-100
              "
            >
              Continue
            </button>
          </div>

        </div>

        <div data-signup-step2 v-else-if="formStep === 2">
        
          <div>
            <label class="block">Referer ID</label>

            <input 
              type="text"
              placeholder="referer's id"
              v-model.lazy.trim="formData.refererId"
              :required="formData.spillOver"
              autocorrect="false"
              class="
              px-4 py-3 rounded-xl bg-zinc-800 
              focus:outline-none focus:outline-green-300
              focus:outline-1 focus:outline-offset-0 w-full mt-3
              "
              autocapitalize="false" autocomplete="false"
            />
          </div>

          <div class="mt-4">
            <label class="block">Sponsorer ID</label>

            <input 
              type="text"
              placeholder="sponsorer's id"
              v-model.lazy.trim="formData.sponsorerId"
              required autocorrect="false"
              class="
              px-4 py-3 rounded-xl bg-zinc-800 
              focus:outline-none focus:outline-green-300
              focus:outline-1 focus:outline-offset-0 w-full mt-3
              "
              autocapitalize="false" autocomplete="false"
            />
          </div>

          <div class="mt-4">
            <label aria-label="spill over" 
              class="block mt-4"
            >

              <input 
                type="checkbox" 
                class="
                mr-3 h-[.95rem] w-[.95rem] 
                aspect-square accent-accent-200 align-middle
                "
                v-model="formData.spillOver"
              />
              
              <div class="inline-block select-none">
                Is this joining a spill over?
              </div>

            </label>
          </div>


          <div class="flex items-center gap-4 mt-10">
            <button
              type="button"
              @click="changeFormStep('-')"
              class="
              bg-zinc-600 hover:bg-zinc-700 px-3 pl-[1.1rem]
              py-3 rounded-2xl text-white flex-shrink-0
              font-semibold transition ease-in duration-100
              "
            >
              <Icon 
                name="material-symbols:arrow-back-ios-rounded"
                class="text-xl"
              />
            </button>

            <button
              type="button"
              @click="changeFormStep('+')"
              class="
              w-full bg-accent-200 hover:bg-green-400
              px-4 py-3 rounded-2xl text-primary-900
              font-semibold transition ease-in duration-100
              "
            >
              Continue
            </button>
          </div>
        
        </div>


        <div data-signup-step3 v-else>

          <div class="mt-4">

            <div>
              <label class="block">Password</label>
  
              <input 
                :type="`${pwdVisible ? 'text' : 'password'}`"
                placeholder="secret password"
                v-model.lazy.trim="formData.password"
                required autocorrect="false"
                class="
                px-4 py-3 rounded-xl bg-zinc-800 
                focus:outline-none focus:outline-green-300
                focus:outline-1 focus:outline-offset-0 w-full mt-3
                "
                autocapitalize="false" autocomplete="false"
              />
            </div>

            <div class="mt-4">
              <label class="block">Confirm password</label>
  
              <input 
                :type="`${pwdVisible ? 'text' : 'password'}`"
                placeholder="confirm secret"
                v-model.lazy.trim="formData.confirmPassword"
                required autocorrect="false"
                class="
                px-4 py-3 rounded-xl bg-zinc-800 
                focus:outline-none focus:outline-green-300
                focus:outline-1 focus:outline-offset-0 w-full mt-3
                "
                autocapitalize="false" autocomplete="false"
              />
            </div>

            <label aria-label="password visibility toggler" 
              class="block mt-4 ml-auto w-fit text-zinc-400"
            >

              <input 
                type="checkbox" 
                class="
                mr-2 h-[.85rem] w-[.85rem] 
                aspect-square accent-accent-200 align-middle
                "
                v-model="pwdVisible"
              />
              
              <div class="inline-block select-none text-[.92rem]">
                Show password
              </div>

            </label>

          </div>

          <label class="flex items-center gap-3 mt-2">
            <input 
              type="checkbox" 
              class="
              h-[.9rem] w-[.9rem] 
              aspect-square accent-accent-200 align-middle
              "
              v-model="agreeTerms"
            />
            
            <div 
              class="
              max-w-[37ch] text-[.8rem] mt-4 text-zinc-400 
              inline-block leading-[1.4]
              "
            >
              By signin up, you agree to our
              <NuxtLink to="/terms" 
                class="
                text-zinc-200
                "
              >
                Terms
              </NuxtLink>
              and have read and acknowledged our
              <NuxtLink to="/privacy" 
                class="
                text-zinc-200
                "
              >
                Privacy policy
              </NuxtLink>
            </div>

          </label>

          <div class="flex items-center gap-4 mt-8">
            <button
              type="button"
              @click="changeFormStep('-')"
              class="
              bg-zinc-600 hover:bg-zinc-700 px-3 pl-[1.1rem]
              py-3 rounded-2xl text-white flex-shrink-0
              font-semibold transition ease-in duration-100
              "
            >
              <Icon 
                name="material-symbols:arrow-back-ios-rounded"
                class="text-xl"
              />
            </button>

            <button
              type="submit"
              class="
              w-full bg-accent-200 hover:bg-green-400
              px-4 py-3 rounded-2xl text-primary-900
              disabled:bg-accent-200/60
              font-semibold transition ease-in duration-100
              "
              :disabled="!agreeTerms"
            >
              Sign up
            </button>
          </div>

        </div>
        
      </form>

      <div class="mt-6 text-center">
        Already have an account? 
        
        <NuxtLink to="/login" class="text-accent-100">
          Login
        </NuxtLink>

      </div>

    </div>

  </div>

</template>


<script setup>

useHead({
  meta: [
    {
      name: 'title',
      content: 'Hress - Signup'
    }
  ],
  link: [{
    rel: 'canonical',
    href: 'https://hress.in/signup'
  }]
})

useSeoMeta({
  title: 'Hress - Signup',
  robots: {
    index: true, follow: true,
  },
  description: `Create account at Hress to learn about blockchain and cryptocurrency, while also earning with us`,
  ogTitle: 'Hress - Signup',
  ogDescription: `Create account at Hress to learn about blockchain and cryptocurrency, while also earning with us`,
  ogImage: 'https://hress.in/images/hress.png',
  ogUrl: 'https://hress.in/signup',
  ogImageWidth: '192',
  ogImageHeight: '192',
  ogSiteName: 'Hress',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@hress',
  twitterTitle: 'Hress - Signup',
  twitterDescription: `Create account at Hress to learn about blockchain and cryptocurrency, while also earning with us`,
  twitterImageSrc: 'https://hress.in/images/hress.png',
  keywords: 'Hress, Hress Signup, Credentials, Create account, new account, account'
})

definePageMeta({
  layout: 'auth'
})

  

const agreeTerms = ref(false)

const pwdVisible = ref(false);

const formStep = ref(1);
const changeFormStep = (step) => {
  if(step === "-") {
    formStep.value--;
    return;
  }

  formStep.value++;
}


const formData = ref({
  name: '',
  email: '',
  refererId: '',
  sponsorerId: '',
  spillOver: false,
  password: '',
  confirmPassword: '',
})  


const submitSignupForm = async () => {
  try {
    if(formData.value.spillOver && formData.value.refererId === '') return;
    console.log(formData.value);

    await useFetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(formData.value)
    })
    
    
  } catch (err) {
    console.log(err);
    // createError({
    //   message: err.message 
    // })
  }
}


</script>
