<template>

  <div class="flex flex-col min-h-[100vh]">

    <Titlebar 
      :set-profile="true"
      nav-open-icon="fluent:grid-dots-24-regular"
    />

    <div class="px-6 pt-6 sm:pt-8 pb-16">
      <slot/>
    </div>

    <Footer/>

    <ScrollToTop/>

    <NuxtLoadingIndicator 
      color="repeating-linear-gradient(to right,#00aeff 0%,#9ffca5 50%,#65fc6f 100%)"
    />

    <div class="hidden">
      {{ data }}
    </div>

  </div>

</template>


<script setup>

const { getSession } = useAuth();
await getSession()

</script>


<style>

</style>
