<script setup lang="ts">
import MarkdownEditor from './components/editor/MarkdownEditor.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="py-6 bg-white shadow-sm mb-6">
      <h1 class="text-2xl font-bold text-center text-gray-800">Markdown 编辑器</h1>
    </header>
    <main class="container mx-auto px-4">
      <MarkdownEditor />
    </main>
  </div>
</template>

