// Модальное окно проектов: ЕДИНЫЙ центральный обработчик состояния (FIX audit C-2)
// Открытие/закрытие, возврат фокуса, Escape и ловушка Tab — в одном месте.
const modal = document.getElementById('projectModal');
let lastFocusedElement = null;

function isModalOpen() {
    return !!modal && modal.classList.contains('active');
}

function openModal(title, description, tech) {
    if (!modal) return;

    // Store reference to currently focused element
    lastFocusedElement = document.activeElement;

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalTechStack').innerHTML = tech;
    modal.classList.add('active');
    // FIX audit #9: открытая модалка возвращается в дерево доступности
    modal.removeAttribute('aria-hidden');

    // Set focus to close button for accessibility
    const closeModalBtn = modal.querySelector('.modal-close-btn');
    if (closeModalBtn) closeModalBtn.focus();
}

function closeModal() {
    if (!isModalOpen()) return; // идемпотентность: повторный вызов безопасен
    modal.classList.remove('active');
    // FIX audit #9: возвращаем aria-hidden, пока диалог скрыт
    modal.setAttribute('aria-hidden', 'true');

    // Restore focus to previously focused element
    if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
        lastFocusedElement.focus();
    }
    lastFocusedElement = null;
}

if (modal) {
    // Клик по крестику — раньше не был привязан ни к одному обработчику!
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Клик по подложке (вне содержимого)
    modal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // ЦЕНТРАЛЬНЫЙ обработчик Escape + ловушка фокуса (единственный на document)
    document.addEventListener('keydown', function(e) {
        if (!isModalOpen()) return;

        if (e.key === 'Escape') {
            e.stopPropagation();
            closeModal();
            return;
        }

        // Ловушка фокуса: Tab циклится внутри диалога
        if (e.key === 'Tab') {
            const focusables = Array.from(modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )).filter(el => !el.hasAttribute('disabled'));
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            } else if (!modal.contains(document.activeElement)) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}

export { openModal, closeModal, isModalOpen };
