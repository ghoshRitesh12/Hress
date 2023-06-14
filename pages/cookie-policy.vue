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
        src="/cookies.webp" 
        alt="cookie policy illustration image"
        format="webp"
        width="1000"
        height="700"
        class="
        rounded-2xl w-full sm:h-[22rem]
        object-center mx-auto
        "
      />
    </div>

    <div 
      class="cookie-policy-wrap mt-6"
    >
      <ContentDoc :excerpt="false" />
    </div>

  </div>

</template>


<script setup>

useHead({
  title: 'Hress Cookie Policy',
  meta: [
    {
      name: 'title',
      content: 'Hress Cookie Policy'
    },
    {
      name: 'robots',
      content: 'index,follow'
    },
    {
      name: 'og:url',
      content: 'https://hress.in/cookie-policy'
    },
    {
      name: 'og:type',
      content: 'website'
    },
    {
      name: 'og:image',
      content: 'https://hress.in/cookies.webp'
    },
    {
      name: 'og:image:width',
      content: '650'
    },
    {
      name: 'og:image:height',
      content: '350'
    },
    {
      name: 'keywords',
      content: 'Hress, Hress Cookie Policy, Cookie, Cookies, Legal cookie policy'
    }
  ]
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
