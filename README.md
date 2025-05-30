# Electron Notes App

Mini-application bureautique de prise de notes avec aperçu Markdown en temps réel, persistance locale et architecture sécurisée.

## Fonctionnalités

- Ajout, modification et suppression de notes (CRUD)
- Éditeur Markdown avec aperçu en temps réel
- Stockage local chiffré (via fichier JSON et IPC)
- Recherche de notes
- Thème clair/sombre basé sur l'OS
- Export Markdown → PDF (bonus)

## Structure du projet

electron-notes-app/
src
│
├── main.ts # Processus principal (Electron)
├── preload.ts
├── renderer.ts
├── index.css
├── index.html
├── app.tsx
├── common/ # Interfaces partagées
│   └── types.ts
├── components/ # Composants React
│   ├── NoteEditor.tsx
│   ├── NoteList.tsx
│   └── MarkdownPreview.tsx
├── utils/ # Utilitaires
│   └── storage.ts
├── db/ # Base de données locale
│   └── notes.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

## Sécurité

- `contextIsolation: true`
- `sandbox: true`
- `nodeIntegration: false`
- Communication sécurisée via `ipcMain` / `ipcRenderer`
- Aucune dépendance inutile, `npm audit clean`

## Scripts

```bash
# Lancer en mode développement
npm install
npm run dev

# Compiler l'app
npm run build

# Générer les exécutables (dmg, exe, AppImage)
npm run make
```

## Packaging

Utilise Electron Forge pour générer :

- .dmg (macOS)
- .exe (Windows)
- .AppImage (Linux)

## Stack technique

- Electron (Forge)
- React (Renderer)
- TypeScript
- marked pour le rendu Markdown
- Stockage local (fichier JSON via IPC)

## Critères validés

- Build cross-platform OK
- Données persistées localement
- Aucune alerte de sécurité
- Architecture claire et modulaire