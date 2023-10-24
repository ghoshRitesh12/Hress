<template>
  <div
    data-level-wise-income
    v-if="Object.keys(props?.level ?? {}).length"
  >
    <div
      class="flex items-center px-4 bg-zinc-900 py-4 rounded-2xl text-[1rem] pointer-events-none"
    >
      Bi-Monthly Level Income
    </div>

    <div
      :class="
        fc(`
        flex flex-col gap-5 px-2 md:px-4 mx-2 pb-3 pt-4 border-[1px] 
        border-t-0 border-zinc-700/60 rounded-bl-2xl rounded-br-2xl
      `)
      "
    >
      <IncomeLevel
        :level-no="props?.level?.levelNo"
        :level-income="props?.level?.levelIncome"
        :level-members="props?.level?.levelMembers"
      />

      <!-- <div
        class="flex items-center justify-between px-2 font-semibold text-[.95rem] gap-4"
      >
        <div class="leading-[1.3]">Total Level Wise Income:</div>

        <div>
          {{
            new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(props.totalLevelIncome || 0)
          }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import fc from "~/utils/classes";

const props = defineProps({
  level: {
    type: Object,
  },
  adminView: {
    type: Boolean,
    default: false,
  },
});
</script>
