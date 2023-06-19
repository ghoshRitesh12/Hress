<template>

  <div data-privacy
    class="
    max-w-full w-full mt-2 mx-auto
    md:max-w-[70%] xl:max-w-[50%]
    ">

    <div 
      class="
      rounded-2xl w-full
      "
    >
      <nuxt-img 
        src="/images/privacy_policy.jpg" 
        alt="privacy policy illustration image" 
        format="jpg" 
        width="1000" 
        height="700"
        class="
        rounded-2xl w-full sm:h-[22rem]
        object-center mx-auto
        " 
      />
    </div>

    <div class="privacy-wrap mt-6">
      <ContentDoc />
    </div>

  </div>

</template>


<script setup>

useHead({
  meta: [
    {
      name: 'title',
      content: 'Hress Privacy Policy'
    }
  ],
  link: [{
    rel: 'canonical',
    href: 'https://hress.in/privacy'
  }]
})

useServerSeoMeta({
  title: 'Hress Privacy Policy',
  robots: {
    index: true, follow: true,
    maxImagePreview: 'large',
    maxSnippet: -1, maxVideoPreview: -1
  },
  ogImage: 'https://hress.in/images/privacy_policy.jpg',
  ogUrl: 'https://hress.in/privacy',
  ogImageWidth: '650',
  ogImageHeight: '350',
  ogSiteName: 'Hress',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@hress',
  twitterTitle: 'Hress Privacy Policy',
  twitterDescription: `Hress's privacy notice describes how and why we might collect, store, use, and/or share "process" your information when you use our services`,
  twitterImageSrc: 'https://hress.in/images/privacy_policy.jpg',
  keywords: 'Hress, Hress Privacy Policy, Privacy, Policy, privacy policy'
})


definePageMeta({
  layout: 'policy'
})

</script>


<style scoped>

  .privacy-wrap {
    scroll-padding-top: 6rem;
  }
  .privacy-wrap :deep(p) {
    @apply mb-4 text-[.95rem] text-zinc-300;
  }
  .privacy-wrap :deep(p a) {
    @apply text-accent-100;
  }

  .privacy-wrap :deep(h2) {
    @apply mt-10 pb-4 text-xl font-semibold;
    word-spacing: .2rem
  }
  .privacy-wrap :deep(h3) {
    @apply mt-7 mb-2 text-[1.1rem] font-semibold;
    word-spacing: .2rem
  }

  .privacy-wrap :deep(ul) {
    @apply py-3 pl-10; 
  }
  .privacy-wrap :deep(ul li) {
    @apply pb-2 text-[.95rem] text-zinc-300;
    list-style-type: disc; 
  }

  .privacy-wrap :deep(ol) {
    @apply py-2 pl-12
  }
  .privacy-wrap :deep(ol li) {
    @apply pl-2 pb-2 text-zinc-200; 
    list-style-type: decimal;
  }
  .privacy-wrap :deep(ol li a) {
    @apply underline underline-offset-4;
    word-spacing: .2rem;
  }

</style>

