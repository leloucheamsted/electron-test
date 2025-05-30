import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import NoteList from './NoteList';
import { Note } from '../common/type';

// Mock de window.api.getNotes
const mockNotes: Note[] = [
    { id: '1', title: 'Note 1', content: 'Content 1', created_at: new Date().toISOString() },
    { id: '2', title: 'Note 2', content: 'Content 2', created_at: new Date().toISOString() },
];

beforeEach(() => {
    window.api = {
        getNotes: jest.fn().mockResolvedValue(mockNotes),
        addNote: jest.fn().mockResolvedValue({}),
        updateNote: jest.fn().mockResolvedValue({}),
        deleteNote: jest.fn().mockResolvedValue(undefined),
        generatePDF: jest.fn().mockResolvedValue(''),
    };
});

describe('NoteList Component', () => {
    test('renders notes fetched from window.api.getNotes and reacts to user actions', async () => {
        const onSelect = jest.fn();
        const onDelete = jest.fn().mockResolvedValue(undefined);

        // Initial props with empty notes array (notes will be fetched in useEffect)
        render(<NoteList note={[]} onSelect={onSelect} onDelete={onDelete} />);

        // Wait for notes to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Note 1')).toBeInTheDocument();
            expect(screen.getByText('Note 2')).toBeInTheDocument();
        });

        // Click on note title triggers onSelect
        fireEvent.click(screen.getByText('Note 1'));
        expect(onSelect).toHaveBeenCalledWith(mockNotes[0]);

        // Click on delete button triggers onDelete and removes note from UI
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);

        // onDelete called with correct id
        expect(onDelete).toHaveBeenCalledWith('1');

        // Note 1 should be removed from the UI
        await waitFor(() => {
            expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
        });

        // Note 2 should still be present
        expect(screen.getByText('Note 2')).toBeInTheDocument();
    });
});
