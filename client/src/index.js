import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App';
import AddNewFournisseurContextProvider from './store/fournisseurContext';
import AddNewClientContextProvider from './store/clientContext';
import AddNewProduitContextProvider from './store/produitContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AddNewProduitContextProvider>
    <AddNewClientContextProvider>
    <AddNewFournisseurContextProvider>
    <BrowserRouter> 
    <App />
    </BrowserRouter>
    </AddNewFournisseurContextProvider>
    </AddNewClientContextProvider>
    </AddNewProduitContextProvider>
);
