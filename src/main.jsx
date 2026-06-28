import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/theme.css";

import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App'

import { AuthProvider } from './context/AuthContext'

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <AuthProvider>

      <App />

    </AuthProvider>

  </React.StrictMode>

)