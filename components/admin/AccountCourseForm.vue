<template>
  
  <VForm
    @submit="submitAccountCourseForm"
    :validation-schema="clientCourseSchema"
    class="
    flex items-center gap-4 border-[1px]
    py-[.65rem] px-4 sm:px-5 rounded-2xl w-full
    border-zinc-700 md:whitespace-nowrap
    "
  >

    <div class="relative w-full">
      <VField
        type="text"
        placeholder="course name"
        name="course" minlength="5"
        required autocorrect="false"
        pattern="/^(?:[A-Za-z\-]{5,})?$/"
        class="
        px-4 py-2 text-[.95rem] rounded-xl bg-zinc-800 
        focus:outline-none focus:outline-green-300
        focus:outline-1 focus:outline-offset-0 w-full
        capitalize
        "
        autocapitalize="false" autocomplete="false"
        :model-value="profile?.courseType"
      />

      <VErrorMessage name="course" class="errMsg"/>
    </div>


    <button
      type="submit"
      class="
      flex items-center justify-center ml-auto
      px-4 py-2 rounded-xl bg-zinc-800
      flex-shrink-0
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

  </VForm>
  
</template>


<script setup>
import { clientCourseSchema } from '~/utils/adminInfoSchema';

const { params } = useRoute();
const { profile, fetchProfile } = useProfile();
const { setPopupMessage } = usePopup();

const submitAccountCourseForm = async (value) => {
  try {
    console.log(value)

    const formState = useState(() => {
      if(params?.referralId?.trim()) {
        return {
          submitUrl: `/api/admin/profile/${params.referralId}/course`,
          refreshUrl: `/api/admin/profile/${params.referralId}/about`
        }
      }
    })

    const headers = useRequestHeaders(['cookie'])
    const { data, error } = await useFetch(
      formState.value.submitUrl, 
      {
        method: 'PUT', headers,
        body: markRaw(value),
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
  .errMsg{
    @apply block text-red-300 text-[.8rem] 
    mt-1 max-w-[40ch] w-full mx-auto 
    text-center leading-[1.2];
  }

</style>
