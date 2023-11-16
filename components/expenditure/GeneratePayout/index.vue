<template>
  <div data-generate-expenditure>
    <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3">
      Generate Expenditure Statement
    </div>

    <div class="text-[.88rem] text-zinc-400 mt-2">
      Generate expenditure payout statement for the
      <span v-if="d.getDate() <= 15"> 1<sup>st</sup> </span>
      <span v-else> 2<sup>nd</sup> </span>
      half of the month of
      {{ d.toLocaleString("default", { month: "long" }) }}, OR re-generate a
      previously generated expenditure statement.
    </div>
    <div
      :class="
        fc(`
          flex items-center justify-between w-full
          mt-4 flex-col sm:flex-row gap-y-4 gap-x-6
        `)
      "
    >
      <Select
        class="max-w-[17rem] mr-auto sm:mr-0"
        placeholder="Select previously generated expenditure statement"
        @input-change="(value) => (incomePeriod = value)"
        :options="props?.selectExpenditures"
      />

      <button
        type="submit"
        :class="
          fc(`
            w-fit bg-accent-200 hover:bg-green-400 px-5 py-2 
            sm:py-[.6rem] rounded-xl text-[.95rem] font-semibold 
            text-primary-900 transition ease-in duration-100
            active:scale-95 ml-auto sm:ml-0 leading-[1.2]
          `)
        "
        @click="() => submitPayoutRequest('gen:payout')"
      >
        Generate Payout
      </button>

      <button
        type="submit"
        :class="
          fc(`
            w-fit bg-accent-200 hover:bg-green-400 px-5 py-2 
            sm:py-[.6rem] rounded-xl text-[.95rem] font-semibold 
            text-primary-900 transition ease-in duration-100
            active:scale-95 ml-auto sm:ml-0 leading-[1.2]
          `)
        "
        @click="() => submitPayoutRequest('gen:payout-pdf')"
      >
        Generate Payout PDF
      </button>
    </div>
  </div>
</template>

<script setup>
import fc from "~/utils/classes";

const props = defineProps({
  selectExpenditures: {
    type: Array,
    required: true,
  },
});

const { setPopupMessage } = usePopup();
const d = new Date();

const incomePeriod = useState(
  () => `${d.getDate() <= 15 ? 15 : 30}-${d.getMonth() + 1}-${d.getFullYear()}`
);
async function submitPayoutRequest(param) {
  try {
    const fetchUrl =
      param === "gen:payout-pdf"
        ? "/api/admin/gen-payout-pdf"
        : "/api/admin/payout-req";

    const { data, error } = await useFetch(fetchUrl, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: {
        incomePeriod: incomePeriod.value,
      },
    });

    error?.value && setPopupMessage(error?.value?.statusMessage);
    data?.value && setPopupMessage(data?.value?.message);
  } catch (err) {
    console.error(err);
  }
}
</script>
