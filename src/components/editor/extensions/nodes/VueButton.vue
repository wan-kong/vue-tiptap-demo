<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import type { NodeViewProps } from '@tiptap/vue-3'
import { computed } from 'vue'

const props = defineProps<NodeViewProps>()

const buttonType = computed(() => props.node.attrs.type || 'primary')
const buttonSize = computed(() => props.node.attrs.size || 'medium')
const clickCount = computed(() => props.node.attrs.clickCount || 0)

const handleClick = () => {
  const newCount = clickCount.value + 1
  props.updateAttributes({
    clickCount: newCount
  })
}

const buttonClass = computed(() => {
  const baseClass = 'rounded transition-colors duration-200 font-medium'
  const typeClass = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    default: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
  }[buttonType.value]
  
  const sizeClass = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  }[buttonSize.value]

  return `${baseClass} ${typeClass} ${sizeClass}`
})
</script>

<template>
  <NodeViewWrapper as="span" class="inline-flex items-center gap-2">
    <button 
      :class="buttonClass"
      @click="handleClick"
    >
      {{ node.attrs.text }}
      <span v-if="clickCount > 0" 
            class="ml-2 bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
        {{ clickCount }}
      </span>
    </button>
  </NodeViewWrapper>
</template> 