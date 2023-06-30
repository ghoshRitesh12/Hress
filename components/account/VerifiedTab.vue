<template>

  <div
    class="
    flex items-center justify-center select-none
    border-[1px] w-fit py-3 px-6 rounded-2xl 
    "
    :class="`${
      props.verified ? 
        'border-accent-100 bg-accent-200/5' :
        'border-red-400 bg-red-200/5'
    }`"
  >
    
    <div class="mr-3">
      <Icon 
        name="ic:baseline-verified"
        class="text-xl"
        :class="`${
          props.verified ? 'text-accent-100' : 'text-red-200'
        }`"
      />
    </div>

    <div class="text-base md:text-[1.05rem]">
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
