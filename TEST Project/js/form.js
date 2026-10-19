// Контактная форма: инлайн-валидация + отправка через mailto
    // FORM HANDLING (FIX audit #4): инлайн-валидация полей + mailto без двойных alert/confirm
    const contactForm = document.getElementById('contactForm');
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

        contactForm.addEventListener('submit', function(e) {
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
            const emailBody = `Имя: ${value('name')}\nEmail: ${value('email')}\n\nСообщение:\n${value('message')}`;
            const mailtoLink = `mailto:hello@nexuscode.dev?subject=${encodeURIComponent(value('subject'))}&body=${encodeURIComponent(emailBody)}`;

            const status = document.getElementById('formStatus');
            if (status) {
                status.textContent = '> Открываю почтовый клиент... Если он не настроен, напишите напрямую: hello@nexuscode.dev';
            }
            window.location.href = mailtoLink;
        });
    }
