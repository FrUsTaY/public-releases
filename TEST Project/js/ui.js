// Интерактив: карточки портфолио, CTA-кнопки, услуги, тарифы, скиллы, tech-теги
import { openModal } from "./modal.js";

    // PROJECT CARD HANDLERS (click and keyboard)
    document.querySelectorAll('.project-card').forEach(card => {
        // Click handler
        card.addEventListener('click', function() {
            const title = this.querySelector('.project-info h3').textContent;
            const description = this.querySelector('.project-info p').textContent;
            const tech = this.querySelector('.project-tech').innerHTML;
            openModal(title, description, `<strong>Технологии:</strong><div class="project-tech" style="margin-top: 1rem;">${tech}</div>`);
        });

        // Keyboard handler for accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const title = this.querySelector('.project-info h3').textContent;
                const description = this.querySelector('.project-info p').textContent;
                const tech = this.querySelector('.project-tech').innerHTML;
                openModal(title, description, `<strong>Технологии:</strong><div class="project-tech" style="margin-top: 1rem;">${tech}</div>`);
            }
        });
    });

    // CLOSE MODAL ON OUTSIDE CLICK
    document.getElementById('projectModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // CLOSE MODAL ON ESCAPE KEY + FOCUS TRAP (FIX audit #5, #9)
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('projectModal');
        const isModalOpen = modal && modal.classList.contains('active');

        if (!isModalOpen) return;

        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        // Ловушка фокуса: Tab циклится внутри диалога
        if (e.key === 'Tab') {
            const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // ANIMATE SKILLS ON SCROLL
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-item').forEach(skill => {
        observer.observe(skill);
    });

    // CTA BUTTONS (включая кнопку КОНСУЛЬТАЦИЯ в шапке — FIX audit #6)
    function scrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', scrollToContact);
    });

    const headerCtaBtn = document.getElementById('headerCtaBtn');
    if (headerCtaBtn) {
        headerCtaBtn.addEventListener('click', scrollToContact);
    }

    // SECONDARY BUTTON - scrolls to about section
    const secondaryBtn = document.querySelector('.btn-secondary');
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback to services if about doesn't exist
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // SERVICE BUTTONS
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const service = this.getAttribute('data-service');
            const contactSection = document.getElementById('contact');
            const subjectField = document.getElementById('subject');

            if (contactSection && subjectField) {
                // Заполняем поле темы
                const serviceNames = {
                    'software-development': 'Разработка ПО',
                    'optimization': 'Оптимизация систем',
                    'consulting': 'Консультирование',
                    'integration': 'Интеграция систем'
                };
                subjectField.value = `Заказ услуги: ${serviceNames[service]}`;

                // Скроллим к форме
                contactSection.scrollIntoView({ behavior: 'smooth' });

                // Фокус на форму через небольшую задержку
                setTimeout(() => {
                    document.getElementById('name').focus();
                }, 800);
            }
        });
    });

    // PRICING BUTTONS
    document.querySelectorAll('.pricing-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tariff = this.getAttribute('data-tariff');
            const contactSection = document.getElementById('contact');
            const subjectField = document.getElementById('subject');

            if (contactSection && subjectField) {
                // Заполняем поле темы
                const tariffNames = {
                    'starter': 'Тариф СТАРТЕР (50 000 ₽)',
                    'professional': 'Тариф ПРОФЕССИОНАЛ (150 000 ₽)',
                    'premium': 'Тариф ПРЕМИУМ (300 000+ ₽)'
                };
                subjectField.value = `Интерес к тарифу: ${tariffNames[tariff]}`;

                // Скроллим к форме
                contactSection.scrollIntoView({ behavior: 'smooth' });

                // Фокус на форму
                setTimeout(() => {
                    document.getElementById('name').focus();
                }, 800);
            }
        });
    });

    // TECH ITEMS HOVER EFFECT (no keyboard handlers - they only logged to console)
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(1deg)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
