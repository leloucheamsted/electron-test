import { Note } from '../common/type';

export { };

declare global {
    interface Window {
        api: {
            getNotes: () => Promise<Note[]>;
            addNote: (note: Note) => Promise<Note>;
            updateNote: (note: Note) => Promise<Note>;
            deleteNote: (id: string) => Promise<boolean>;
            generatePDF: (markdown: string, title: string) => Promise<void>;
        };
    }
}