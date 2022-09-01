import { createContext, useState } from "react";

export const ligneAvoirSurVenteCtx = createContext({
  tabLigneAvoirSurVentes: [],
  addNewLigneAvoirSurVente: () => {},
  removeOneLigneAvoirSurVente: () => {},
  getLigneAvoirSurVenteById: () => {},
  updateLigneAvoirSurVente: () => {},
  getAllLigneAvoirSurVentes: () => {},
});

function LigneAvoirSurVenteContextProvider(props) {

  const [tabLigneAvoirSurVentes, setTabLigneAvoirSurVentes] = useState([]);
  function addNewLigneAvoirSurVente(newLigneAvoirSurVente) {
    fetch("/api/avoirSurvente/addToInvoice", {
      method: "POST",
      body: JSON.stringify(newLigneAvoirSurVente),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        alert("la LigneAvoirSurVente est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        alert("erreur avec addNewLigneAvoirSurVente");
        console.log(err);
      });
    setTabLigneAvoirSurVentes((prev) => {
      return [...prev, newLigneAvoirSurVente];
    });
  }
  function removeOneLigneAvoirSurVente(id) {
    fetch(`/api/avoirSurvente/addToInvoice/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("la LigneAvoirSurVente est bien supprimée");
        console.log(res);


      })
      .catch((err) => {
        alert("erreur removeOneLigneAvoirSurVente");
        console.log(err);
      });
 
        getAllLigneAvoirSurVentes()
  
    ;
  }
  function getLigneAvoirSurVenteById(id) {
    fetch(`/api/avoirSurvente/addToInvoice/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabLigneAvoirSurVentes.find((c) => c._id === id);
  }
  function getAllLigneAvoirSurVentes() {


    fetch("/api/avoirSurvente/addToInvoice", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabLigneAvoirSurVentes(data));
  }

  function updateLigneAvoirSurVente(id, updatedC) {
    fetch(`/api/avoirSurvente/addToInvoice/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("le LigneAvoirSurVente est modifié");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });

        getAllLigneAvoirSurVentes()
    }
  const context = {
    tabLigneAvoirSurVentes: tabLigneAvoirSurVentes,
    addNewLigneAvoirSurVente: addNewLigneAvoirSurVente,
    removeOneLigneAvoirSurVente: removeOneLigneAvoirSurVente,
    getLigneAvoirSurVenteById: getLigneAvoirSurVenteById,
    updateLigneAvoirSurVente: updateLigneAvoirSurVente,
    getAllLigneAvoirSurVentes: getAllLigneAvoirSurVentes,
  };
  return (
   <ligneAvoirSurVenteCtx.Provider value={context}>
      {props.children}

   </ligneAvoirSurVenteCtx.Provider>
  );
}
export default LigneAvoirSurVenteContextProvider;
