<template>
  <div data-account-income>
    <div v-if="data?.userActive">
      <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-0">
        My Income
      </div>

      <div class="text-[.85rem] text-zinc-400 mt-2">
        {{ d.toLocaleString("default", { month: "long" }) }} month's
        <span>{{ d.getDate() < 15 ? 1 : 2 }}</span>
        <sup>{{ d.getDate() < 15 ? "st" : "nd" }}</sup>
        level income.
      </div>

      <Select
        v-if="data?.selectIncomeLevels?.length"
        class="w-[15rem] ml-auto mt-4"
        placeholder="Select level income"
        :options="data?.selectIncomeLevels"
        @input-change="fetchLevelIncome"
      />
      <Inconvenience
        v-else
        img-src="/images/join_team.svg"
        :img-width="512"
        :img-height="532"
        img-style="
          max-w-[9rem] sm:max-w-[12rem] md:max-w-[15rem]
        "
        class="mt-6"
      >
        <!-- <div v-if="props?.adminView">
          Oops this user hasn't sponsored any member yet.
        </div> -->
        <!-- <div v-else> -->
        <div>
          Oops, it seems like you haven't sponsored any member yet.
          <br />
          Members sponsored by you show up here in their respective levels.
        </div>
      </Inconvenience>

      <IncomeLevelWiseTab
        :level="incomeLevelInfo"
        class="my-6"
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

const d = new Date();
const { setPopupMessage } = usePopup();

const { data, error } = await useFetch("/api/account/income");
if (error.value) setPopupMessage(error.value?.statusMessage);

const incomeLevelInfo = useState(() => null);
async function fetchLevelIncome(incomeLevel) {
  try {
    const { data, error } = await useFetch(
      `/api/account/income/level/${incomeLevel}`
    );
    if (error.value) {
      setPopupMessage(error.value?.statusMessage);
      return;
    }
    incomeLevelInfo.value = data.value;
  } catch (err) {
    console.error(err);
  }
}

onUnmounted(() => {
  incomeLevelInfo.value = null;
});
</script>
