<template>

  <div data-profile>

    <NuxtLink v-if="data?.user?.image"
      to="/account"
      aria-label="profile button"
      class="
      grid place-items-center rounded-[50%] md:mx-2
      overflow-hidden outline-none max-w-[2.2rem] max-h-[2.2rem]
      hover:outline-[.12rem] hover:outline-accent-100 
      hover:outline-offset-0
      "
      style="transition: .1s ease outline"
      height="35.2" width="35.2"
    >
      <nuxt-img
        :src="data?.user?.image"
        format="png"
        decoding="async"
        fetchpriority="high"
        class="pointer-events-none"
        height="35.2"
        width="35.2"
      />
    </NuxtLink>

    
    <NuxtLink 
      v-if="!data?.user"
      to="/login"
      class="
      px-4 py-[.55rem] text-black text-[.9rem] 
      rounded-xl bg-accent-200 select-none
      "
    >
      Login
    </NuxtLink>

  </div>


</template>


<script setup>

const { data, getSession } = useAuth()
// const isAuth = useState(() => false);
console.log(data.value);

watch(
  () => data.value,
  async () => {
    if(!data.value) {
      await getSession();
    }
  },
  {
    immediate: true,
  }
)


</script>


<style>

</style>
