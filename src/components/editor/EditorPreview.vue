<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps<{
  editor: Editor | undefined
}>()

const isEditorReady = computed(() => {
  return props.editor?.isDestroyed === false
})

</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
    <h2 class="text-lg font-medium p-4 border-b border-gray-200 bg-gray-50 shrink-0">预览</h2>
    <div v-if="!isEditorReady" class="p-4 flex-1 flex items-center justify-center text-gray-500">
      加载中...
    </div>
    <editor-content 
      v-else
      :editor="editor" 
      class="markdown-preview flex-1 overflow-auto"
    />
  </div>
</template> 