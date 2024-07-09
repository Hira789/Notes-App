document.addEventListener('DOMContentLoaded', (event) => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');

    addNoteBtn.addEventListener('click', addNote);

    function addNote() {
        const noteText = noteInput.value.trim();
        if (noteText === '') {
            alert('Please enter a note.');
            return;
        }

        const noteItem = document.createElement('li');
        noteItem.textContent = noteText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            notesList.removeChild(noteItem);
            saveNotes();
        });

        noteItem.appendChild(deleteBtn);
        notesList.appendChild(noteItem);

        noteInput.value = '';

        saveNotes();
    }

    function saveNotes() {
        const notes = [];
        notesList.querySelectorAll('li').forEach(noteItem => {
            notes.push(noteItem.textContent.replace('Delete', '').trim());
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(noteText => {
            const noteItem = document.createElement('li');
            noteItem.textContent = noteText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                notesList.removeChild(noteItem);
                saveNotes();
            });

            noteItem.appendChild(deleteBtn);
            notesList.appendChild(noteItem);
        });
    }

    loadNotes();
});
