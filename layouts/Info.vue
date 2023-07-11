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
      color="#9ffca5"
    />

  </div>

</template>


<script setup>

</script>


<style>

</style>
