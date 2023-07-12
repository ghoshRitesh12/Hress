<template>

  <div data-account-team 
    class="pb-12"
  >

    <div v-if="data?.userActive">
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
        My Team
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
        Oops, it seems like you haven't sponsored any member yet. 
        <br>
        Members sponsored by you show up here
        in their respective levels.
      </Inconvenience>
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
  title: 'Account - My Team'
})

definePageMeta({
  layout: 'account',
  middleware: 'native'
})


const activeLevel = ref(-1);
const toggleLevel = (levelIndex) => {
  activeLevel.value = levelIndex
}

const { setPopupMessage } = usePopup();

const { data, error } = await useFetch('/api/account/team');

if(error.value) setPopupMessage(error?.value?.statusMessage)


</script>


<style>

</style>
