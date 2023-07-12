<template>

  <div 
    class="
    flex items-center flex-col gap-y-7 w-full
    "
  >

    <div
      v-if="props.imgSrc"
      class="select-none pointer-events-none"
      :class="props.imgStyle"
    >
      <nuxt-img
        :src="props.imgSrc" alt=""
        :width="props.imgWidth" 
        :height="props.imgWidth"
        format="png"
        decoding="async"
        fetchpriority="high"
      />
    </div>

    <div 
      class="
      text-center text-zinc-400
      text-[.85rem] sm:text-[.9rem]
      "
    >
      <slot/>
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  imgSrc: {
    type: String
  },
  imgWidth: Number,
  imgHeight: Number,
  imgStyle: String
})

</script>


<style>

</style>
