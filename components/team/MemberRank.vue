<template>

  <div 
    class="whitespace-nowrap text-[.85rem]"
  >
    {{ getRankName(props.rank) }}
  </div>

</template>


<script setup>
import getRankName from '~/utils/getRankName';

const props = defineProps({
  rank: {
    type: Number,
    required: true
  }
})

</script>


<style>

</style>
