<template>

  <div :data-personal-info="kebabContext">

    <template v-if="props.editable">
      <label 
        :for="kebabContext"
        class="block text-sm text-zinc-400"
      >
        {{ props.context }}
      </label>
  
      <input
        :type="props.contextType"
        :id="kebabContext"
        :value="props.contextValue"
        spellcheck="false" autocomplete="false"
        autocorrect="false" autocapitalize="false"
        class="mt-1"
      />
    </template>

    <template v-else>
      <div class="text-sm text-zinc-400">
        {{ props.context }}
      </div>

      <div class="mt-1">
        {{ props.contextValue }}
      </div>
    </template>

  </div>

</template>


<script setup>

const props = defineProps({
  context: {
    type: String,
    required: true
  },
  contextValue: {
    type: String,
    required: true
  },
  contextType: {
    type: String,
    default: 'text'
  },
  editable: {
    type: Boolean,
    default: false
  }
})


const kebabContext = props.context.replace(/\s/g, '-').toLowerCase();


</script>


<style>

</style>
