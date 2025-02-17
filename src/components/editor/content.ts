export const initialContent = `# Markdown 完整语法示例

## 1. 标题语法
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 2. 强调语法
*斜体文本* _另一种斜体_
**粗体文本** __另一种粗体__
***粗斜体*** ___另一种粗斜体___
~~删除线~~ 和 ==高亮文本==

## 3. 列表
### 无序列表
- 第一项
  - 嵌套的第一项
  - 嵌套的第二项
- 第二项
- 第三项

### 有序列表
1. 第一步
   1. 子步骤 1
   2. 子步骤 2
2. 第二步
3. 第三步

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [x] 另一个已完成任务

## 4. 引用
> 这是一级引用
>> 这是嵌套的引用
>>> 这是三级嵌套引用

## 5. 代码
行内代码：\`const example = "hello world"\`

代码块：
\`\`\`javascript
function greeting(name) {
    console.log(\`Hello, \${name}!\`);
}

greeting("World");
\`\`\`

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## 6. 链接和图片
[普通链接](https://example.com)
[带标题的链接](https://example.com "链接标题")
![图片示例](https://picsum.photos/200/100)

## 7. 表格
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|--------:|
| 单元格 | 单元格 | 单元格 |
| 左对齐 | 居中 | 右对齐 |

## 8. 水平线
---
***
___

## 9. 脚注
这里是一个脚注引用[^1]
[^1]: 这里是脚注内容

## 10. 数学公式
行内公式：$E = mc^2$

块级公式：
$$
\\frac{n!}{k!(n-k)!} = \\binom{n}{k}
$$

## 11. HTML 支持
<div align="center">
  <p style="color: red;">这是一段居中的红色文字</p>
</div>

## 12. 转义字符
\\* \\_ \\{ \\} \\[ \\] \\( \\) \\# \\+ \\- \\. \\!

## 13. 定义列表
术语 1
: 定义 1
: 定义 2

术语 2
: 定义 3

## 14. 缩进式代码块
    这是一个缩进式代码块
    不需要特殊标记
    只需要缩进4个空格

## 15. 自动链接
<https://example.com>
<example@example.com>

## 16. 自定义组件
这里有一些交互按钮：
<vue-button type="primary" size="medium">主要按钮</vue-button>
<vue-button type="success" size="small">成功按钮</vue-button>
<vue-button type="warning" size="large">警告按钮</vue-button>
<vue-button type="danger">危险按钮</vue-button>
<vue-button type="default">默认按钮</vue-button>

点击按钮会显示点击次数！

## 17. 提及功能
你可以使用 @[label](123) 语法来提及用户：

这里有一些用户提及的例子：
@[张三](1001) 和 @[李四](1002) 正在讨论这个问题。
@[王五](1003) 也加入了讨论。

提及的用户会收到通知。

## 18. 卡片组件
你可以使用卡片组件来展示结构化内容：

<vue-card title="Vue3 指南" type="primary" image="https://picsum.photos/400/200" status="published">
Vue3 是一个流行的渐进式 JavaScript 框架，它提供了出色的开发体验。
</vue-card>

<vue-card title="React 教程" type="success" status="draft">
React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发和维护。
</vue-card>

<vue-card title="警告提示" type="warning" status="pending">
这是一个警告提示卡片，用于展示重要信息。
</vue-card>

<vue-card title="错误信息" type="danger" status="archived">
这是一个错误提示卡片，用于展示错误信息。
</vue-card>

点击卡片右下角的按钮可以给卡片点赞！
`