<template>

  <nav id="head-nav" 
    class="ml-auto"
  >

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
        text-2xl rounded-md
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
        @click="toggleHeaderNav"
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

</template>


<script setup>

const props = defineProps({
  openIcon: {
    type: String,
    required: true
  },
  closeIcon: {
    type: String,
    default: null
  },
})


const headerLinks = ref([
  { name: 'Plan', href: '/plan' },
  { name: 'Courses', href: '/courses' },
  { name: 'Activities', href: '/activities' },
  { name: 'Achievers', href: '/achievers' },
]);

const headNavOpen = ref(false);
const burgerIcon = ref(props.openIcon);

const toggleHeaderNav = (e) => {
  headNavOpen.value = !headNavOpen.value;

  if(headNavOpen.value) {
    if(props.closeIcon) burgerIcon.value = props.closeIcon

    document.body.style.overflowY = 'hidden';
    return;
  }
  if(props.closeIcon) burgerIcon.value = props.openIcon
  document.body.removeAttribute('style');
}

</script>


<style>

</style>
