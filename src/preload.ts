// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

// contextBridge.exposeInMainWorld('api', {
//     invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
// });
contextBridge.exposeInMainWorld('api', {
    getNotes: () => ipcRenderer.invoke('get-notes'),
    generatePDF: (markdown: any, title: any) => ipcRenderer.invoke('generate-pdf', markdown, title),
    addNote: (note: any) => ipcRenderer.invoke('add-note', note),
    updateNote: (id: any, note: any) => ipcRenderer.invoke('update-note', id, note),
    deleteNote: (id: any) => ipcRenderer.invoke('delete-note', id),
});
