// ==================== 提示语与样式 ====================
const tips = [
    "早点休息，别熬夜", "记得吃水果，补充维生素", "多喝水哦，保持水分",
    "天冷了，多穿衣服", "好好爱自己，你是最棒的", "梦想成真，加油",
    "顺顺利利，万事如意", "保持微笑呀，好运自然来", "期待下一次见面",
    "我想你了，你也在想我吗", "保持好心情，烦恼远离你",
    "今天过得开心嘛", "愿所有烦恼都消失", "金榜题名，学业有成",
    "记得按时吃饭", "累了就休息一下", "坚持就是胜利",
    "相信自己的选择", "每一天都是新的开始", "感恩生活中的小确幸",
    "别太累了，适当放松", "记得给家人打个电话", "你的努力终将开花结果",
    "保持好奇心，探索世界", "对自己温柔一点", "记得微笑，它会传染",
    "你是独一无二的", "小小的进步也是进步", "今天也要好好爱自己",
    "深呼吸，放松一下", "相信美好的事情即将发生"
];

const colors = ["color-1", "color-2", "color-3", "color-4", "color-5", "color-6"];
const icons = ["💖", "💝", "✨", "🌟", "🌸", "🌺", "🌷", "🍀", "🦋", "🌈"];

let tipCount = 0;
const maxTips = 100;     // 显示的数量上限
const tipInterval = 200; // 生成间隔（毫秒）
const tipDuration = 6000; // 每个提示存在时间（毫秒）

// ==================== 创建提示框 ====================
function createTip() {
    const tipWindow = document.createElement('div');
    tipWindow.className = 'tip-window';

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    tipWindow.classList.add(randomColor);

    const x = Math.random() * (window.innerWidth - 280);
    const y = Math.random() * (window.innerHeight - 150);
    tipWindow.style.left = `${x}px`;
    tipWindow.style.top = `${y}px`;

    const header = document.createElement('div');
    header.className = 'tip-header';
    header.innerHTML = `<span class="tip-icon">${randomIcon}</span><span class="tip-title">温馨提醒</span>`;

    const content = document.createElement('div');
    content.className = 'tip-content';
    content.textContent = randomTip;

    tipWindow.append(header, content);
    document.body.appendChild(tipWindow);

    // 动画淡入
    setTimeout(() => {
        tipWindow.style.opacity = '1';
        tipWindow.style.transform = 'scale(1)';
    }, 10);

    // 自动消失
    setTimeout(() => {
        tipWindow.style.opacity = '0';
        tipWindow.style.transform = 'scale(0.8)';
        setTimeout(() => tipWindow.remove(), 300);
    }, tipDuration);

    tipWindow.addEventListener('click', () => tipWindow.remove());
}

// ==================== 自动播放音乐 ====================
window.addEventListener("load", () => {
    const audio = document.getElementById("bgMusic");
    if (!audio) return;

    audio.volume = 0.5;
    audio.muted = true; // 初始静音，防止被拦截

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.warn("自动播放被阻止，等待用户交互后播放");
        });
    }

    // 用户点击后解除静音
    const enableSound = () => {
        audio.muted = false;
        audio.play();
        document.removeEventListener("click", enableSound);
        document.removeEventListener("touchstart", enableSound);
    };

    document.addEventListener("click", enableSound);
    document.addEventListener("touchstart", enableSound);

    // 循环生成提示框
    const intervalId = setInterval(() => {
        createTip();
        tipCount++;
        if (tipCount >= maxTips) clearInterval(intervalId);
    }, tipInterval);

    // 30秒后停止生成
    setTimeout(() => clearInterval(intervalId), 30000);
});
