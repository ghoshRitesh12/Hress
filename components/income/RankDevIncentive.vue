<template>
  
  <div data-rank-dev-inc
    class="
    flex items-center justify-between py-3
    border-b-[1px] border-zinc-700
    text-[.85rem] sm:text-[.9rem]
    text-zinc-200 mt-1 gap-7 overflow-x-auto
    mx-3 sm:mx-4
    "
  >

    <div 
      class="align-middle flex-shrink-0"
    >
      {{ getRankName(props.rank || 1) }}
    </div>


    <div class="text-zinc-300">
      {{ 
        new Intl.NumberFormat(
          'en-IN', 
          { style: 'currency', currency: 'INR' }
        ).format(props.incentive || 0) 
      }}
    </div>

  </div>

</template>


<script setup>
import getRankName from '~/utils/getRankName';

const props = defineProps({
  rank: {
    type: Number,
    required: true,
  },
  incentive: {
    type: Number,
    required: true
  }
})

</script>


<style scoped>

  [data-development-incentive] [data-rank-dev-inc] {
    scrollbar-width: none;
  }

  [data-development-incentive] [data-rank-dev-inc]::-webkit-scrollbar {
    display: none;
  }

</style>
