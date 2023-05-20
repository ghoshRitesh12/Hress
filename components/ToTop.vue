<template>

  <button 
    type="button" 
    aria-label="scroll to top"
    class="
    grid place-items-center fixed bottom-6 right-6 
    w-fit bg-zinc-600/70 p-2 rounded-[50%]
    "
    ref="scrollToTopBtn"
    v-show="scrollToTopBtnVisible"
    @click="scrollToTop"
    title="scroll to top"
  >
    <Icon 
      name="material-symbols:keyboard-arrow-up-rounded"
      class="pointer-events-none text-3xl"
    />
  </button>

</template>


<script setup>

const scrollToTop = () => window.scrollTo(0,0);

const scrollToTopBtn = ref(null);
const scrollToTopBtnVisible = ref(false);
const scrollThreshold = 500;


onMounted(() => {
  
  window.addEventListener('scroll', () => {
    if(window.scrollY > scrollThreshold) {
      scrollToTopBtnVisible.value = true;
      return;
    } 
    scrollToTopBtnVisible.value = false;
  })

})


</script>


<style>

</style>
