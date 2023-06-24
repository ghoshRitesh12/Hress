<template>

  <div :data-personal-info="kebabContext">

    <div class="text-sm text-zinc-400">
      {{ props.context }}
    </div>

    <div class="mt-1">
      {{ props.contextValue }}
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  context: {
    type: String,
    required: true
  },
  contextValue: {
    type: String,
    required: true
  },
})


const kebabContext = props.context.replace(/\s/g, '-').toLowerCase();


</script>


<style>

</style>
