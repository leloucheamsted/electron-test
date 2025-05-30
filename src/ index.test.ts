import fs from 'fs';
import path from 'path';

// Simule le chemin du fichier notes.json
const userDataPath = __dirname;
const notesFilePath = path.join(userDataPath, 'notes.test.json');

// Fonctions à tester (copiées/adaptées depuis index.ts)
function readNotes() {
    try {
        const data = fs.readFileSync(notesFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function writeNotes(notes: any[]) {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}

describe('Notes file operations', () => {
    beforeEach(() => {
        // Réinitialise le fichier avant chaque test
        fs.writeFileSync(notesFilePath, '[]', 'utf-8');
    });

    afterAll(() => {
        // Nettoie le fichier après les tests
        if (fs.existsSync(notesFilePath)) fs.unlinkSync(notesFilePath);
    });

    it('should read empty notes', () => {
        expect(readNotes()).toEqual([]);
    });

    it('should write and read notes', () => {
        const notes = [{ id: '1', title: 'Test', content: 'Hello', created_at: new Date().toISOString() }];
        writeNotes(notes);
        expect(readNotes()).toEqual(notes);
    });

    it('should handle invalid JSON gracefully', () => {
        fs.writeFileSync(notesFilePath, 'invalid json', 'utf-8');
        expect(readNotes()).toEqual([]);
    });
});