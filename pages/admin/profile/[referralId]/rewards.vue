<template>

  <div data-account-rewards>

    <div 
      class="
      text-2xl border-zinc-700/80
      pb-3 mt-0 border-b-[1px]
      "
    >
      Rank rewards
    </div>

    <div
      class="
      flex items-center gap-6
      mt-8 mb-12 flex-wrap
      "
    >
      <RewardsRank
        class="flex-grow"
        :rank="data?.rank"
      />
      <RewardsName
        class="flex-grow"
        :rank="data?.rank"
      />
    </div>

    <RewardsRankTable 
      :rank="data?.rank"
    />

  </div>

</template>


<script setup>

const route = useRoute();
const { setPopupMessage } = usePopup();

useHead({
  title: `${route.params.referralId} - Rewards`,
})

definePageMeta({
  layout: 'view-profile',
  middleware: ['native', 'admin']
})

const headers = useRequestHeaders(['cookie'])
const { data, error } = await useFetch(
  `/api/admin/profile/${route.params.referralId}/rewards`, 
  { headers }
);

setPopupMessage(error?.value?.statusMessage)
if(error.value) {
  throw error;
}

</script>


<style scoped>

</style>
