<template>

  <div data-member-spillover
    class="
    text-[.75rem]
    "
  >

    <div v-if="props.spilloverType === 'direct'"
      class="
      text-accent-100 border-[1px] py-1 px-2
      rounded-3xl border-accent-100
      "
    >
      Direct Spillover
    </div>

    <div v-else-if="props.spilloverType === 'indirect'"
      class="
      text-amber-300 border-[1px] py-1 px-2
      rounded-3xl border-amber-300
      "
    >
      Indirect Spillover
    </div>

    <div v-else
      class="
      text-zinc-400 border-[1px] py-1 px-2
      rounded-3xl border-zinc-500
      "
    >
      Normal
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  spilloverType: {
    type: String,
    default: false
  }
})



</script>


<style>
p {
  text-decoration: line-through;
}

</style>
