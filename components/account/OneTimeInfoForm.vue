<template>

  <div class="px-5">

    <div
      class="
        mb-6 text-red-400 text-[.8rem]
      "
    >
      <span class="text-zinc-400">
        Note:
      </span> 
      This form can be submitted only one time,
      hence fill it up with extra caution
    </div>

    <VForm
      @submit="submitOneTimeForm"
      :validation-schema="clientOneTimeInfoSchema"
    >
  
      <div class="relative">
        
        <label class="block">
          Pancard Number
        </label>

        <VField
          type="text"
          placeholder="ABC1D23XXXX"
          name="pancardNo"
          required autocorrect="false"
          class="
          pl-4 pr-14 py-3 rounded-xl bg-zinc-800 mt-3
          focus:outline-none focus:outline-green-300
          focus:outline-1 focus:outline-offset-0 w-full
          "
          autocapitalize="false" autocomplete="false"
        />

        <VErrorMessage name="pancardNo" class="errMsg"/>

      </div>

      <div class="relative mt-4">
  
        <label class="block">
          Bank Account Number
        </label>
  
        <VField
          type="text"
          placeholder="54321054XXXXXXXX"
          name="bankAccountNo"
          required autocorrect="false"
          class="
          px-4 py-3 rounded-xl bg-zinc-800 
          focus:outline-none focus:outline-green-300
          focus:outline-1 focus:outline-offset-0 w-full mt-3
          "
          autocapitalize="false" autocomplete="false"
        />
  
        <VErrorMessage name="bankAccountNo" class="errMsg"/>
  
      </div>
  
      <div class="relative mt-4">
  
        <label class="block">
          IFSC
        </label>
  
        <VField
          type="text"
          placeholder="ABCD987XXXX"
          name="ifsc"
          required autocorrect="false"
          class="
          pl-4 pr-14 py-3 rounded-xl bg-zinc-800 mt-3
          focus:outline-none focus:outline-green-300
          focus:outline-1 focus:outline-offset-0 w-full
          "
          autocapitalize="false" autocomplete="false"
        />
  
        <VErrorMessage name="ifsc" class="errMsg"/>
  
      </div>

  
      <div class="mt-10">
        <button
          type="submit"
          class="
          w-full bg-accent-200 hover:bg-green-400
          px-4 py-3 rounded-2xl text-primary-900
          font-semibold transition ease-in duration-100
          "
          :class="isPending && 'pointer-events-none'"
        >
          {{ isPending ? 'Submiting' : 'Submit' }}
          <Icon
            v-show="isPending"
            class="text-2xl"
            name="line-md:loading-twotone-loop"
          />
        </button>
      </div>
  
    </VForm>

  </div>

</template>


<script setup>
import { clientOneTimeInfoSchema } from '~/utils/oneTimeInfoSchema';

const { closeInfoEditModal } = useInfoEdit()
const { fetchProfile } = useProfile();
const { setPopupMessage } = usePopup();

const isPending = useState(() => false);
const submitOneTimeForm = async (values) => {
  try {
    isPending.value = true;

    const headers = useRequestHeaders(['cookie'])
    const { data, error, pending } = await useFetch('/api/account/edit-once', {
      method: 'PUT', headers,
      body: markRaw(values)
    });

    isPending.value = pending.value;
    if(data.value) {
      await fetchProfile('/api/account')
      closeInfoEditModal()
      setPopupMessage(data.value?.message);
    }
    if(error.value) {
      setPopupMessage(error.value?.statusMessage);
    }

    console.log(data.value);

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
