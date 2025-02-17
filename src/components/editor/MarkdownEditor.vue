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


watch(markdownContent, (newContent) => {
  const html = markdownParser.render(newContent)
  previewEditor.value?.commands.setContent(html)
})
</script>

<template>
  <div class="w-full max-w-screen-2xl mx-auto p-4">
    <div class="grid grid-cols-2 gap-4">
      <EditorContent v-model="markdownContent" />
      <EditorPreview 
        :editor="previewEditor" 
      />
    </div>
  </div>
</template>

<style>
.grid {
  height: calc(100vh - 2rem);
}

/* 添加滚动条样式 */
.grid > div {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #F7FAFC;
}

.grid > div::-webkit-scrollbar {
  width: 6px;
}

.grid > div::-webkit-scrollbar-track {
  background: #F7FAFC;
}

.grid > div::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
}
</style> 