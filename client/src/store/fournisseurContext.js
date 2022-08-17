import { createContext, useState } from "react";

export const fournisseurtCtx = createContext({
  tabFournisseurs: [],
  addNewFournisseur: () => {},
  removeOneFournisseur: () => {},
  getFournisseurById: () => {},
  updateFournisseur: () => {},
  getAllFournisseurs: () => {},
});

function AddNewFournisseurContextProvider(props) {

  const [tabFrs, setTabFrs] = useState([]);
  function addNewFournisseur(newFournisseur) {
    fetch("/api/fournisseurs", {
      method: "POST",
      body: JSON.stringify(newFournisseur),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        alert("le fournisseur est bien ajouté");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });
      setTabFrs((prev) => {
      return [...prev, newFournisseur];
    });
  }
   function removeOneFournisseur(id) {
    fetch(`/api/fournisseurs/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("le fournisseur est supprimé");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });
 
        getAllFournisseurs()
  
    ;
  } 
  function getFournisseurById(id) {
    fetch(`/api/fournisseurs/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabFrs.find((c) => c._id === id);
  }
  function getAllFournisseurs() {


    fetch("/api/fournisseurs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabFrs(data));
  }

  function updateFournisseur(id, updatedC) {
    fetch(`/api/fournisseurs/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("le fournisseur est modifié");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });

        getAllFournisseurs()
    } 
  const context = {
    tabFournisseurs: tabFrs,
    addNewFournisseur: addNewFournisseur,
    removeOneFournisseur: removeOneFournisseur,
    getFournisseurById: getFournisseurById,
    updateFournisseur: updateFournisseur,
    getAllFournisseurs: getAllFournisseurs,
  };
  return (
   <fournisseurtCtx.Provider value={context}>
      {props.children}

   </fournisseurtCtx.Provider>
  );
}
export default AddNewFournisseurContextProvider;
