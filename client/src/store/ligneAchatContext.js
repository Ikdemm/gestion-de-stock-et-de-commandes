import { createContext, useState } from "react";

export const ligneAchatCtx = createContext({
  tabLigneAchats: [],
  addNewLigneAchat: () => {},
  removeOneLigneAchat: () => {},
  getLigneAchatById: () => {},
  updateLigneAchat: () => {},
  getAllLigneAchats: () => {},
});

function AddNewLigneAchatContextProvider(props) {

  const [tabLigneAchats, setTabLigneAchats] = useState([]);
  function addNewLigneAchat(newLigneAchat) {
    fetch("/api/achat/addToInvoice", {
      method: "POST",
      body: JSON.stringify(newLigneAchat),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        alert("la LigneAchat est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        alert("erreur avec addNewLigneAchat");
        console.log(err);
      });
    setTabLigneAchats((prev) => {
      return [...prev, newLigneAchat];
    });
  }
  function removeOneLigneAchat(id) {
    fetch(`/api/achat/addToInvoice/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("la LigneAchat est bien supprimée");
        console.log(res);


      })
      .catch((err) => {
        alert("erreur removeOneLigneAchat");
        console.log(err);
      });
 
        getAllLigneAchats()
  
    ;
  }
  function getLigneAchatById(id) {
    fetch(`/api/achat/addToInvoice/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabLigneAchats.find((c) => c._id === id);
  }
  function getAllLigneAchats() {


    fetch("/api/achat/addToInvoice", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabLigneAchats(data));
  }

  function updateLigneAchat(id, updatedC) {
    fetch(`/api/achat/addToInvoice/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("le LigneAchat est modifié");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });

        getAllLigneAchats()
    }
  const context = {
    tabLigneAchats: tabLigneAchats,
    addNewLigneAchat: addNewLigneAchat,
    removeOneLigneAchat: removeOneLigneAchat,
    getLigneAchatById: getLigneAchatById,
    updateLigneAchat: updateLigneAchat,
    getAllLigneAchats: getAllLigneAchats,
  };
  return (
   <ligneAchatCtx.Provider value={context}>
      {props.children}

   </ligneAchatCtx.Provider>
  );
}
export default AddNewLigneAchatContextProvider;
