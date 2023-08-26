<template>

  <label
    class="
    flex items-center bg-zinc-800/70 py-3 px-4 
    rounded-xl gap-6 border-b-2 border-r-2
    "
    :class="props.usedBy ? 'border-accent-200' : 'border-yellow-200'"
    :for="`token-${props.token}`"
  >
    
    <div
      class="
      flex flex-col gap-x-4 justify-center items-center
      w-fit text-[.88rem] flex-wrap
      "
    >
      <div
        class="flex items-center gap-2 flex-shrink-0"
      >
        <div class="text-zinc-500 text-[.82rem] select-none">
          Token:
        </div>
  
        <div>{{ props.token }}</div>
      </div>
  
      <div
        class="flex items-center gap-2 flex-shrink-0 select-none"
      >
        <div class="text-zinc-500 text-[.82rem]">
          Issued at:
        </div>
  
        <div>{{ formatDate(props.issuedAt) }}</div>
      </div>

      <div
        class="flex items-center gap-2 flex-shrink-0"
      >
        <div class="text-zinc-500 text-[.82rem] select-none">
          Used by:
        </div>
  
        <div>{{ props.usedBy || 'none' }}</div>
      </div>
    </div>

    <div
      class="
      grid justify-center border-[0px] 
      rounded-2xl overflow-hidden place-content-center
      max-h-[1.05rem] max-w-[1.05rem]
      "
    >
      <input 
        type="checkbox"
        :value="props.token"
        v-model="tokenBuffer"
        :id="`token-${props.token}`"
        class="h-[5rem] w-[5rem] accent-accent-200 mt-10 ml-4"
      />
    </div>

  </label>
  
</template>


<script setup>
const { tokenBuffer } = useActiveToken();

const props = defineProps({
  token: String,
  issuedAt: Number,
  usedBy: String
})

function formatDate(timestamp) {
  return new Intl.DateTimeFormat(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  ).format(new Date(timestamp));
}
</script>