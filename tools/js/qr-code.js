// 二维码生成器逻辑

function generateQR() {
    const text = document.getElementById('qrText').value.trim();
    const output = document.getElementById('qrOutput');
    
    if (!text) {
        output.innerHTML = '<p style="color:var(--danger)">请输入文字或网址</p>';
        return;
    }
    
    // 使用 Google Charts API 生成二维码
    const encoded = encodeURIComponent(text);
    const url = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encoded}&choe=utf-8`;
    
    output.innerHTML = `
        <img src="${url}" alt="二维码 - ${text}" id="qrImage">
        <p style="margin-top:1rem; color:var(--gray); font-size:0.9rem;">${text}</p>
    `;
}

async function copyQR() {
    const img = document.getElementById('qrImage');
    if (!img) {
        showToast('请先生成二维码');
        return;
    }
    
    try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]);
        showToast('二维码图片已复制！');
    } catch {
        showToast('复制失败，请右键保存图片');
    }
}

// 初始化
if (document.getElementById('qrText')) {
    generateQR();
}
