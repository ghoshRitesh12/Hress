<template>

  <div data-policy>

    <header 
      class="
      flex items-center px-4 2xl:px-8
      relative max-w-full w-full py-4
      md:justify-between border-[0px]
      "
    >
      <HressLogo/>

      <nav id="head-nav" class="ml-auto md:mr-10">

        <button
          @click="toggleHeaderNav"
          role="button"
          type="button"
          aria-label="nav toggler"
          class="block md:hidden scale-[1]"
          style="transition: .2s ease scale"
        >
          <Icon
            :name="burgerIcon"
            class="
            text-[1.7rem] rounded-md
            pointer-events-none
            "
          />
        </button>

        <div data-head-nav
          class="
          flex items-center justify-center gap-x-5
          absolute top-[3.9rem] left-0 z-30 flex-wrap
          border-zinc-800 h-0 px-6 md:flex-nowrap
          w-full bg-primary-900 overflow-hidden
          md:block md:relative md:inset-auto md:w-fit
          md:bg-transparent md:p-0 md:border-0
          md:min-h-fit md:h-fit
          "
          :class="`${!headNavOpen ? 'min-h-0 p-0 border-0' : 'py-4 border-b-[1px] min-h-[14rem]'}`"
        >
          <NuxtLink
            v-for="headerLink in headerLinks"
            :to="headerLink.href"
            :key="headerLink.href"
            class="
            text-zinc-100 hover:text-accent-100 md:py-2 px-4
            text-center md:text-left md:w-fit border-none
            transition ease-in duration-100 flex-grow
            w-full max-w-[45%] py-6 rounded-2xl bg-zinc-800
            md:bg-transparent md:flex-grow-0 md:max-w-fit
            "
            style="transition: .2s ease"
          >
            {{ headerLink.name }}
          </NuxtLink>
        </div>

        <div data-hamburger-backdrop
          aria-name="hamburger backdrop"
          v-show="headNavOpen"
          class="
          md:hidden block 
          fixed bg-black/80 isolate z-10
          "
          @click="toggleHeaderNav"
          :style="`
            inset: 10rem 0 0 0;
            backdrop-filter: blur(.5rem)
          `"
        ></div>

      </nav> 

      <Profile class="ml-5"/>
      
    </header>

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

    <ScrollToTop/>

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

const headerLinks = ref([
  { name: 'Plan', href: '/plan' },
  { name: 'Courses', href: '/courses' },
  { name: 'Activities', href: '/activities' },
  { name: 'Achievers', href: '/achievers' },
]);


const headNavOpen = ref(false);
const burgerIcon = ref('fluent:grid-dots-24-regular');

const toggleHeaderNav = (e) => {
  console.log(e);
  headNavOpen.value = !headNavOpen.value;

  if(headNavOpen.value) {
    document.body.style.overflowY = 'hidden';
    return;
  }
  document.body.removeAttribute('style');
}


</script>


<style scoped>

  #policy-tabs {
    scrollbar-width: none;
  }
  #policy-tabs::-webkit-scrollbar {
    display: none;
  }

</style>

