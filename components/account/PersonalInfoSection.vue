<template>

  <div v-if="props.info"
    class="
    py-4 px-5 border-[1px] 
    border-zinc-600 rounded-2xl
    "
  >

    <div 
      class="
      flex items-center pb-4 mb-8
      "
    >

      <div 
        class="
        text-lg sm:text-xl flex-[65%]
        flex-grow-0 font-semibold
        "
      >
        Personal Information
      </div>

      <div class="ml-auto">
        <button 
          class="
          flex items-center bg-zinc-800 w-fit
          py-2 px-4 rounded-xl text-zinc-300
          hover:bg-zinc-700/90 transition
          ease-in duration-100
          "
          @click="openInfoEditModal"
        >
          <div>Edit</div>
          <Icon
            class="ml-2 text-lg flex-shrink-0"
            name="iconamoon:edit"
          />
        </button>
      </div>

    </div>


    <section
      class="grid gap-y-8 gap-x-4 info-section"
      style="grid-template-columns: repeat(var(--col), 1fr);"
    >
      <AccountPersonalInfo
        v-for="value, key in info"
        :key="key"
        :context="infoMap[key]"
        :context-value="value"
      />
    </section>


  </div>

</template>


<script setup>

const { openInfoEditModal } = useInfoEdit();

const props = defineProps({
  info: {
    type: Object,
  }
})

const infoMap = {
  name: "Full name",
  email: "Email address",
  pancardNo: "Pancard No",
  phoneNumber: "Phone Number",
  country: "Country",
  postalCode: "Postal Code",
  cityState: "City, State",
  streetAddress: "Street Address",
  bankAccountNo: "Bank Account No",
  ifsc: "IFSC",
  xlmWalletAddress: 'XLM Wallet Address'
}


</script>


<style scoped>
  .info-section {
    --col: 1;
  }

  @media (min-width: 640px) {
    .info-section {
      --col: 2;
    }
  }

</style>
