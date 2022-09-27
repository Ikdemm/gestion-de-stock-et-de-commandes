import { createContext, useState } from "react";

export const demandeCtx = createContext({
  tabDemandes: [],
  addNewDemande: () => {},
  removeOneDemande: () => {},
  getDemandeById: () => {},
  updateDemande: () => {},
  getAllDemandes: () => {},
  getAllDemandesNonTraites: () => {},
  getAllDemandeParEmployee: () => {},
});

function AddNewDemandeContextProvider(props) {
  const [tabDemandes, setTabDemandes] = useState([]);
  function addNewDemande(newDemande) {
    fetch("/api/demandes", {
      method: "POST",
      body: JSON.stringify(newDemande),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("la Demande est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        console.log("erreur avec addNewDemande");
        console.log(err);
      });
    setTabDemandes((prev) => {
      return [...prev, newDemande];
    });
  }
  function removeOneDemande(id) {
    fetch(`/api/demandes/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("la Demande est bien supprimée");
        console.log(res);
      })
      .catch((err) => {
        console.log("erreur removeOneDemande");
        console.log(err);
      });

    getAllDemandes();
  }
  function getDemandeById(id) {
    fetch(`/api/demandes/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    });
    return tabDemandes.find((c) => c._id === id);
  }
  function getAllDemandes() {
    fetch("/api/demandes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setTabDemandes(data));
  }
  function getAllDemandesNonTraites() {
    fetch("/api/demandes/nonTraitees", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setTabDemandes(data));
  }
  function getAllDemandeParEmployee() {
    fetch("/api/demandes/employee", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setTabDemandes(data));
  }

  function updateDemande(id, updatedC) {
    fetch(`/api/demandes/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("la Demande est modifiée");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });

    getAllDemandes();
  }
  const context = {
    tabDemandes: tabDemandes,
    addNewDemande: addNewDemande,
    removeOneDemande: removeOneDemande,
    getDemandeById: getDemandeById,
    updateDemande: updateDemande,
    getAllDemandes: getAllDemandes,
    getAllDemandesNonTraites: getAllDemandesNonTraites,
    getAllDemandeParEmployee: getAllDemandeParEmployee,
  };
  return (
    <demandeCtx.Provider value={context}>{props.children}</demandeCtx.Provider>
  );
}
export default AddNewDemandeContextProvider;
