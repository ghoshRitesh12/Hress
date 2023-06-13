<template>

  <header 
    class="
    flex items-center px-4 2xl:px-8
    relative max-w-full w-full py-4
    md:justify-between border-[0px]
    "
  >
    <HressLogo/>

    <Navbar 
      :open-icon="props.navOpenIcon"
      :close-icon="props.navCloseIcon ? props.navCloseIcon : null"
    />

    <Profile 
      v-if="props.setProfile"
      class="ml-5 md:ml-16"
    />
    
  </header>

</template>


<script setup>

const props = defineProps({
  setProfile: {
    type: Boolean,
    default: false
  },
  navOpenIcon: {
    type: String,
    required: true
  },
  navCloseIcon: {
    type: String,
  },
})



</script>


<style>

</style>
