<template>

  <div data-plan
    class="
    max-w-full w-full mt-2 mx-auto
    md:max-w-[80%] xl:max-w-[60%]
    ">

    <div class="text-3xl font-semibold mb-8">
      Our educational plan on crypto training and trading
    </div>

    <div 
      class="
      rounded-2xl w-full
      "
    >
      <nuxt-img 
        src="/plan.jpg" 
        alt="privacy policy illustration image" 
        format="jpg" 
        width="1200" 
        height="700"
        class="
        rounded-2xl w-full sm:h-[25rem]
        object-center mx-auto
        " 
      />
    </div>

    <div class="plan-wrap mt-8">
      <ContentDoc />
    </div>

  </div>

</template>


<script setup>

useHead({
  meta: [
    {
      name: 'title',
      content: 'Hress Educational Plan'
    }
  ],
  link: [{
    rel: 'canonical',
    href: 'https://hress.in/plan'
  }]
})

useSeoMeta({
  title: 'Hress Educational Plan',
  robots: {
    index: true, follow: true,
  },
  ogImage: 'https://hress.in/plan.jpg',
  ogUrl: 'https://hress.in/plan',
  ogImageWidth: '650',
  ogImageHeight: '350',
  ogSiteName: 'Hress',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@hress',
  twitterTitle: 'Hress Educational Plan',
  twitterDescription: `Hress's educational plan on crypto training and trading, which states how to learn and earn crypto with us`,
  twitterImageSrc: 'https://hress.in/plan.jpg',
  keywords: 'Hress, Hress Educational Plan, Educational Plan, Plan, Education'
})



definePageMeta({
  layout: 'base'
})

</script>


<style scoped>

  .plan-wrap {
    scroll-padding-top: 6rem;
  }
  .plan-wrap :deep(p) {
    @apply mb-4 text-[.95rem] text-zinc-300;
  }
  .plan-wrap :deep(p a) {
    @apply text-accent-100;
  }

  .plan-wrap :deep(h2) {
    @apply mt-10 pb-4 text-xl font-semibold;
    word-spacing: .2rem
  }
  .plan-wrap :deep(h3) {
    @apply mt-7 mb-2 text-[1.1rem] font-semibold;
    word-spacing: .2rem
  }

  .plan-wrap :deep(ul) {
    @apply py-3 pl-10; 
  }
  .plan-wrap :deep(ul li) {
    @apply pb-2 text-[.95rem] text-zinc-300;
    list-style-type: disc; 
  }

  .plan-wrap :deep(ol) {
    @apply py-2 pl-12
  }
  .plan-wrap :deep(ol li) {
    @apply pl-2 pb-2 text-zinc-200; 
    list-style-type: decimal;
  }
  .plan-wrap :deep(ol li a) {
    @apply underline underline-offset-4;
    word-spacing: .2rem;
  }



  .plan-wrap :deep(table) {
    /* border: 1px solid white; */
    border-collapse: collapse;
    @apply px-2 max-w-full w-full;

  }
  .plan-wrap :deep(table td) {
    @apply px-6 text-[.92rem] py-2
    rounded-xl overflow-hidden
    ;
  }
  .plan-wrap :deep(table thead) {
    @apply py-1;
  }
  .plan-wrap :deep(table tr) {
    border: 2px solid #ddd;
    @apply even:bg-zinc-800 leading-[1.2];
  }
  .plan-wrap :deep(table tr th) {
    border: 2px solid #fff;
    @apply px-4 py-2 bg-accent-200 text-primary-900;
  }
  .plan-wrap :deep(table td) {
    border: 1px solid #ddd;
  }

</style>

