<template>
  <div
    v-if="props.payees?.length"
    class="overflow-hidden"
  >
    <div class="table-wrapper overflow-auto">
      <table class="table relative whitespace-nowrap px-2 mb-1">
        <thead class="table-header-group">
          <tr class="border-zinc-700 border-b-[2px] bg-zinc-900">
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
            v-for="(payee, index) in props.payees"
            :key="payee.crsr"
            class="table-row even:bg-zinc-800 payee-row align-middle"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ payee?.name }}</td>
            <td>{{ payee?.email }}</td>
            <td>{{ payee?.bankAccountNo ?? "N/A" }}</td>
            <td>{{ payee?.ifsc ?? "N/A" }}</td>
            <td>{{ payee?.income?.[0] ?? 0 }}</td>
            <td>{{ payee?.income?.[1] ?? 0 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="hasMore"
      class="w-fit ml-auto mt-2"
    >
      <button
        type="button"
        :class="
          fc(`
            border-zinc-700 border-[1px] text-[.85rem]  
            mx-auto w-fit py-2 px-6 mb-3 mt-1 rounded-xl
            text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800/70 
            active:scale-95 transition ease-in duration-100
          `)
        "
        @click="fetchMorePayees"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import fc from "~/utils/classes";

const props = defineProps({
  statementMonth: {
    type: String,
    required: true,
  },
  payees: {
    type: Array,
    required: true,
  },
  hasMorePayees: {
    type: Boolean,
    default: false,
  },
});

const tableHeaders = [
  "Sl.no",
  "Name",
  "Email Id",
  "Bank Account No",
  "IFSC",
  "Level Income",
  "Car Fund",
];

const { setPopupMessage } = usePopup();

const payees = useState(() => []);
const hasMore = useState(() => false);
const next_crsr = useState(() => undefined);

onMounted(() => {
  payees.value = props.payees;
  hasMore.value = props.hasMorePayees;
  next_crsr.value = payees?.value?.at(-1)?.crsr;
});

async function fetchMorePayees() {
  try {
    if (!next_crsr.value) return;

    const { data, error } = await useFetch(
      `/api/account/expenditure/statement/${props.statementMonth}?next_crsr=${next_crsr.value}`,
      {
        headers: useRequestHeaders(["cookie"]),
      }
    );

    if (error?.value) {
      setPopupMessage(error?.value?.statusMessage);
      return;
    }
    payees.value?.push(...data?.value?.paginatedPayees);
    hasMore.value = data?.value?.hasMore;
    next_crsr.value = data?.value?.paginatedPayees?.at(-1)?.crsr;
    //
  } catch (err) {
    console.log(err);
  }
}

onUnmounted(() => {
  payees.value = [];
  hasMore.value = false;
  next_crsr.value = undefined;
});
</script>

<style scoped>
.payee-row td {
  display: table-cell;
  padding-inline: 1.5rem;
  padding-block: 0.5rem;
  font-size: 0.9rem;
}
</style>
