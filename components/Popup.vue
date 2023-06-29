<template>

  <div 
    v-if="isPopupOpen"
    data-popup
    class="
    fixed isolate z-[350] bottom-[4.5rem] ml-1
    sm:bottom-[4rem] sm:right-[2rem] w-[98%] sm:w-fit
    flex items-center gap-1 md:gap-3 sm:mx-0
    bg-white rounded-2xl overflow-hidden text-[.95rem]
    shadow-lg shadow-black/40 px-4 py-3 sm:px-6
    "
    style="transition: .2s ease all" 
  >

    <div 
      class="
      text-black leading-[1.4] select-none
      max-w-full w-full sm:max-w-[35ch] 
      "
      :style="`
        transition: .2s ease max-width;
        word-spacing: .1rem;
      `"
    >
      {{ popupMessage }}
    </div>

    <div
      v-if="false"
      class="
      py-2 px-2 cursor-pointer
      rounded-[50%] hover:bg-zinc-400/70
      "
      :style="'transition: .2s ease background'"
      @click="closePopup"
    >
      <Icon
        name="ic:round-close"
        class="text-2xl text-black pointer-events-none"
      />
    </div>

  </div>

</template>


<script setup>
import { closePopup, isPopupOpen, popupMessage } from "../store/popup.js";


watch(
  () => isPopupOpen.value,
  () => {
    if(isPopupOpen.value) {
      const timeout = setTimeout(() => {
        closePopup()
        clearTimeout(timeout);
      }, 2500)
    }
  }
)


</script>


<style>

</style>
