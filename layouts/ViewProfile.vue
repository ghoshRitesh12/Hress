<template>
  <div class="flex flex-col min-h-[100vh]">
    <Titlebar
      :set-profile="true"
      nav-open-icon="fluent:grid-dots-24-regular"
    />

    <div
      class="pt-4 sm:pt-8 pb-8 max-w-[92%] md:max-w-[95%] xl:max-w-[85%] 2xl:max-w-[70%] w-full mx-auto"
    >
      <h1 class="text-2xl sm:text-3xl font-semibold mb-8 md:mb-12">
        Profile - {{ $route.params.referralId }}
      </h1>

      <div
        class="flex lg:gap-10 flex-col md:flex-row gap-y-8 justify-center mx-auto"
      >
        <AccountNavbar context="profileView" />

        <div class="flex-[70%] lg:flex-[90%] py-2">
          <slot :key="$route.params.referralId" />
        </div>
      </div>
    </div>

    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,#00aeff 0%,#9ffca5 50%,#65fc6f 100%)"
    />

    <Footer />
  </div>
</template>

<script setup></script>
