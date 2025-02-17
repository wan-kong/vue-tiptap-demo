<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import type { NodeViewProps } from '@tiptap/vue-3'
import { computed } from 'vue'
import { componentStates } from '@/hooks/useComponentStates'

// 完整的 NodeViewProps 类型
const props = defineProps<NodeViewProps>()

const cardType = computed(() => props.node.attrs.type || 'default')
const cardStatus = computed(() => props.node.attrs.status || 'published')
const likes = computed(() => props.node.attrs.likes || 0)

const statusClass = computed(() => {
  const baseClass = 'absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium'
  const statusClasses = {
    draft: 'bg-gray-100 text-gray-600',
    published: 'bg-green-100 text-green-600',
    archived: 'bg-yellow-100 text-yellow-600',
    pending: 'bg-blue-100 text-blue-600'
  }
  return `${baseClass} ${statusClasses[cardStatus.value]}`
})

const statusText = computed(() => {
  const texts = {
    draft: '草稿',
    published: '已发布',
    archived: '已归档',
    pending: '待审核'
  }
  return texts[cardStatus.value]
})

const cardClass = computed(() => {
  const baseClass = 'rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md relative'
  const typeClass = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-blue-50 border border-blue-200',
    success: 'bg-green-50 border border-green-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    danger: 'bg-red-50 border border-red-200'
  }[cardType.value]

  const statusModifier = cardStatus.value === 'archived' ? 'opacity-75' : ''

  return `${baseClass} ${typeClass} ${statusModifier}`
})

const headerClass = computed(() => {
  const baseClass = 'text-lg font-medium p-4 border-b'
  const typeClass = {
    default: 'bg-gray-50 border-gray-200',
    primary: 'bg-blue-100 border-blue-200 text-blue-800',
    success: 'bg-green-100 border-green-200 text-green-800',
    warning: 'bg-yellow-100 border-yellow-200 text-yellow-800',
    danger: 'bg-red-100 border-red-200 text-red-800'
  }[cardType.value]

  return `${baseClass} ${typeClass}`
})

const likeButtonClass = computed(() => {
  const baseClass = 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors'
  const typeClass = {
    default: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    primary: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
    success: 'bg-green-100 hover:bg-green-200 text-green-700',
    warning: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700',
    danger: 'bg-red-100 hover:bg-red-200 text-red-700'
  }[cardType.value]

  return `${baseClass} ${typeClass}`
})

const contentClass = computed(() => {
  const baseClass = 'text-gray-600'
  const typeClass = {
    default: 'text-gray-600',
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-700',
    danger: 'text-red-600'
  }[cardType.value]

  return `${baseClass} ${typeClass}`
})

const canInteract = computed(() => cardStatus.value !== 'archived')

const handleLike = () => {
  if (!canInteract.value) return
  const newLikes = likes.value + 1
  props.updateAttributes({
    likes: newLikes
  })

  // 更新状态
  componentStates.updateCardState(
    props.node.attrs.id || `${props.node.attrs.title}-${cardType.value}`,
    newLikes
  )
}

const handleStatusChange = () => {
  const statusFlow = {
    draft: 'pending',
    pending: 'published',
    published: 'archived',
    archived: 'draft'
  }
  props.updateAttributes({
    status: statusFlow[cardStatus.value]
  })
}
</script>

<template>
  <NodeViewWrapper class="relative group not-prose mb-4">
    <div :class="cardClass">
      <!-- 状态标签 -->
      <div 
        :class="statusClass"
        @click="handleStatusChange"
        role="button"
        title="点击切换状态"
      >
        {{ statusText }}
      </div>

      <!-- 卡片头部 -->
      <div :class="headerClass">
        {{ node.attrs.title }}
      </div>
      
      <!-- 卡片图片 -->
      <img 
        v-if="node.attrs.image"
        :src="node.attrs.image"
        :alt="node.attrs.title"
        class="w-full h-48 object-cover m-0"
        :class="{ 'opacity-75': !canInteract }"
      >
      
      <!-- 卡片内容 -->
      <div class="p-4 bg-white">
        <p :class="[contentClass, { 'opacity-75': !canInteract }]">
          {{ node.attrs.description }}
        </p>
        
        <!-- 卡片底部操作栏 -->
        <div class="mt-4 flex items-center justify-between gap-2">
          <div class="text-xs text-gray-500">
            <template v-if="!canInteract">
              <span class="italic">已归档，无法交互</span>
            </template>
          </div>
          <button 
            @click="handleLike"
            :class="[
              likeButtonClass,
              { 'opacity-50 cursor-not-allowed': !canInteract }
            ]"
            :disabled="!canInteract"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{{ likes }}</span>
          </button>
        </div>
      </div>
    </div>
  </NodeViewWrapper>
</template> 