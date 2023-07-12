<template>

  <div 
    class="
    flex items-center text-[1.02rem]
    py-5 px-4 sm:px-6 rounded-2xl
    bg-zinc-800/80 md:whitespace-nowrap
    "
  >
    <div>Rank:</div>

    <div class="ml-3 text-center">
      {{ getRankName(props.rank) }}
    </div>

  </div>

</template>


<script setup>
import getRankName from '~/utils/getRankName';

const props = defineProps({
  rank: {
    type: Number,
    default: 1
  }
})


</script>


<style>

</style>
