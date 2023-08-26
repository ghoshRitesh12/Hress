<template>
  
  <div
    class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-8"
  >
    Generate New Active Tokens
  </div>

  <div
    class="my-8 sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto"
  >
    <div
      class="text-[.98rem] text-zinc-400"
    >
      Enter the number of active tokens you want to generate.
      <small class="block max-w-[60ch] mt-2">
        <strong>Note:</strong> users having access to these
        tokens can automatically activate their account.
      </small>
    </div>

    <VForm
      @submit="generateActiveTokens"
      class="flex items-start gap-6 my-4 flex-col"
    >

      <div 
        class="sm:flex-[10%] w-full"
      >
        <VField
          type="number" as="input"
          placeholder="Quantity of active tokens (max 30)"
          name="quantity"
          required autocorrect="false"
          class="
          px-4 py-3 rounded-xl bg-zinc-800 
          focus:outline-none focus:outline-green-300
          focus:outline-1 focus:outline-offset-0 w-full
          placeholder:text-[.9rem]
          "
          autocapitalize="false" autocomplete="false"
        />

      </div>

      <div 
        class="flex-[5%] flex-grow-0 ml-auto whitespace-nowrap"
      >
        <button
          type="submit"
          class="
          w-full bg-accent-200 hover:bg-green-400
          px-5 py-2 sm:py-[.6rem] rounded-xl
          text-[.95rem] font-semibold text-primary-900
          transition ease-in duration-100 active:scale-95
          "
        >
          Generate tokens
        </button>
      </div>

    </VForm>
  </div>
  
</template>


<script setup>
const { generateActiveTokens } = useActiveToken();

</script>


<style scoped>

</style>
