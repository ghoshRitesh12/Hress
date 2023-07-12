<template>

  <div data-account-income>

    <div 
      class="
      text-2xl border-b-[1px] border-zinc-700/80
      pb-3 mt-0
      "
    >
      Income
    </div>

    <IncomeLevelWiseTab 
      :levels="data?.levels"
      :total-level-income="data?.totalLevelIncome"
      :admin-view="true"
      class="my-6"
    />

    <IncomeDevIncentiveTab
      class="my-6"
      :endpoint="`/api/admin/profile/${params.referralId}/income/dev-incentive`"
    />

    <IncomeTrainerIncentive
      :trainer-incentive="data?.trainerIncentive"
    />
  </div>

</template>


<script setup>

const { params } = useRoute();

useHead({
  title: `${params.referralId} - Income`,
})

definePageMeta({
  layout: 'view-profile',
  middleware: ['native', 'admin']
})


const { setPopupMessage } = usePopup();

const headers = useRequestHeaders(['cookie'])
const { data, error } = await useFetch(
  `/api/admin/profile/${params.referralId}/income`,
  { headers }
);

setPopupMessage(error.value?.statusMessage);
if(error.value) throw error

</script>


<style scoped>

</style>
