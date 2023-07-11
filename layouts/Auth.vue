<template>

  <div class="flex flex-col min-h-[100vh]">

    <Titlebar 
      :set-profile="false"
      nav-open-icon="charm:menu-hamburger"
      nav-close-icon="radix-icons:cross-2"
    />

    <slot />

    <Footer/>

    <Popup/>

    <NuxtLoadingIndicator 
      color="#9ffca5"
    />

  </div>


</template>


<script setup>



</script>


<style>

</style>
