<template>

  <div data-admin-info-form 
    class="px-3 pb-5 pt-6"
  >

    <VForm
      @submit="submitInfoForm"
      :validation-schema="clientAdminInfoSchema"
    >

      <div 
        class="max-h-[22rem] overflow-y-auto px-2 pb-2"
        style="scroll-padding-right: .5rem;"
      >

        <div class="relative mt-2" data-fullname>
          
          <label class="block">Full name</label>

          <VField
            type="text"
            placeholder="John Doe"
            required autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full mt-3
            "
            name="name" spellcheck="false"
            autocapitalize="false" autocomplete="false"
            :model-value="profile?.info?.name || ''"
          />

          <VErrorMessage name="name" class="errMsg"/>

        </div>

        <div class="relative mt-4" data-email>
          <label for="email" class="block">
            Email address
          </label>

          <VField 
            type="email"
            placeholder="name@email.com"
            autocorrect="false"
            class="
            px-4 py-3 rounded-xl bg-zinc-800 
            focus:outline-none focus:outline-green-300
            focus:outline-1 focus:outline-offset-0 w-full mt-3
            "
            name="email" spellcheck="false"
            autocapitalize="false" autocomplete="false"
            :model-value="profile?.info?.email || ''"
          />

          <VErrorMessage name="email" class="errMsg"/>
        </div>

        <div class="relative mt-4" data-pancard>
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
            :model-value="profile?.info?.pancardNo || ''"
          />

          <VErrorMessage name="pancardNo" class="errMsg"/>
        </div>
        
        <div class="relative mt-4" data-phone-number>
          
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

        <div class="relative mt-4" data-bank-acc>
          
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
            :model-value="profile?.info?.bankAccountNo || ''"
          />

          <VErrorMessage name="bankAccountNo" class="errMsg"/>

        </div>

        <div class="relative mt-4" data-ifsc>
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
            :model-value="profile?.info?.ifsc || ''"
          />

          <VErrorMessage name="ifsc" class="errMsg"/>
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
        
      </div>

      <div class="mt-10 mx-2">
        <button
          type="submit"
          class="
          flex items-center justify-center gap-3
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
import { clientAdminInfoSchema } from '~/utils/adminInfoSchema';

const { closeInfoEditModal } = useInfoEdit()
const { profile, fetchProfile } = useProfile();
const { setPopupMessage } = usePopup();
const { params } = useRoute();
// const { data } = useAuth();

const isPending = useState(() => false);
const submitInfoForm = async (values) => {
  try {
    const formState = useState(() => {
      if(params?.referralId?.trim()) {
        return {
          submitUrl: `/api/admin/profile/${params.referralId}/edit`,
          refreshUrl: `/api/admin/profile/${params.referralId}/about`
        }
      }
      return {
        submitUrl: '/api/account/edit-admin',
        refreshUrl: `/api/account`
      }
    })
    console.log(values);
    
    isPending.value = true;
    const headers = useRequestHeaders(['cookie'])
    const { data, error, pending } = await useFetch(
      formState.value.submitUrl, 
      {
        method: 'PUT', headers,
        body: markRaw(values),
      }
    )
    isPending.value = pending.value

    if(data.value) {
      await fetchProfile(formState.value.refreshUrl)
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
