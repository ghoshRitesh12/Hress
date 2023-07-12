<template>
  
  <div data-development-incentive>

    <div 
      class="
      flex items-center justify-between 
      px-4 bg-zinc-900 py-3 rounded-2xl
      "
    >
      <div 
        class="
        text-[1rem] pointer-events-none
        "
      >
        Development Incentive
      </div>

      <button
        v-show="!isPending"
        class="
        text-[.85rem] bg-zinc-700 px-4 py-[.4rem]
        rounded-xl ml-auto cursor-pointer
        select-none
        "
        @click="toggleTab"  
      >
        {{ tabStateText }}
      </button>
      <Icon
        v-show="isPending"
        class="text-2xl"
        name="line-md:loading-twotone-loop"
      />

    </div>

    <div v-if="rankWiseDevIncentives?.length > 0"
      v-show="isTabOpen"
      class="
      flex flex-col border-[1px] pb-3
      mx-2 border-zinc-700 border-t-0
      rounded-bl-2xl rounded-br-2xl
      "
    >
      <IncomeRankDevIncentive
        v-for="rankDevIncentive in rankWiseDevIncentives"
        :key="rankDevIncentive.rank"
        :incentive="rankDevIncentive.incentive"
        :rank="rankDevIncentive.rank"
      />

      <div data-total-dev-inc
        class="
        flex items-center justify-between mt-4 px-1
        mx-4 sm:mx-5 font-semibold text-[.95rem]
        "
      >
        <div class="leading-[1.3]">
          Total Development Incentive:
        </div>

        <div>
          {{ 
            new Intl.NumberFormat(
              'en-IN', 
              { style: 'currency', currency: 'INR' }
            ).format(totalDevIncentive || 0) 
          }}
        </div>

      </div>
    </div>

    <Inconvenience 
      v-if="rankWiseDevIncentives?.length < 1"
      img-src="/images/data_reports.svg"
      img-style="
      max-w-[16rem] md:max-w-[22rem]
      "
      class="mt-6"
    >
      <div v-if="props?.endpoint?.includes('/admin/profile')">
        Looks like this member isn't eligible for any
        development incentive.
      </div>
      <div v-else>
        Looks like as of now, you aren't eligible for any
        development incentive.
        <br>
        Sponsor more members to be eligible.
      </div>
    </Inconvenience>

  </div>
  
</template>


<script setup>

const props = defineProps({
  endpoint: {
    type: String
  }
})

const { setPopupMessage } = usePopup();
const totalDevIncentive = useState(() => 0)
const rankWiseDevIncentives = useState(() => null)

const isPending = useState(() => false);
const isTabOpen = useState(() => false);
const tabStateText = useState(() => 'Show');


const getDevIncentives = async () => {
  try {
    isPending.value = true;
    const headers = useRequestHeaders(['cookie'])
    const { data, error, pending } = await useFetch(
      props?.endpoint, 
      { headers }
    )
    isPending.value = pending.value;

    if(data.value) {
      totalDevIncentive.value = data.value?.totalDevIncentive;
      rankWiseDevIncentives.value = data.value?.rankWiseDevIncentive;
    }
    
    setPopupMessage(error.value?.statusMessage)
    if(error.value) throw error


  } catch (err) {
    console.log(err);
  }
}

const toggleTab = async () => {
  isTabOpen.value = true;

  if(!rankWiseDevIncentives.value) {
    await getDevIncentives()

    if(rankWiseDevIncentives.value?.length > 0)
    tabStateText.value = 'Open'
  }
}

onBeforeUnmount(() => {
  isTabOpen.value = false;
  rankWiseDevIncentives.value = null;
})

</script>


<style scoped>

</style>
