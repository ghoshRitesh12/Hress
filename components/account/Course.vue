<template>

  <div
    class="
    w-full text-center border-[1px] select-none
    text-base md:text-[1.05rem] px-6 py-3 rounded-2xl
    "
    :class="isBasicCourse ? 'border-cyan-300' : 'border-red-400'"
  >

    <div 
      v-if="isBasicCourse"
      class="flex items-center justify-center"
    >
      Course type: 
      <div class="ml-3">Basic</div>
    </div>

    <div 
      v-else
      class="flex items-center justify-center"
    >
      Course type: 
      <div class="ml-3">Advanced</div>
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  courseType: {
    type: String,
    required: true
  }
})

const isBasicCourse = props.courseType.includes('basic')


</script>


<style>

</style>
