import React, { useEffect, useState } from 'react';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
// import MarkdownPreview from './components/MarkdownPreview';
import { Note } from './common/type';
import ReactDOM from 'react-dom/client';
import ReactMarkdown from 'react-markdown';

const App = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [showEditor, setShowEditor] = useState(false); // Nouvel état pour la modal
    const [sortDesc, setSortDesc] = useState(true);
    const [search, setSearch] = useState('');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    }, [theme]);

    useEffect(() => {
        const fetchNotes = async () => {
            const fetchedNotes = await window.api.getNotes()
            setNotes(fetchedNotes);
        };

        fetchNotes();
    }, []);
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );
    const handleSortByDate = () => {
        setSortDesc(!sortDesc);
        setNotes([...notes].sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return !sortDesc ? dateA - dateB : dateB - dateA;
        }));
    };
    const addNote = async (note: Note) => {
        const newNote = await window.api.addNote(note);
        setNotes([...notes, newNote]);
        setShowEditor(false); // Fermer la modal après l'ajout
    };

    const updateNote = async (updatedNote: Note) => {
        const updated = await window.api.updateNote(updatedNote);
        setNotes(notes.map(note => (note.id === updated.id ? updated : note)));
        setShowEditor(false);
    };

    const deleteNote = async (id: string) => {
        await window.api.deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
        setSelectedNote(null);
    };

    const selectNote = (note: Note) => {
        setSelectedNote(note);
        setShowEditor(true);
    };

    const handleAddClick = () => {
        setSelectedNote(null);
        setShowEditor(true);
    };
    // mettre la date au format jour mois année
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (
        <div id='app' className="app">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h1>Markdown Notes</h1>
                <button className='sort-button' onClick={handleSortByDate}>
                    Trier par date {sortDesc ? '↑' : '↓'}
                </button>
                <button
                    className='theme-button'
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    {theme === 'light' ? '🌙 Mode sombre' : '☀️ Mode clair'}
                </button>
            </div>
            <div className='search-bar'>
                <input
                    type="text"
                    placeholder="Rechercher une note..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}

                />
                <button onClick={() => filteredNotes} disabled={search.trim() == ''} className='search-button'>search</button>
            </div>
            <div className="note-list">
                <div>
                    {filteredNotes.map(note => (
                        <div className='note-list-item' key={note.id}>
                            <div onClick={() => selectNote(note)} className='note-item' >
                                <span className='note-title' >{note.title}</span>
                                {/* <p className='note-mark'>{note.content}</p> */}
                                <div
                                    className="markdown-p"

                                >
                                    <ReactMarkdown>{note.content || ''}</ReactMarkdown>
                                </div>
                            </div>
                            <div className='end-title'><h3 className='date-time'>{formatDate(note.created_at)}</h3>
                                <button className='delete-btn' onClick={() => deleteNote(note.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showEditor && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <NoteEditor
                            note={selectedNote}
                            onCancel={() => { setShowEditor(false); setSelectedNote(null); }}
                            onSave={selectedNote ? updateNote : addNote}
                        />
                    </div>
                </div>
            )}
            {!showEditor && <button className="fab" onClick={handleAddClick}>+</button>}
            {/* <NoteEditor note={selectedNote} onCancel={() => { }} onSave={selectedNote ? updateNote : addNote} /> */}
            {/* {selectedNote && <MarkdownPreview content={selectedNote.content} />} */}
        </div>
    );
};

export default App;


