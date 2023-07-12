<template>

  <div v-if="props.rank"
    class="
    flex items-center
    py-4 px-4 sm:px-6 rounded-2xl w-full
    bg-zinc-800/60 md:whitespace-nowrap
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
  }
})


</script>


<style>

</style>
