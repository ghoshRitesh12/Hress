<template>
  <div data-profile>
    <AccountCreatedAt
      :created-at="profile.createdAt"
      class="mb-4"
    />

    <div
      :class="
        fc(`
          flex items-center gap-10 border-[0px] border-zinc-600
          rounded-2xl mb-10 flex-wrap lg:flex-nowrap 
          justify-center lg:justify-normal
        `)
      "
    >
      <AccountProfileHeader
        :username="profile?.info?.name"
        :pfp="profile?.pfp"
      />

      <div class="flex flex-col gap-6 text-[1.05rem] w-full items-center">
        <AccountCourse :course-type="profile?.courseType" />
        <AccountVerifiedTab
          class="w-full"
          :verified="profile?.verified"
        />
        <AccountActiveTab
          class="w-full"
          :is-active="profile?.active"
        />
      </div>
    </div>

    <div class="flex gap-x-10 gap-y-4 flex-wrap lg:flex-nowrap my-8">
      <AccountRank :rank="profile?.rank" />
      <AccountReferralId :referral-id="profile?.referralId" />
    </div>

    <AccountPersonalInfoSection :info="profile?.info" />

    <button
      type="button"
      :class="
        fc(`
          flex items-center gap-2 text-[.95rem] bg-red-400 
          text-primary-900 mt-8 ml-auto py-[.65rem] px-6 rounded-2xl
          hover:bg-red-500 transition ease-in duration-100 w-fit
        `)
      "
      @click="() => signOut({ callbackUrl: '/' })"
    >
      <Icon
        class="text-lg"
        name="tabler:logout"
      />
      <div>Logout</div>
    </button>

    <AccountInfoEditModal />

    <Popup />
  </div>
</template>

<script setup>
import fc from "~/utils/classes";
const { signOut } = useAuth();
const { profile, fetchProfile } = useProfile();

useHead({
  title: "Account - Profile",
});

definePageMeta({
  layout: "account",
  middleware: "native",
});

await fetchProfile("/api/account");

onBeforeUnmount(() => {
  profile.value = null;
});
</script>
