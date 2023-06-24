<template>

  <div
    class="
    flex items-center justify-center select-none
    border-[1px] w-fit py-3 px-6 rounded-2xl 
    border-accent-100 bg-accent-200/5
    "
  >
    
    <div class="mr-3">
      <Icon 
        name="ic:baseline-verified"
        class="text-xl text-accent-100"
      />
    </div>

    <div class="text-base md:text-lg">
      Account is verified
    </div>  

  </div>

</template>


<script setup>

const props = defineProps({
  verified: {
    type: Boolean,
    default: false
  }
})
  
</script>


<style>

</style>
