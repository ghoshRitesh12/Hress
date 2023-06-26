<template>

  <div 
    class="
    flex items-center md:px-6
    bg-zinc-800/70 py-[.6rem] px-5
    rounded-2xl md:text-[1.05rem] w-fit
    "
  >

    <div class="text-zinc-400">
      Sponsored By:
    </div>

    <div 
      class="
      flex items-center gap-4 ml-3
      "
    >
      <div
        class="max-w-[2.5rem] hidden"
      >
        <nuxt-img
          :src="sponsorerPfp"
          :alt="`${props.sponsorerName.split(' ')[0]}'s profile picture'`"
          format="png"
          width="256" 
          height="256"
          decoding="async"
          fetchpriority="high"
        />
      </div>
  
      <div>
        {{ props.sponsorerName }}
      </div>
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  sponsorerName: {
    type: String,
    required: true
  },
  sponsorerPfp: {
    type: String,
    required: true
  }
})

</script>


<style>

</style>
