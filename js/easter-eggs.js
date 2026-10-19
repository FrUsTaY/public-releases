// Пасхалки: Konami code, 1337 speak, тройной клик логотипа,
// Red/Blue pill (двойной клик), Simpsons-режим
import { canvas } from "./matrix-rain.js";
import { spawnParticle } from "./spawn-particle.js";
    // EASTER EGG: KONAMI CODE (↑↑↓↓←→←→BA)
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join('').toLowerCase() === konamiPattern.join('').toLowerCase()) {
            activateKonamiMode();
        }
    });

    function activateKonamiMode() {
        // Создаём эффект взрыва
        document.body.style.animation = 'none';
        setTimeout(() => {
            document.body.style.animation = 'pulse 0.5s ease-in-out 3';
        }, 10);

        // Выводим сообщение
        const konamiMsg = document.createElement('div');
        konamiMsg.innerHTML = '🎮 <strong>KONAMI CODE ACTIVATED!</strong> 🎮<br>You are now a true hacker!';
        konamiMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 65, 0.95);
            color: #000;
            padding: 2rem 3rem;
            border: 3px solid #00FF00;
            border-radius: 5px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 50px rgba(0, 255, 65, 1);
            animation: bounce-in 0.5s ease-out;
        `;
        document.body.appendChild(konamiMsg);

        // Временно увеличиваем скорость Matrix rain
        canvas.style.opacity = '0.8';

        setTimeout(() => {
            konamiMsg.remove();
            canvas.style.opacity = '0.3';
        }, 3000);

        console.log('%c🎮 KONAMI CODE UNLOCKED! 🎮', 'color: #00FF41; font-size: 20px; font-weight: bold;');
    }

    // EASTER EGG: 1337 SPEAK (печатаем "1337" или "leet")
    // Does NOT activate when typing in form fields
    let keyBuffer = [];
    document.addEventListener('keydown', function(e) {
        // Ignore input if focused on form elements
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT' || activeElement.classList.contains('form-group'))) {
            return;
        }

        keyBuffer.push(e.key);
        keyBuffer = keyBuffer.slice(-4);
        const typed = keyBuffer.join('').toLowerCase();

        if (typed === '1337' || typed === 'leet') {
            activate1337Mode();
        }
    });

    function activate1337Mode() {
        alert('🔓 H4X0R M0D3 4CT1V4T3D! 🔓\n\nY0U 4R3 N0W 4 L33T H4CK3R!\n\nTry typing more Easter eggs...');
        console.log('%c🔓 1337 MODE ACTIVATED! 🔓', 'color: #39FF14; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #39FF14;');
        console.log('%cH4X0R M0D3: 3N4BL3D', 'color: #00FF41; font-size: 14px;');
    }

    // EASTER EGG: Triple Click Logo
    let logoClickCount = 0;
    let logoClickTimer = null;

    function registerLogoClick() {
        logoClickCount++;

        if (logoClickTimer) clearTimeout(logoClickTimer);

        logoClickTimer = setTimeout(() => {
            logoClickCount = 0;
        }, 500);

        if (logoClickCount === 3) {
            activateLogoEasterEgg();
            logoClickCount = 0;
        }
    }

    const logoEl = document.querySelector('.logo');
    if (logoEl) {
        logoEl.addEventListener('click', registerLogoClick);
        // FIX audit #7: пасхалка доступна и с клавиатуры (Enter/Пробел)
        logoEl.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                registerLogoClick();
            }
        });
    }

    function activateLogoEasterEgg() {
        const messages = [
            '> ACCESS GRANTED',
            '> LOADING NEURAL NETWORK...',
            '> MATRIX CONNECTED',
            '> YOU KNOW KUNG FU NOW',
            '> FOLLOW THE WHITE RABBIT 🐰'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < messages.length) {
                console.log(`%c${messages[i]}`, 'color: #00FF41; font-size: 14px; font-family: monospace;');
                i++;
            } else {
                clearInterval(interval);
                console.log('%c> WELCOME TO THE REAL WORLD, NEO.', 'color: #00FF00; font-size: 16px; font-weight: bold;');
            }
        }, 300);
    }

    // EASTER EGG: Double click (Red Pill / Blue Pill)
    // Triggered by double-click on body but not on interactive elements
    document.addEventListener('dblclick', function(e) {
        // Get the closest interactive element
        const target = e.target;
        const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL'];
        const interactiveClass = ['service-card', 'project-card', 'pricing-card', 'tech-item', 'contact-item', 'stat-item', 'feature-item'];

        // Check if clicked on interactive element or inside one
        if (interactiveTags.includes(target.tagName) || interactiveClass.some(cls => target.closest('.' + cls))) {
            return;
        }

        const choice = confirm('💊 MATRIX CHOICE 💊\n\nRed Pill (OK) - See the truth\nBlue Pill (Cancel) - Stay in wonderland');

        if (choice) {
            // Red Pill - Matrix становится красной
            window.__nexusMatrixColor = '#FF0000';
            canvas.style.opacity = '0.6';
            alert('🔴 RED PILL TAKEN\n\nYou chose the truth. Welcome to the real world.');
            console.log('%c🔴 RED PILL: Truth revealed', 'color: #FF0000; font-size: 16px; font-weight: bold;');

            setTimeout(() => {
                canvas.style.opacity = '0.3';
                window.__nexusMatrixColor = '#00FF41';
                alert('🟢 MATRIX RESET TO GREEN\n\nWelcome back to the Matrix.');
            }, 5000);
        } else {
            // Blue Pill - Все остаётся как есть
            alert('🔵 BLUE PILL TAKEN\n\nYou chose comfort. The story ends here.');
            console.log('%c🔵 BLUE PILL: Staying in the Matrix', 'color: #0000FF; font-size: 16px;');
        }
    });

    // ANIMATE STATS ON SCROLL
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(stat => {
                    const targetStr = stat.getAttribute('data-target');
                    const target = parseFloat(targetStr);
                    const isDecimal = targetStr.includes('.');
                    const duration = 2000;
                    const steps = 50;
                    const stepTime = Math.abs(Math.floor(duration / steps));
                    let start = 0;
                    const timer = setInterval(function() {
                        start += 1;
                        if (isDecimal) {
                            stat.textContent = (start / 10).toFixed(1);
                        } else {
                            stat.textContent = start;
                        }
                        if ((isDecimal && start >= target * 10) || (!isDecimal && start >= target)) {
                            clearInterval(timer);
                            // FIX audit #1: дробные значения (рейтинг 5.0) не должны получать суффикс "+"
                            stat.textContent = isDecimal ? targetStr : targetStr + '+';
                        }
                    }, stepTime);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // MOBILE MENU TOGGLE
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isActive = navLinks.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking a link and update aria-expanded
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== ДОПОЛНИТЕЛЬНЫЕ АНИМАЦИИ =====
    if (!reducedMotion) {
        // Glitch-эффект на главном заголовке каждые ~6 секунд
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            setInterval(() => {
                heroTitle.style.animation = 'none';
                void heroTitle.offsetWidth; // reflow для перезапуска
                heroTitle.style.animation = 'glitch 0.9s steps(2, end), glow-pulse 2s ease-in-out infinite 0.9s';
            }, 6000);
        }

        // Parallax: hero-контент и canvas слегка смещаются за курсором
        const heroContent = document.querySelector('.hero-content');
        document.addEventListener('mousemove', function(e) {
            const dx = (e.clientX / window.innerWidth - 0.5);
            const dy = (e.clientY / window.innerHeight - 0.5);
            if (heroContent) {
                heroContent.style.transform = `translate(${dx * -18}px, ${dy * -12}px)`;
            }
            canvas.style.transform = `translate(${dx * 10}px, ${dy * 8}px) scale(1.03)`;
        });

        // Появление секций и карточек при скролле (reveal) с каскадной задержкой
        const revealTargets = document.querySelectorAll(
            '#services .service-card, #portfolio .project-card, #pricing .pricing-card, #about .feature-item'
        );
        revealTargets.forEach(el => el.classList.add('reveal'));

        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach((el, i) => {
            el.style.transitionDelay = ((i % 4) * 0.12) + 's';
            revealObserver.observe(el);
        });

        // Tech-теги: staggered pop-in при появлении стека
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((el, i) => el.style.setProperty('--i', i));
        const stackObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `tag-pop 0.45s ease-out forwards`;
                    entry.target.style.animationDelay = getComputedStyle(entry.target).getPropertyValue('--i') * 0.05 + 's';
                    stackObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        techItems.forEach(el => { el.style.opacity = '0'; stackObserver.observe(el); });

        // 3D tilt для карточек услуг и тарифов (мышь отслеживается только на самой карточке)
        document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
            card.classList.add('tilt-card');
            card.addEventListener('mousemove', function(e) {
                const r = card.getBoundingClientRect();
                const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
                const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
                card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    }

    // Случайные «зелёные» частицы, всплывающие снизу экрана

    // ===== SIMPSONS MODE (интеграция с Симпсонами) =====
    let simpsonsMode = false;
    let simpsonsInterval = null;

    const SIMPSONS_QUOTES = [
        'D\'oh! Код не компилируется... снова.',
        'Excelente! Отличный проект!',
        'Mmm... программный код 🍩',
        'Никаких багов! Ну почти никаких...',
        'Хм-хм-хм... Это баг или фича?',
        'Симуляция запущена успешно!'
    ];

    function activateSimpsonsMode() {
        if (simpsonsMode) return;
        simpsonsMode = true;
        window.__nexusSimpsonsMode = true;
        document.body.classList.add('simpsons-mode');
        window.__nexusMatrixColor = '#FFE81A'; // жёлтый Matrix-дождь

        // Тост с цитатой
        const toast = document.createElement('div');
        toast.className = 'simpsons-toast';
        toast.textContent = '🍩 SIMPSONS MODE: ' + SIMPSONS_QUOTES[Math.floor(Math.random() * SIMPSONS_QUOTES.length)];
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);

        // Ливень пончиков, донатов и Хomer-смайлов
        const symbols = ['🍩', '💛', '😄', '🍺', '☢️'];
        simpsonsInterval = setInterval(() => {
            if (!document.hidden) {
                spawnParticle(symbols[Math.floor(Math.random() * symbols.length)], '#FFE81A');
            }
        }, 350);

        console.log('%c🍩 SIMPSONS MODE ACTIVATED! D\'oh!', 'color: #FFE81A; background: #000; font-size: 18px; font-weight: bold;');

        // Возврат в зелёную Матрицу через 12 секунд
        setTimeout(deactivateSimpsonsMode, 12000);
    }

    function deactivateSimpsonsMode() {
        if (!simpsonsMode) return;
        simpsonsMode = false;
        window.__nexusSimpsonsMode = false;
        document.body.classList.remove('simpsons-mode');
        window.__nexusMatrixColor = '#00FF41';
        if (simpsonsInterval) { clearInterval(simpsonsInterval); simpsonsInterval = null; }
        console.log('%c> MATRIX RESTORED TO GREEN', 'color: #00FF41; font-size: 14px;');
    }

    // Пасхалка: наберите "doh" или "homer" где угодно вне формы
    let simpsonBuffer = [];
    document.addEventListener('keydown', function(e) {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT')) {
            return;
        }
        simpsonBuffer.push(e.key.toLowerCase());
        simpsonBuffer = simpsonBuffer.slice(-5);
        const typed = simpsonBuffer.join('');
        if (typed.endsWith('doh') || typed.endsWith('homer')) {
            activateSimpsonsMode();
            simpsonBuffer = [];
        }
    });

    // Клик по логотипу 5 раз подряд тоже включает Симпсон-режим:
    // навешиваем второй обработчик на тот же logoEl (первый считает тройной клик)
    let logoClickTotal = 0;
    let logoClickTotalTimer = null;
    if (logoEl) {
        logoEl.addEventListener('click', function() {
            logoClickTotal++;
            if (logoClickTotalTimer) clearTimeout(logoClickTotalTimer);
            logoClickTotalTimer = setTimeout(() => { logoClickTotal = 0; }, 2500);
            if (logoClickTotal >= 5) {
                logoClickTotal = 0;
                activateSimpsonsMode();
            }
        });
    }
