<template>

  <div data-account-team 
    class="pb-12"
  >

    <TeamParentMember
      class="mb-6"
      v-if="data.sponsorer"
      :sponsorer-name="data.sponsorer.info.name"
      :sponsorer-referral-id="data.sponsorer.referralId"
    />

    <div 
      class="
      text-2xl border-b-[1px] border-zinc-700/80
      pb-3 mt-0
      "
    >
      Team
    </div>


    <div 
      v-if="data?.levels?.length > 0"
      class="flex flex-col gap-6 mt-8"
    >
      <TeamLevel
        v-for="level, index in data.levels"
        :index="index"
        :key="level.levelNo"
        :level-no="level.levelNo"
        :referrals="level.referrals"
        :level-open="activeLevel === index"
        @toggle-level="toggleLevel"
      />
    </div>

    <Inconvenience v-else
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
})

definePageMeta({
  layout: 'view-profile',
  middleware: ['native', 'admin']
})

const { setPopupMessage } = usePopup();

const activeLevel = ref(-1);
const toggleLevel = (levelIndex) => {
  activeLevel.value = levelIndex
}

const headers = useRequestHeaders(['cookie'])
const { data, error } = await useFetch(
  `/api/admin/profile/${params.referralId}/team`,
  { headers }
);

setPopupMessage(error?.value?.statusMessage)
if(error.value) throw error;

</script>


<style scoped>

</style>
