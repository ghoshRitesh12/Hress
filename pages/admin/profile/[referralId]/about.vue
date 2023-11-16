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
          rounded-2xl mb-10 flex-wrap lg:flex-nowrap justify-center 
          lg:justify-normal
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

    <div
      v-if="params?.referralId?.trim()"
      class="flex items-center gap-x-10 gap-y-4 flex-wrap lg:flex-nowrap my-8"
    >
      <AdminAccountActivateForm />
      <AdminAccountCourseForm />
    </div>

    <div class="flex gap-x-10 gap-y-4 flex-wrap lg:flex-nowrap my-8">
      <AccountRank :rank="profile?.rank" />
      <AccountReferralId :referral-id="profile?.referralId" />
    </div>

    <AccountPersonalInfoSection :info="profile?.info" />

    <AccountInfoEditModal />

    <Popup />
  </div>
</template>

<script setup>
import fc from "~/utils/classes";
const { params } = useRoute();

useHead({
  title: `${params.referralId} - About`,
});
definePageMeta({
  layout: "view-profile",
  middleware: ["native", "admin"],
});

const { profile, fetchProfile } = useProfile();
await fetchProfile(`/api/admin/profile/${params.referralId}/about`);

onBeforeUnmount(() => {
  profile.value = null;
});
</script>
