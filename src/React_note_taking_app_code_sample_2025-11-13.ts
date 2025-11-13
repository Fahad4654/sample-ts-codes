import React, { useState, useEffect } from 'react';

interface Note {
  id: string;
  text: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNoteText.trim() !== '') {
      const newNote: Note = { id: crypto.randomUUID(), text: newNoteText };
      setNotes([...notes, newNote]);
      setNewNoteText('');
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h1>Note Taking App</h1>
      <textarea
        value={newNoteText}
        onChange={(e) => setNewNoteText(e.target.value)}
        placeholder="Enter your note..."
      />
      <button onClick={handleAddNote}>Add Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;