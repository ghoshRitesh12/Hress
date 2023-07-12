<template>

  <div class="px-3 py-3">

    <VForm
      @submit="submitAnyTimeForm"
      :validation-schema="clientAnyTimeInfoSchema"
    >

      <div 
        class="max-h-[22rem] overflow-y-auto px-2 pb-2"
        style="scroll-padding-right: .5rem;"
      >
        
        <div class="relative" data-phone-number>
          
          <label class="block">
            Phone Number
          </label>
  
          <VField
            type="text"
            maxlength="10"
            placeholder="987654XXXX"
            name="phoneNumber"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 mt-3
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full
            "
            autocapitalize="false" autocomplete="false"
            :model-value="profile?.info?.phoneNumber || ''"
          />
  
          <VErrorMessage name="phoneNumber" class="errMsg"/>
  
        </div>
  
        <div class="relative mt-4" data-wallet-address>
    
          <label class="block">
            XLM Wallet Address
          </label>
    
          <VField
            type="text" maxlength="55"
            placeholder="XXXXXXXXXXXXX..."
            name="xlmWalletAddress"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full mt-3
            "
            autocapitalize="false" autocomplete="false"
            :model-value="profile?.info?.xlmWalletAddress || ''"
          />
    
          <VErrorMessage name="xlmWalletAddress" class="errMsg"/>
    
        </div>
    
        <div class="relative mt-4" data-country>
    
          <label class="block">
            Country
          </label>
    
          <VField
            type="text"
            placeholder="country name"
            name="country"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 mt-3
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full
            "
            autocapitalize="false" autocomplete="false"
            :model-value="profile?.info?.country || ''"
          />
    
          <VErrorMessage name="country" class="errMsg"/>
    
        </div>
        
        <div class="relative mt-4" data-city-state>
    
          <label class="block">
            City, State
          </label>
    
          <VField
            type="text"
            placeholder="Kolkata, West Bengal"
            name="cityState"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 mt-3
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full
            "
            autocapitalize="false" autocomplete="false"
            :model-value="profile?.info?.cityState || ''"
          />
    
          <VErrorMessage name="cityState" class="errMsg"/>
    
        </div>

        <div class="relative mt-4" data-postal-code>
          
          <label class="block">
            Postal Code
          </label>

          <VField
            type="text"
            placeholder="100342"
            name="postalCode" maxlength="6"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 mt-3
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full
            "
            autocapitalize="false" autocomplete="false"
            :model-value="profile?.info?.postalCode || ''"
          />

          <VErrorMessage name="postalCode" class="errMsg"/>

        </div>
        
        <div class="relative mt-4" data-street-address>
    
          <label class="block">
            Street Address
          </label>
    
          <VField
            type="text"
            placeholder="street address"
            name="streetAddress"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 mt-3
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full
            "
            autocapitalize="false" autocomplete="false"
            :model-value="profile?.info?.streetAddress || ''"
          />
    
          <VErrorMessage name="streetAddress" class="errMsg"/>
    
        </div>

      </div>

      <div class="mt-10 mx-2">
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
import { clientAnyTimeInfoSchema } from '~/utils/anyTimeInfoSchema';

const { closeInfoEditModal } = useInfoEdit()
const { profile, fetchProfile } = useProfile();
const { setPopupMessage } = usePopup();

const isPending = useState(() => false);
const submitAnyTimeForm = async (values) => {
  try {
    isPending.value = true;

    const headers = useRequestHeaders(['cookie'])
    const { data, error, pending } = await useFetch('/api/account/edit-multiple', {
      method: 'PUT', headers,
      body: markRaw(values),
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
