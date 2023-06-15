<template>

  <footer
    class="
    flex items-center flex-wrap-reverse w-full mt-auto
    gap-2 pt-4 pb-3 px-2 2xl:px-8 text-[.85rem] 
    justify-center md:justify-between bg-zinc-900
    "
  >

    <div class="text-zinc-400">
      &copy; 2023 Hress Limited.
    </div>

    <div data-footer-links 
      class="sm:ml-auto"
    >

      <NuxtLink
        v-for="footerLink in footerLinks"
        :to="footerLink.href"
        :key="footerLink.href"
        class="
        text-zinc-400 hover:text-green-200
        transition ease-in duration-100
        py-1 px-2 ml-0 md:ml-1 
        "
      >
        {{ footerLink.name }}
      </NuxtLink>

    </div>

  </footer>

</template>


<script setup>



const footerLinks = ref([
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
  { name: 'Get in touch', href: '/contact' },
]);
  
</script>


<style>

</style>
