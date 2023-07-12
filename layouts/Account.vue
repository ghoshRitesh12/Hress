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
        text-2xl sm:text-3xl font-semibold 
        mb-8 md:mb-12
        "
      >
        Account Settings
      </h1>
  
      <div 
        class="
        flex lg:gap-10 flex-col md:flex-row
        gap-y-8 justify-center mx-auto
        "
      >
  
        <aside
          class="
          flex-[15%]
          flex md:flex-col sm:gap-4 md:pr-4 py-2 
          border-[0px] md:flex-[20%] md:mr-8
          "
        >
  
          <NuxtLink
            v-for="accountNav in accountNavs"
            :key="accountNav.href"
            class="
            relative flex items-center py-2 md:flex-grow-0
            rounded-xl hover:bg-zinc-800/80 flex-col
            md:flex-row md:pr-12 md:pl-6 flex-grow
            justify-center md:justify-normal
            transition ease-in duration-100
            "
            :active-class="`
            before:content-[' '] before:absolute 
            before:bottom-[-.4rem] before:h-[.2rem] before:w-[80%]
            md:before:left-0 md:before:top-[50%] md:before:translate-y-[-50%]
            md:before:h-[65%] md:before:w-[.25rem] hover:bg-zinc-800
            before:bg-accent-200 bg-zinc-800 before:rounded-3xl
            `"
            :to="accountNav.href"
          >
  
            <div 
              class="
              flex-shrink-0 md:mr-[.55rem]
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

    <NuxtLoadingIndicator 
      color="repeating-linear-gradient(to right,#00aeff 0%,#9ffca5 50%,#65fc6f 100%)"
    />

  </div>

</template>


<script setup>


const { data } = useAuth();

const usualNavs = [
  { 
    name: 'Profile', href: '/account', 
    icon: 'material-symbols:person-outline-rounded' 
  },
  { 
    name: 'My Team', href: '/account/team',
    icon: 'fluent:people-team-24-regular'
  },
  { 
    name: 'Income', href: '/account/income',
    icon: 'bx:dollar'
  },
  { 
    name: 'Rewards', href: '/account/rewards',
    icon: 'ph:trophy-bold'
  },
  { 
    name: 'Security', href: '/account/security',
    icon: 'solar:shield-warning-linear'
  },
]

const accountNavs = useState(() => {
  if(data.value?.user?.role === 'admin') {
    usualNavs.push({ 
      name: 'Search', href: '/account/search',
      icon: 'material-symbols:person-search'
    })

    return usualNavs
  }

  return usualNavs;
})


</script>


<style>

</style>
