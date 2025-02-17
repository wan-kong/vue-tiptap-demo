<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps<{
  editor: Editor | null | undefined
}>()

const emit = defineEmits<{
  'button-state-change': [attrs: { text: string, type: string, size: string, clickCount: number }]
}>()

const isEditorReady = computed(() => {
  return props.editor?.isDestroyed === false
})

// 监听按钮状态变化
const handleButtonStateChange = (attrs: { text: string, type: string, size: string, clickCount: number }) => {
  emit('button-state-change', attrs)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ">
    <h2 class="text-lg font-medium p-4 border-b border-gray-200 bg-gray-50">预览</h2>
    <div v-if="!isEditorReady" class="p-4 min-h-[300px] flex items-center justify-center text-gray-500">
      加载中...
    </div>
    <editor-content 
      v-else
      :editor="editor" 
      class="markdown-preview"
      @button-state-change="handleButtonStateChange"
    />
  </div>
</template> 