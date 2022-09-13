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
    }).then((res) => {
        getAllCategories();
        //console.log("la nouvelle categorie est bien ajoutée");
        console.log("la nouvelle categorie est bien ajoutée",res);
      }).catch((err) => {
        //console.log("erreur avec addNewCategorie");
        console.log("erreur avec addNewCategorie",err);
      });
    setTabCategories((prev) => {
      return [...prev, newCategorie];
    });
  }
  function removeOneCategorie(id) {
    fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
        getAllCategories()
        console.log("la Categorie est bien supprimée");
        console.log(res);


      }).catch((err) => {
        console.log("erreur removeOneCategorie");
        console.log(err);
      });
 
  
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

    fetch("/api/categories")
      .then((res) =>  res.json())
      .then((data) => {
      console.log('allCategories', data);
      setTabCategories(data)
    });
  }

  function updateCategorie(id, updatedC) {
    fetch(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
        getAllCategories()
        console.log("la Categorie est modifiée");
        console.log('res', res)
      })
      .catch((err) => {
        console.log("erreur inconnue");
        console.log('err', err)
      });

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
