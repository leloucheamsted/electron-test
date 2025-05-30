import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteEditor from './NoteEditor';

test('renders NoteEditor and disables Save when fields are empty', () => {
    render(<NoteEditor onSave={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByPlaceholderText(/Name of candidate/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeDisabled();
});

test('enables Save when title and content are filled', () => {
    render(<NoteEditor onSave={jest.fn()} onCancel={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/Name of candidate/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Content' } });
    expect(screen.getByText(/Save/i)).not.toBeDisabled();
});