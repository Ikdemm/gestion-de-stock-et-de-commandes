import { createContext, useState } from "react";

export const ligneAvoirSurAchatCtx = createContext({
  tabLigneAvoirSurAchats: [],
  addNewLigneAvoirSurAchat: () => {},
  removeOneLigneAvoirSurAchat: () => {},
  getLigneAvoirSurAchatById: () => {},
  updateLigneAvoirSurAchat: () => {},
  getAllLigneAvoirSurAchats: () => {},
});

function LigneAvoirSurAchatContextProvider(props) {

  const [tabLigneAvoirSurAchats, setTabLigneAvoirSurAchats] = useState([]);
  function addNewLigneAvoirSurAchat(newLigneAvoirSurAchat) {
    fetch("/api/avoirSurachat/addToInvoice", {
      method: "POST",
      body: JSON.stringify(newLigneAvoirSurAchat),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        alert("la LigneAvoirSurAchat est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        alert("erreur avec addNewLigneAvoirSurAchat");
        console.log(err);
      });
    setTabLigneAvoirSurAchats((prev) => {
      return [...prev, newLigneAvoirSurAchat];
    });
  }
  function removeOneLigneAvoirSurAchat(id) {
    fetch(`/api/avoirSurachat/addToInvoice/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("la LigneAvoirSurAchat est bien supprimée");
        console.log(res);


      })
      .catch((err) => {
        alert("erreur removeOneLigneAvoirSurAchat");
        console.log(err);
      });
 
        getAllLigneAvoirSurAchats()
  
    ;
  }
  function getLigneAvoirSurAchatById(id) {
    fetch(`/api/avoirSurachat/addToInvoice/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabLigneAvoirSurAchats.find((c) => c._id === id);
  }
  function getAllLigneAvoirSurAchats() {


    fetch("/api/avoirSurachat/addToInvoice", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabLigneAvoirSurAchats(data));
  }

  function updateLigneAvoirSurAchat(id, updatedC) {
    fetch(`/api/avoirSurachat/addToInvoice/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("le LigneAvoirSurAchat est modifié");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });

        getAllLigneAvoirSurAchats()
    }
  const context = {
    tabLigneAvoirSurAchats: tabLigneAvoirSurAchats,
    addNewLigneAvoirSurAchat: addNewLigneAvoirSurAchat,
    removeOneLigneAvoirSurAchat: removeOneLigneAvoirSurAchat,
    getLigneAvoirSurAchatById: getLigneAvoirSurAchatById,
    updateLigneAvoirSurAchat: updateLigneAvoirSurAchat,
    getAllLigneAvoirSurAchats: getAllLigneAvoirSurAchats,
  };
  return (
   <ligneAvoirSurAchatCtx.Provider value={context}>
      {props.children}

   </ligneAvoirSurAchatCtx.Provider>
  );
}
export default LigneAvoirSurAchatContextProvider;
