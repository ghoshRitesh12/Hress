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

      <div data-rank-and-referralId
        class="
        flex flex-col gap-6 text-[1.05rem]
        lg:pr-6 w-full items-center
        "
      >
  
        <AccountReferralId
          :referral-id="'7cf2063d38'"
        />
  
        <AccountRank :rank="6"/>
  
      </div>
      
    </div>

    
    <AccountPersonalInfoSection
      :info="personalInfo"
    />

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
