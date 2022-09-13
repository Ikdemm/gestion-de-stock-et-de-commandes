import { createContext, useState } from "react";

export const venteFactCtx = createContext({
  tabVenteFacts: [],
  addNewVenteFact: () => {},
  getVenteFactById: () => {},
  updateVenteFact: () => {},
  getAllVenteFacts: () => {},
});

function AddNewVenteFactContextProvider(props) {

  const [tabVenteFacts, setTabVenteFacts] = useState([]);
  function addNewVenteFact(newVenteFact) {
    fetch("/api/factures/vente", {
      method: "POST",
      body: JSON.stringify(newVenteFact),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {

        console.log("la facture est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        console.log("erreur avec addNewVenteFact");
        console.log(err);
      });
    setTabVenteFacts((prev) => {
      return [...prev, newVenteFact];
    });
  }

  function getVenteFactById(id) {
    fetch(`/api/factures/vente/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabVenteFacts.find((c) => c._id === id);
  }
  function getAllVenteFacts() {


    fetch("/api/factures/vente", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {


        return res.json();
      })
      .then((data) => setTabVenteFacts(data));
  }

  function updateVenteFact(id, updatedC) {
    fetch(`/api/factures/vente/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("la facture est modifiée");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });

        getAllVenteFacts()
    }
  const context = {
    tabVenteFacts: tabVenteFacts,
    addNewVenteFact: addNewVenteFact,
    getVenteFactById: getVenteFactById,
    updateVenteFact: updateVenteFact,
    getAllVenteFacts: getAllVenteFacts,
  };
  return (
   <venteFactCtx.Provider value={context}>
      {props.children}

   </venteFactCtx.Provider>
  );
}
export default AddNewVenteFactContextProvider;
