<template>

  <div data-personal-info
    style="overflow-wrap: anywhere;"
  >

    <div class="text-sm text-zinc-400">
      {{ props.context }}
    </div>

    <div class="mt-1">
      {{ props.contextValue || 'N/A' }}
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
  },
})


</script>


<style>

</style>
