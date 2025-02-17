# Vue Markdown Editor

All code is implemented using cursor。

一个思路实现验证，动态渲染vue组件到页面上

GPT=>markdown=>markdown-it=>html=>tiptap=>render Vue Component

一个基于 Vue 3 + Tiptap + Markdown-it 的 Markdown 编辑器，支持实时预览、语法高亮、自定义组件等功能。

## 特性

- 📝 实时 Markdown 预览
- 🎨 代码语法高亮
- 🔗 链接和图片支持
- 📊 表格支持
- ✅ 任务列表
- 🔢 数学公式 (KaTeX)
- 👥 @提及功能
- 🎯 自定义组件（按钮、卡片等）
- 📦 代码块折叠和复制
- 🎨 美观的界面设计

## 技术栈

- Vue 3
- TypeScript
- Tiptap
- Markdown-it
- Tailwind CSS
- Lowlight/Highlight.js

## 安装

```bash
npm install
```

## 开发

```bash
npm run dev
```

## 构建

```bash
npm run build
```

## 自定义组件

![Snipaste_2025-02-17_22-13-36](.\static\Snipaste_2025-02-17_22-13-36.png)

### 按钮组件
```markdown
<vue-button type="primary" size="medium">主要按钮</vue-button>
```

支持的类型：`primary`, `success`, `warning`, `danger`, `default`  
支持的尺寸：`small`, `medium`, `large`

### 卡片组件
```markdown
<vue-card 
  title="标题" 
  type="primary" 
  image="图片URL" 
  status="published"
>
  卡片内容
</vue-card>
```

支持的类型：`default`, `primary`, `success`, `warning`, `danger`  
支持的状态：`draft`, `published`, `archived`, `pending`

### @提及功能
```markdown
@[用户名](用户ID)
```

