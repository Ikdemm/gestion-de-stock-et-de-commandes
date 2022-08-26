import { StyledEngineProvider } from '@mui/material/styles';
import * as React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
//import 'font-awesome/css/font-awesome.min.css';
//import "bootstrap-icons/font/bootstrap-icons.css"; 

import App from './App1';
import AddNewAchatFactContextProvider from './store/achatFactContext';
import AddNewAppelOffreContextProvider from './store/appelOffreContext';
import AddNewCategorieContextProvider from './store/categoryContext';
import AddNewClientContextProvider from './store/clientContext';
import AddNewDemandeContextProvider from './store/demandeContext';
import AddNewDirectionContextProvider from './store/directionContext';
import AddNewEmployeeContextProvider from './store/employeeContext';
import AddNewFournisseurContextProvider from './store/fournisseurContext';
import AddNewLigneAchatContextProvider from './store/ligneAchatContext';
import AddNewProduitContextProvider from './store/produitContext';
import AddNewVenteFactContextProvider from './store/venteFactContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AddNewDemandeContextProvider>

    <AddNewVenteFactContextProvider>

    <AddNewAppelOffreContextProvider>

    <AddNewAchatFactContextProvider>
    <AddNewLigneAchatContextProvider>
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
    </AddNewLigneAchatContextProvider>
    </AddNewAchatFactContextProvider>
    </AddNewAppelOffreContextProvider>
    </AddNewVenteFactContextProvider>
    </AddNewDemandeContextProvider>
);
