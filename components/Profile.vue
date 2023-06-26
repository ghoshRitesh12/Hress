<template>

  <div data-profile>

    <NuxtLink v-if="isAuth"
      to="/profile"
      aria-label="profile button"
      class="
      grid place-items-center rounded-[50%] md:mx-2
      overflow-hidden outline-none max-w-[2rem] max-h-[2rem]
      hover:outline-[.12rem] hover:outline-accent-100
      "
      style="transition: .15s ease outline"
      height="32" width="32"
    >
      <nuxt-img
        :src="imgSrc"
        decoding="async"
        fetchpriority="high"
        class="pointer-events-none"
        height="32"
        width="32"
      />
    </NuxtLink>

    
    <NuxtLink v-else
      to="/login"
      class="
      px-4 py-[.55rem] text-black text-[.9rem] 
      rounded-xl bg-accent-200 select-none
      "
    >
      Login
    </NuxtLink>

  </div>


</template>


<script setup>

const imgSrc = 'https://yt3.ggpht.com/pKWFpweWfKOduyYR1zUosjzpMiudCx_rb8AKJdBLVOtYkQi4xSrtkDoQ6v7aQtkscj7mEV6S=s88-c-k-c0x00ffffff-no-rj-mo';

const isAuth = ref(false);

</script>


<style>

</style>
