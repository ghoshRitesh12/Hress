<template>

  <div
    class="
    flex items-center justify-center select-none
    border-[1px] w-fit py-3 px-6 rounded-2xl
    transition ease-in duration-100
    "
    :class="
      props.isActive ? 
    'border-accent-100 bg-accent-200/5':
    'border-yellow-200 bg-yellow-600/5'
    "
  >
    
    <div class="mr-2">
      <Icon 
        class="text-xl" 
        :name="props.isActive ? 'mdi:circle-slice-8' : 'mdi:circle-slice-4'"
        :class="props.isActive ? 'text-accent-100' : 'text-yellow-200'"
      />
    </div>

    <div 
      class="
      text-base md:text-[1.05rem]
      transition ease-in duration-100
      "
    >
      Account is
      {{ props.isActive ? 'fully' : 'partially' }}
      active
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

</script>


<style>

</style>
