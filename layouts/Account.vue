<template>

  <div class="flex flex-col min-h-[100vh]">

    <Titlebar 
      :set-profile="true"
      nav-open-icon="fluent:grid-dots-24-regular"
    />

    <div
      class="
      pt-4 sm:pt-8 pb-8 max-w-[92%] md:max-w-[95%] 
      xl:max-w-[85%] 2xl:max-w-[70%] w-full mx-auto
      "
    >

      <h1 
        class="
        text-2xl sm:text-3xl 
        font-semibold mb-12
        "
      >
        Account Settings
      </h1>
  
      <!-- px-6  -->
      <div 
        class="
        flex lg:gap-10 flex-col md:flex-row
        gap-y-8 justify-center mx-auto
        "
      >
  
        <aside
          class="
          flex-[15%]
          flex md:flex-col gap-4 md:px-4 py-2 
          border-[0px] md:flex-[20%] md:mr-8
          "
        >
  
          <NuxtLink
            v-for="accountNav in accountNavs"
            :key="accountNav.href"
            class="
            relative flex items-center py-2 md:flex-grow-0
            rounded-xl hover:bg-zinc-800/80 flex-col
            md:flex-row md:pr-12 md:pl-4 flex-grow
            transition ease-in duration-100
            "
            :active-class="`
            before:content-[' '] before:absolute before:left-0
            before:top-[50%] before:translate-y-[-50%]
            before:h-[65%] before:w-[.25rem] before:bg-accent-200
            bg-zinc-800/80 before:rounded-3xl
            `"
            :to="accountNav.href"
          >
  
            <div 
              class="
              flex-shrink-0 md:mr-2
              pointer-events-none
              "
            >
              <Icon 
                class="
                text-xl text-zinc-100 md:text-zinc-400
                " 
                :name="accountNav.icon"
              />
            </div>
  
            <div
              class="
              pointer-events-none text-[.8rem]
              md:text-[.95rem] text-center
              md:block hidden md:flex-shrink-0
              "
            >
              {{ accountNav.name }}
            </div>
            
          </NuxtLink>
  
        </aside>
  
        <div 
          class="
          flex-[90%] border-[0px] py-2
          "
        >
          <slot/>
        </div>
  
      </div>

    </div>


    <Footer/>

  </div>

</template>


<script setup>

const accountNavs = ref([
  { 
    name: 'Profile', href: '/account', 
    icon: 'material-symbols:person-outline-rounded' 
  },
  { 
    name: 'Security', href: '/account/security',
    icon: 'solar:shield-warning-linear'
  },
  { 
    name: 'Income', href: '/account/income',
    icon: 'material-symbols:attach-money-rounded'
  },
  { 
    name: 'My Team', href: '/account/team',
    icon: 'fluent:people-team-16-regular'
  },
])


</script>


<style>

</style>
