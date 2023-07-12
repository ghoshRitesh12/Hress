<template>

  <div
    class="
    flex justify-center items-center flex-col
    gap-y-4 border-[1px] border-zinc-600
    py-10 w-full rounded-2xl xl:px-[6rem]
    "
  >

    <div v-if="props.pfp" class="max-w-[5rem]">
      <nuxt-img
        :src="props.pfp"
        :alt="`${props.username.split(' ')[0]}'s profile picture`"
        format="png"
        width="256" height="256"
        decoding="async"
        fetchpriority="high"
      />
    </div>

    <div v-if="props.username"
      class="
      text-lg text-center max-w-[20ch]
      md:text-xl leading-[1.4]
      "
    >
      {{ props.username }}
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  username: {
    type: String,
  }, 
  pfp: {
    type: String,
  }
})

</script>


<style>

</style>
