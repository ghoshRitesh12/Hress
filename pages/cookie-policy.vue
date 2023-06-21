<template>

  <div data-cookie-policy
    class="
    max-w-full w-full mt-2 mx-auto
    md:max-w-[70%] xl:max-w-[50%]
    "
  >

    <div 
      class="
      rounded-2xl w-full
      "
    >
      <nuxt-img 
        src="/images/cookies.webp" 
        alt="cookie policy illustration image"
        format="webp"
        width="1000"
        height="700"
        decoding="async"
        fetchpriority="high"
        class="
        rounded-2xl w-full sm:h-[22rem]
        object-center mx-auto
        "
      />
    </div>

    <div 
      class="cookie-policy-wrap mt-6"
    >
      <ContentDoc />
    </div>

  </div>

</template>


<script setup>

useHead({
  meta: [
    {
      name: 'title',
      content: 'Hress Cookie Policy'
    }
  ],
  link: [{
    rel: 'canonical',
    href: 'https://hress.in/cookie-policy'
  }]
})

useServerSeoMeta({
  title: 'Hress Cookie Policy',
  robots: {
    index: true, follow: true,
    maxImagePreview: 'large',
    maxSnippet: -1, maxVideoPreview: -1
  },
  ogImage: 'https://hress.in/images/cookies.webp',
  ogUrl: 'https://hress.in/cookie-policy',
  ogImageWidth: '650',
  ogImageHeight: '350',
  ogSiteName: 'Hress',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@hress',
  twitterTitle: 'Hress Cookie Policy',
  twitterDescription: `Hress uses cookies and similar technologies to recognize you when you visit our website at hress.in. This policy explains why we use them, as well as your rights to control our use of them`,
  twitterImageSrc: 'https://hress.in/images/cookies.webp',
  keywords: 'Hress, Hress Cookie Policy, Cookie, Cookies, cookie policy'
})

definePageMeta({
  layout: 'policy'
})



</script>


<style scoped>

  .cookie-policy-wrap {
    scroll-padding-top: 6rem;
  }
  .cookie-policy-wrap :deep(p) {
    @apply mb-4 text-[.95rem] text-zinc-300;
  }
  .cookie-policy-wrap :deep(p a) {
    @apply text-accent-100;
  }

  .cookie-policy-wrap :deep(h2) {
    @apply mt-10 pb-4 text-xl font-semibold;
    word-spacing: .2rem
  }
  .cookie-policy-wrap :deep(h3) {
    @apply mt-7 mb-2 text-[1.1rem] font-semibold;
    word-spacing: .2rem
  }

  .cookie-policy-wrap :deep(ul) {
    @apply py-3 pl-10; 
  }
  .cookie-policy-wrap :deep(ul li) {
    @apply pb-2 text-[.95rem] text-zinc-300;
    list-style-type: disc; 
  }

  .cookie-policy-wrap :deep(ol) {
    @apply py-2 pl-12
  }
  .cookie-policy-wrap :deep(ol li) {
    @apply pl-2 pb-2 text-zinc-200; 
    list-style-type: decimal;
  }
  .cookie-policy-wrap :deep(ol li a) {
    @apply underline underline-offset-4;
    word-spacing: .2rem;
  }

</style>
