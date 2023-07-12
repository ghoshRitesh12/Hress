<template>

  <div data-account-security class="mt-0">
    
    <div 
      class="
      text-2xl border-b-[1px] border-zinc-700/80
      pb-3 mt-0
      "
    >
      Modify passsword
    </div>

    <div 
      class="
      flex gap-x-10 flex-wrap-reverse
      gap-y-6 md:flex-nowrap mt-8
      "
    >
    
      <div class="flex-[60%]">

        <form
          @submit.prevent=""
        >
  
          <div class="relative">
            <label for="email" class="block">
              Old Password
            </label>
  
            <input 
              type="password"
              placeholder="old password here"
              required autocorrect="false"
              class="
              px-4 py-3 rounded-xl bg-zinc-800
              focus:outline-none focus:outline-green-300
              focus:outline-1 focus:outline-offset-0 w-full mt-3
              "
              autocapitalize="false" autocomplete="false"
            />
          </div>
  
          <div class="relative mt-6">
            <label for="email" class="block">
              New Password
            </label>
  
            <input 
              type="password"
              placeholder="new password here"
              required autocorrect="false"
              class="
              px-4 py-3 rounded-xl bg-zinc-800
              focus:outline-none focus:outline-green-300
              focus:outline-1 focus:outline-offset-0 w-full mt-3
              "
              autocapitalize="false" autocomplete="false"
            />
          </div>
          
          <div class="relative mt-6">
            <label for="email" class="block">
              Confirm New Password
            </label>
  
            <input 
              type="password"
              placeholder="confirm new password"
              required autocorrect="false"
              class="
              px-4 py-3 rounded-xl bg-zinc-800
              focus:outline-none focus:outline-green-300
              focus:outline-1 focus:outline-offset-0 w-full mt-3
              "
              autocapitalize="false" autocomplete="false"
            />
          </div>

          <div class="mt-8 max-w-fit">
            <button
              type="submit"
              class="
              w-full bg-accent-200 hover:bg-green-400 text-[.95rem]
              px-6 py-[.65rem] rounded-2xl text-primary-900
              font-semibold transition ease-in duration-100
              "
            >
              Update password
            </button>
          </div>
  
        </form>

      </div>


      <div data-security-note
        class="
        flex-[40%] text-[.92rem] text-zinc-400
        md:pt-6 leading-[1.6]
        "
      >

        <div class="px-2">
          Make sure the new password is at least 
          20 characters OR at least 8 characters 
          including a number, a lowercase & uppercase letter,
          and any character among !@#$%^&*().
        </div>

      </div>

    </div>


  </div>

</template>


<script setup>
  

useHead({
  title: 'Account - Security'
})


definePageMeta({
  layout: 'account',
  middleware: 'native'
})

</script>


<style>

</style>
