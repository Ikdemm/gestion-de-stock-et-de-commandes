import { createContext, useState } from "react";

export const categorieCtx = createContext({
  tabCategories: [],
  addNewCategorie: () => {},
  removeOneCategorie: () => {},
  getCategorieById: () => {},
  updateCategorie: () => {},
  getAllCategories: () => {},
});

function AddNewCategorieContextProvider(props) {

  const [tabCategories, setTabCategories] = useState([]);
  function addNewCategorie(newCategorie) {
    fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(newCategorie),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        alert("la Categorie est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        alert("erreur avec addNewCategorie");
        console.log(err);
      });
    setTabCategories((prev) => {
      return [...prev, newCategorie];
    });
  }
  function removeOneCategorie(id) {
    fetch(`/api/categories/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("la Categorie est bien supprimée");
        console.log(res);


      })
      .catch((err) => {
        alert("erreur removeOneCategorie");
        console.log(err);
      });
 
        getAllCategories()
  
    ;
  }
  function getCategorieById(id) {
    fetch(`/api/categories/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabCategories.find((c) => c._id === id);
  }
  function getAllCategories() {


    fetch("/api/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabCategories(data));
  }

  function updateCategorie(id, updatedC) {
    fetch(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("le Categorie est modifié");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });

        getAllCategories()
    }
  const context = {
    tabCategories: tabCategories,
    addNewCategorie: addNewCategorie,
    removeOneCategorie: removeOneCategorie,
    getCategorieById: getCategorieById,
    updateCategorie: updateCategorie,
    getAllCategories: getAllCategories,
  };
  return (
   <categorieCtx.Provider value={context}>
      {props.children}

   </categorieCtx.Provider>
  );
}
export default AddNewCategorieContextProvider;
