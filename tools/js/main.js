// 通用工具函数

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('已复制到剪贴板！');
    } catch {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('已复制到剪贴板！');
    }
}

// 简易 Markdown 解析器
function parseMarkdown(md) {
    let html = md;
    
    // 代码块
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    
    // 行内代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 标题
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
    
    // 粗体和斜体
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // 链接和图片
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    
    // 引用
    html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');
    
    // 分割线
    html = html.replace(/^---$/gm, '<hr>');
    
    // 无序列表
    html = html.replace(/^- \s?\[\s\]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/^- \s?\[x\]\s+(.+)$/gm, '<li checked>$1</li>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
    
    // 有序列表
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    
    // 表格
    html = html.replace(/^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)*)/gm, function(match, header, sep, body) {
        const headers = header.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
        const rows = body.trim().split('\n').map(row => {
            const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    });
    
    // 段落
    html = html.replace(/^(?!<[huplbto]|<\/)(.+)$/gm, function(match) {
        if (match.trim() === '') return '';
        return `<p>${match}</p>`;
    });
    
    // 清理多余空行
    html = html.replace(/\n{2,}/g, '\n');
    
    return html;
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 二维码页面初始化
    if (document.getElementById('qrText')) {
        generateQR();
    }
    // 密码页面初始化
    if (document.getElementById('passwordDisplay')) {
        generatePassword();
    }
});
