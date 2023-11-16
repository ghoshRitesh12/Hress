<template>
  <div
    data-bimonthly-statements
    class="min-h-[30vh] md:min-h-[35vh]"
  >
    <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-10">
      Bi-Monthly Expenditure Statement
    </div>

    <div class="text-[.88rem] text-zinc-400 mt-2">
      Select previously generated bi-monthly expenditure statements to view
      them.
    </div>

    <Select
      v-if="props?.selectExpenditures?.length"
      class="w-[16rem] ml-auto mt-4"
      placeholder="Select expenditure statement"
      @input-change="fetchBiMonthlyStatement"
      :options="props?.selectExpenditures"
    />

    <Inconvenience
      v-else
      img-src="/images/join_team.svg"
      :img-width="512"
      :img-height="532"
      img-style="max-w-[9rem] sm:max-w-[12rem] md:max-w-[15rem]"
      class="mt-6"
    >
      <div>
        Looks like there aren't any bi-monthly expenditure statements available
        :3
      </div>
    </Inconvenience>

    <ExpenditureBiMonthlyStatementTable
      v-if="fetchedMonthlyStatement?.paginatedPayees?.length"
      :payees="fetchedMonthlyStatement?.paginatedPayees"
      :has-more-payees="fetchedMonthlyStatement?.hasMore"
      :statement-month="fetchedMonthlyStatement?.statementMonth"
      class="mt-6"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  selectExpenditures: {
    type: Array,
    required: true,
  },
});

const { setPopupMessage } = usePopup();

const fetchedMonthlyStatement = useState(() => null);
async function fetchBiMonthlyStatement(month) {
  const { data, error } = await useFetch(
    `/api/account/expenditure/statement/${month}`,
    {
      headers: useRequestHeaders(["cookie"]),
    }
  );

  if (error?.value) {
    setPopupMessage(error?.value?.statusMessage);
    return;
  }
  fetchedMonthlyStatement.value = data?.value ?? null;
}

onUnmounted(() => {
  fetchedMonthlyStatement.value = null;
});
</script>
