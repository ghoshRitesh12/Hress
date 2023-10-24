<template>
  <div
    class="flex items-center py-[.6rem] text-[1rem] gap-x-6 gap-y-4 flex-wrap"
  >
    <div
      class="flex items-center md:px-5 bg-zinc-800/70 py-[.6rem] px-4 rounded-2xl md:text-[1rem] w-fit"
    >
      <div class="text-zinc-400">Sponsored By:</div>

      <div class="ml-3">
        {{ props.sponsorerName }}
      </div>
    </div>

    <div
      class="flex items-center md:px-5 bg-zinc-800/70 py-[.6rem] px-4 rounded-2xl md:text-[1rem] w-fit"
    >
      <div class="text-zinc-400">Sponsorer's Ref Id:</div>

      <div class="ml-3">
        {{ props.sponsorerReferralId }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sponsorerName: {
    type: String,
    required: true,
  },
  sponsorerReferralId: {
    type: String,
    required: true,
  },
});
</script>
