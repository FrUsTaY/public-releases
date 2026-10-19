// Контактная форма: инлайн-валидация + реальная отправка (FIX audit C-1)
    // FIX audit C-1: вместо mailto-заглушки — POST на endpoint (Formspree/Getform/свой API).
    // Укажите реальный адрес в FORM_ENDPOINT (или data-endpoint на <form>).
    // Если endpoint не настроен — показываем честный fallback с почтой, а не имитацию отправки.
    const contactForm = document.getElementById('contactForm');
    const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // TODO: заменить на реальный ID формы

    if (contactForm) {
        const fields = [
            { id: 'name', errorId: 'nameError', validate: v => v.trim() ? '' : 'Укажите имя.' },
            { id: 'email', errorId: 'emailError', validate: v => {
                if (!v.trim()) return 'Укажите email.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(v.trim()) ? '' : 'Введите корректный email адрес.';
            }},
            { id: 'subject', errorId: 'subjectError', validate: v => v.trim() ? '' : 'Укажите тему проекта.' },
            { id: 'message', errorId: 'messageError', validate: v => v.trim() ? '' : 'Напишите сообщение.' }
        ];

        const setFieldError = (field, msg) => {
            const input = document.getElementById(field.id);
            const errorEl = document.getElementById(field.errorId);
            if (errorEl) errorEl.textContent = msg;
            if (input) {
                input.classList.toggle('invalid', !!msg);
                input.setAttribute('aria-invalid', msg ? 'true' : 'false');
            }
        };

        // Валидация при уходе из поля
        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input) {
                input.addEventListener('blur', () => setFieldError(field, field.validate(input.value)));
                input.addEventListener('input', () => {
                    if (input.classList.contains('invalid')) setFieldError(field, field.validate(input.value));
                });
            }
        });

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            let firstInvalid = null;
            fields.forEach(field => {
                const input = document.getElementById(field.id);
                const msg = field.validate(input ? input.value : '');
                setFieldError(field, msg);
                if (msg && !firstInvalid && input) firstInvalid = input;
            });

            if (firstInvalid) {
                firstInvalid.focus();
                return;
            }

            const value = id => document.getElementById(id).value.trim();
            const status = document.getElementById('formStatus');
            const submitBtn = contactForm.querySelector('.form-submit');
            const endpoint = contactForm.getAttribute('data-endpoint') || FORM_ENDPOINT;
            const isConfigured = endpoint && !endpoint.includes('YOUR_FORM_ID');

            // Честный fallback: если endpoint не настроен, НЕ имитируем отправку
            if (!isConfigured) {
                if (status) {
                    status.textContent = '> Сервер приёма заявок ещё не подключён. Напишите напрямую: hello@nexuscode.dev';
                    status.classList.add('error');
                }
                return;
            }

            if (submitBtn) submitBtn.disabled = true;
            if (status) {
                status.classList.remove('success', 'error');
                status.textContent = '> Отправка запроса...';
            }

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: value('name'),
                        email: value('email'),
                        subject: value('subject'),
                        message: value('message')
                    })
                });

                if (response.ok) {
                    if (status) {
                        status.textContent = '> ЗАПРОС ОТПРАВЛЕН. Отвечу в течение 24 часов.';
                        status.classList.add('success');
                    }
                    contactForm.reset();
                    fields.forEach(f => setFieldError(f, ''));
                } else {
                    if (status) {
                        status.textContent = `> ОШИБКА ОТПРАВКИ (${response.status}). Попробуйте позже или напишите: hello@nexuscode.dev`;
                        status.classList.add('error');
                    }
                }
            } catch (err) {
                // FIX audit #12: обработка сетевых ошибок
                if (status) {
                    status.textContent = '> СЕТЕВАЯ ОШИБКА. Проверьте подключение и попробуйте снова, или напишите: hello@nexuscode.dev';
                    status.classList.add('error');
                }
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
