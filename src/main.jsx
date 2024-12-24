import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'; // Reset CSS\
import './styles/index.css'; // Main CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
