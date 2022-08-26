import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
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
import AddProductForm from "./components/Produits/AddProductForm";
import HolderProduct from "./components/Produits/HolderProduct";
import UpdateProduct from "./components/Produits/UpdateProduct";
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
import { achatFactCtx } from "./store/achatFactContext";
import { appelOffreCtx } from "./store/appelOffreContext";
import { clientCtx } from "./store/clientContext";
import { directionCtx } from "./store/directionContext";
import { employeeCtx } from "./store/employeeContext";
import { fournisseurtCtx } from "./store/fournisseurContext";
import { ligneAchatCtx } from "./store/ligneAchatContext";
import { produitCtx } from "./store/produitContext";
import Home from "./views/Home";
import Logout from "./components/Logout";

function App() {
  const { _id } = useParams();
  const ctx = useContext(fournisseurtCtx);
  const cltCtx = useContext(clientCtx);
  const ptx = useContext(produitCtx);
  const ftx = useContext(achatFactCtx);
  const ltx = useContext(ligneAchatCtx);
  const dirCtx = useContext(directionCtx);
  const empCtx = useContext(employeeCtx);
  const apoCtx = useContext(appelOffreCtx);

  useEffect(() => {
    ctx.getAllFournisseurs();
    cltCtx.getAllClients();
    ptx.getAllProduits();
    //ftx.getAllAchatFacts();
    ltx.getAllLigneAchats();
    dirCtx.getAllDirections();
    empCtx.getAllEmployees();
    apoCtx.getAllAppelOffres();
  }, []);

  function PrivateOutlet() {
    //check if user logged in
    const [auth1, setAuth] = useState(false);
    const [auth2, setAuth1] = useState(true);
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
    const auth = isLoggedIn();
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }
  const LoginContainer = () => (
   <Routes>
    
    <Route path="/login" element={<Login></Login> } />
   </Routes>

);

  const DefaultContainer = () => {
    <div>
      <div className="sticky-top">
        <Sidebar ></Sidebar>
      </div>
      <Routes>

      <Route path="/dashboard" element={<PrivateOutlet />} >
        <Route path="" element={<DashbordHolder />} />
      </Route>
      <Route path="/fournisseurs" element={<PrivateOutlet />} >
        <Route path="" element={<HolderFournisseurs />} />
      </Route>
      <Route
        path="/fournisseurs/:_id/edit"
        element={<PrivateOutlet />}
        
      >
        <Route path="" element={<UpdateFournisseur />} />
      </Route>
      <Route path="/clients" element={<PrivateOutlet />} >
        <Route path="" element={<HolderCustomers />} />
      </Route>
      <Route path="/clients/:_id/edit" element={<PrivateOutlet />} >
        <Route path="" element={<UpdateCustomer />} />
      </Route>
      <Route path="/stock/:_id/edit" element={<PrivateOutlet />} >
        <Route path="" element={<UpdateStock />} />
      </Route>
      <Route path="/addProduit" element={<PrivateOutlet />} >
        <Route path="" element={<AddProductForm />} />
      </Route>
      <Route path="/listProduits" element={<PrivateOutlet />} >
        <Route path="" element={<HolderProduct />} />
      </Route>
      <Route path="/directions" element={<PrivateOutlet />} >
        <Route path="" element={<HolderDirection />} />
      </Route>
      <Route path="/listCategories" element={<PrivateOutlet />} >
        <Route path="" element={<CategoryHolder />} />
      </Route>
      <Route
        path="/categories/:_id/edit"
        element={<PrivateOutlet />}
        
        >
        <Route path="" element={<UpdateCategory />} />
      </Route>
      <Route path="/produits/:_id/edit" element={<PrivateOutlet />} >
        <Route path="" element={<UpdateProduct />} />
      </Route>
      <Route
        path="/directions/:_id/edit"
        element={<PrivateOutlet />}
        
      >
        <Route path="" element={<UpdateDirection />} />
      </Route>
      <Route path="/addCategory" element={<PrivateOutlet />} >
        <Route path="" element={<Category />} />
      </Route>
      {/************************ GESTION DES EMPLOYES *************************/}
      <Route path="/employes" element={<PrivateOutlet />} >
        <Route path="" element={<HolderEmployees />} />
      </Route>
      <Route path="/employes/:_id/edit" element={<PrivateOutlet />} >
        <Route path="" element={<UpdateEmployee />} />
      </Route>
      <Route
        path="/employes/:_id/details"
        element={<PrivateOutlet />}
        
      >
        <Route path="" element={<OneEmploye />} />
      </Route>
      <Route path="/nouveau-employe" element={<PrivateOutlet />} >
        <Route element={<NewEmployeForm />} />
      </Route>
      <Route path="/stock" element={<PrivateOutlet />} >
        <Route path="" element={<Stock />} />
      </Route>
      <Route path="/caisse" element={<PrivateOutlet />} >
        <Route element={<Caisse />} />
      </Route>
      <Route path="/echeances" element={<PrivateOutlet />} >
        <Route path="" element={<HolderEcheances />} />
      </Route>
      {/************************ GESTION DES FACTURES ACHAT *************************/}
      <Route path="/achat" element={<PrivateOutlet />} >
        <Route path="" element={<Achats />} />
      </Route>
      //*Ordinaires**/
      <Route path="/historique-achat" element={<PrivateOutlet />} >
        <Route element={<HistoriqueAchats />} />
      </Route>
      <Route
        path="/ajout-facture-achat"
        element={<PrivateOutlet />}
        
        >
        <Route element={<NewAchatForm />} />
      </Route>
      <Route
        path="/facture-achat/panier"
        element={<PrivateOutlet />}
        
      >
        <Route element={<AddToInvoice />} />
      </Route>
  
      //*Avoir**/
      <Route
        path="/historique-avoir-achat"
        element={<PrivateOutlet />}
        
      >
        <Route path="" element={<HistoriqueAvoirSurAchat />} />
      </Route>
      <Route path="/ajout-avoir-achat" element={<PrivateOutlet />} >
        <Route path="" element={<NewAchatAvoirForm />} />
      </Route>
      //*Appel d'offre**/
      <Route
        path="/historique-appel-doffre"
        element={<PrivateOutlet />}
        
        >
        <Route path="" element={<HistoriqueAppelsOffres />} />
      </Route>
      <Route path="/ajout-appel-doffre" element={<PrivateOutlet />} >
        {" "}
        <Route path="" element={<NewAppelOffreForm />} />
      </Route>
 
      {/************************ GESTION DES FACTURES VENTE *************************/}
      <Route path="/ventes" element={<PrivateOutlet />} >
        <Route path="" element={<HolderVentes />} />
      </Route>
      //*Ordinaires**/
      <Route path="/historique-ventes" element={<PrivateOutlet />} >
        <Route path="" element={<HistoriqueVentes />} />
      </Route>
      <Route
        path="/ajout-facture-vente"
        element={<PrivateOutlet />}
        
      >
        <Route path="" element={<NewFormVente />} />
      </Route>
      <Route
        path="/facture-vente/panier"
        element={<PrivateOutlet />}
        
      >
        <Route path="" element={<AjouterDesArticlesVentes />} />
      </Route>
      //*Avoir**/
      <Route
        path="/historique-avoir-vente"
        element={<PrivateOutlet />}
        
      >
        <Route path="" element={<HistoriqueAvoirVentes />} />
      </Route>
      <Route path="/ajout-avoir-vente"  element={<PrivateOutlet />}>
        <Route element={<FormAvoirVentes />} />
      </Route>
      //*échéance**/
      <Route path="/echeances-vente"  element={<PrivateOutlet />}>
        <Route element={<VenteEcheances />} />
      </Route>
      {/************************ GESTION DES DEMANDES *************************/}
      <Route path="/demandes"  element={<PrivateOutlet />}>
        <Route path="" element={<HolderDemande />} />
      </Route>
      <Route path="/gestion-demandes"  element={<PrivateOutlet />}>
        <Route path="" element={<HolderGestionDemandes />} />
      </Route>
      <Route path="/non-traitees"  element={<PrivateOutlet />}>
        <Route path="" element={<NonTraitees />} />
      </Route>
      <Route path="/traitees"  element={<PrivateOutlet />}>
        <Route path="" element={<Traitees />} />
      </Route>
      {/************************ GESTION DES PROFILES *************************/}
      <Route path="/register"  element={<PrivateOutlet />}>
        <Route path="" element={<HolderProfiles />} />
      </Route>
      <Route path="/register-form"  element={<PrivateOutlet />}>
        <Route path="" element={<RegisterForm />} />
      </Route>
      <Route path="/all-users"  element={<PrivateOutlet />}>
        <Route path="" element={<AllUsers />} />
      </Route>
      <Route path="/logout"  element={<PrivateOutlet />}>
        <Route path="" element={<Logout />} />
      </Route>
        </Routes>
    </div>;
  };



  return (
    <BrowserRouter>
        <div className="App">
      <Routes>
          <Route  path="/login" element={<LoginContainer></LoginContainer>} />
          <Route element={<DefaultContainer></DefaultContainer>} />
      </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
