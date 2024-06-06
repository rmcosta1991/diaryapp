document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('diaryForm');
    const diaryEntries = document.getElementById('diaryEntries');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const entryTitle = document.getElementById('entryTitle').value;
        const entryContent = document.getElementById('entryContent').value;

        const entry = {
            title: entryTitle,
            content: entryContent,
            date: new Date().toLocaleString()
        };

        addEntry(entry);
        saveEntry(entry);
        form.reset();
    });

    function addEntry(entry) {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${entry.title}</h3>
            <p>${entry.content}</p>
            <small>${entry.date}</small>
            <button class="delete-button">Delete</button>
        `;
        diaryEntries.insertBefore(li, diaryEntries.firstChild);

        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteEntry(entry, li);
        });
    }

    function saveEntry(entry) {
        const entries = getEntries();
        entries.push(entry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
    }

    function deleteEntry(entry, element) {
        let entries = getEntries();
        entries = entries.filter(e => e.date !== entry.date);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        diaryEntries.removeChild(element);
    }

    function getEntries() {
        return JSON.parse(localStorage.getItem('diaryEntries')) || [];
    }

    function loadEntries() {
        const entries = getEntries();
        diaryEntries.innerHTML = '';
        entries.reverse().forEach(addEntry);
    }

    loadEntries();
});
