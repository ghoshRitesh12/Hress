<template>
  
  <div class="flex flex-col min-h-[100vh]">

    <Titlebar 
      :set-profile="true"
      nav-open-icon="fluent:grid-dots-24-regular"
    />

    <div class="px-6 pt-6 sm:pt-8 pb-16">
      Error {{ props.error.statusMessage }}

      <pre>
        {{ props.error }}
      </pre>
    </div>

    <Footer/>

  </div>
  
</template>


<script setup>



const props = defineProps(['error'])


</script>


<style scoped>

</style>
