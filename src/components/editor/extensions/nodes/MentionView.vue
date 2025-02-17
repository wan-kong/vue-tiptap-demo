<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import type { NodeViewProps } from '@tiptap/vue-3'
import { computed } from 'vue'

// 完整的 NodeViewProps 类型
const props = defineProps<NodeViewProps>()

const handleClick = () => {
  // 这里可以添加点击用户名的处理逻辑
  console.log('Clicked user:', props.node.attrs.name, 'ID:', props.node.attrs.id)
}
</script>

<template>
  <NodeViewWrapper 
    as="span" 
    class="inline-flex items-center bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 text-sm mx-1 hover:bg-blue-200 transition-colors cursor-pointer"
    @click="handleClick"
  >
    @{{ node.attrs.name }}
  </NodeViewWrapper>
</template> 