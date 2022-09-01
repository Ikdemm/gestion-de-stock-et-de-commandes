import { StyledEngineProvider } from "@mui/material/styles";
import * as React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
//import 'font-awesome/css/font-awesome.min.css';
//import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AddNewAchatFactContextProvider from "./store/achatFactContext";
import AddNewAppelOffreContextProvider from "./store/appelOffreContext";
import AddNewCategorieContextProvider from "./store/categoryContext";
import AddNewClientContextProvider from "./store/clientContext";
import AddNewDemandeContextProvider from "./store/demandeContext";
import AddNewDirectionContextProvider from "./store/directionContext";
import AddNewEmployeeContextProvider from "./store/employeeContext";
import AddNewFournisseurContextProvider from "./store/fournisseurContext";
import AddNewLigneAchatContextProvider from "./store/ligneAchatContext";
import AddNewProduitContextProvider from "./store/produitContext";
import UserContextProvider from "./store/userContext";
import AddNewVenteFactContextProvider from "./store/venteFactContext";
import AchatAvoirContextProvider from "./store/achatAVOIRContext";
import LigneAvoirSurAchatContextProvider from "./store/ligneAvoirAchatContext";
import LigneVenteContextProvider from "./store/ligneVenteContext";
import VenteAvoirContextProvider from "./store/venteAvoirContext";
import LigneAvoirSurVenteContextProvider from "./store/ligneAvoirVenteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LigneAvoirSurVenteContextProvider>
    <VenteAvoirContextProvider>
      <LigneVenteContextProvider>
        <LigneAvoirSurAchatContextProvider>
          <AchatAvoirContextProvider>
            <AddNewDemandeContextProvider>
              <AddNewVenteFactContextProvider>
                <AddNewAppelOffreContextProvider>
                  <AddNewLigneAchatContextProvider>
                    <AddNewAchatFactContextProvider>
                      <AddNewDirectionContextProvider>
                        <AddNewProduitContextProvider>
                          <AddNewClientContextProvider>
                            <AddNewFournisseurContextProvider>
                              <AddNewEmployeeContextProvider>
                                <AddNewCategorieContextProvider>
                                  <UserContextProvider>
                                    <BrowserRouter>
                                      <StyledEngineProvider injectFirst>
                                        <App />
                                      </StyledEngineProvider>
                                    </BrowserRouter>
                                  </UserContextProvider>
                                </AddNewCategorieContextProvider>
                              </AddNewEmployeeContextProvider>
                            </AddNewFournisseurContextProvider>
                          </AddNewClientContextProvider>
                        </AddNewProduitContextProvider>
                      </AddNewDirectionContextProvider>
                    </AddNewAchatFactContextProvider>
                  </AddNewLigneAchatContextProvider>
                </AddNewAppelOffreContextProvider>
              </AddNewVenteFactContextProvider>
            </AddNewDemandeContextProvider>
          </AchatAvoirContextProvider>
        </LigneAvoirSurAchatContextProvider>
      </LigneVenteContextProvider>
    </VenteAvoirContextProvider>
  </LigneAvoirSurVenteContextProvider>
);
