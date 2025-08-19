// Settings menu toggle
const settingsButton = document.getElementById('settings-button');
const settingsMenu = document.getElementById('settings-menu');
settingsButton.addEventListener('click', () => {
    settingsMenu.classList.toggle('hidden');
});

// Menu sections
const menuSections = document.querySelectorAll('.menu-section');
menuSections.forEach(section => {
    const toggle = section.querySelector('.menu-toggle');
    toggle.addEventListener('click', () => section.classList.toggle('open'));
});

// Theme and auto-expand switches
const themeSwitch = document.getElementById('theme-switch');
const autoExpandSwitch = document.getElementById('auto-expand-switch');
const body = document.body;

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
    themeSwitch.checked = theme === 'dark';
}

function loadAutoExpand() {
    const pref = localStorage.getItem('autoExpand');
    const shouldExpand = pref !== 'false';
    autoExpandSwitch.checked = shouldExpand;
    if (shouldExpand) {
        setTimeout(() => menuSections.forEach(s => s.classList.add('open')), 100);
    }
}

themeSwitch.addEventListener('change', () => {
    const theme = themeSwitch.checked ? 'dark' : 'light';
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
});

autoExpandSwitch.addEventListener('change', () => {
    localStorage.setItem('autoExpand', autoExpandSwitch.checked);
});

loadTheme();
loadAutoExpand();

// Add note modal
const addNoteButton = document.getElementById('add-note-button');
const noteModal = document.getElementById('note-modal');
const modalOptions = noteModal.querySelectorAll('.modal-option');

addNoteButton.addEventListener('click', () => {
    noteModal.classList.remove('hidden');
});

noteModal.addEventListener('click', (e) => {
    if (e.target === noteModal) {
        noteModal.classList.add('hidden');
    }
});

modalOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        // Placeholder for creating the selected note type
        noteModal.classList.add('hidden');
    });
});
