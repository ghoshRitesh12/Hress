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

      <div
        class="
        flex justify-center items-center flex-col
        gap-y-4 border-[1px] border-zinc-600
        py-6 w-full rounded-2xl
        xl:px-[6rem]
        "
      >

        <div class="max-w-[5rem]">
          <nuxt-img
            src="https://api.dicebear.com/6.x/bottts/png?seed=1687525904415&eyes=shade01&mouth=smile01&texture=circuits&face=round02&sides=square"
            alt="profile-picture"
            format="png"
            width="256"
            height="256"
            decoding="async"
            fetchpriority="high"
          />
        </div>
  
        <div 
          class="
          text-lg text-center max-w-[20ch]
          md:text-xl leading-[1.4]
          "
        >
          {{ 'Mamata Rani Karmakar Karmakar Karmakar Ghosh Ghosh' }}
        </div>
  
      </div>

      <div data-rank-and-referralId
        class="
        flex flex-col gap-6 text-[1.05rem]
        lg:pr-6 w-full items-center
        "
      >
  
        <div 
          class="
          flex flex-grow flex-[50%] items-center
          py-3 px-6 rounded-2xl 
          bg-zinc-800/60 w-full
          "
        >
          <div class="flex-shrink-0">
            Referral Id:
          </div>
  
          <div 
            class="ml-3 font-semibold"
            ref="referralId"
          >
            {{ '7cf2063d38' }}
          </div>


          <button
            class="
            py-2 px-4 ml-auto cursor-pointer
            flex-shrink-0 border-[0px]
            "
            type="button"
            @click="copyItem"
          >
            <Icon 
              :name="copyIcon"
              class="text-xl pointer-events-none"
            />
          </button>
  
        </div>
  
        <div 
          class="
          flex flex-grow flex-[50%] items-center
          py-5 px-4 rounded-2xl w-full
          bg-zinc-800/60 md:whitespace-nowrap
          "
        >
          <div>
            Rank:
          </div>
  
          <div class="ml-3 text-center">
            {{ 'Crown Diamond Trader (14)' }}
          </div>
  
        </div>
  
      </div>
      
    </div>

    
    <div
      class="
      py-4 px-5 border-[1px] 
      border-zinc-600 rounded-2xl
      "
    >

      <div 
        class="
        flex items-center justify-between
        mb-8
        "
      >

        <div class="text-lg font-semibold">
          Personal Information
        </div>

        <button 
          class="
          flex items-center bg-zinc-800 w-fit
          py-2 px-4 rounded-xl text-zinc-300
          hover:bg-zinc-700/80 transition
          ease-in duration-100 ml-4
          "
        >

          <div>Edit</div>

          <Icon
            class="ml-2 text-lg flex-shrink-0"
            name="iconamoon:edit"
          />

        </button>

      </div>


      <section
        class="
        grid gap-y-8 gap-x-4 info-section
        "
        style="grid-template-columns: repeat(var(--col), 1fr);"
      >

        <div>
  
          <div class="text-sm text-zinc-400">
            Full name
          </div>
  
          <div class="mt-1 text">
            {{ 'Susanta Ghosh' }}
          </div>
  
        </div>
  
        <div>
  
          <div class="text-sm text-zinc-400">
            Email address
          </div>
  
          <div class="mt-1 text">
            {{ 'ghoshritesh55@gmail.com' }}
          </div>
  
        </div>

        <div>
  
          <div class="text-sm text-zinc-400">
            Phone
          </div>
  
          <div class="mt-1 text">
            {{ '6381924231' }}
          </div>
  
        </div>
        
        <div>
  
          <div class="text-sm text-zinc-400">
            Pancard No
          </div>
  
          <div class="mt-1 text">
            {{ 'GDT0P8284L2' }}
          </div>
  
        </div>

        <div>
          
          <div class="text-sm text-zinc-400">
            Country
          </div>

          <div class="mt-1 text">
            {{ 'India' }}
          </div>

        </div>

        <div>
          
          <div class="text-sm text-zinc-400">
            City, State
          </div>

          <div class="mt-1 text">
            {{ 'Kolkata, West Bengal' }}
          </div>

        </div>

        <div>
          
          <div class="text-sm text-zinc-400">
            Postal Code
          </div>

          <div class="mt-1 text">
            {{ '700150' }}
          </div>

        </div>
        
        <div>
          
          <div class="text-sm text-zinc-400">
            Street address
          </div>

          <div class="mt-1 text">
            {{ 'H.C.Sarani, Deshbandhupark, Idol Heights S-1, H.C.Sarani, Deshbandhupark, Idol Heights S-1, H.C.Sarani, Deshbandhupark, Idol Heights S-1' }}
          </div>

        </div>

        <PersonalInfo
          context="Bank Account No"
          :context-value="'5432135824731904'"
          :context-type="'number'"
          :editable="false"
        />

        <PersonalInfo
          context="IFSC"
          context-value="UBNI9665266"
          :editable="false"
        />

      </section>


    </div>


  </div>

</template>


<script setup>
import PersonalInfo from '~/components/account/PersonalInfo.vue';


useHead({
  title: 'Account - Profile'
})

definePageMeta({
  layout: 'account'
})


const referralId = ref(null);
const copyIcon = ref('ion:copy-outline');
const copyItem = () => {
  navigator.clipboard.writeText(referralId.value.innerText).then(() => {
    copyIcon.value = 'ion:copy';
    const t = setTimeout(() => {
      copyIcon.value = 'ion:copy-outline';
      clearTimeout(t)
    }, 1000)
  })
}




</script>


<style scoped>

  .info-section {
    --col: 1;
  }

  @media (min-width: 786px) {
    .info-section {
      --col: 2;
    }
  }


</style>
