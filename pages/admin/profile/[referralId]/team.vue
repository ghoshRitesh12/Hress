<template>
  <div
    data-account-team
    class="pb-12"
  >
    <TeamParentMember
      class="mb-6"
      v-if="data.sponsorer"
      :sponsorer-name="data.sponsorer.info.name"
      :sponsorer-referral-id="data.sponsorer.referralId"
    />

    <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-0">Team</div>

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
        :fetch-url="`/api/admin/profile/${params?.referralId}/team/${selectedLevelInfo.levelNo}`"
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
      Oops, this member hasn't sponsored any member yet.
    </Inconvenience>
  </div>
</template>

<script setup>
const { params } = useRoute();
useHead({
  title: `${params.referralId} - Team`,
});
definePageMeta({
  layout: "view-profile",
  middleware: ["native", "admin"],
});

const { setPopupMessage } = usePopup();

const { data, error } = await useFetch(
  `/api/admin/profile/${params.referralId}/team`,
  {
    headers: useRequestHeaders(["cookie"]),
  }
);
if (error.value) setPopupMessage(error?.value?.statusMessage);

const selectedLevelInfo = useState(() => null);
async function fetchLevel(selectedLevel) {
  const { data, error, pending } = await useFetch(
    `/api/admin/profile/${params.referralId}/team/${selectedLevel}`,
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
