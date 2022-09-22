import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Achats from "./components/Achats/Achats";
import AddToInvoice from "./components/Achats/AddToInvoice";
import HistoriqueAppelsOffres from "./components/Achats/appel_doffre/HistoriqueAppelsOffres";
import NewAppelOffreForm from "./components/Achats/appel_doffre/NewAppelOffreForm";
import HistoriqueAvoirSurAchat from "./components/Achats/avoir/HistoriqueAvoirSurAchat";
import NewAchatAvoirForm from "./components/Achats/avoir/NewAvoirAchatForm";
import HolderEcheances from "./components/Achats/echeances/HolderEcheances";
import HistoriqueAchats from "./components/Achats/HistoriqueAchats";
import NewAchatForm from "./components/Achats/NewAchatForm";
import Caisse from "./components/Caisse";
import Category from "./components/categories/CategoryForm";
import CategoryHolder from "./components/categories/CategoryHolder";
import UpdateCategory from "./components/categories/UpdateCategory";
import HolderCustomers from "./components/Customers/HolderCustomers";
import UpdateCustomer from "./components/Customers/UpdateCustomer";
import DashbordHolder from "./components/dashboard/DashbordHolder";
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
import Logout from "./components/Logout";
import AddProductForm from "./components/{t('produits')}/AddProductForm";
import HolderProduct from "./components/{t('produits')}/HolderProduct";
import UpdateProduct from "./components/{t('produits')}/UpdateProduct";
import AllUsers from "./components/register/AllUsers";
import HolderProfiles from "./components/register/HolderProfiles";
import RegisterForm from "./components/register/RegisterForm";
import Sidebar from "./components/Sidebar";
import Stock from "./components/Stock";
import UpdateStock from "./components/UpdateStock";
import FormAvoirVentes from "./components/Ventes/avoirs/FormAvoirVentes";
import HistoriqueAvoirVentes from "./components/Ventes/avoirs/HistoriqueAvoirVentes";
import VenteEcheances from "./components/Ventes/echeances/VenteEcheances";
import AjouterDesArticlesVentes from "./components/Ventes/factures/AjouterDesArticlesVentes";
import HistoriqueVentes from "./components/Ventes/factures/HistoriqueVentes";
import NewFormVente from "./components/Ventes/factures/NewFormVente";
import HolderVentes from "./components/Ventes/HolderVentes";
import WelcomePage from "./components/WelcomePage";
import { achatFactCtx } from "./store/achatFactContext";
import { appelOffreCtx } from "./store/appelOffreContext";
import { clientCtx } from "./store/clientContext";
import { directionCtx } from "./store/directionContext";
import { employeeCtx } from "./store/employeeContext";
import { fournisseurtCtx } from "./store/fournisseurContext";
import { ligneAchatCtx } from "./store/ligneAchatContext";
import { produitCtx } from "./store/produitContext";

