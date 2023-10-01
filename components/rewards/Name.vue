<template>
  <div
    class="py-4 px-4 sm:px-6 rounded-2xl bg-zinc-800/80 text-center text-[1.02rem] border-[0px] group"
  >
    <div class="flex items-center gap-4">
      <div
        class="text-2xl flex-shrink-0 group-hover:scale-[1.15] transition ease-in duration-100 select-none"
      >
        {{ props.rank < 3 ? "😶" : "🎉" }}
      </div>
      <div>
        {{ rewardsMap[props.rank] }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  rank: {
    type: Number,
    default: 1,
  },
});

const rewardsMap = [
  "No rewards acquired yet", // 0
  "No rewards acquired yet", // 1
  "No rewards acquired yet", // 2

  "Digha Tour", // 3
  "Gangtok / Darjeeling Tour", // 4
  "Android Mobile", // 5
  "Thailand Tour", // 6
  "Car (D.P - Rs. 70, 000)", // 7
  "Dubai Tour", // 8
  "Europe Tour", // 9
  "World Tour", // 10
  "Luxury Car (D.P - Rs. 6, 00, 000)", // 11
  "Flat worth Rs. 30, 00, 000", // 12

  "To be decided by admins", // 13
  "To be decided by admins", // 14
  "To be decided by admins", // 15
];
</script>
