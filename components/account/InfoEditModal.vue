<template>

  <div
    v-if="isInfoEditModalOpen"
    class="fixed inset-0 isolate z-[200]"
  >

    <div data-auth-modal
      class="
      fixed isolate z-[250] block 
      top-[50%] left-[50%] rounded-2xl
      translate-y-[-50%] translate-x-[-50%]
      bg-primary-900 border-[1px] border-zinc-700
      min-w-[21.5rem] sm:max-w-[25rem] sm:w-full
      "
      style="transition: .2s ease all;"
    >

      <AdminInfoForm
        v-if="data?.user?.role === 'admin'"
      />
      
      <section v-else>
        <div data-modal-tabs
          v-if="showOneTimeForm"
          class="
          flex items-center gap-4 bg-zinc-900
          p-3 rounded-tl-2xl
          "
        >
          <button
            class="
            w-fit px-4 py-3 rounded-2xl 
            flex-[50%] text-[.92rem]
            "
            :class="
              currentTab === 'one' ? 
              'bg-zinc-700' : 'bg-zinc-800 hover:bg-zinc-700/80'
            "
            @click="() => currentTab = 'one'"
          >
            One time
          </button>
  
          <button
            class="
            w-fit px-4 py-3 rounded-2xl
            flex-[50%] text-[.92rem]
            "
            :class="
              currentTab === 'any' ? 
              'bg-zinc-700' : 'bg-zinc-800 hover:bg-zinc-700/60'
            "
            @click="() => currentTab = 'any'"
          >
            Any time
          </button>
        </div>
  
        <div class="py-6">
          <AccountOneTimeInfoForm
            v-if="showOneTimeForm && currentTab === 'one'"
          />
          <AccountAnyTimeInfoForm
            v-if="currentTab === 'any'"
          />
        </div>
      </section>


      <button
        class="
        absolute right-[-.5rem] top-[-.5rem] w-fit p-[0.5rem]
        cursor-pointer bg-zinc-700 hover:bg-zinc-600 
        transition ease-in duration-100 rounded-[50%]
        "
        @click="closeInfoEditModal"
      >
        <Icon 
          name="ic:round-close"
          class="text-2xl pointer-events-none"
        />
      </button>
  
    </div>

    <div data-modal-backdrop
      aria-label="backdrop"
      role="backdrop"
      class="fixed inset-0 isolate z-[200] bg-primary-900/80"
      :style="`backdrop-filter: blur(.25rem); transition: .3s ease all;`"
      @click="closeInfoEditModal"
    >
    </div>

  </div>

</template>


<script setup>

const { data } = useAuth();
const { profile } = useProfile()
const { isInfoEditModalOpen, closeInfoEditModal } = useInfoEdit();

const showOneTimeForm = useState(() => {
  return !(
    profile.value?.info?.ifsc || 
    profile.value?.info?.bankAccountNo || 
    profile.value?.info?.pancardNo
  )
})

const currentTab = useState(() => (
  !showOneTimeForm.value ? 'any' : 'one'
));



</script>


<style>

</style>
