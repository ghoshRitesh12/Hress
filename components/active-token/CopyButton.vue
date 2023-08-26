<template>
  
  <div v-show="tokenBuffer.length">
    <button 
      type="button"
      class="
      flex items-center gap-2
      bg-zinc-800 px-4 py-[.65rem] rounded-xl
      transition ease-in duration-100 active:scale-[.98]
      "
      @click="copyTokens"
    >
      <Icon 
        :name="copyIcon"
        class="text-lg pointer-events-none"
      />
      <div class="text-[.85rem] pointer-events-none">
        Copy Tokens
      </div>
    </button>
  </div>
  
</template>


<script setup>
const { tokenBuffer } = useActiveToken();

const copyIcon = useState(() => "material-symbols:content-copy-outline-rounded")
function copyTokens() {
  const copyTokens = tokenBuffer.value.join("\n\n")

  navigator.clipboard.writeText(copyTokens).then(() => {
    copyIcon.value = "material-symbols:content-copy-rounded";
    const t = setTimeout(() => {
      copyIcon.value = "material-symbols:content-copy-outline-rounded";
      clearTimeout(t)
    }, 1000)
  })
}

</script>