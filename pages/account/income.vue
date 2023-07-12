<template>

  <div data-account-income>

    <div v-if="data?.userActive">

      <div 
        class="
        text-2xl border-b-[1px] border-zinc-700/80
        pb-3 mt-0
        "
      >
        My Income
      </div>
  
      <IncomeLevelWiseTab 
        :levels="data?.levels"
        :total-level-income="data?.totalLevelIncome"
        class="my-6"
      />
  
      <IncomeDevIncentiveTab
        class="my-6"
        endpoint="/api/account/income/dev-incentive"
      />
  
      <IncomeTrainerIncentive
        :trainer-incentive="data?.trainerIncentive"
      />
      
    </div>


    <Inconvenience v-else
      img-src="/images/inactive.svg"
      img-style="max-w-[15rem] md:max-w-[22rem]"
      class="mt-10 md:mt-5"
    >
      It seems like your account is not active,
      because it was 
      <strong>not approved</strong>  
      by any admin.
      <br>
      Activate your account in order to continue
      your daily activities.
    </Inconvenience>

  </div>

</template>


<script setup>

useHead({
  title: 'Account - Income'
})

definePageMeta({
  layout: 'account',
  middleware: 'native'
})


const { setPopupMessage } = usePopup();

const { data, error } = await useFetch('/api/account/income');
if(error.value) setPopupMessage(error.value?.statusMessage);

  
</script>


<style>

</style>
