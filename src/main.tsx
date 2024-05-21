import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/styles.scss"
import { BrowserRouter } from "react-router-dom";
import ModalContextProvider from './context/modalContext.tsx';
import ModalRegisterContextProvider from './context/modalRegistarContext.tsx';
import UserContextProvider from './context/userContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ModalContextProvider>
      <ModalRegisterContextProvider>
        <UserContextProvider>
    <App />
    </UserContextProvider>
    </ModalRegisterContextProvider>
    </ModalContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
