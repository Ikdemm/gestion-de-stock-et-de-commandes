import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Achats from "./components/Achats/Achats";
import AddToInvoice from "./components/Achats/AddToInvoice";
import AlertesSurAchat from "./components/Achats/AlertesSurAchat";
import HistoriqueAppelsOffres from "./components/Achats/appel_doffre/HistoriqueAppelsOffres";
import NewAppelOffreForm from "./components/Achats/appel_doffre/NewAppelOffreForm";
import DetailsAvoirAchat from "./components/Achats/avoir/DetailsAvoirAchat";
import HistoriqueAvoirSurAchat from "./components/Achats/avoir/HistoriqueAvoirSurAchat";
import NewAchatAvoirForm from "./components/Achats/avoir/NewAvoirAchatForm";
import PanierAvoirAchat from "./components/Achats/avoir/PanierAvoirAchat";
import DetailsAchat from "./components/Achats/detailsAchat";
import HolderEcheances from "./components/Achats/echeances/HolderEcheances";
import HistoriqueAchats from "./components/Achats/HistoriqueAchats";
import NewAchatForm from "./components/Achats/NewAchatForm";
import Category from "./components/categories/CategoryForm";
import CategoryHolder from "./components/categories/CategoryHolder";
import AddClientForm from "./components/Customers/AddClientForm";
import HolderCustomers from "./components/Customers/HolderCustomers";
import UpdateCustomer from "./components/Customers/UpdateCustomer";
import DashbordHolder from "./components/dashboard/DashbordHolder";
import AddFournisseurForm from "./components/Fournisseurs/AddFournisseurForm";
import HolderFournisseurs from "./components/Fournisseurs/HolderFournisseurs";
import UpdateFournisseur from "./components/Fournisseurs/UpdateFournisseur";
import HolderDemande from "./components/Gestion des Employes/demandes/HolderDemande";
import HolderGestionDemandes from "./components/Gestion des Employes/demandes/HolderGestionDemandes";
import NonTraitees from "./components/Gestion des Employes/demandes/NonTraitees";
import Traitees from "./components/Gestion des Employes/demandes/Traitees";
import HolderDirection from "./components/Gestion des Employes/Direction/HolderDirection";
import UpdateDirection from "./components/Gestion des Employes/Direction/UpdateDirection";
import HolderEmployees from "./components/Gestion des Employes/employes/HolderEmployees";
import NewEmployeForm from "./components/Gestion des Employes/employes/NewEmployeForm";
import OneEmploye from "./components/Gestion des Employes/employes/OneEmploye";
import UpdateEmployee from "./components/Gestion des Employes/employes/UpdateEmployee";
import Login from "./components/Login";
import AddProductForm from "./components/Produits/AddProductForm";
import HolderProduct from "./components/Produits/HolderProduct";
import UpdateProduct from "./components/Produits/UpdateProduct";
import AllUsers from "./components/register/AllUsers";
import HolderProfiles from "./components/register/HolderProfiles";
import RegisterForm from "./components/register/RegisterForm";
import Sidebar from "./components/Sidebar";
import Stock from "./components/Stock";
import UpdateStock from "./components/UpdateStock";
import DetailsAvoirVente from "./components/Ventes/avoirs/DetailsAvoirVente";
import FormAvoirVentes from "./components/Ventes/avoirs/FormAvoirVentes";
import HistoriqueAvoirVentes from "./components/Ventes/avoirs/HistoriqueAvoirVentes";
import PanierAvoirSurVente from "./components/Ventes/avoirs/PanierAvoirSurVente";
import VenteEcheances from "./components/Ventes/echeances/VenteEcheances";
import AjouterDesArticlesVentes from "./components/Ventes/factures/AjouterDesArticlesVentes";
import DetaiVente from "./components/Ventes/factures/DetaisVente";
import HistoriqueVentes from "./components/Ventes/factures/HistoriqueVentes";
import NewFormVente from "./components/Ventes/factures/NewFormVente";
import HolderVentes from "./components/Ventes/HolderVentes";
import WelcomePage from "./components/Home/WelcomePage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  function verifyConnecte() {
    let token = localStorage.getItem("token");
    if (token) setIsLogged(true);
    else setIsLogged(false);
  }
  useEffect(() => {
    verifyConnecte();
  }, []);
  const [tabUsers, setListeUsers] = useState([]);
  useEffect(() => {
    fetch("/api/auth/all-users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (const key in data) {
          data[key]._id = key;
          setListeUsers((prev) => {
            return [...prev, data[key]];
          });
        }
      });
  }, []);

  let emailUser = localStorage.getItem("email");
  var connectedUser = tabUsers.find((u) => u.email === emailUser);
  if (!isLogged) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  } else if (isLogged && connectedUser?.role === "admin") {
    return (
      <>
        <div className="sticky-top">
          <Sidebar></Sidebar>
        </div>
        <Routes>
          <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/dashboard" element={<DashbordHolder />} />

          <Route path="/fournisseurs" element={<HolderFournisseurs />} />
          <Route path="/addFournisseur" element={<AddFournisseurForm />} />

          <Route
            path="/fournisseurs/:_id/edit"
            element={<UpdateFournisseur />}
          />

          <Route path="/clients" element={<HolderCustomers />} />
          <Route path="/addClient" element={<AddClientForm />} />

          <Route path="/clients/:_id/edit" element={<UpdateCustomer />} />

          <Route path="/stock/:_id/edit" element={<UpdateStock />} />

          <Route path="/addProduit" element={<AddProductForm />} />

          <Route path="/listProduits" element={<HolderProduct />} />

          <Route path="/directions" element={<HolderDirection />} />

          <Route path="/listCategories" element={<CategoryHolder />} />

          <Route path="/produits/:_id/edit" element={<UpdateProduct />} />

          <Route path="/directions/:_id/edit" element={<UpdateDirection />} />

          <Route path="/addCategory" element={<Category />} />

          {/************************ GESTION DES EMPLOYES *************************/}
          <Route path="/employes" element={<HolderEmployees />} />

          <Route path="/employes/:_id/edit" element={<UpdateEmployee />} />

          <Route path="/employes/:_id/details" element={<OneEmploye />} />

          <Route path="/nouveau-employe" element={<NewEmployeForm />} />

          <Route path="/stock" element={<Stock />} />

          <Route path="/echeances" element={<HolderEcheances />} />

          {/************************ GESTION DES FACTURES ACHAT *************************/}
          <Route path="/achat" element={<Achats />} />
          <Route path="/alertes" element={<AlertesSurAchat />} />

          {/* //*Ordinaires**/}
          <Route path="/historique-achat" element={<HistoriqueAchats />} />

          <Route path="/ajout-facture-achat" element={<NewAchatForm />} />

          <Route path="/facture-achat/panier" element={<AddToInvoice />} />
          <Route
            path="/facture-achat/:_id/details"
            element={<DetailsAchat />}
          />
          {/*  <Route path="/facture-achat/:_id/panier" element={<AddToInvoice/>}/>  */}
          {/*  //*Avoir**/}
          <Route
            path="/historique-avoir-achat"
            element={<HistoriqueAvoirSurAchat />}
          />
          <Route
            path="/avoir-achat/:_id/details"
            element={<DetailsAvoirAchat />}
          />

          <Route path="/ajout-avoir-achat" element={<NewAchatAvoirForm />} />
          <Route path="/avoir-achat/panier" element={<PanierAvoirAchat />} />

          {/* //*Appel d'offre**/}
          <Route
            path="/historique-appel-doffre"
            element={<HistoriqueAppelsOffres />}
          />

          <Route path="/ajout-appel-doffre" element={<NewAppelOffreForm />} />

          {/*   <Route path="/appel-doffre/:_id/details" element={<NewAppelOffreForm/>}/> */}
          {/************************ GESTION DES FACTURES VENTE *************************/}
          <Route path="/ventes" element={<HolderVentes />} />

          {/*  //*Ordinaires**/}
          <Route path="/historique-ventes" element={<HistoriqueVentes />} />

          <Route path="/ajout-facture-vente" element={<NewFormVente />} />

          <Route
            path="/facture-vente/panier"
            element={<AjouterDesArticlesVentes />}
          />
          <Route path="/facture-vente/:_id/details" element={<DetaiVente />} />

          {/* //*Avoir**/}
          <Route
            path="/historique-avoir-vente"
            element={<HistoriqueAvoirVentes />}
          />
          <Route
            path="/avoir-vente/:_id/details"
            element={<DetailsAvoirVente />}
          />
          <Route path="/avoir-vente/panier" element={<PanierAvoirSurVente />} />

          <Route path="/ajout-avoir-vente" element={<FormAvoirVentes />} />

          {/* //*échéance**/}
          <Route path="/echeances-vente" element={<VenteEcheances />} />

          {/************************ GESTION DES DEMANDES *************************/}
          {/*      <Route path="/demandes" element={<HolderDemande />} /> */}

          <Route path="/gestion-demandes" element={<HolderGestionDemandes />} />

          <Route path="/non-traitees" element={<NonTraitees />} />

          <Route path="/traitees" element={<Traitees />} />

          {/************************ GESTION DES PROFILES *************************/}
          <Route path="/profiles" element={<HolderProfiles />} />

          <Route path="/register-form" element={<RegisterForm />} />

          <Route path="/all-users" element={<AllUsers />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  } else if (isLogged && connectedUser?.role === "magasinier_appro") {
    return (
      <>
        <div className="sticky-top">
          <Sidebar></Sidebar>
        </div>
        <Routes>
          <Route path="/welcome-page" element={<WelcomePage />} />

          <Route path="/stock/:_id/edit" element={<UpdateStock />} />
          <Route path="/addProduit" element={<AddProductForm />} />
          <Route path="/listProduits" element={<HolderProduct />} />
          <Route path="/listCategories" element={<CategoryHolder />} />
          <Route path="/produits/:_id/edit" element={<UpdateProduct />} />
          <Route path="/addCategory" element={<Category />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  } else if (isLogged && connectedUser?.role === "magasinier_bati") {
    return (
      <>
        <div className="sticky-top">
          <Sidebar></Sidebar>
        </div>
        <Routes>
          <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/gestion-demandes" element={<HolderGestionDemandes />} />
          <Route path="/non-traitees" element={<NonTraitees />} />
          <Route path="/traitees" element={<Traitees />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  } else if (isLogged && connectedUser?.role === "chef_serv_achat") {
    return (
      <>
        <div className="sticky-top">
          <Sidebar></Sidebar>
        </div>
        <Routes>
          <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/fournisseurs" element={<HolderFournisseurs />} />
          <Route path="/addFournisseur" element={<AddFournisseurForm />} />

          <Route
            path="/fournisseurs/:_id/edit"
            element={<UpdateFournisseur />}
          />
          {/************************ GESTION DES FACTURES ACHAT *************************/}
          <Route path="/achat" element={<Achats />} />
          <Route path="/alertes" element={<AlertesSurAchat />} />

          {/* //*Ordinaires**/}
          <Route path="/historique-achat" element={<HistoriqueAchats />} />

          <Route path="/ajout-facture-achat" element={<NewAchatForm />} />

          <Route path="/facture-achat/panier" element={<AddToInvoice />} />
          <Route
            path="/facture-achat/:_id/details"
            element={<DetailsAchat />}
          />
          {/*  <Route path="/facture-achat/:_id/panier" element={<AddToInvoice/>}/>  */}
          {/*  //*Avoir**/}
          <Route
            path="/historique-avoir-achat"
            element={<HistoriqueAvoirSurAchat />}
          />
          <Route
            path="/avoir-achat/:_id/details"
            element={<DetailsAvoirAchat />}
          />

          <Route path="/ajout-avoir-achat" element={<NewAchatAvoirForm />} />
          <Route path="/avoir-achat/panier" element={<PanierAvoirAchat />} />
          <Route path="/echeances" element={<HolderEcheances />} />

          {/* //*Appel d'offre**/}
          <Route
            path="/historique-appel-doffre"
            element={<HistoriqueAppelsOffres />}
          />

          <Route path="/ajout-appel-doffre" element={<NewAppelOffreForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  } else if (isLogged && connectedUser?.role === "chef_serv_vente") {
    return (
      <>
        <div className="sticky-top">
          <Sidebar></Sidebar>
        </div>
        <Routes>
          <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/clients" element={<HolderCustomers />} />
          <Route path="/addClient" element={<AddClientForm />} />

          <Route path="/clients/:_id/edit" element={<UpdateCustomer />} />
          {/************************ GESTION DES FACTURES VENTE *************************/}
          <Route path="/ventes" element={<HolderVentes />} />

          {/*  //*Ordinaires**/}
          <Route path="/historique-ventes" element={<HistoriqueVentes />} />

          <Route path="/ajout-facture-vente" element={<NewFormVente />} />

          <Route
            path="/facture-vente/panier"
            element={<AjouterDesArticlesVentes />}
          />
          <Route path="/facture-vente/:_id/details" element={<DetaiVente />} />

          {/* //*Avoir**/}
          <Route
            path="/historique-avoir-vente"
            element={<HistoriqueAvoirVentes />}
          />
          <Route
            path="/avoir-vente/:_id/details"
            element={<DetailsAvoirVente />}
          />
          <Route path="/avoir-vente/panier" element={<PanierAvoirSurVente />} />

          <Route path="/ajout-avoir-vente" element={<FormAvoirVentes />} />

          {/* //*échéance**/}
          <Route path="/echeances-vente" element={<VenteEcheances />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  } else if (isLogged && connectedUser?.role === "directeur_direction") {
    return (
      <>
        <div className="sticky-top">
          <Sidebar></Sidebar>
        </div>
        <Routes>
          <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/dashboard" element={<DashbordHolder />} />

          <Route path="/profiles" element={<HolderProfiles />} />

          <Route path="/register-form" element={<RegisterForm />} />

          <Route path="/all-users" element={<AllUsers />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  } else if (isLogged && connectedUser?.role === "employe") {
    return (
      <>
        <div className="sticky-top">
          <Sidebar></Sidebar>
        </div>
        <Routes>
          <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/demandes" element={<HolderDemande />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
