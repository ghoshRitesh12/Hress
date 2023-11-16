<template>
  <div class="flex flex-col min-h-[100vh]">
    <Titlebar
      :set-profile="true"
      nav-open-icon="fluent:grid-dots-24-regular"
    />

    <div class="px-6 pt-6 sm:pt-8 pb-16">
      ERROR -> {{ props?.error?.statusMessage || props?.error?.message }} <br />
      <br />
      URL -> {{ props?.error?.url }} <br />
      <br />
      STATUS_CODE -> {{ props?.error?.statusCode }} <br />
      <br />
      STACK:
      <div
        v-html="props?.error?.stack"
        class="max-w-[50%] text-zinc-400 text-sm"
      ></div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
const props = defineProps(["error"]);
</script>

<style scoped></style>
