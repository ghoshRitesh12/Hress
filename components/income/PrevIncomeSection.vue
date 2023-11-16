<template>
  <div data-past-income-statements>
    <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-8">
      {{
        props?.adminView
          ? "Previous Income Statements"
          : "My Previous Income Statements"
      }}
    </div>

    <div class="text-[.85rem] text-zinc-400 mt-2">
      Select a previous income statement to view income for that period of time.
    </div>

    <div v-if="props?.pastIncomeStatements?.length">
      <Select
        class="w-[15rem] ml-auto mt-4"
        placeholder="Select previous income statements"
        :options="props?.pastIncomeStatements"
        @input-change="fetchPrevIncomeStatement"
      />

      <IncomePrevStatement
        v-if="Object.keys(prevIncomeStatement ?? {}).length"
        :income-statement="prevIncomeStatement?.incomeStatement"
        class="mt-6 mx-auto"
      />
    </div>

    <Inconvenience
      v-else
      img-src="/images/join_team.svg"
      :img-width="512"
      :img-height="532"
      img-style="max-w-[9rem] sm:max-w-[12rem] md:max-w-[15rem]"
      class="mt-6"
    >
      {{
        props?.adminView
          ? "Oops, it seems like this member doesn't possess any income statement yet."
          : "Oops, it seems like you don't possess any income statement yet."
      }}
    </Inconvenience>
  </div>
</template>

<script setup>
const { setPopupMessage } = usePopup();
const props = defineProps({
  pastIncomeStatements: Array,
  fetchUrl: {
    type: String,
    required: true,
  },
  adminView: {
    type: Boolean,
    default: false,
  },
});

const prevIncomeStatement = useState(() => null);
async function fetchPrevIncomeStatement(statementDate) {
  try {
    if (!props?.fetchUrl) throw new Error("fetch url not found");

    const { data, error } = await useFetch(
      `${props.fetchUrl}/${statementDate}`,
      {
        headers: useRequestHeaders(["cookie"]),
      }
    );

    if (error.value) {
      setPopupMessage(error.value?.statusMessage);
      return;
    }
    prevIncomeStatement.value = data.value;
  } catch (err) {
    console.error(err);
  }
}

onUnmounted(() => {
  prevIncomeStatement.value = null;
});
</script>
