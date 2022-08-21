import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'font-awesome/css/font-awesome.min.css';
//import "bootstrap-icons/font/bootstrap-icons.css"; 

import App from './App';
import AddNewFournisseurContextProvider from './store/fournisseurContext';
import AddNewClientContextProvider from './store/clientContext';
import AddNewProduitContextProvider from './store/produitContext';
import { BrowserRouter } from 'react-router-dom';
import AddNewCategorieContextProvider from './store/categoryContext';
import AddNewDirectionContextProvider from './store/directionContext';
import AddNewEmployeeContextProvider from './store/employeeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AddNewDirectionContextProvider>
    <AddNewProduitContextProvider>
    <AddNewClientContextProvider>
    <AddNewFournisseurContextProvider>
    <AddNewEmployeeContextProvider>
    <AddNewCategorieContextProvider>
   <BrowserRouter>
   <StyledEngineProvider injectFirst>

    <App />
   </StyledEngineProvider>
   </BrowserRouter>
    </AddNewCategorieContextProvider>
    </AddNewEmployeeContextProvider>
    </AddNewFournisseurContextProvider>
    </AddNewClientContextProvider>
    </AddNewProduitContextProvider>
    </AddNewDirectionContextProvider>

);
