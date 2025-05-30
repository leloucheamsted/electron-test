
export interface Note {
    id: string;
    title: string;
    content: string;
    created_at?: string;
    updatedAt?: string;
}

export type NoteList = Note[];