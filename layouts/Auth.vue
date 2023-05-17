<template>

  <div class="flex flex-col min-h-[100vh]">

    <header 
      class="
      flex items-center px-4 2xl:px-8
      relative max-w-full w-full py-3
      border-[0px] border-red-300
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

    </header>

    <slot />

    <footer 
      class="
      flex items-center flex-wrap w-full mt-auto gap-3
      py-6 px-4 2xl:px-8 text-[.9rem] justify-between
      "
    >

      <div class="text-zinc-400">
        &copy; 2023 Hress Limited.
      </div>

      <div data-footer-links 
        class="sm:ml-auto"
      >

        <NuxtLink
          v-for="footerLink in footerLinks"
          :to="footerLink.href"
          :key="footerLink.href"
          class="
          text-zinc-400 hover:text-green-200
          transition ease-in duration-100
          py-1 px-2 ml-1 
          "
        >
          {{ footerLink.name }}
        </NuxtLink>

      </div>

    </footer>

  </div>


</template>


<script setup>

const headerLinks = ref([
  { name: 'Plan', href: '/plan' },
  { name: 'Courses', href: '/courses' },
  { name: 'Activities', href: '/activities' },
  { name: 'Achievers', href: '/achievers' },
]);

const footerLinks = ref([
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Get in touch', href: '/contact' },
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


<style>

</style>
