<template>

  <div 
    v-if="popupMessage" data-popup
    class="
    fixed isolate z-[350] bottom-[4rem] md:bottom-[4.5rem]
    sm:left-auto translate-x-[-50%] sm:translate-x-[0]
    sm:w-fit sm:bottom-[4rem] sm:right-[3rem] left-[50%]
    w-[92.5%] flex items-center gap-1 md:gap-3 sm:mx-0
    bg-zinc-700 rounded-2xl overflow-hidden text-[.95rem]
    shadow-lg shadow-black/40 px-4 py-[.85rem] sm:px-6
    "
    style="transition: .2s ease all" 
  >

    <div 
      class="
      text-white leading-[1.4] select-none
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
    >
      <Icon
        name="ic:round-close"
        class="text-2xl text-black pointer-events-none"
      />
    </div>

  </div>

</template>


<script setup>
const { popupMessage, closePopup } = usePopup();

watch(
  () => popupMessage.value,
  () => {
    if(popupMessage.value) {
      const t = setTimeout(() => {
        closePopup()
        clearTimeout(t);
      }, 2500)
    }
  }
)


</script>


<style>

</style>
