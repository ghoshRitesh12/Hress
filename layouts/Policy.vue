<template>

  <div data-policy
    class="flex flex-col min-h-[100vh]"
  >

    <Titlebar 
      :set-profile="true"
      nav-open-icon="fluent:grid-dots-24-regular"
    />

    <div class="mt-8">

      <div 
        class="
        flex items-center overflow-x-auto overflow-y-hidden
        border-b-[1px] border-zinc-700 pb-[.05rem] text-[.95rem]
        "
        id="policy-tabs"
        ref="policyTabsWrap"
      >

        <NuxtLink
          v-for="tabLink, index in tabLinks"
          :key="tabLink.href"
          :to="tabLink.href"
          class="
          relative py-3 px-2 ml-3 md:ml-6 
          flex-shrink-0 last:mr-3 md:last:mr-6
          "
          active-class="
          after:content-[' '] after:absolute after:left-0 
          after:bottom-[-.1rem] after:w-full after:h-[.28rem] 
          after:bg-accent-200 text-accent-100
          after:rounded-tl-3xl after:rounded-tr-3xl
          "
          @click="tabScroll(index)"
          style="transition: .2s ease"
        >
          {{ tabLink.name }}
        </NuxtLink>

      </div>

      <div class="px-6 pt-10 pb-16">
        <slot/>
      </div>

    </div>

    <Footer/>

    <ScrollToTop/>

    <NuxtLoadingIndicator 
      color="#9ffca5"
    />

  </div>

</template>


<script setup>

const policyTabsWrap = ref(null);

const tabScroll = (item) => {
  if(item === 0) {
    policyTabsWrap.value.scrollLeft = 0
    return
  } 
  policyTabsWrap.value.scrollLeft = policyTabsWrap.value.scrollWidth
}

onMounted(() => {
  const route = useRoute();
  if(route.path.includes('cookie-policy')) {
    policyTabsWrap.value.scrollLeft = policyTabsWrap.value.scrollWidth
  }
})



const tabLinks = ref([
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
]);


</script>


<style scoped>

  #policy-tabs {
    scrollbar-width: none;
  }
  #policy-tabs::-webkit-scrollbar {
    display: none;
  }

</style>

