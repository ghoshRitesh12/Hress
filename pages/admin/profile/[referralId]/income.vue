<template>
  <div
    data-account-income
    class="min-h-[42vh] md:min-h-[57vh]"
  >
    <IncomeLevelIncomeSection
      :select-income-levels="data?.selectIncomeLevels"
      :fetch-url="`/api/admin/profile/${params.referralId}/income/level`"
      :admin-view="true"
    />

    <IncomePrevIncomeSection
      :past-income-statements="data?.pastIncomeStatements"
      :fetch-url="`/api/admin/profile/${params.referralId}/income/statement`"
      :admin-view="true"
    />

    <IncomeCarFundTab
      class="my-6"
      :endpoint="`/api/admin/profile/${params.referralId}/income/carfund`"
    />
  </div>
</template>

<script setup>
const { params } = useRoute();
useHead({
  title: `${params.referralId} - Income`,
});
definePageMeta({
  layout: "view-profile",
  middleware: ["native", "admin"],
});

const { setPopupMessage } = usePopup();

const { data, error } = await useFetch(
  `/api/admin/profile/${params.referralId}/income`,
  { headers: useRequestHeaders(["cookie"]) }
);
if (error.value) setPopupMessage(error.value?.statusMessage);

//
</script>
