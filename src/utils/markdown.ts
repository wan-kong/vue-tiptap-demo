import MarkdownIt from 'markdown-it'
import footnote from 'markdown-it-footnote'
import container from 'markdown-it-container'
import attrs from 'markdown-it-attrs'
import highlightjs from 'markdown-it-highlightjs'
import taskLists from 'markdown-it-task-lists'

export const createMarkdownParser = () => {
  const mdit = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }
      return ''
    }
  })

  // 自定义行内代码的渲染规则
  mdit.renderer.rules.code_inline = (tokens, idx) => {
    const token = tokens[idx]
    return `<code>${token.content}</code>`
  }

  mdit.use(footnote)
  mdit.use(container)
  mdit.use(attrs)
  mdit.use(highlightjs)
  mdit.use(taskLists, { enabled: true, label: true, labelAfter: true })

  return mdit
} 