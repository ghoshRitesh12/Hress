<template>

  <div data-policy>

    <header 
      class="
      flex items-center px-4 2xl:px-8
      relative max-w-full w-full py-3
      md:justify-between
      "
    >
      <HressLogo/>

      <nav id="head-nav" class="ml-auto">

        <button
          @click="toggleHeaderNav"
          role="button"
          type="button"
          aria-label="nav toggler"
          class="block md:hidden"
        >
          <Icon
            :name="burgerIcon"
            class="text-2xl pointer-events-none"
          />
        </button>

        <div data-head-nav
          class="
          flex items-center flex-col gap-2
          absolute top-[3.9rem] left-0 z-30
          border-zinc-800 h-0
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
            text-zinc-100 hover:text-accent-100 py-2 px-4
            w-full text-center md:text-left md:w-fit
            transition ease-in duration-100
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

      <button class=" hidden ml-8 px-4 py-2 bg-accent-200 text-black font-semibold rounded-2xl text-[.9rem]">
        login
      </button>
      
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
          relative py-2 px-2 ml-3 md:ml-6 
          flex-shrink-0 last:mr-3 md:last:mr-6
          "
          active-class="
          after:content-[' '] after:absolute after:left-0 
          after:bottom-[-.1rem] after:w-full after:h-[.28rem] 
          after:bg-green-400 text-accent-100
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
const burgerIcon = ref('charm:menu-hamburger');

const toggleHeaderNav = () => {
  headNavOpen.value = !headNavOpen.value;

  if(headNavOpen.value) {
    burgerIcon.value = 'radix-icons:cross-2';
    document.body.style.overflowY = 'hidden';
    return;
  }
  burgerIcon.value = 'charm:menu-hamburger';
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

