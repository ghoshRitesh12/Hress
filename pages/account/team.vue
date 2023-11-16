<template>
  <div
    data-account-team
    class="pb-12"
  >
    <div
      v-if="data?.userActive"
      class="min-h-[42vh] md:min-h-[57vh]"
    >
      <TeamParentMember
        class="mb-6"
        v-if="data.sponsorer"
        :sponsorer-name="data.sponsorer.info.name"
        :sponsorer-referral-id="data.sponsorer.referralId"
      />
      <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-0">
        My Team
      </div>

      <div class="text-zinc-400 text-[.85rem] mt-4">
        Select a level to view the members present in that level.
      </div>

      <Select
        v-if="data?.selectLevels?.length"
        class="w-[15rem] ml-auto mt-4"
        placeholder="Select team level"
        :options="data.selectLevels"
        @input-change="fetchLevel"
      />

      <div
        v-if="data?.selectLevels?.length > 0"
        class="flex flex-col gap-6 mt-8"
      >
        <TeamLevel
          v-if="selectedLevelInfo"
          :key="selectedLevelInfo.levelNo"
          :level-no="selectedLevelInfo.levelNo"
          :referrals="selectedLevelInfo.referrals"
          :has-more-referrals="selectedLevelInfo.hasMore"
          :total-no-of-referrals="selectedLevelInfo.totalReferrals"
          :fetch-url="`/api/account/team/${selectedLevelInfo.levelNo}`"
        />
      </div>

      <Inconvenience
        v-else
        img-src="/images/join_team.svg"
        :img-width="512"
        :img-height="532"
        img-style="
        max-w-[9rem] sm:max-w-[12rem] md:max-w-[15rem]
        "
        class="mt-16"
      >
        Oops, it seems like you haven't sponsored any member yet.
        <br />
        Members sponsored by you show up here in their respective levels.
      </Inconvenience>
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
  title: "Account - My Team",
});

definePageMeta({
  layout: "account",
  middleware: "native",
});

// const activeLevel = ref(-1);
// const toggleLevel = (levelIndex) => {
//   activeLevel.value = levelIndex;
// };

const { setPopupMessage } = usePopup();

// fetch initial data
const { data, error } = await useFetch("/api/account/team", {
  headers: useRequestHeaders(["cookie"]),
});
if (error.value) setPopupMessage(error?.value?.statusMessage);

const selectedLevelInfo = useState(() => null);
async function fetchLevel(selectedLevel) {
  const { data, error, pending } = await useFetch(
    `/api/account/team/${selectedLevel}`,
    {
      headers: useRequestHeaders(["cookie"]),
    }
  );

  if (error?.value) {
    setPopupMessage(error?.value?.statusMessage);
    return;
  }
  selectedLevelInfo.value = data?.value ?? null;
}

onUnmounted(() => {
  selectedLevelInfo.value = null;
});
</script>
