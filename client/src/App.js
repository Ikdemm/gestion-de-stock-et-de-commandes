import './App.css';
import {Routes , Route} from 'react-router-dom'
import Sidebar from './components/Sidebar';
import ListeFournisseur from './components/Fournisseurs/ListeFournisseur';
import AddFournisseurForm from './components/Fournisseurs/AddFournisseurForm';
import AddClientForm from './components/Customers/AddClientForm';
import ListeClients from './components/Customers/ListeClients';
import AddProductForm from './components/Produits/AddProductForm';
import ListeProduits from './components/Produits/ListeProduits';
import Stock from './components/Stock';
import Caisse from './components/Caisse';
import ListeCategories from './components/categories/ListeCategories';
import Category from './components/categories/Category';
import ListeEmployes from './components/Gestion des Employes/ListeEmployes';
import NewEmployeForm from './components/Gestion des Employes/NewEmployeForm';

function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/listFournisseurs" element={<ListeFournisseur/>}/>
        <Route path="/addFournisseur" element={<AddFournisseurForm/>}/>
        <Route path="/listClients" element={<ListeClients/>}/>
        <Route path="/addClient" element={<AddClientForm/>}/>
        <Route path="/addProduit" element={<AddProductForm/>}/>
        <Route path="/listProduits" element={<ListeProduits/>}/>
        <Route path="/listCategories" element={<ListeCategories/>}/>
        <Route path="/addCategory" element={<Category/>}/>
        <Route path="/listEmployes" element={<ListeEmployes/>}/>
        <Route path="/addEmploye" element={<NewEmployeForm/>}/>
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/caisse" element={<Caisse/>}/>
     
     </Routes>
    </div>
  );
}

export default App;
