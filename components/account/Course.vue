<template>

  <div v-if="props.courseType"
    class="
    w-full text-center border-[1px] select-none
    text-base md:text-[1.05rem] px-6 py-3 rounded-2xl
    "
    :class="props?.courseType?.includes('advance') ? 'border-red-400' : 'border-cyan-300' "
  >

    <div
      class="flex items-center justify-center"
    >
      <div class="mr-3">
        Course type:
      </div>

      <div v-if="props?.courseType === 'basic'">
        Basic
      </div>
      <div v-else-if="props?.courseType === 'advance'">
        Advance
      </div>
      <div v-else class="capitalize">
        {{ props.courseType?.toLowerCase() }}
      </div>

    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  courseType: {
    type: String,
  }
})


</script>


<style>

</style>
