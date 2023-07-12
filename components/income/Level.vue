<template>

  <div data-income-level
    class="
    flex items-center justify-between py-3 px-4 sm:py-3
    bg-zinc-800 border-[1px] border-zinc-700
    rounded-2xl sm:px-5 text-[.85rem] sm:text-[.9rem]
    shadow-lg shadow-black/10 text-zinc-200
    gap-6 overflow-x-auto
    "
  >

    <div 
      class="align-middle flex-shrink-0"
    >
      Level
      <span class="ml-1">
        {{ props.levelNo }}
      </span>
    </div>


    <div class="text-zinc-300 flex-shrink-0">
      {{
        new Intl.NumberFormat(
          'en-IN', 
          { style: 'currency', currency: 'INR' }
        ).format(props.levelIncome || 0) 
      }}
    </div>

    
    <div 
      class="
      flex items-center mr-0 sm:mr-0
      text-zinc-200 flex-shrink-0
      "
    >
      <Icon
        class="text-lg"
        name="fluent:people-queue-24-regular"
      />
      <div class="ml-[.4rem] select-none">
        {{ props.levelMembers }}
      </div>
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  levelNo: {
    type: Number,
    required: true
  },
  levelMembers: {
    type: Number,
    required: true
  },
  levelIncome: {
    type: Number,
    default: false
  }
})


</script>


<style scoped>

  [data-level-wise-income] [data-income-level] {
    scrollbar-width: none;
  }
  [data-level-wise-income] [data-income-level]::-webkit-scrollbar {
    display: none;
  }

</style>