function App() {
  const ctx = useContext(fournisseurtCtx);
  const cltCtx = useContext(clientCtx);
  const ptx = useContext(produitCtx);
  const ftx = useContext(achatFactCtx);
  const ltx = useContext(ligneAchatCtx);
  const dirCtx = useContext(directionCtx);
  const empCtx = useContext(employeeCtx);
  const apoCtx = useContext(appelOffreCtx);

  //let v=useContext (venteFactCtx)

  useEffect(() => {
    ctx.getAllFournisseurs();
    cltCtx.getAllClients();
    ptx.getAllProduits();
    ftx.getAllAchatFacts();
    ltx.getAllLigneAchats();
    dirCtx.getAllDirections();
    empCtx.getAllEmployees();
    apoCtx.getAllAppelOffres();
    //v.getAllVenteFacts();
  }, [apoCtx, cltCtx, empCtx, ctx, dirCtx, ltx, ptx, ftx]);

  const [auth, setAuth] = useState(false);
  const [auth1, setAuth1] = useState(true);
  const isLoggedIn = async () => {
    try {
      const res = await fetch("/auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 200) {
        setAuth(true);
        setAuth1(false);
      }
      if (res.status === 401) {
        setAuth(false);
        setAuth1(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  function PrivateOutlet() {
    //check if user logged in
    let auth = isLoggedIn();
    return auth ? <Outlet /> : <Navigate to="/" />;
  }

  return (
    <div className="App">
      <div className="sticky-top">
        <Sidebar auth={auth1}></Sidebar>
      </div>

      <div>
        <Routes>
          <Route path="/welcome-page" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<WelcomePage />} />
          </Route>
          <Route path="/dashboard" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<DashbordHolder />} />
          </Route>
          <Route path="/fournisseurs" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<HolderFournisseurs />} />
          </Route>
          <Route
            path="/fournisseurs/:_id/edit"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<UpdateFournisseur />} />
          </Route>
          <Route path="/clients" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<HolderCustomers />} />
          </Route>
          <Route
            path="/clients/:_id/edit"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<UpdateCustomer />} />
          </Route>
          <Route
            path="/stock/:_id/edit"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<UpdateStock />} />
          </Route>
          <Route path="/addProduit" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<AddProductForm />} />
          </Route>
          <Route path="/listProduits" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<HolderProduct />} />
          </Route>
          <Route path="/directions" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<HolderDirection />} />
          </Route>
          <Route
            path="/listCategories"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<CategoryHolder />} />
          </Route>
          <Route
            path="/categories/:_id/edit"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<UpdateCategory />} />
          </Route>
          <Route
            path="/produits/:_id/edit"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<UpdateProduct />} />
          </Route>
          <Route
            path="/directions/:_id/edit"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<UpdateDirection />} />
          </Route>
          <Route path="/addCategory" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<Category />} />
          </Route>
          {/************************ GESTION DES EMPLOYES *************************/}
          <Route path="/employes" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<HolderEmployees />} />
          </Route>
          <Route
            path="/employes/:_id/edit"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<UpdateEmployee />} />
          </Route>
          <Route
            path="/employes/:_id/details"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<OneEmploye />} />
          </Route>
          <Route
            path="/nouveau-employe"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<NewEmployeForm />} />
          </Route>
          <Route path="/stock" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<Stock />} />
          </Route>
          <Route path="/caisse" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<Caisse />} />
          </Route>
          <Route path="/echeances" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<HolderEcheances />} />
          </Route>
          {/************************ GESTION DES FACTURES ACHAT *************************/}
          <Route path="/achat" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<Achats />} />
          </Route>
          {/* //*Ordinaires**/}
          <Route
            path="/historique-achat"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<HistoriqueAchats />} />
          </Route>
          <Route
            path="/ajout-facture-achat"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<NewAchatForm />} />
          </Route>
          <Route
            path="/facture-achat/panier"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<AddToInvoice />} />
          </Route>
          {/*  <Route path="/facture-achat/:_id/panier" element={<AddToInvoice/>}/>  */}
          {/*  //*Avoir**/}
          <Route
            path="/historique-avoir-achat"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<HistoriqueAvoirSurAchat />} />
          </Route>
          <Route
            path="/ajout-avoir-achat"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<NewAchatAvoirForm />} />
          </Route>
          {/* //*Appel d'offre**/}
          <Route
            path="/historique-appel-doffre"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<HistoriqueAppelsOffres />} />
          </Route>
          <Route
            path="/ajout-appel-doffre"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            {" "}
            <Route path="" element={<NewAppelOffreForm />} />
          </Route>
          {/*   <Route path="/appel-doffre/:_id/details" element={<NewAppelOffreForm/>}/> */}
          {/************************ GESTION DES FACTURES VENTE *************************/}
          <Route path="/ventes" element={<PrivateOutlet />} auth={auth1}>
            <Route path="" element={<HolderVentes />} />
          </Route>
          {/*  //*Ordinaires**/}
          <Route
            path="/historique-ventes"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<HistoriqueVentes />} />
          </Route>
          <Route
            path="/ajout-facture-vente"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<NewFormVente />} />
          </Route>
          <Route
            path="/facture-vente/panier"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<AjouterDesArticlesVentes />} />
          </Route>
          {/* //*Avoir**/}
          <Route
            path="/historique-avoir-vente"
            element={<PrivateOutlet />}
            auth={auth1}
          >
            <Route path="" element={<HistoriqueAvoirVentes />} />
          </Route>
          <Route
            path="/ajout-avoir-vente"
            auth={auth1}
            element={<PrivateOutlet />}
          >
            <Route path="" element={<FormAvoirVentes />} />
          </Route>
          {/* //*échéance**/}
          <Route
            path="/echeances-vente"
            auth={auth1}
            element={<PrivateOutlet />}
          >
            <Route path="" element={<VenteEcheances />} />
          </Route>
          {/************************ GESTION DES DEMANDES *************************/}
          <Route path="/demandes" auth={auth1} element={<PrivateOutlet />}>
            <Route path="" element={<HolderDemande />} />
          </Route>
          <Route
            path="/gestion-demandes"
            auth={auth1}
            element={<PrivateOutlet />}
          >
            <Route path="" element={<HolderGestionDemandes />} />
          </Route>
          <Route path="/non-traitees" auth={auth1} element={<PrivateOutlet />}>
            <Route path="" element={<NonTraitees />} />
          </Route>
          <Route path="/traitees" auth={auth1} element={<PrivateOutlet />}>
            <Route path="" element={<Traitees />} />
          </Route>
          {/************************ GESTION DES PROFILES *************************/}
          <Route path="/register" auth={auth1} element={<PrivateOutlet />}>
            <Route path="" element={<HolderProfiles />} />
          </Route>
          <Route path="/register-form" auth={auth1} element={<PrivateOutlet />}>
            <Route path="" element={<RegisterForm />} />
          </Route>
          <Route path="/all-users" auth={auth1} element={<PrivateOutlet />}>
            <Route path="" element={<AllUsers />} />
          </Route>
          <Route path="/logout" auth={auth1} element={<PrivateOutlet />}>
            <Route path="" element={<Logout />} />
          </Route>
          <Route path="/" element={<Login />} auth={auth} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
