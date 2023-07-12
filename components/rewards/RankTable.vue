<template>

  <table class="rewards-table">
    
    <thead>
      <tr>
        <th align="center">Rank</th>
        <th align="center">Rewards</th>
      </tr>
    </thead>

    <tbody>
      <tr 
        v-for="value, key, index in rankRewardsMap"
        :key="key"
        :class="
          props.rank === (index + 1) ? 
          'bg-accent-100 text-primary-900' :
          'even:bg-zinc-800/70'
        "
      >
        <td align="center">{{ key }}</td>
        <td align="center">{{ value }}</td>
      </tr>
    </tbody>

  </table>

</template>


<script setup>

const props = defineProps({
  rank: {
    type: Number,
    default: 1
  }
})

const rankRewardsMap = {
  "One (1)": "----",
  "Two (2)": "----",
  "Three (3)": "----",
  "Four (4)": "----",
  "Star Trader (5)": "Tour & Training",
  "Silver Trader (6)": "Android Mobile (min Rs. 15, 000)",
  "Gold Trader (7)": "Two Wheeler (D.P - Rs. 30, 000)",
  "Platinum Trader (8)": "Four Wheeler (D.P - Rs. 1, 00, 000)",
  "Ruby Trader (9)": "National Tour",
  "Diamond Trader (10)": "International Tour",
  "Blue Diamond Trader (11)": "0.25% CASH REWARDS",
  "Gold Diamond Trader (12)": "0.25% CASH REWARDS",
  "Royal Diamond Trader (13)": "0.25% CASH REWARDS",
  "Crown Diamond Trader (14)": "0.15% CASH REWARDS",
  "Crown Ambassador (15)": "0.10% CASH REWARDS"
}


</script>


<style scoped>

  .rewards-table {
    border-collapse: collapse;
    @apply px-2 max-w-full w-full
    border-2 border-[#777];
  }
  .rewards-table td {
    @apply px-6 text-[.92rem] 
    py-2 overflow-hidden;
  }
  .rewards-table thead {
    @apply py-1 rounded-xl;
  }
  .rewards-table tr th {
    @apply px-4 py-2 bg-red-400
    border-y-2 border-x-[1px] border-[#777]
    leading-[1.2] text-primary-900;
  }
  .rewards-table td {
    @apply leading-[1.4] border-[1px]
    border-[#777];
  }

</style>
