<template>

  <div 
    class="
    flex flex-col w-full mx-auto
    md:max-w-[98%] xl:max-w-[80%] 
    relative
    "
  >

    <div
      class="
      flex justify-between items-center gap-y-10
      flex-col md:flex-row mb-[7rem] hero
      "
    >

      <div 
        class="
        md:max-w-[32ch] lg:max-w-[40ch] 
        xl:max-w-[50ch] 2xl:max-w-[68ch]
        "
      >

        <div 
          class="leading-[1.4] font-semibold hero-heading"
          style="font-size: clamp(1.35rem, var(--f-vmin, 3.5vmin), 3rem);"
        >
          Driving change through blockchain and
          community for a sustainable future
        </div>

        <div
          class="mt-5 sm:mt-6 text-[.95rem] sm:text-base"
        >
          At Hress, we aim to make a positive impact on society 
          and the environment through social and environmental activities
          by creating a sustainable ecosystem that benefits the local economy 
          and social fabric.
        </div>

        <NuxtLink 
          to="/contact"
          class="
          block mt-6 sm:mt-8 bg-accent-200 text-primary-900
          px-6 py-[.6rem] w-fit rounded-xl font-semibold
          hover:scale-95 select-none
          transition ease-in duration-100
          "
          aria-label="contact us"
        >
          Contact Us
        </NuxtLink>
        
      </div>

      <div class="
        overflow-hidden 
        md:ml-8 xl:ml-16 w-full
        "
      >
        <nuxt-img
          src="/images/planting_tree.png"
          format="png"
          alt="planting a tree"
          width="1200"
          height="780"
          decoding="async"
          fetchpriority="high"
        />
      </div>

    </div>

    <div
      class="
      flex justify-between items-start gap-y-10 isolate
      flex-col md:flex-row mb-10 mission relative
      after:content-[' '] after:bg-green-500/30 after:absolute
      after:h-full after:w-full after:top-[50%]
      after:translate-y-[-50%] after:blur-[20rem]
      after:isolate after:z-[-1] hidden
      "
    >

      <div class="
        md:mr-8 xl:mr-16 max-w-[35rem] w-full
        overflow-hidden rounded-3xl 
        "
      >
        <nuxt-img
          src="/images/mission.jpg"
          format="jpg"
          alt="mission"
          decoding="async"
          width="1200"
          height="780"
        />
      </div>

      <div 
        class="2xl:max-w-[85ch]"
      >

        <div 
          class="leading-[1.4] font-semibold hero-heading"
          style="font-size: clamp(1.35rem, var(--f-vmin, 3.5vmin), 3rem);"
        >
          Our mission
        </div>

        <div
          class="mt-5 sm:mt-6 text-base sm:text-[1.25rem] leading-9"
        >
          To leverage blockchain technology and foster a strong community base to drive 
          positive social and environmental change through NGO activities. We are committed
          to promoting sustainable development, empowering local communities, and ensuring
          the preservation and development of Sundarban tourism while prioritizing economic 
          and social well-being.
        </div>
        
      </div>

    </div>


    <section class="hidden">
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
    </section>


    
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


<style scoped>

  .hero-heading {
    --f-vmin: 3.5vmin
  }

  @media (min-width: 1024px) {
    .hero-heading {
      --f-vmin: 4vmin
    }
  }

</style>
