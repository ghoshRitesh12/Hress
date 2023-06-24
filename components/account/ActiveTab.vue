<template>

  <div
    class="
    flex items-center justify-center select-none
    border-[1px] w-fit py-3 px-6 rounded-2xl
    "
    :class="containerStyle"
  >
    
    <div class="mr-3">
      <Icon 
        :name="props.isActive ? fullActiveIcon : partialActiveIcon"
        class="text-xl" :class="iconStyle"
      />
    </div>

    <div class="text-base md:text-lg">
      {{ 
        props.isActive ? 
        'Account is fully active' :
        'Account is partially active'
      }}
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

const containerStyle = props.isActive ? 
  'border-accent-100 bg-accent-200/5':
  'border-yellow-200 bg-yellow-600/5' ;

const iconStyle = props.isActive ? 'text-accent-100' : 'text-yellow-200';

const partialActiveIcon = 'mdi:circle-slice-4'
const fullActiveIcon = 'mdi:circle-slice-8'

  
</script>


<style>

</style>
