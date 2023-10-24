<template>
  <div data-account-expenditure>
    <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-0">
      Generate Expenditure Statement
    </div>

    <div class="text-[.95rem] text-zinc-400 mt-2">
      Generate
      {{ new Date().toLocaleString("default", { month: "long" }) }} month's
      <span>{{ new Date().getDate() < 15 ? 1 : 2 }}</span>
      <sup>{{ new Date().getDate() < 15 ? "st" : "nd" }}</sup>
      expenditure payout statement.
    </div>

    <form
      class="ml-auto whitespace-nowrap w-fit mt-4"
      @submit.prevent="submitPayoutRequest"
    >
      <button
        type="submit"
        :class="
          fc(`
            w-full bg-accent-200 hover:bg-green-400 px-5 py-2 
            sm:py-[.6rem] rounded-xl text-[.95rem] font-semibold 
            text-primary-900 transition ease-in duration-100
            active:scale-95
          `)
        "
      >
        Generate Payout
      </button>
    </form>

    <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-8">
      Bi-Monthly Expenditure Statement
    </div>

    <Select
      v-if="data?.selectExpenditures?.length"
      class="w-[15rem] ml-auto mt-4"
      placeholder="Select expenditure statement"
      @input-change="getExpenditure"
      :options="data?.selectExpenditures"
    />

    <Popup />
  </div>
</template>

<script setup>
import fc from "~/utils/classes";

useHead({
  title: "Account - Expenditure",
});
definePageMeta({
  layout: "account",
  middleware: ["native", "admin"],
});

const { setPopupMessage } = usePopup();
const { data, error } = await useFetch("/api/account/expenditure");
if (error?.value) {
  setPopupMessage(error?.value?.statusMessage);
}

async function submitPayoutRequest() {
  try {
    const { data, error } = await useFetch("/api/payout-req", {
      method: "POST",
      body: {
        timestamp: Date.now(),
      },
    });

    setPopupMessage(data?.value?.message);
    if (error?.value) {
      setPopupMessage(error?.value?.statusMessage);
    }
  } catch (err) {
    console.error(err);
  }
}

async function getExpenditure(expenditureDate) {
  try {
    console.log(expenditureDate);
  } catch (err) {
    console.error(err);
  }
}
</script>
