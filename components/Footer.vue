<template>
  <footer
    v-once
    :class="
      fc(`
        flex items-center flex-col-reverse sm:flex-row 
        pt-4 pb-3 sm:pb-4 sm:pt-5 px-2 sm:px-6 2xl:px-8 
        text-[.82rem] justify-center sm:justify-between 
        bg-zinc-900 gap-y-1 gap-x-2 mt-auto w-full
      `)
    "
  >
    <div class="text-zinc-400">
      <span class="text-sm align-middle"> &copy; </span>
      Hress Trading Corporation
    </div>

    <div
      data-footer-links
      class="sm:ml-auto"
    >
      <NuxtLink
        v-for="footerLink in footerLinks"
        :to="footerLink.href"
        :key="footerLink.href"
        :class="
          fc(`
            text-zinc-400 hover:text-green-200
            transition ease-in duration-100
            py-1 px-2 ml-0 md:ml-1 
          `)
        "
      >
        {{ footerLink.name }}
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup>
import fc from "~/utils/classes";

const footerLinks = ref([
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Get in touch", href: "/contact" },
]);
</script>

<style></style>
