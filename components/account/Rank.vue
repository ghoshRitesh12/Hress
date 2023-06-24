<template>

  <div 
    class="
    flex items-center
    py-5 px-4 sm:px-6 rounded-2xl w-full
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

const props = defineProps({
  rank: {
    type: Number,
    required: true
  }
})


const getRankName = (rank = 1) => {
  const ranksNames = [
    "N/A",
    "One (1)",
    "Two (2)",
    "Three (3)",
    "Four (4)",
    "Star Trader (5)",
    "Silver Trader (6)",
    "Gold Trader (7)",
    "Platinum Trader (8)",
    "Ruby Trader (9)",
    "Diamond Trader (10)",
    "Blue Diamond Trader (11)",
    "Gold Diamond Trader (12)",
    "Royal Diamond Trader (13)",
    "Crown Diamond Trader (14)",
    "Crown Ambassador (15)"
  ]

  return (rank < 1 || rank > 15) ? ranksNames[0] : ranksNames[rank]
}


</script>


<style>

</style>
