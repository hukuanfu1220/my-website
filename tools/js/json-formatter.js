// JSON 格式化工具
function formatJSON() {
    const input = document.getElementById('jsonInput').value.trim();
    const output = document.getElementById('jsonOutput');
    const status = document.getElementById('jsonStatus');
    
    if (!input) {
        showStatus(status, '请先输入 JSON 数据', 'warning');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 4);
        output.textContent = formatted;
        showStatus(status, '✅ JSON 格式正确', 'success');
    } catch (e) {
        output.textContent = '❌ 解析错误: ' + e.message;
        showStatus(status, 'JSON 格式无效: ' + e.message, 'error');
    }
}

function compressJSON() {
    const input = document.getElementById('jsonInput').value.trim();
    const output = document.getElementById('jsonOutput');
    const status = document.getElementById('jsonStatus');
    
    if (!input) {
        showStatus(status, '请先输入 JSON 数据', 'warning');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const compressed = JSON.stringify(parsed);
        output.textContent = compressed;
        showStatus(status, '✅ 压缩成功', 'success');
    } catch (e) {
        output.textContent = '❌ 解析错误: ' + e.message;
        showStatus(status, 'JSON 格式无效', 'error');
    }
}

function validateJSON() {
    const input = document.getElementById('jsonInput').value.trim();
    const output = document.getElementById('jsonOutput');
    const status = document.getElementById('jsonStatus');
    
    if (!input) {
        showStatus(status, '请先输入 JSON 数据', 'warning');
        return;
    }
    
    try {
        JSON.parse(input);
        output.textContent = '✅ JSON 格式完全有效！';
        showStatus(status, '校验通过', 'success');
    } catch (e) {
        output.textContent = '❌ 无效 JSON: ' + e.message;
        showStatus(status, '校验失败', 'error');
    }
}

function copyResult() {
    const output = document.getElementById('jsonOutput').textContent;
    if (output.startsWith('结果将在这里显示') || output.startsWith('❌')) {
        showToast('没有可复制的内容');
        return;
    }
    navigator.clipboard.writeText(output).then(() => {
        showToast('已复制到剪贴板！');
    });
}

function clearAll() {
    document.getElementById('jsonInput').value = '';
    document.getElementById('jsonOutput').textContent = '结果将在这里显示...';
    document.getElementById('jsonStatus').style.display = 'none';
}

function showStatus(el, msg, type) {
    el.style.display = 'block';
    el.textContent = msg;
    el.style.background = type === 'success' ? '#d4edda' : 
                          type === 'error' ? '#f8d7da' : '#fff3cd';
    el.style.color = type === 'success' ? '#155724' : 
                     type === 'error' ? '#721c24' : '#856404';
    el.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : 
                                   type === 'error' ? '#f5c6cb' : '#ffeeba'}`;
}
