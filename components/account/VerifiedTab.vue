<template>

  <div
    class="
    flex items-center justify-center select-none
    border-[1px] w-fit py-3 px-6 rounded-2xl 
    "
    :class="`${
      props.verified ? 
        'border-accent-100 bg-accent-200/5' :
        'border-zinc-500 bg-zinc-200/5'
    }`"
  >
    
    <div class="mr-3">
      <Icon 
        class="text-[1.03rem]"
        :name="
        props.verified ? 'octicon:verified' : 'octicon:unverified'
        "
        :class="`${
          props.verified ? 'text-accent-100' : 'text-zinc-500'
        }`"
      />
    </div>

    <div class="text-base md:text-[1.05rem]">
      Account is 
      {{ props.verified ? 'verified' : 'not verified' }}
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  verified: {
    type: Boolean,
    default: false
  }
})
  
</script>


<style>

</style>
