<script setup lang="ts">
import { useEditor } from '@tiptap/vue-3'
import { ref, watch, shallowRef } from 'vue'
import { createMarkdownParser } from './utils/markdown'
import { extensions } from './extensions'
import EditorContent from './EditorContent.vue'
import EditorPreview from './EditorPreview.vue'
import { initialContent } from './content'
import './styles/markdown.css'

const markdownParser = createMarkdownParser()
const markdownContent = ref(initialContent)
const previewEditor = shallowRef(useEditor({
  extensions,
  content: markdownParser.render(initialContent),
  editable: false,
  parseOptions: {
    preserveWhitespace: false
  },
  editorProps: {
    attributes: {
      class: 'prose-clean'
    }
  }
}))

// 监听按钮状态变化
const handleButtonStateChange = (attrs: { text: string, type: string, size: string, clickCount: number }) => {
  markdownParser.updateButtonState(attrs.text, attrs.type, attrs.size, attrs.clickCount)
}

watch(markdownContent, (newContent) => {
  const html = markdownParser.render(newContent)
  previewEditor.value?.commands.setContent(html)
})
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-4 space-y-6">
    <EditorContent v-model="markdownContent" />
    <EditorPreview 
      :editor="previewEditor" 
      @button-state-change="handleButtonStateChange"
    />
  </div>
</template> 