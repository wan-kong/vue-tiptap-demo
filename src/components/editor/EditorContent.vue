<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
    <h2 class="text-lg font-medium p-4 border-b border-gray-200 bg-gray-50 shrink-0">编辑器</h2>
    <textarea 
      :value="modelValue"
      @input="e => emit('update:modelValue', (e.target as HTMLTextAreaElement).value)"
      class="w-full p-4 flex-1 font-mono focus:outline-none whitespace-pre-wrap"
    ></textarea>
  </div>
</template> 