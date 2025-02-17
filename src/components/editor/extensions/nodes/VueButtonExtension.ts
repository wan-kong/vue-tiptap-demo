import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import VueButton from './VueButton.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    vueButton: {
      setVueButton: (options: { text: string, type?: string, size?: string }) => ReturnType
    }
  }
}

const VueButtonExtension = Node.create({
  name: 'vue-button',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'vue-button',
      },
    ]
  },

  renderHTML({ node }) {
    return ['vue-button', { type: node.attrs.type, size: node.attrs.size }, 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(VueButton)
  },

  addCommands() {
    return {
      setVueButton: (options: { text: string, type?: string, size?: string }) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {
            text: options.text,
            type: options.type || 'primary',
            size: options.size || 'medium'
          }
        })
      }
    }
  }
})

export default VueButtonExtension 