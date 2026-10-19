// Создание одного плавающего символа на странице
export function spawnParticle(symbol, color) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = symbol;
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    if (color) { p.style.color = color; p.style.filter = 'drop-shadow(0 0 8px rgba(255,232,26,0.8))'; }
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 9000);
}
