<template>
  <div
    data-terms
    class="max-w-full w-full mt-2 mx-auto md:max-w-[70%] xl:max-w-[50%]"
  >
    <div class="rounded-2xl w-full">
      <NuxtImg
        src="/images/terms_conditions.jpg"
        alt="terms and conditions illustration image"
        format="jpg"
        width="1000"
        height="700"
        decoding="async"
        fetchpriority="high"
        placeholder
        class="rounded-2xl w-full sm:h-[22rem] object-center mx-auto"
      />
    </div>

    <div class="terms-wrap mt-6">
      <ContentDoc />
    </div>
  </div>
</template>

<script setup>
useHead({
  meta: [
    {
      name: "title",
      content: "Hress Terms & Conditions",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://hress.in/terms",
    },
  ],
});

useServerSeoMeta({
  title: "Hress Terms & Conditions",
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    maxSnippet: -1,
    maxVideoPreview: -1,
  },
  ogImage: "https://hress.in/images/terms_conditions.jpg",
  ogUrl: "https://hress.in/terms",
  ogImageWidth: "650",
  ogImageHeight: "350",
  ogSiteName: "Hress",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterSite: "@hress",
  twitterTitle: "Hress Terms & Conditions",
  twitterDescription: `Hress's Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity "you", and Chargaeri Eco, Socio & Human Resource Development Society, concerning your access to and use of the Services`,
  twitterImageSrc: "https://hress.in/images/terms_conditions.jpg",
  keywords: "Hress, Hress Terms and Conditions, Terms, Conditions, Legal terms",
});

definePageMeta({
  layout: "policy",
});
</script>

<style scoped>
[data-terms] {
  scroll-padding-top: 4em;
}

.terms-wrap {
  scroll-padding-top: 6rem;
}
.terms-wrap * {
  text-decoration: none;
}
.terms-wrap :deep(p *) {
  text-decoration: none;
}
.terms-wrap :deep(p) {
  @apply mb-4 text-[.95rem] text-zinc-300;
}
.terms-wrap :deep(p a) {
  @apply text-accent-100;
}

.terms-wrap :deep(h2) {
  @apply mt-10 pb-4 text-xl font-semibold;
  word-spacing: 0.2rem;
}
.terms-wrap :deep(h3) {
  @apply mt-7 mb-2 text-[1.1rem] font-semibold;
  word-spacing: 0.2rem;
}

.terms-wrap :deep(ul) {
  @apply py-3 pl-10;
}
.terms-wrap :deep(ul li) {
  @apply pb-2 text-[.95rem] text-zinc-300;
  list-style-type: disc;
}

.terms-wrap :deep(ol) {
  @apply py-2 pl-12;
}
.terms-wrap :deep(ol li) {
  @apply pl-2 pb-2 text-zinc-200;
  list-style-type: decimal;
}
.terms-wrap :deep(ol li a) {
  @apply underline underline-offset-4;
  word-spacing: 0.2rem;
}
</style>
