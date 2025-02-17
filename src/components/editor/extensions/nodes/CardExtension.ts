import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CardView from './CardView.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    card: {
      setCard: (attributes: { 
        title: string, 
        description?: string, 
        image?: string,
        type?: 'default' | 'primary' | 'success' | 'warning' | 'danger',
        status?: 'draft' | 'published' | 'archived' | 'pending'
      }) => ReturnType
    }
  }
}

const Card = Node.create({
  name: 'card',
  group: 'block',
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      title: {
        default: ''
      },
      description: {
        default: ''
      },
      image: {
        default: null
      },
      type: {
        default: 'default'
      },
      status: {
        default: 'published'
      },
      likes: {
        default: 0
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'vue-card',
        getAttrs: element => {
          if (!(element instanceof HTMLElement)) return false
          return {
            title: element.getAttribute('title'),
            description: element.textContent,
            image: element.getAttribute('image'),
            type: element.getAttribute('type'),
            status: element.getAttribute('status')
          }
        }
      }
    ]
  },

  renderHTML({ node }) {
    return [
      'vue-card',
      {
        title: node.attrs.title,
        image: node.attrs.image,
        type: node.attrs.type,
        status: node.attrs.status
      },
      node.attrs.description
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(CardView)
  },

  addCommands() {
    return {
      setCard: attributes => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes
        })
      }
    }
  }
})

export default Card 