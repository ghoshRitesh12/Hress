<template>
  <div data-account-income>
    <div
      v-if="data?.userActive"
      class="min-h-[42vh] md:min-h-[57vh]"
    >
      <IncomeLevelIncomeSection
        :select-income-levels="data?.selectIncomeLevels"
        fetch-url="/api/account/income/level"
        :admin-view="false"
      />

      <IncomePrevIncomeSection
        :past-income-statements="data?.pastIncomeStatements"
        fetch-url="/api/account/income/statement"
        :admin-view="false"
      />

      <IncomeCarFundTab
        class="my-6"
        endpoint="/api/account/income/carfund"
      />
    </div>

    <Inconvenience
      v-else
      img-src="/images/inactive.svg"
      img-style="max-w-[15rem] md:max-w-[22rem]"
      class="mt-10 md:mt-5"
    >
      It seems like your account is not active, because it was
      <strong>not approved</strong>
      by any admin.
      <br />
      Activate your account in order to continue your daily activities.
    </Inconvenience>
  </div>
</template>

<script setup>
useHead({
  title: "Account - Income",
});

definePageMeta({
  layout: "account",
  middleware: "native",
});

const { setPopupMessage } = usePopup();

const { data, error } = await useFetch("/api/account/income", {
  headers: useRequestHeaders(["cookie"]),
});
if (error.value) setPopupMessage(error.value?.statusMessage);

//
</script>
