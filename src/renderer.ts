import './index.css';
import { createRoot } from 'react-dom/client';
import App from './app';
import React from 'react';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(React.createElement(App));
}
