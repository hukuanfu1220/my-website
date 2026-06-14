// 密码生成器逻辑

function updateLengthDisplay() {
    const slider = document.getElementById('length');
    const display = document.getElementById('lengthValue');
    if (slider && display) {
        display.textContent = slider.value;
    }
}

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const useUpper = document.getElementById('uppercase').checked;
    const useLower = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;
    
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!chars) {
        document.getElementById('passwordDisplay').textContent = '请至少选择一种字符类型';
        document.getElementById('strengthFill').className = 'strength-bar-fill';
        document.getElementById('strengthText').textContent = '';
        return;
    }
    
    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
        password += chars[array[i] % chars.length];
    }
    
    document.getElementById('passwordDisplay').textContent = password;
    updateStrength(password);
}

function updateStrength(password) {
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    if (!fill || !text) return;
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    let strengthClass, strengthText;
    if (score <= 2) {
        strengthClass = 'strength-weak';
        strengthText = '🔴 弱 — 建议增加长度和字符种类';
    } else if (score <= 4) {
        strengthClass = 'strength-fair';
        strengthText = '🟡 一般 — 可以更安全';
    } else if (score <= 5) {
        strengthClass = 'strength-good';
        strengthText = '🔵 较强 — 适合大多数场景';
    } else {
        strengthClass = 'strength-strong';
        strengthText = '🟢 非常强 — 安全可靠';
    }
    
    fill.className = `strength-bar-fill ${strengthClass}`;
    text.textContent = strengthText;
}

async function copyPassword() {
    const display = document.getElementById('passwordDisplay');
    if (!display || display.textContent === '点击生成密码') {
        showToast('请先生成密码');
        return;
    }
    await copyToClipboard(display.textContent);
}

// 初始化
if (document.getElementById('passwordDisplay')) {
    generatePassword();
}
