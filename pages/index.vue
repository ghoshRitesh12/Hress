<template>

  <div 
    class="
    flex flex-col
    max-w-[80%] w-full mx-auto
    "
  >

    <div
      class="
      flex justify-between items-center gap-8
      mb-10 hero
      "
    >

      <div 
        class="
        text-2xl max-w-[45ch] leading-8
        "
        style="font-size: clamp(1.1rem, 4vmin, 1.5rem);"
      >
        At Hress, we are passionate about making a positive impact on society 
        and the environment through our NGO's social and environmental activities. 
        We strongly believe in the power of collaboration and community building 
        to drive meaningful change. With a focus on Sundarban tourism development, 
        we aim to create a sustainable ecosystem that benefits the local economy 
        and social fabric
      </div>

      <div class="max-w-[35rem] overflow-hidden rounded-3xl">
        <nuxt-img
          src="/images/planting_tree.jpg"
          format="jpg"
          alt="planting a tree"
          decoding="async"
          width="1200"
          height="780"
        />
      </div>

    </div>


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


useHead({
  link: [{
    rel: 'canonical',
    href: 'https://hress.in'
  }]
})

const pageDecsription = `${"At Hress, we are passionate about making a positive " +
  "impact on society and the environment through social and environmental activities. " +
  "We strongly believe in the power of collaboration and community building to " +
  "drive meaningful change. We aim to create a sustainable ecosystem that " +
  "benefits the local economy and social fabric"
}`;

useServerSeoMeta({
  robots: {
    index: true, follow: true,
    maxImagePreview: 'large',
    maxSnippet: -1, maxVideoPreview: -1
  },
  description: pageDecsription,
  ogTitle: 'Hress',
  ogDescription: pageDecsription,
  ogImage: 'https://hress.in/images/hress.png',
  ogUrl: 'https://hress.in',
  ogImageWidth: '192',
  ogImageHeight: '192',
  ogSiteName: 'Hress',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@hress',
  twitterTitle: 'Hress',
  twitterDescription: pageDecsription,
  twitterImageSrc: 'https://hress.in/images/hress.png',
  keywords: 'Hress, NGO, environment, social, community, sustainable development, blockchain, change'
})



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
