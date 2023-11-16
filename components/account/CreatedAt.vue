<template>
  <div
    v-if="props.createdAt"
    class="flex items-center gap-2 bg-zinc-800/60 w-fit px-4 py-[.35rem] rounded-xl"
  >
    <Icon
      name="uil:info-circle"
      class="text-lg align-middle"
    />
    <div class="text-[.9rem]">
      Joined
      {{
        timestamp.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  createdAt: {
    type: String,
    required: true,
  },
});

const timestamp = new Date(props?.createdAt);
</script>
