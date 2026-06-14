// Markdown 编辑器逻辑

const input = document.getElementById('markdownInput');
const preview = document.getElementById('preview');

function updatePreview() {
    if (!input || !preview) return;
    const md = input.value;
    preview.innerHTML = parseMarkdown(md);
}

function copyHTML() {
    if (!preview) return;
    copyToClipboard(preview.innerHTML);
}

function copyMarkdown() {
    if (!input) return;
    copyToClipboard(input.value);
}

function clearAll() {
    if (input) input.value = '';
    if (preview) preview.innerHTML = '';
}

function loadSample() {
    if (input) {
        input.value = `# 我的文档

## 功能特性

- 实时预览
- 代码块高亮
- 表格支持

## 代码示例

\`\`\`javascript
function greet(name) {
    console.log("Hello, " + name + "!");
}
greet("World");
\`\`\`

> 好的工具让写作更简单

## 表格示例

| 功能 | 状态 | 备注 |
|------|------|------|
| 实时预览 | ✅ | 已实现 |
| 代码高亮 | ✅ | 支持 |
| 导出 PDF | ⏳ | 计划中 |

开始编辑吧！`;
    }
    updatePreview();
}

if (input) {
    input.addEventListener('input', updatePreview);
}

if (document.getElementById('markdownInput')) {
    updatePreview();
}
