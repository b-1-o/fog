import { createRoot } from 'react-dom/client';

// main.jsx is kept as the visual scene module; expose createRoot before it is evaluated.
globalThis.createRoot = createRoot;
import('./main.jsx');
