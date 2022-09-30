import { createContext, useState } from "react";

export const venteAvoirCtx = createContext({
  tabVenteAvoirs: [],
  addNewVenteAvoir: () => {},
  getVenteAvoirById: () => {},
  updateVenteAvoir: () => {},
  getAllVenteAvoirs: () => {},
});

function VenteAvoirContextProvider(props) {
  const [tabVenteAvoirs, setTabVenteAvoirs] = useState([]);
  function addNewVenteAvoir(newVenteAvoir) {
    fetch("/api/avoirs/vente", {
      method: "POST",
      body: JSON.stringify(newVenteAvoir),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("la facture est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        console.log("erreur avec addNewVenteAvoir");
        console.log(err);
      });
    setTabVenteAvoirs((prev) => {
      return [...prev, newVenteAvoir];
    });
  }

  function getVenteAvoirById(id) {
    fetch(`/api/avoirs/vente/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    });
    return tabVenteAvoirs.find((c) => c._id === id);
  }
  function getAllVenteAvoirs() {
    fetch("/api/avoirs/vente", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setTabVenteAvoirs(data));
  }

  function updateVenteAvoir(id, updatedC) {
    fetch(`/api/avoirs/vente/${id}`, {
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

    getAllVenteAvoirs();
  }
  const context = {
    tabVenteAvoirs: tabVenteAvoirs,
    addNewVenteAvoir: addNewVenteAvoir,
    getVenteAvoirById: getVenteAvoirById,
    updateVenteAvoir: updateVenteAvoir,
    getAllVenteAvoirs: getAllVenteAvoirs,
  };
  return (
    <venteAvoirCtx.Provider value={context}>
      {props.children}
    </venteAvoirCtx.Provider>
  );
}
export default VenteAvoirContextProvider;
