<template>
  
  <div data-level-wise-income>

    <div 
      class="
      flex items-center px-4 bg-zinc-900
      py-4 rounded-2xl text-[1rem]
      pointer-events-none
      "
    >
      Level Wise Income
    </div>


    <div v-if="props?.levels?.length > 0"
      class="
      flex flex-col gap-5 px-2 mx-2 pb-3 pt-4
      border-[1px] border-t-0 border-zinc-700/60
      rounded-bl-2xl rounded-br-2xl
      "
    >
      <IncomeLevel
        v-for="level in props?.levels"
        :key="level.levelNo"
        :level-no="level.levelNo"
        :level-income="level.levelIncome"
        :level-members="level.levelMembers"
      />

      <div
        class="
        flex items-center justify-between 
        px-2 font-semibold text-[.95rem]
        gap-4
        "
      >
        <div class="leading-[1.3]">
          Total Level Wise Income:
        </div>

        <div>
          {{
            new Intl.NumberFormat(
              'en-IN', 
              { style: 'currency', currency: 'INR' }
            ).format(props.totalLevelIncome || 0) 
          }}
        </div>
      </div>

    </div>

    <Inconvenience v-else
      img-src="/images/join_team.svg"
      :img-width="512"
      :img-height="532"
      img-style="
      max-w-[9rem] sm:max-w-[12rem] md:max-w-[15rem]
      "
      class="mt-6"
    >
      <div v-if="props?.adminView">
        Oops this user hasn't sponsored any member yet. 
      </div>
      <div v-else>
        Oops, it seems like you haven't sponsored any member yet. 
        <br>
        Members sponsored by you show up here
        in their respective levels.
      </div>
    </Inconvenience>

  </div>
  
</template>


<script setup>

const props = defineProps({
  levels: {
    type: Array,
  },
  totalLevelIncome: {
    type: Number,
    default: 0
  },
  adminView: {
    type: Boolean,
    default: false
  }
})



</script>


<style scoped>

</style>
