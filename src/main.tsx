import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


import "primereact/resources/themes/saga-blue/theme.css"; // your chosen theme
import "primereact/resources/primereact.min.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
