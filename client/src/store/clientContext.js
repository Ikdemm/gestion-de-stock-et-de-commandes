import { createContext, useState } from "react";

export const clientCtx = createContext({
  tabClients: [],
  addNewClient: () => {},
  removeOneClient: () => {},
  getClientById: () => {},
  updateClient: () => {},
  getAllClients: () => {},
});

function AddNewClientContextProvider(props) {

  const [tabClients, setTabClients] = useState([]);
  function addNewClient(newClient) {
    fetch("/api/clients", {
      method: "POST",
      body: JSON.stringify(newClient),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        //console.log("le client est bien ajouté");
        console.log("le client est bien ajouté",res);
      })
      .catch((err) => {
        //console.log("erreur inconnue");
        console.log("erreur inconnue",err);
      });
    setTabClients((prev) => {
      return [...prev, newClient];
    });
  }
  function removeOneClient(id) {
    fetch(`/api/clients/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("le client est supprimé");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });
 
        getAllClients()
  
    ;
  }
  function getClientById(id) {
    fetch(`/api/clients/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabClients.find((c) => c._id === id);
  }
  function getAllClients() {


    fetch("/api/clients", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabClients(data));
  }

  function updateClient(id, updatedC) {
    fetch(`/api/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("le client est modifié");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });

        getAllClients()
    }
  const context = {
    tabClients: tabClients,
    addNewClient: addNewClient,
    removeOneClient: removeOneClient,
    getClientById: getClientById,
    updateClient: updateClient,
    getAllClients: getAllClients,
  };
  return (
   <clientCtx.Provider value={context}>
      {props.children}

   </clientCtx.Provider>
  );
}
export default AddNewClientContextProvider;
