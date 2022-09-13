import { createContext, useState } from "react";

export const achatAvoirCtx = createContext({
  tabAchatAvoirs: [],
  addNewAchatAvoir: () => {},
  getAchatAvoirById: () => {},
  updateAchatAvoir: () => {},
  getAllAchatAvoirs: () => {},
});

function AchatAvoirContextProvider(props) {

  const [tabAchatAvoirs, setTabAchatAvoirs] = useState([]);
  function addNewAchatAvoir(newAchatAvoir) {

    fetch("/api/avoirs/achat", {
      method: "POST",
      body: JSON.stringify(newAchatAvoir),
      headers: { "Content-Type": "application/json"
      },
    })
      .then((res) => {

        console.log("la facture est bien ajoutée");
        getAllAchatAvoirs()
        console.log(res);
      })
      .catch((err) => {
        console.log("erreur avec addNewAchatAvoir");
        console.log(err);
      });
    setTabAchatAvoirs((prev) => {
      return [...prev, newAchatAvoir];
    });
  }
  function getAchatAvoirById(id) {
    fetch(`/api/avoirs/achat/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
    return tabAchatAvoirs.find((c) => c._id === id);
  }
  function getAllAchatAvoirs() {

 fetch("/api/avoirs/achat", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((res) =>  res.json())
  .then((data) => {
    console.log(data);
    setTabAchatAvoirs(data)
  });
}

  function updateAchatAvoir(id, updatedC) {
    fetch(`/api/avoirs/achat/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        getAllAchatAvoirs();
        console.log("la facture est modifiée");
      })
      .catch((err) => {
        console.log("erreur inconnue");
      });

     
    }
  const context = {
    tabAchatAvoirs: tabAchatAvoirs,
    addNewAchatAvoir: addNewAchatAvoir,
    getAchatAvoirById: getAchatAvoirById,
    updateAchatAvoir: updateAchatAvoir,
    getAllAchatAvoirs: getAllAchatAvoirs,
  };
  return (
   <achatAvoirCtx.Provider value={context}>
      {props.children}

   </achatAvoirCtx.Provider>
  );
}
export default AchatAvoirContextProvider;
