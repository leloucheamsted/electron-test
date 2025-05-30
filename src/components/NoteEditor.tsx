import React, { useState, useRef, useEffect } from 'react';
import { Note } from '../common/type';
import ReactMarkdown from 'react-markdown';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
interface NoteEditorProps {
    note?: Note | null;
    onSave: (note: Note) => void;
    onCancel: () => void;
}

const mdParser = new MarkdownIt();


const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
    const [title, setTitle] = useState(note ? note.title : '');
    const [content, setContent] = useState(note ? note.content : '');
    const previewRef = useRef(null);
    // const [markdown, setMarkdown] = React.useState(note ? note.content : '');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleEditorChange = ({ text }: { text: string }) => {
        setContent(text);
    };
    const handleDownloadPDF = async () => {
        window.api.generatePDF(content, title || 'mon_test');
    };
    const handleSave = () => {
        const newNote: Note = {
            id: note ? note.id : Date.now().toString(),
            title,
            content,
        };

        onSave(newNote);

    };

    return (
        <div className="note-editor">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name of candidate"
            />
            <div className="editor-space" >

                <MdEditor
                    value={content}

                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />

                {/* <textarea
                    className='note-editor texteria'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your note in Markdown..."
                    style={{ flex: 1, minHeight: 120 }}
                />
                // <div ref={previewRef}
                //     className="markdown-p"
                // >
                //     <ReactMarkdown>{content || '*Prévisualisation...*'}</ReactMarkdown>
                // </div> */}

            </div>
            <div className="editor-actions">
                <button onClick={handleDownloadPDF}
                    disabled={title.trim() == '' || content.trim() == ''} className='download-pdfBtn'>Donwload Pdf</button>
                <button onClick={() => handleSave()}
                    disabled={title.trim() === '' || content.trim() === ''}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default NoteEditor;