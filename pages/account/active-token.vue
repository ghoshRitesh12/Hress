<template>
  <div data-account-active-token>
    <ActiveTokenExisting />

    <ActiveTokenGenerate />

    <Popup />
  </div>
</template>

<script setup>
useHead({
  title: "Account - Active Token",
});
definePageMeta({
  layout: "account",
  middleware: ["native", "admin"],
});
</script>
