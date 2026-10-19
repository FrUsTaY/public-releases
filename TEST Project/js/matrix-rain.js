// Matrix rain на canvas: rAF ~30fps, пауза в фоновой вкладке, debounce resize
    // MATRIX RAIN EFFECT (FIX audit #13: requestAnimationFrame вместо setInterval, пауза в фоновой вкладке)
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Matrix color state - can be changed by Easter eggs.
    // Храним в window, чтобы пасхалки (easter-eggs.js) могли менять цвет:
    // обычный ES-экспорт live-binding нельзя присваивать извне модуля.
    window.__nexusMatrixColor = '#00FF41';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height;
    }

    function drawMatrixRain() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = window.__nexusMatrixColor;
        ctx.font = fontSize + 'px "Courier New"';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i]);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // ~30 fps через rAF; полный стоп при document.hidden или prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30;

    function matrixLoop(timestamp) {
        if (!reducedMotion && !document.hidden && timestamp - lastFrameTime >= frameInterval) {
            lastFrameTime = timestamp;
            drawMatrixRain();
        }
        requestAnimationFrame(matrixLoop);
    }

    if (!reducedMotion) {
        requestAnimationFrame(matrixLoop);
    }

    document.addEventListener('visibilitychange', () => {
        // при возврате на вкладку цикл rAF уже сам возобновляет отрисовку
        if (!document.hidden && !reducedMotion) lastFrameTime = 0;
    });

    // WINDOW RESIZE - recalculate columns and drops (FIX audit #14: debounce)
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Recalculate columns
        const newColumns = Math.floor(canvas.width / fontSize);

        // Preserve existing drops where possible, add new ones
        const oldLength = drops.length;
        drops.length = newColumns;

        for (let i = oldLength; i < newColumns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
    }

    let resizeTimer = null;
    window.addEventListener('resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 150);
    });

export { canvas, reducedMotion };
