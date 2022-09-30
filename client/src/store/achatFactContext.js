import { createContext, useState } from "react";

export const achatFactCtx = createContext({
  tabAchatFacts: [],
  addNewAchatFact: () => {},
  getAchatFactById: () => {},
  updateAchatFact: () => {},
  getAllAchatFacts: () => {},
});

function AddNewAchatFactContextProvider(props) {
  const [tabAchatFacts, setTabAchatFacts] = useState([]);
  function addNewAchatFact(newAchatFact) {
    fetch("/api/factures/achat", {
      method: "POST",
      body: JSON.stringify(newAchatFact),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("la facture est bien ajoutée");
        getAllAchatFacts();
        console.log(res);
      })
      .catch((err) => {
        alert("erreur avec addNewAchatFact");
        console.log(err);
      });
    setTabAchatFacts((prev) => {
      return [...prev, newAchatFact];
    });
  }
  function getAchatFactById(id) {
    fetch(`/api/factures/achat/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    });
    return tabAchatFacts.find((c) => c._id === id);
  }
  function getAllAchatFacts() {
    fetch("/api/factures/achat", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTabAchatFacts(data);
      });
  }

  function updateAchatFact(id, updatedC) {
    fetch(`/api/factures/achat/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        getAllAchatFacts();
        alert("la facture est modifiée");
      })
      .catch((err) => {
        alert("erreur inconnue");
      });
  }
  const context = {
    tabAchatFacts: tabAchatFacts,
    addNewAchatFact: addNewAchatFact,
    getAchatFactById: getAchatFactById,
    updateAchatFact: updateAchatFact,
    getAllAchatFacts: getAllAchatFacts,
  };
  return (
    <achatFactCtx.Provider value={context}>
      {props.children}
    </achatFactCtx.Provider>
  );
}
export default AddNewAchatFactContextProvider;
