// 文本统计工具
const textInput = document.getElementById('textInput');
if (textInput) {
    textInput.addEventListener('input', updateStats);
}

function updateStats() {
    const text = textInput.value;
    
    // 字符数
    const charCount = text.length;
    document.getElementById('charCount').textContent = charCount;
    
    // 不含空格的字符数
    const charCountNoSpace = text.replace(/\s/g, '').length;
    document.getElementById('charCountNoSpace').textContent = charCountNoSpace;
    
    // 词数（中英文混合）
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    document.getElementById('wordCount').textContent = words;
    
    // 行数
    const lines = text ? text.split('\n').length : 0;
    document.getElementById('lineCount').textContent = lines;
    
    // 段落数
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    document.getElementById('paragraphCount').textContent = paragraphs;
    
    // 句子数（以。！？.!?结尾）
    const sentences = text.match(/[。！？.!?]+/g);
    document.getElementById('sentenceCount').textContent = sentences ? sentences.length : 0;
    
    // 字节大小
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const byteSize = bytes.length;
    document.getElementById('byteSize').textContent = byteSize < 1024 ? byteSize + ' B' : 
                                                      (byteSize / 1024).toFixed(1) + ' KB';
    
    // 预计阅读时间（中文约300字/分钟，英文约200词/分钟）
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const otherChars = charCount - chineseChars;
    const readMinutes = (chineseChars / 300 + otherChars / 200);
    const readSeconds = Math.round(readMinutes * 60);
    document.getElementById('readTime').textContent = readMinutes < 1 ? readSeconds + ' 秒' : 
                                                       readMinutes.toFixed(1) + ' 分钟';
}
