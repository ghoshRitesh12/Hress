<template>

  <div class="flex flex-col min-h-[100vh]">

    <Titlebar 
      :set-profile="true"
      nav-open-icon="fluent:grid-dots-24-regular"
    />

    <div class="px-6 pt-10 pb-16">
      <slot/>
    </div>

    <Footer/>

    <ScrollToTop/>

  </div>

</template>


<script setup>

</script>


<style>

</style>
