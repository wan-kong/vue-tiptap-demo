import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import MentionView from './MentionView.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mention: {
      setMention: (attributes: { id: string, name: string }) => ReturnType
    }
  }
}

export const MentionExtension = Node.create({
  name: 'mention',
  group: 'inline',
  inline: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-id')
      },
      name: {
        default: null,
        parseHTML: element => element.getAttribute('data-name')
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="mention"]',
        getAttrs: element => {
          if (!(element instanceof HTMLElement)) return false
          return {
            id: element.getAttribute('data-id'),
            name: element.getAttribute('data-name')
          }
        }
      }
    ]
  },

  renderHTML({ node }) {
    return ['span', mergeAttributes(
      {
        'data-type': 'mention',
        'data-id': node.attrs.id,
        'data-name': node.attrs.name,
        class: 'mention'
      }
    ), `@${node.attrs.name}`]
  },

  addNodeView() {
    return VueNodeViewRenderer(MentionView)
  },

  addCommands() {
    return {
      setMention: attributes => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes
        })
      }
    }
  }
}) 