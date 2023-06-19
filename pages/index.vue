<template>

  <div 
    class="
    flex flex-col
    "
  >

    <nuxt-img
      src="/images/planting_tree"
      format="jpg"
      alt="planting a tree"
      decoding="async"
      
    />

    <div class="mt-8 text-2xl font-semibold">
      NOTE:
    </div>

    <div class="mt-4">
      The home page & many other pages are still under development.
      No approx time limit is provided as of now.
      <p class="text-lg mt-2">
        <strong>
          Please have patience for Hress's production build, coming soon.
        </strong> 
      </p>
    </div>

    <div class="mt-6">
      Currently available pages:

      <div 
        class="my-2 text-green-300"
        v-for="link in tempLinks"
        :key="link.href"
      >

        <NuxtLink :to="link.href">
          {{ link.name }}
        </NuxtLink>

      </div>

    </div>
    
  </div>

</template>


<script setup>

const tempLinks = ref([
  {
    href: '/plan',
    name: 'Educational Plan'
  },
  {
    href: '/terms',
    name: 'Terms & Conditions'
  },
  {
    href: '/privacy',
    name: 'Privacy Policy'
  },
  {
    href: '/cookie-policy',
    name: 'Cookie Policy'
  },
  {
    href: '/login',
    name: 'Login (not functional)'
  },
  {
    href: '/signup',
    name: 'Signup (not functional)'
  },
])


definePageMeta({
  layout: 'info'
})


</script>


<style>

</style>
