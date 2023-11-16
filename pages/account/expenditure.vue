<template>
  <div data-account-expenditure>
    <ExpenditureGeneratePayout
      :select-expenditures="data?.selectExpenditures"
    />

    <ExpenditureBiMonthly :select-expenditures="data?.selectExpenditures" />

    <Popup />
  </div>
</template>

<script setup>
useHead({
  title: "Account - Expenditure",
});
definePageMeta({
  layout: "account",
  middleware: ["native", "admin"],
});

const { data, error } = await useFetch("/api/account/expenditure/statements");
if (error?.value) {
  setPopupMessage(error?.value?.statusMessage);
}
</script>
