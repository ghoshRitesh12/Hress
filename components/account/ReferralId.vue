<template>

  <div 
    class="
    flex items-center py-[.55rem] pl-4 
    pr-3 sm:pl-6 sm:pr-4 rounded-2xl 
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
      {{ props.referralId }}
    </div>

    <button
      class="
      py-3 px-4 ml-auto cursor-pointer
      flex-shrink-0 bg-primary-900 rounded-2xl
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

</template>


<script setup>

const props = defineProps({
  referralId: {
    type: String,
    required: true
  }
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


<style>

</style>
