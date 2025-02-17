<script setup lang="ts">
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
import type { NodeViewProps } from '@tiptap/vue-3'
import { ref, computed } from 'vue'

const props = defineProps<NodeViewProps>()

const isCollapsed = ref(false)
const isCopied = ref(false)

const language = computed(() => props.node.attrs.language || 'plain')
const code = computed(() => props.node.textContent)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code.value)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <NodeViewWrapper class="relative group not-prose mb-4">
    <!-- 语言标签和操作按钮 -->
    <div class="flex items-center justify-between px-4 py-2 bg-gray-100 text-sm text-gray-600 rounded-t-lg border border-gray-200 border-b-0">
      <span class="font-mono">{{ language }}</span>
      <div class="flex items-center gap-2">
        <button 
          @click="copyCode"
          class="p-1 hover:text-gray-900 transition-colors"
          :title="isCopied ? '已复制！' : '复制代码'"
        >
          <svg v-if="!isCopied" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <button 
          @click="toggleCollapse"
          class="p-1 hover:text-gray-900 transition-colors"
          :title="isCollapsed ? '展开代码' : '折叠代码'"
        >
          <svg 
            class="w-4 h-4 transition-transform" 
            :class="{ 'rotate-180': isCollapsed }"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 代码内容 -->
    <div 
      class="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-b-lg"
      :class="{ 'max-h-0': isCollapsed, 'max-h-[500px]': !isCollapsed }"
    >
      <pre class="p-4 m-0 overflow-auto bg-gray-50"><code :class="`language-${language} block`"><NodeViewContent /></code></pre>
    </div>
  </NodeViewWrapper>
</template>

<style>
.hljs {
  background: transparent !important;
}

pre {
  line-height: 1.5;
}

pre code {
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  hyphens: none;
  display: block;
  min-height: 1em;
}
</style> 