<template>

  <div 
    class="
    flex items-center justify-center flex-wrap gap-5
    "
  >
    <ActiveTokenCard
      v-for="activeToken in allActiveTokens"
      :key="activeToken.token"
      :token="activeToken.token"
      :used-by="activeToken.usedBy"
      :issued-at="activeToken.issuedAt"
    />
  </div>
  
</template>


<script setup>
const { allActiveTokens, getGeneratedTokens } = useActiveToken();
getGeneratedTokens()


</script>
