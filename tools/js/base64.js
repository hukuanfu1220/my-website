// Base64 编解码工具
function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    const output = document.getElementById('base64Output');
    
    if (!input.trim()) {
        output.textContent = '请输入要编码的文本';
        return;
    }
    
    try {
        // 使用 TextEncoder 处理 Unicode 字符
        const encoder = new TextEncoder();
        const bytes = encoder.encode(input);
        const binaryString = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
        const encoded = btoa(binaryString);
        output.textContent = encoded;
    } catch (e) {
        output.textContent = '编码失败: ' + e.message;
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value.trim();
    const output = document.getElementById('base64Output');
    
    if (!input) {
        output.textContent = '请输入要解码的 Base64 字符串';
        return;
    }
    
    try {
        const decoded = atob(input);
        // 使用 TextDecoder 处理 Unicode 字符
        const bytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
            bytes[i] = decoded.charCodeAt(i);
        }
        const text = new TextDecoder().decode(bytes);
        output.textContent = text;
    } catch (e) {
        output.textContent = '解码失败: 无效的 Base64 字符串';
    }
}

function swapBase64() {
    const input = document.getElementById('base64Input');
    const output = document.getElementById('base64Output');
    
    if (output.textContent && !output.textContent.startsWith('结果将在这里显示')) {
        input.value = output.textContent;
        output.textContent = '结果将在这里显示...';
    }
}

function copyBase64() {
    const output = document.getElementById('base64Output').textContent;
    if (output.startsWith('结果将在这里显示') || output.startsWith('请输入')) {
        showToast('没有可复制的内容');
        return;
    }
    navigator.clipboard.writeText(output).then(() => {
        showToast('已复制到剪贴板！');
    });
}

function clearBase64() {
    document.getElementById('base64Input').value = '';
    document.getElementById('base64Output').textContent = '结果将在这里显示...';
}
