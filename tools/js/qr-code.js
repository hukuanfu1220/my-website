// 二维码生成器

function generateQR() {
    const text = document.getElementById('qrText').value.trim();
    const output = document.getElementById('qrOutput');
    
    if (!text) {
        output.innerHTML = '<p style="color:var(--danger)">请输入文字或网址</p>';
        return;
    }
    
    // 清除之前的二维码
    output.innerHTML = '<p style="color:var(--gray)">生成中...</p>';
    
    // 使用多个备选 API，提高成功率
    const apis = [
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`,
        `https://api.qrenco.de/${encodeURIComponent(text)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`)}`
    ];
    
    let apiIndex = 0;
    
    function tryApi() {
        if (apiIndex >= apis.length) {
            output.innerHTML = '<p style="color:var(--warning)">二维码服务暂时不可用，请稍后重试</p>';
            return;
        }
        
        const url = apis[apiIndex];
        const img = document.createElement('img');
        img.alt = `二维码 - ${text}`;
        img.id = 'qrImage';
        img.style.cssText = 'max-width:250px; border-radius:8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);';
        img.src = url;
        
        img.onerror = function() {
            apiIndex++;
            output.innerHTML = '<p style="color:var(--gray)">生成中...</p>';
            tryApi();
        };
        
        img.onload = function() {
            output.innerHTML = '';
            output.appendChild(img);
            const p = document.createElement('p');
            p.style.cssText = 'margin-top:1rem; color:var(--gray); font-size:0.9rem; word-break:break-all;';
            p.textContent = text;
            output.appendChild(p);
        };
        
        output.innerHTML = '';
        output.appendChild(img);
    }
    
    tryApi();
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
