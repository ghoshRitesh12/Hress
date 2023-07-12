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
      color="repeating-linear-gradient(to right,#00aeff 0%,#9ffca5 50%,#65fc6f 100%)"
    />

  </div>


</template>


<script setup>

const { getSession } = useAuth();
await getSession()

</script>


<style>

</style>
