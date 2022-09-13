import { createContext, useState } from "react";

export const ligneVenteCtx = createContext({
  tabLigneVentes: [],
  addNewLigneVente: () => {},
  removeOneLigneVente: () => {},
  getLigneVenteById: () => {},
  updateLigneVente: () => {},
  getAllLigneVentes: () => {},
});

function LigneVenteContextProvider(props) {

  const [tabLigneVentes, setTabLigneVentes] = useState([]);
  function addNewLigneVente(newLigneVente) {
    fetch("/api/vente/addToInvoice", {
      method: "POST",
      body: JSON.stringify(newLigneVente),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        console.log("la LigneVente est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        console.log("erreur avec addNewLigneVente");
        console.log(err);
      });
    setTabLigneVentes((prev) => {
      return [...prev, newLigneVente];
    });
  }
  function removeOneLigneVente(id) {
    fetch(`/api/vente/addToInvoice/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("la LigneVente est bien supprimée");
        console.log(res);


      })
      .catch((err) => {
        console.log("erreur removeOneLigneVente");
        console.log(err);
      });
 
        getAllLigneVentes()
  
    ;
  }
  function getLigneVenteById(id) {
    fetch(`/api/vente/addToInvoice/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabLigneVentes.find((c) => c._id === id);
  }
  function getAllLigneVentes() {


    fetch("/api/vente/addToInvoice", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabLigneVentes(data));
  }

  function updateLigneVente(id, updatedC) {
    fetch(`/api/vente/addToInvoice/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("le LigneVente est modifié");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });

        getAllLigneVentes()
    }
  const context = {
    tabLigneVentes: tabLigneVentes,
    addNewLigneVente: addNewLigneVente,
    removeOneLigneVente: removeOneLigneVente,
    getLigneVenteById: getLigneVenteById,
    updateLigneVente: updateLigneVente,
    getAllLigneVentes: getAllLigneVentes,
  };
  return (
   <ligneVenteCtx.Provider value={context}>
      {props.children}

   </ligneVenteCtx.Provider>
  );
}
export default LigneVenteContextProvider;
