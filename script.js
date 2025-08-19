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

// Note management
let notes = [];
let currentNote = null;
const quickNotesList = document.getElementById('quick-notes-list');

function renderNotes() {
    quickNotesList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note.title;
        li.style.background = note.color;
        li.addEventListener('click', () => openEditor(note));
        quickNotesList.appendChild(li);
    });
}

// Add note modal with tabs
const addNoteButton = document.getElementById('add-note-button');
const noteModal = document.getElementById('note-modal');
const tabs = noteModal.querySelectorAll('.tab');
const tabContents = noteModal.querySelectorAll('.tab-content');
const noteTitleInput = document.getElementById('note-title');
const colorDisplay = document.getElementById('color-display');
const noteColorInput = document.getElementById('note-color');
const createNoteBtn = document.getElementById('create-note');

addNoteButton.addEventListener('click', () => {
    noteModal.classList.remove('hidden');
});

noteModal.addEventListener('click', e => {
    if (e.target === noteModal) {
        noteModal.classList.add('hidden');
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabContents.forEach(c => c.classList.add('hidden'));
        document.getElementById(tab.dataset.tab + '-tab').classList.remove('hidden');
    });
});

colorDisplay.addEventListener('click', () => noteColorInput.click());
noteColorInput.addEventListener('input', () => {
    colorDisplay.style.background = noteColorInput.value;
});

createNoteBtn.addEventListener('click', () => {
    const title = noteTitleInput.value.trim() || 'Untitled';
    const color = noteColorInput.value;
    const note = { id: Date.now(), title, color, content: '' };
    notes.push(note);
    renderNotes();
    noteModal.classList.add('hidden');
    openEditor(note);
    noteTitleInput.value = '';
    noteColorInput.value = '#ffffff';
    colorDisplay.style.background = '#ffffff';
});

// Editor
const editor = document.getElementById('editor');
const editorTitle = document.getElementById('editor-title');
const editorContent = document.getElementById('editor-content');
const backButton = document.getElementById('back-button');
const saveButton = document.getElementById('save-button');

function openEditor(note) {
    currentNote = note;
    editorTitle.textContent = note.title;
    editorContent.value = note.content;
    editor.classList.remove('hidden');
}

backButton.addEventListener('click', () => {
    editor.classList.add('hidden');
    currentNote = null;
});

saveButton.addEventListener('click', () => {
    if (currentNote) {
        currentNote.content = editorContent.value;
    }
    editor.classList.add('hidden');
    currentNote = null;
});
