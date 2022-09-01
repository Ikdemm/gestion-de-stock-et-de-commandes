import { createContext, useState } from "react";

export const appelOffreCtx = createContext({
  tabAppelOffres: [],
  addNewAppelOffre: () => {},
  removeOneAppelOffre: () => {},
  getAppelOffreById: () => {},
  updateAppelOffre: () => {},
  getAllAppelOffres: () => {},
});

function AddNewAppelOffreContextProvider(props) {

  const [tabAppelOffres, setTabAppelOffres] = useState([]);
  function addNewAppelOffre(newAppelOffre) {
    fetch("/api/appelDoffres", {
      method: "POST",
      body: JSON.stringify(newAppelOffre),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        alert("l'appel d'Offre est bien ajouté");
        getAllAppelOffres();
        console.log(res);

      })
      .catch((err) => {
        alert("erreur avec addNewAppelOffre");
        console.log(err);

      });
    setTabAppelOffres((prev) => {
      return [...prev, newAppelOffre];
    });
  }
  function removeOneAppelOffre(id) {
    fetch(`/api/appelDoffres/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("l'appel d'Offre est supprimé");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });
 
        getAllAppelOffres()
  
    ;
  }
  function getAppelOffreById(id) {
    fetch(`/api/appelDoffres/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabAppelOffres.find((c) => c._id === id);
  }
  function getAllAppelOffres() {


    fetch("/api/appelDoffres", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabAppelOffres(data));
  }

  function updateAppelOffre(id, updatedC) {
    fetch(`/api/appelDoffres/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("l'appel d'Offre est modifié");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });

        getAllAppelOffres()
    }
  const context = {
    tabAppelOffres: tabAppelOffres,
    addNewAppelOffre: addNewAppelOffre,
    removeOneAppelOffre: removeOneAppelOffre,
    getAppelOffreById: getAppelOffreById,
    updateAppelOffre: updateAppelOffre,
    getAllAppelOffres: getAllAppelOffres,
  };
  return (
   <appelOffreCtx.Provider value={context}>
      {props.children}

   </appelOffreCtx.Provider>
  );
}
export default AddNewAppelOffreContextProvider;
