<template>
  
  <div data-account-to-profile>

    <div 
      class="
      text-2xl border-b-[1px] border-zinc-700/80
      pb-3 mt-0
      "
    >
      Search Profile
    </div>
    
    <div
      class="
      my-8 sm:max-w-[90%]  md:max-w-[80%] 
      lg:max-w-[60%] mx-auto
      "
    >
      <div
        class="text-[.95rem] text-zinc-400"
      >
        To search any profile, you need to enter their 
        <strong>Referral Id</strong>.
      </div>

      <VForm
        @submit="submitSearchQuery"
        :validation-schema="clientSearchProfileSchema"
        class="flex items-start gap-6 my-4 flex-col"
      >

        <div 
          class="
          sm:flex-[10%] w-full
          "
        >
          <VField
            type="text" 
            placeholder="Referral id goes here"
            name="referralId" maxlength="10"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 placeholder:text-[.95rem]
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full
            "
            autocapitalize="false" autocomplete="false"
          />
  
          <VErrorMessage name="referralId" class="errMsg"/>
        </div>

        <div 
          class="
          flex-[5%] flex-grow-0
          ml-auto whitespace-nowrap
          "
        >
          <button
            type="submit"
            class="
            w-full bg-accent-200 hover:bg-green-400
            px-5 py-2 sm:py-[.6rem] rounded-xl
            text-[.95rem] font-semibold text-primary-900
            transition ease-in duration-100 active:scale-95
            "
          >
            Go to profile
          </button>
        </div>

      </VForm>
    </div>

    <Popup/>

  </div>
  
</template>


<script setup>
import { clientSearchProfileSchema } from '~/utils/searchProfileSchema';

useHead({
  title: 'Account - Search Profile'
})
definePageMeta({
  layout: 'account',
  middleware: ['native', 'admin']
})


const submitSearchQuery = async (value) => {
  const { setPopupMessage } = usePopup();
  
  try {
    const headers = useRequestHeaders(['cookie'])
    const { data, error } = await useFetch('/api/account/search', {
      method: 'POST', headers, 
      body: markRaw(value)
    });
    
    setPopupMessage(error.value?.statusMessage);
    if(data.value) {
      return useRouter().push(data.value.redirectTo)
    }

  } catch (err) {
    console.log(err);
  }
}

</script>


<style scoped>
  .errMsg{
    @apply block text-red-300 text-[.8rem] 
    mt-2 max-w-[40ch] w-full mx-auto 
    text-center leading-[1.2];
  }
</style>
