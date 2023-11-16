<template>
  <div
    class="table-wrapper max-w-full w-full overflow-auto"
    v-if="props?.incomeStatement?.length"
  >
    <table class="table relative w-full whitespace-nowrap px-2 mb-1">
      <thead class="table-header-group">
        <tr class="border-zinc-700 border-b-[0px] bg-zinc-900">
          <th
            v-for="header in tableHeaders"
            :class="
              fc(`
                px-6 py-4 leading-[1.2] text-white
                text-[.92rem] table-cell
              `)
            "
            align="left"
          >
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody class="table-row-group">
        <tr
          :class="
            fc(`
              table-row even:bg-zinc-800 align-middle 
              income-statement-row border-b-[1px] border-zinc-600
            `)
          "
        >
          <td
            v-for="(amount, index) in props?.incomeStatement"
            :key="index"
          >
            {{ amount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import fc from "~/utils/classes";

const props = defineProps({
  incomeStatement: {
    type: Array,
    required: true,
  },
});

const tableHeaders = ["Total Level Income", "Car Fund Incentive"];
</script>

<style scoped>
.income-statement-row td {
  display: table-cell;
  padding-inline: 1.5rem;
  padding-block: 0.5rem;
  font-size: 0.9rem;
}
</style>
