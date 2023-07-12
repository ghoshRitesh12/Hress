<template>

  <div 
    class="
    py-4 px-4 sm:px-6 rounded-2xl 
    bg-zinc-800/80 text-center text-[1.02rem]
    border-[0px] group
    "
  >

    <div 
      v-if="props.rank < 5" 
      class="flex items-center gap-4"
    >
      <div 
        class="
        text-2xl flex-shrink-0 group-hover:scale-[1.15]
        transition ease-in duration-100 select-none

        "
      >
        😶
      </div>
      <div>
        No rewards acquired yet
      </div>
    </div>

    <div v-else class="flex items-center gap-4">
      <div 
        class="
        text-2xl flex-shrink-0 group-hover:scale-[1.15]
        transition ease-in duration-100 select-none
        "
      >
        🎉
      </div>
      <div>
        {{ rewardsMap[props.rank - 5] }}
      </div>
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  rank: {
    type: Number,
    default: 1
  }
})

const rewardsMap = [
  "Tour & Training",
  "Android Mobile (min Rs. 15, 000)",
  "Two Wheeler (D.P - Rs. 30, 000)",
  "Four Wheeler (D.P - Rs. 1, 00, 000)",
  "National Tour",
  "International Tour",
  "0.25% CASH REWARDS",
  "0.25% CASH REWARDS",
  "0.25% CASH REWARDS",
  "0.15% CASH REWARDS",
  "0.10% CASH REWARDS"
]


</script>


<style>

</style>
