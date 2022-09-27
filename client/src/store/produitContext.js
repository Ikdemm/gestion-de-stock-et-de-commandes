import { createContext, useState } from "react";

export const produitCtx = createContext({
  tabProduits: [],
  addNewProduit: () => {},
  removeOneProduit: () => {},
  getProduitById: () => {},
  updateProduit: () => {},
  getAllProduits: () => {},
});

function AddNewProduitContextProvider(props) {
  const [tabProduits, setTabProduits] = useState([]);
  function addNewProduit(newProduit) {
    fetch("/api/produits", {
      method: "POST",
      body: JSON.stringify(newProduit),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        //console.log("le produit est bien ajouté");
        console.log("le produit est bien ajouté", res);
      })
      .catch((err) => {
        //console.log("erreur inconnue");
        console.log("erreur inconnue", err);
      });
    setTabProduits((prev) => {
      return [...prev, newProduit];
    });
  }
  function removeOneProduit(id) {
    fetch(`/api/produits/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        getAllProduits();
        console.log("le produit est supprimé");
      })
      .catch((err) => {
        console.log("erreur inconnue!");
      });
  }
  function getProduitById(id) {
    fetch(`/api/produits/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    });
    return tabProduits.find((c) => c._id === id);
  }
  function getAllProduits() {
    fetch("/api/produits", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setTabProduits(data));
  }

  function updateProduit(id, updatedC) {
    fetch(`/api/produits/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("le produit est modifié");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });
  }
  const context = {
    tabProduits: tabProduits,
    addNewProduit: addNewProduit,
    removeOneProduit: removeOneProduit,
    getProduitById: getProduitById,
    updateProduit: updateProduit,
    getAllProduits: getAllProduits,
  };
  return (
    <produitCtx.Provider value={context}>{props.children}</produitCtx.Provider>
  );
}
export default AddNewProduitContextProvider;
