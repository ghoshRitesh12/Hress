<template>
  
  <form 
    @submit.prevent="submitAccountActivateForm"
    class="
    flex items-center gap-4 border-[1px]
    py-[.65rem] px-4 sm:px-5 rounded-2xl w-full
    border-zinc-700 md:whitespace-nowrap
    "
  >

    <label class="block" for="acc-active">
      Active status
    </label>

    <input
      id="acc-active"
      type="checkbox" 
      class="checkbox before:content-[' ']"
      v-model="profile.active"
    />


    <button
      type="submit"
      class="
      flex items-center justify-center ml-auto
      px-4 py-2 rounded-xl bg-zinc-800
      "
    >
      <Icon
        name="charm:tick"
        class="
        text-xl align-middle text-accent-200
        pointer-events-none
        "
      />
    </button>

  </form>
  
</template>


<script setup>

const { params } = useRoute();
const { profile, fetchProfile } = useProfile();
const { setPopupMessage } = usePopup();

const submitAccountActivateForm = async () => {
  try {
    // if(profile?.value?.active)

    const formState = useState(() => {
      if(params?.referralId?.trim()) {
        return {
          submitUrl: `/api/admin/profile/${params.referralId}/activate`,
          refreshUrl: `/api/admin/profile/${params.referralId}/about`
        }
      }
    })

    const headers = useRequestHeaders(['cookie'])
    const { data, error } = await useFetch(
      formState.value.submitUrl, 
      {
        method: 'PUT', headers,
        body: { active: profile?.value?.active },
      }
    )

    if(data.value) {
      await fetchProfile(formState.value.refreshUrl)
      setPopupMessage(data.value?.message);
    }
    if(error.value) {
      setPopupMessage(error.value?.statusMessage);
    }
    
    
  } catch (err) {
    console.log(err);
  }
}

</script>


<style scoped>
  .checkbox {
    @apply relative appearance-none cursor-pointer
    w-[3.25rem] h-[1.75rem] rounded-3xl border-2
    border-zinc-700 outline-none checked:border-accent-100
    transition ease-in duration-100 checked:before:bg-accent-200
    before:absolute before:h-[1rem] before:w-[1rem]
    before:top-[50%] before:mx-1 before:translate-y-[-50%]
    before:rounded-[50%] before:bg-zinc-400
    checked:before:translate-x-[1.5rem] before:transition
    before:ease-in before:duration-100
    ;
  }
</style>
