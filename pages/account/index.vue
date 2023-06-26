<template>

  <div class="" data-profile>

    <div
      class="
      flex items-center gap-10
      border-[0px] border-zinc-600
      rounded-2xl mb-10 flex-wrap lg:flex-nowrap
      justify-center lg:justify-normal
      "
    >

      <AccountProfileHeader
        :username="'Mamata Rani Karmakar Karmakar Karmakar Ghosh Ghosh'"
        :pfp="'https://api.dicebear.com/6.x/bottts/png?seed=1687525904415&eyes=shade01&mouth=smile01&texture=circuits&face=round02&sides=square'"
      />

      <div
        class="
        flex flex-col gap-6 text-[1.05rem]
        w-full items-center
        "
      >

        <AccountCourse
          course-type="basic"
        />

        <AccountVerifiedTab
          class="w-full"
        />
        <AccountActiveTab
          class="w-full"
          :is-active="false"
        />
  
      </div>
      
    </div>

    <div data-profile-status
      class="
      flex gap-x-10 gap-y-4 flex-wrap 
      lg:flex-nowrap my-8
      "
    >
      <AccountRank :rank="14"/>

      <AccountReferralId
        :referral-id="'7cf2063d38'"
      />
    </div>
    
    <AccountPersonalInfoSection
      :info="personalInfo"
    />

    <button
      type="button"
      class="
      flex items-center gap-2
      bg-red-400 text-primary-900 mt-8 ml-auto
      py-[.65rem] px-6 rounded-2xl hover:bg-red-500
      transition ease-in duration-100 w-fit
      "
    >

      <Icon
        class="text-lg"
        name="tabler:logout"
      />

      <div>
        Logout
      </div>
    </button>

  </div>

</template>


<script setup>


useHead({
  title: 'Account - Profile'
})

definePageMeta({
  layout: 'account'
})





const personalInfo = {
  name: 'Susanta Ghosh',
  email: 'ghoshrites32@gmail.com',
  phoneNumber: '6381924231',
  pancardNo: 'GDT0P8284L2',
  country: 'India',
  postalCode: '700150',
  cityState: 'Kolkata, West Bengal',
  streetAddress: 'H.C.Sarani, Deshbandhupark, Idol Heights S-1, H.C.Sarani, Deshbandhupark, Idol Heights S-1, H.C.Sarani, Deshbandhupark, Idol Heights S-1',
  bankAccountNo: '5432135824731904',
  ifsc: 'UBNI9665266'
}




</script>


<style scoped>



</style>
