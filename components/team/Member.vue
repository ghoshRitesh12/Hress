<template>

  <div data-member
    class="
    flex items-center justify-between gap-10
    odd:bg-zinc-900 px-6 py-[.6rem]
    overflow-x-auto text-[.9rem]
    "
  >
    
    <div data-member-name
      class="flex-shrink-0"
      :class="
        props.user?.active ? 'text-accent-100' : 'text-yellow-200'
      "
    >
      {{ props.user.info.name }}
    </div>

    <div v-if="props.user.referralId"
      class="flex-shrink-0"
    >
      {{ props.user.referralId }}
    </div>

    <TeamMemberRank
      :rank="props.user.rank"
    />
    
    <div data-member-commission
      class="flex-shrink-0"
    >
      {{ parsedCommission }}
    </div>

    <TeamMemberSpillover
      :spillover-type="spillOverType"
      class="flex-shrink-0"
    />

  </div>

</template>


<script setup>

const props = defineProps({
  commission: {
    type: Number,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
})

const parsedCommission = ref(`${props.commission}%`);
const spillOverType = ref('normal');


if(props.commission < 0) {
  spillOverType.value = 'indirect';

  parsedCommission.value = props.commission

} else if(props.commission > 20) {
  spillOverType.value = 'direct';

  const levelIncentive = props.commission - 20,
  spilloverIncentive = props.commission - levelIncentive;

  parsedCommission.value = `${spilloverIncentive}% + ${levelIncentive}%`
}



</script>


<style scoped>

  [data-level] [data-member] {
    scrollbar-width: none;
  }
  [data-level] [data-member]::-webkit-scrollbar {
    display: none;
  }

</style>
