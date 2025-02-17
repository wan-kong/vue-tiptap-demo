import MarkdownIt from 'markdown-it'
import footnote from 'markdown-it-footnote'
import container from 'markdown-it-container'
import attrs from 'markdown-it-attrs'
import taskLists from 'markdown-it-task-lists'
import katex from 'markdown-it-katex'
import hljs from 'highlight.js'
import type Token from 'markdown-it/lib/token'
import { common, createLowlight } from 'lowlight'
import '../styles/markdown.css'

// 添加类型声明
declare module 'markdown-it-footnote' {}
declare module 'markdown-it-container' {}
declare module 'markdown-it-attrs' {}
declare module 'markdown-it-task-lists' {}
declare module 'markdown-it-katex' {}

// 创建 lowlight 实例
const lowlight = createLowlight(common)

// 注册语言
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'

lowlight.register('javascript', javascript)
lowlight.register('typescript', typescript)
lowlight.register('css', css)
lowlight.register('python', python)

export const createMarkdownParser = () => {
  const mdit = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
  })

  // 配置 KaTeX 渲染选项
  const katexOptions = {
    throwOnError: false,
    errorColor: '#cc0000',
    output: 'html',  // 使用 HTML 输出
    strict: false    // 不要太严格的错误检查
  }

  mdit.renderer.rules.code_inline = (tokens, idx) => {
    const token = tokens[idx]
    return `<code>${mdit.utils.escapeHtml(token.content)}</code>`
  }

  mdit.use(katex, katexOptions)
  mdit.use(footnote)
  mdit.use(container)
  mdit.use(attrs)
  mdit.use(taskLists)

  // 添加 @mention 的渲染规则
  mdit.inline.ruler.before('text', 'mention', (state, silent) => {
    // 检查是否以 @ 开头
    if (state.src[state.pos] !== '@') {
      return false
    }

    // 匹配 @[用户名](ID) 格式
    const regex = /^@\[([^\]]+)\]\(([^\)]+)\)/
    const match = state.src.slice(state.pos).match(regex)
    if (!match) return false

    // 如果在验证模式下，直接返回 true
    if (silent) {
      state.pos += match[0].length
      return true
    }

    // 创建 mention token
    const token = state.push('mention', '', 0)
    token.content = match[1] // 用户名
    token.meta = {
      id: match[2],
      name: match[1]
    }
    token.markup = '@'

    // 更新解析位置
    state.pos += match[0].length
    
    return true
  })

  // 自定义 mention 的渲染规则
  mdit.renderer.rules.mention = (tokens, idx) => {
    const token = tokens[idx]
    const { id, name } = token.meta || {}
    
    // 确保有效的 name 和 id
    if (!name || !id) return `@${token.content}`
    
    // 使用 data 属性来传递数据
    return `<span data-type="mention" data-id="${id}" data-name="${name}">@${name}</span>`
  }

  mdit.renderer.rules.fence = (tokens: Token[], idx: number) => {
    const token = tokens[idx]
    const info = token.info ? token.info.trim() : ''
    const lang = info.split(':')[0]

    if (lang && hljs.getLanguage(lang)) {
      try {
        const code = hljs.highlight(token.content, {
          language: lang,
          ignoreIllegals: true
        }).value
        return `<pre class="hljs"><code class="language-${lang}">${code}</code></pre>`
      } catch (__) {}
    }

    return `<pre class="hljs"><code>${mdit.utils.escapeHtml(token.content)}</code></pre>`
  }

  return {
    render: (content: string) => mdit.render(content)
  }
} 