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
        md:max-w-[35ch] lg:max-w-[40ch] 
        xl:max-w-[50ch] 2xl:max-w-[68ch]
        "
      >

        <div 
          class="leading-[1.4] font-semibold hero-heading"
          style="font-size: clamp(1.36rem, var(--f-vmin, 3.5vmin), 3rem);"
        >
          Driving change through blockchain and
          community for a sustainable future
        </div>

        <div
          class="
          mt-5 sm:mt-6 text-[.9rem] 
          sm:text-base text-zinc-300
          "
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
          px-5 md:px-6 py-2 md:py-[.6rem] w-fit rounded-xl 
          hover:scale-95 select-none font-semibold
          transition ease-in duration-100 text-[.9rem]
          "
          aria-label="contact us"
        >
          Contact Us
        </NuxtLink>
        
      </div>

      <div class="
        relative overflow-hidden 
        md:ml-8 xl:ml-16 w-full
        "
      >
        <nuxt-img
          src="/images/planting_tree.png"
          format="png" alt=""
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
          width="1200"
          height="780"
          decoding="async"
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
  ogImage: 'https://hress.in/images/hress-og-img.png',
  ogUrl: 'https://hress.in',
  ogImageWidth: '192',
  ogImageHeight: '192',
  ogSiteName: 'Hress',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@hress',
  twitterTitle: 'Hress',
  twitterDescription: pageDecsription,
  twitterImageSrc: 'https://hress.in/images/hress-og-img.png',
  keywords: 'Hress, NGO, environment, social, community, sustainable development, blockchain, change'
})


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
