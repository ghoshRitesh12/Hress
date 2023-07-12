<template>
  
  <div data-trainer-incentive
    class="
    flex items-center justify-between
    bg-zinc-900 rounded-2xl
    px-4 py-4 text-[1rem]
    "
  >

    <div 
      class="pointer-events-none"
    >
      Trainer Incentive
    </div>

    <div class="text-[.95rem]">
      {{  
        new Intl.NumberFormat(
        'en-IN', 
        { style: 'currency', currency: 'INR' }
        ).format(props.trainerIncentive || 0)
      }}
    </div>

  </div>
  
</template>


<script setup>

const props = defineProps({
  trainerIncentive: {
    type: Number,
    default: 0
  }
})

</script>


<style scoped>

</style>
