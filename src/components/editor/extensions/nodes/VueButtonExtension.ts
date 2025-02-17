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

  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      text: {
        default: ''
      },
      type: {
        default: 'primary'
      },
      size: {
        default: 'medium'
      },
      clickCount: {
        default: 0
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'vue-button',
        getAttrs: element => {
          if (!(element instanceof HTMLElement)) return false
          return {
            text: element.textContent,
            type: element.getAttribute('type'),
            size: element.getAttribute('size')
          }
        }
      }
    ]
  },

  renderHTML({ node }) {
    return ['vue-button', {
      type: node.attrs.type,
      size: node.attrs.size,
      text: node.attrs.text
    }]
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