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
        v-for="(value, key, index) in rankRewardsMap"
        :key="key"
        :class="
          props.rank === index + 1
            ? 'bg-accent-100 text-primary-900'
            : 'even:bg-zinc-800/70'
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
    default: 1,
  },
});

const rankRewardsMap = {
  "One (1)": "----",
  "Runner (2)": "----",
  "Bronze Trader (3)": "Digha Tour",
  "Silver Trader (4)": "Gangtok / Darjeeling Tour",
  "Gold Trader (5)": "Android Mobile",
  "Platinum Trader (6)": "Thailand Tour",
  "Emerald Trader (7)": "Car (D.P - Rs. 70, 000)",
  "Saphire Trader (8)": "Dubai Tour",
  "Ruby Trader (9)": "Europe Tour",
  "Diamond Trader (10)": "World Tour",
  "Black Diamond Trader (11)": "Luxury Car (D.P - Rs. 6, 00, 000)",
  "Blue Diamond Trader (12)": "Flat worth Rs. 30, 00, 000",
  "Red Diamond Trader (13)": "Level Flush-out rewards",
  "Crown Trader (14)": "Level Flush-out rewards",
  "Crown Ambassador (15)": "Level Flush-out rewards",
};
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
