import './style.css';

const storageKey = 'ai-lab-notes';

const checklistItems = [
  'Install a code editor, such as VS Code.',
  'Install Node.js so you can run web projects.',
  'Install Git so you can save project history.',
  'Create a GitHub account for remote backups.',
  'Make a project folder for experiments.',
  'Write one clear goal before each lab session.',
  'Keep notes about commands, errors, and fixes.',
];

const commands = [
  { command: 'pwd', meaning: 'Show the folder you are in.' },
  { command: 'ls', meaning: 'List files and folders.' },
  { command: 'cd folder-name', meaning: 'Move into a folder.' },
  { command: 'cd ..', meaning: 'Move up one folder.' },
  { command: 'mkdir my-folder', meaning: 'Create a folder.' },
  { command: 'npm install', meaning: 'Install project dependencies.' },
  { command: 'npm run dev', meaning: 'Start a local development server.' },
  { command: 'git status', meaning: 'Check what changed.' },
  { command: 'git add .', meaning: 'Stage all changes.' },
  { command: 'git commit -m "message"', meaning: 'Save a snapshot.' },
  { command: 'git push', meaning: 'Upload commits to GitHub.' },
];

const checklist = document.querySelector('#setup-checklist');
const commandList = document.querySelector('#command-list');
const noteForm = document.querySelector('#note-form');
const savedNotes = document.querySelector('#saved-notes');
const savedCount = document.querySelector('#saved-count');
const clearNotesButton = document.querySelector('#clear-notes');
const dateInput = noteForm.elements.date;

dateInput.value = new Date().toISOString().slice(0, 10);

checklistItems.forEach((item) => {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const labelText = document.createElement('span');

  checkbox.type = 'checkbox';
  checkbox.setAttribute('aria-label', item);
  labelText.textContent = item;

  listItem.append(checkbox, labelText);
  checklist.append(listItem);
});

commands.forEach((item) => {
  const row = document.createElement('div');
  const command = document.createElement('code');
  const meaning = document.createElement('span');

  row.className = 'command-row';
  command.textContent = item.command;
  meaning.textContent = item.meaning;

  row.append(command, meaning);
  commandList.append(row);
});

function getNotes() {
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
}

function saveNotes(notes) {
  localStorage.setItem(storageKey, JSON.stringify(notes));
}

function renderNotes() {
  const notes = getNotes();
  savedNotes.innerHTML = '';
  savedCount.textContent = `${notes.length} note${notes.length === 1 ? '' : 's'} saved`;

  if (notes.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No notes saved yet. Add your first lab note.';
    savedNotes.append(emptyState);
    return;
  }

  const noteList = document.createElement('div');
  noteList.className = 'note-list';

  notes.forEach((note) => {
    const card = document.createElement('article');
    card.className = 'note-card';

    card.append(
      makeNoteHeader(note),
      makeNoteLine('Goal', note.goal),
      makeNoteLine('Tools', note.tools),
      makeNoteLine('Steps', note.steps),
      makeNoteLine('Results', note.results),
      makeNoteLine('Next steps', note.nextSteps),
    );

    noteList.append(card);
  });

  savedNotes.append(noteList);
}

function makeNoteHeader(note) {
  const wrapper = document.createElement('div');
  const title = document.createElement('h3');
  const meta = document.createElement('p');

  title.textContent = note.title;
  meta.className = 'note-meta';
  meta.textContent = `${note.date} · Saved ${note.savedAt}`;

  wrapper.append(title, meta);
  return wrapper;
}

function makeNoteLine(label, value) {
  const line = document.createElement('p');

  if (!value) {
    return line;
  }

  const strong = document.createElement('strong');
  strong.textContent = `${label}: `;
  line.append(strong, value);
  return line;
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(noteForm);
  const note = {
    id: crypto.randomUUID(),
    title: formData.get('title'),
    date: formData.get('date'),
    goal: formData.get('goal'),
    tools: formData.get('tools'),
    steps: formData.get('steps'),
    results: formData.get('results'),
    nextSteps: formData.get('nextSteps'),
    savedAt: new Date().toLocaleString(),
  };

  saveNotes([note, ...getNotes()]);
  noteForm.reset();
  dateInput.value = new Date().toISOString().slice(0, 10);
  renderNotes();
});

clearNotesButton.addEventListener('click', () => {
  localStorage.removeItem(storageKey);
  renderNotes();
});

renderNotes();
