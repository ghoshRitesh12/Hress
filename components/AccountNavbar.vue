<script setup>
const linkClasses = `
  relative flex items-center py-2 md:flex-grow-0
  rounded-xl hover:bg-zinc-800/80
  md:pr-12 md:pl-6 flex-grow
  justify-center md:justify-normal flex-shrink-0
  transition ease-in duration-100 gap-x-2 px-3
`
  .replace(/[\s]+/g, " ")
  .trim();

const activeLinkClasses = `
  before:content-[''] before:absolute
  before:bottom-[-.4rem] before:h-[.2rem] before:w-[80%]
  md:before:left-0 md:before:top-[50%] md:before:translate-y-[-50%]
  md:before:h-[65%] md:before:w-[.25rem] hover:bg-zinc-800
  before:bg-accent-200 bg-zinc-800 before:rounded-3xl
`
  .replace(/[\s]+/g, " ")
  .trim();

const navlinkContainer = useState(() => null);
function scrollToLink(e) {
  const activeLink = e
    ? e.target
    : navlinkContainer.value.querySelector('a[aria-current="page"]');

  if (activeLink) {
    navlinkContainer.value.scrollTo({
      left: activeLink.offsetLeft - 100,
      behavior: "smooth",
    });
  }
}

const props = defineProps({
  context: {
    type: String,
    required: true,
  },
});

const navlinks = useState(() => []);

if (props.context === "accountView") {
  const { data } = useAuth();
  const usualNavs = [
    {
      name: "Profile",
      href: "/account",
      icon: "material-symbols:person-outline-rounded",
    },
    {
      name: "My Team",
      href: "/account/team",
      icon: "fluent:people-team-24-regular",
    },
    {
      name: "Income",
      href: "/account/income",
      icon: "bx:dollar",
    },
    {
      name: "Rewards",
      href: "/account/rewards",
      icon: "ph:trophy-bold",
    },
    {
      name: "Security",
      href: "/account/security",
      icon: "solar:shield-warning-linear",
    },
  ];

  if (data.value?.user?.role === "admin") {
    usualNavs.push(
      {
        name: "Active Token",
        href: "/account/active-token",
        icon: "material-symbols:key-outline-rounded",
      },
      {
        name: "Expenditure",
        href: "/account/expenditure",
        icon: "ph:wallet-bold",
      },
      {
        name: "Search",
        href: "/account/search",
        icon: "material-symbols:person-search",
      }
    );
  }

  navlinks.value = usualNavs;
}

onMounted(() => {
  if (props.context === "profileView") {
    const { params } = useRouter().currentRoute.value;
    navlinks.value = [
      {
        name: "About",
        href: `/admin/profile/${params.referralId}/about`,
        icon: "material-symbols:person-outline-rounded",
      },
      {
        name: "Team",
        href: `/admin/profile/${params.referralId}/team`,
        icon: "fluent:people-team-24-regular",
      },
      {
        name: "Income",
        href: `/admin/profile/${params.referralId}/income`,
        icon: "bx:dollar",
      },
      {
        name: "Rewards",
        href: `/admin/profile/${params.referralId}/rewards`,
        icon: "ph:trophy-bold",
      },
    ];
  }
  scrollToLink();
});
</script>

<template>
  <aside
    class="flex-[15%] flex md:flex-col sm:gap-4 md:pr-4 py-2 md:flex-[20%] md:mr-8 overflow-auto"
    id="account-navbar"
    ref="navlinkContainer"
  >
    <NuxtLink
      v-for="navlink in navlinks"
      :key="navlink.href"
      :class="linkClasses"
      :active-class="activeLinkClasses"
      :to="navlink.href"
      @click="scrollToLink"
    >
      <div class="flex-shrink-0 md:mr-[.55rem] pointer-events-none">
        <Icon
          class="text-xl text-zinc-500 md:text-zinc-400"
          :name="navlink.icon"
        />
      </div>

      <div
        class="pointer-events-none text-[.8rem] md:text-[.95rem] text-center md:flex-shrink-0"
      >
        {{ navlink.name }}
      </div>
    </NuxtLink>
  </aside>
</template>

<style scoped>
#account-navbar::-webkit-scrollbar {
  display: none;
}
#account-navbar {
  scrollbar-width: none;
}
</style>
