// Модальное окно проектов: открытие/закрытие, ловушка фокуса, Escape
    // MODAL FUNCTIONS
    let lastFocusedElement = null;

    function openModal(title, description, tech) {
        const modal = document.getElementById('projectModal');
        const modalContent = modal.querySelector('.modal-content');
        const closeModalBtn = modal.querySelector('.modal-close-btn');

        // Store reference to currently focused element
        lastFocusedElement = document.activeElement;

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalTechStack').innerHTML = tech;
        modal.classList.add('active');
        // FIX audit #9: закрытая модалка убирается из дерева доступности
        modal.removeAttribute('aria-hidden');

        // Set focus to close button for accessibility
        if (closeModalBtn) closeModalBtn.focus();
    }

    function closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        // FIX audit #9: возвращаем aria-hidden, пока диалог скрыт
        modal.setAttribute('aria-hidden', 'true');

        // Restore focus to previously focused element
        if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

export { openModal, closeModal };
