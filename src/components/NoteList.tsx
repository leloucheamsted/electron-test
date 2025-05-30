import React, { useEffect, useState } from 'react';
import { Note } from '../common/type';

type Props = {
    note: Note[];
    onSelect: (note: Note) => void;
    onDelete: (id: string) => void | Promise<void>;
};

const NoteList: React.FC<Props> = ({ note, onSelect, onDelete }) => {
    const [notes, setNotes] = useState<Note[]>(note || []);

    useEffect(() => {
        const fetchNotes = async () => {
            const fetchedNotes = await window.api.getNotes();
            setNotes(fetchedNotes);
        };

        fetchNotes();
        // setNotes(note);
    }, []);

    const handleDelete = async (id: string) => {
        onDelete(id);
        setNotes(notes.filter(note => note.id !== id));
    };


    return (
        <div className="note-list">
            <h2>Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <span className='note-title' onClick={() => onSelect(note)}>{note.title}</span>
                        <button onClick={() => handleDelete(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;