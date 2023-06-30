<template>

  <div data-level
    class=""
  >

    <div
      class="
      flex items-center py-3 px-4 sm:py-6
      bg-zinc-800 border-[1px] border-zinc-700
      rounded-2xl cursor-pointer
      "
      @click="openLevel"
    >

      <div 
        class="
        flex items-center w-full text-[1.08rem]
        pointer-events-none border-[0px]
        "
      >
        <div class="align-middle">
          Level
          <span class="ml-2">
            {{ props.levelNo }}
          </span>
        </div>

        <div 
          class="
          ml-auto mr-6 sm:mr-10 
          text-zinc-400 text-[.85rem]
          "
        >
          Members:
          <span class="ml-1">
            {{ referrals.length }}
          </span>
        </div>

      </div>

      <div class="ml-auto pointer-events-none">
        <Icon
          class="text-2xl"
          :name="`${
            props.levelOpen ? 
            'material-symbols:expand-less-rounded' :
            'material-symbols:expand-more-rounded'
          }`"
        />
      </div>

    </div>

    <div data-level-members
      v-show="props.levelOpen"
      class="
      flex flex-col gap-1 overflow-hidden
      mx-4 pt-0 border-[1px] border-t-0 
      border-zinc-700 rounded-bl-xl rounded-br-xl
      "
    >

      <TeamMember
        v-for="member in props.referrals"
        :commission="member.commission"
        :user="member.userRef"
      />

    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  levelNo: {
    type: Number,
    required: true
  },
  referrals: {
    type: Array,
    required: true
  },
  levelOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['toggle-level']);

const openLevel = () => {
  if(props.levelOpen) {
    emits('toggle-level', -1)
    return;
  }
  emits('toggle-level', props.index)
}


</script>


<style>

</style>
