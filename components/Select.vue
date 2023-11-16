<script setup>
import fc from "~/utils/classes";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["input-change"]);

const isOpen = useState(`${props.placeholder} iO`, () => false);
const selectedLabel = useState(`${props.placeholder} sL`, () => null);
const selectedValue = useState(`${props.placeholder} sV`, () => null);

function onInputChange(option) {
  if (selectedLabel.value === option.label) {
    return;
  }

  selectedLabel.value = option.label;
  selectedValue.value = option.value;
  isOpen.value = false;
  emits("input-change", selectedValue.value);
}

onUnmounted(() => {
  selectedLabel.value = null;
  selectedValue.value = null;
  isOpen.value = false;
});
</script>

<template>
  <div class="relative text-left bg-primary-900">
    <button
      type="button"
      role="select"
      :class="
        fc(`
          flex items-center justify-between rounded-xl
          border-[1px] border-zinc-700 py-[.6rem] px-4 
          w-full align-middle leading-[1.2] text-[.9rem]
        `)
      "
      @click="isOpen = !isOpen"
    >
      {{ selectedLabel ? selectedLabel : props.placeholder }}
      <Icon
        name="heroicons:chevron-up-down-solid"
        class="text-lg text-zinc-400 align-middle ml-1 flex-shrink-0"
      />
    </button>

    <div
      data-select-dropdown
      :class="
        fc(`
          absolute w-full isolate z-[80] mt-1 rounded-xl 
          overflow-x-hidden border-zinc-700 border-[1px] 
          overflow-y-auto options bg-primary-900
          shadow-lg shadow-black/40
          ${
            !isOpen
              ? 'border-none opacity-0 invisible translate-y-[0] max-h-0 mt-0'
              : 'opacity-100 visible translate-y-[.1rem] max-h-[11rem]'
          }
        `)
      "
      style="transition: 0.2s ease-in, 0.1s ease-in opacity"
    >
      <div
        :class="
          fc(`
            py-2 px-4 w-full align-middle text-[.9rem] leading-[1.2]
            text-zinc-500 pointer-events-none font-semibold
          `)
        "
      >
        {{ props.placeholder }}
      </div>

      <div
        v-for="option of options"
        tabindex="1"
        :key="option.label"
        :class="
          fc(`
            py-2 px-3 mx-[.4rem] rounded-lg mb-1
            select-none first:mt-2 last:mb-[.4rem]
            ${
              selectedLabel === option.label
                ? 'bg-zinc-800/70'
                : 'hover:bg-zinc-800'
            }
          `)
        "
        @click="() => onInputChange(option)"
      >
        <div
          class="flex items-center justify-between pointer-events-none w-full"
        >
          <div class="flex-grow text-[.9rem] capitalize leading-[1.4]">
            {{ option.label }}
          </div>
          <Icon
            v-show="selectedLabel === option.label"
            name="charm:tick"
            class="flex-shrink-0 ml-[.35rem]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.options::-webkit-scrollbar-track {
  border-radius: 10rem;
}
</style>
