<template>
  <div data-account-rewards>
    <div v-if="data?.userActive">
      <div class="text-2xl border-zinc-700/80 pb-3 mt-0 border-b-[1px]">
        Rank rewards
      </div>

      <div class="flex items-center gap-6 mt-8 mb-12 flex-wrap">
        <RewardsRank
          class="flex-grow"
          :rank="data?.rank"
        />
        <RewardsName
          class="flex-grow"
          :rank="data?.rank"
        />
      </div>

      <RewardsRankTable :rank="data?.rank" />
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
const { setPopupMessage } = usePopup();

useHead({
  title: "Account - Rewards",
});

definePageMeta({
  layout: "account",
  middleware: "native",
});

const { data, error } = await useFetch("/api/account/rewards");
if (error.value) setPopupMessage(error?.value?.statusMessage);
</script>
