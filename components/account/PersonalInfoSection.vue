<template>

  <div
    class="
    py-4 px-5 border-[1px] 
    border-zinc-600 rounded-2xl
    "
  >

    <div 
      class="
      flex items-center justify-between 
      pb-4 mb-8
      "
    >

      <div class="text-xl font-semibold">
        Personal Information
      </div>

      <button 
        class="
        flex items-center bg-zinc-800 w-fit
        py-2 px-4 rounded-xl text-zinc-300
        hover:bg-zinc-700/80 transition
        ease-in duration-100 ml-6
        "
      >

        <div>Edit</div>

        <Icon
          class="ml-2 text-lg flex-shrink-0"
          name="iconamoon:edit"
        />

      </button>

    </div>


    <section
      class="
      grid gap-y-8 gap-x-4 info-section
      "
      style="grid-template-columns: repeat(var(--col), 1fr);"
    >


      <AccountPersonalInfo
        v-for="value, key in info"
        :context="infoMap[key]"
        :context-value="value"
      />


    </section>


  </div>

</template>


<script setup>

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})


const infoMap = {
  name: "Full name",
  email: "Email address",
  pancardNo: "Pancard No",
  phoneNumber: "Phone",
  country: "Country",
  postalCode: "Postal Code",
  cityState: "City, State",
  streetAddress: "Street Address",
  bankAccountNo: "Bank Account No",
  ifsc: "IFSC"
}


</script>


<style scoped>
  .info-section {
    --col: 1;
  }

  @media (min-width: 786px) {
    .info-section {
      --col: 2;
    }
  }

</style>
