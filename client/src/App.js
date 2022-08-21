import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import Caisse from './components/Caisse';
import Category from './components/categories/CategoryForm';
import CategoryHolder from './components/categories/CategoryHolder';
import UpdateCategory from './components/categories/UpdateCategory';
import AddClientForm from './components/Customers/AddClientForm';
import ListeClients from './components/Customers/ListeClients';
import DashbordHolder from './components/dashboard/DashbordHolder';
import AddFournisseurForm from './components/Fournisseurs/AddFournisseurForm';
import ListeFournisseur from './components/Fournisseurs/ListeFournisseur';
import HolderDirection from './components/Gestion des Employes/Direction/HolderDirection';
import UpdateDirection from './components/Gestion des Employes/Direction/UpdateDirection';
import HolderEmployees from './components/Gestion des Employes/employes/HolderEmployees';
import ListeEmployes from './components/Gestion des Employes/employes/ListeEmployes';
import NewEmployeForm from './components/Gestion des Employes/employes/NewEmployeForm';
import UpdateEmployee from './components/Gestion des Employes/employes/UpdateEmployee';
import AddProductForm from './components/Produits/AddProductForm';
import HolderProduct from './components/Produits/HolderProduct';
import UpdateProduct from './components/Produits/UpdateProduct';
import Sidebar from './components/Sidebar';
import Stock from './components/Stock';

function App() {
  let {_id} = useParams();

  return (
    <div className="App">  
    <div className='sticky-top'>
<Sidebar></Sidebar>
      </div>      
      <div>
      <Routes>
        
        <Route path="/dashboard" element={<DashbordHolder/>}/>
        <Route path="/listFournisseurs" element={<ListeFournisseur/>}/>
        <Route path="/addFournisseur" element={<AddFournisseurForm/>}/>
        <Route path="/listClients" element={<ListeClients/>}/>
        <Route path="/addClient" element={<AddClientForm/>}/>
        <Route path="/addProduit" element={<AddProductForm/>}/>
        <Route path="/listProduits" element={<HolderProduct/>}/>
        <Route path="/directions" element={<HolderDirection/>}/>
        <Route path="/categories/:_id/edit" element={<UpdateCategory/>}/>
        <Route path="/produits/:_id/edit" element={<UpdateProduct/>}/>
        <Route path="/directions/:_id/edit" element={<UpdateDirection/>}/>
        <Route path="/listCategories" element={<CategoryHolder/>}/>
        <Route path="/addCategory" element={<Category/>}/>
        {/************************ GESTION DES EMPLOYES *************************/}
        <Route path="/employes" element={<HolderEmployees/>}/>
        <Route path="/employes/:_id/edit" element={<UpdateEmployee/>}/>
        <Route path="/nouveau-employe" element={<NewEmployeForm/>}/>
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/caisse" element={<Caisse/>}/>
     
     </Routes>
      </div>

</div>
  );
}

export default App;
