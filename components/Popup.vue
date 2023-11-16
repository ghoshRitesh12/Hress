<template>
  <div
    data-popup
    v-if="popupMessage"
    :class="
      fc(`
        flex items-center gap-1 md:gap-2 fixed isolate z-[350] 
        bottom-[4rem] md:bottom-[4.5rem] sm:left-auto left-[50%]
        translate-x-[-50%] sm:translate-x-[0] sm:w-fit 
        sm:bottom-[4rem] sm:right-[3rem] w-[92.5%] sm:mx-0 
        bg-zinc-700 rounded-2xl overflow-hidden text-[.95rem] 
        shadow-lg shadow-black/40 pl-5 py-[.5rem] sm:pl-6 pr-2
      `)
    "
    style="transition: 0.2s ease all"
  >
    <!-- px-5 py-[1rem] sm:px-6 -->
    <div
      class="text-white leading-[1.4] select-none max-w-full w-full sm:max-w-[35ch]"
      :style="`
        transition: .2s ease max-width;
        word-spacing: .1rem;
      `"
    >
      {{ popupMessage }}
    </div>

    <button
      type="button"
      :class="
        fc(`
          py-2 px-2 cursor-pointer rounded-md
          border-[0px]
        `)
      "
      :style="'transition: .2s ease background'"
      @click="closePopup"
    >
      <Icon
        name="ic:round-close"
        class="text-xl text-zinc-300 pointer-events-none"
      />
    </button>
  </div>
</template>

<script setup>
import fc from "~/utils/classes";
const { popupMessage, closePopup } = usePopup();
const t = useState(() => null);

watch(
  () => popupMessage.value,
  () => {
    if (popupMessage?.value) {
      t.value = setTimeout(() => {
        closePopup();
        clearTimeout(t.value);
      }, 2500);
    }
  }
);

onUnmounted(() => {
  clearTimeout(t.value);
  // closePopup();
});
</script>
