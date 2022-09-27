import { createContext, useState } from "react";

export const directionCtx = createContext({
  tabDirections: [],
  addNewDirection: () => {},
  removeOneDirection: () => {},
  getDirectionById: () => {},
  updateDirection: () => {},
  getAllDirections: () => {},
});

function AddNewDirectionContextProvider(props) {
  const [tabDirections, setTabDirections] = useState([]);
  function addNewDirection(newDirection) {
    fetch("/api/directions", {
      method: "POST",
      body: JSON.stringify(newDirection),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("la Direction est bien ajoutée");
        console.log(res);
      })
      .catch((err) => {
        console.log("erreur avec addNewDirection");
        console.log(err);
      });
    setTabDirections((prev) => {
      return [...prev, newDirection];
    });
  }
  function removeOneDirection(id) {
    fetch(`/api/directions/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(
          "la Direction et tout les employés y inclus sont supprimés avec succès! "
        );
        console.log(res);
      })
      .catch((err) => {
        console.log("erreur removeOneDirection");
        console.log(err);
      });

    getAllDirections();
  }
  function getDirectionById(id) {
    fetch(`/api/directions/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    });
    return tabDirections.find((c) => c._id === id);
  }
  function getAllDirections() {
    fetch("/api/directions", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setTabDirections(data));
  }

  function updateDirection(id, updatedC) {
    fetch(`/api/directions/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedC),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        getAllDirections();
        console.log("la Direction est modifiée");
        console.log("res", res);
      })
      .catch((err) => {
        console.log("erreur inconnue");
        console.log("err", err);
      });
  }
  const context = {
    tabDirections: tabDirections,
    addNewDirection: addNewDirection,
    removeOneDirection: removeOneDirection,
    getDirectionById: getDirectionById,
    updateDirection: updateDirection,
    getAllDirections: getAllDirections,
  };
  return (
    <directionCtx.Provider value={context}>
      {props.children}
    </directionCtx.Provider>
  );
}
export default AddNewDirectionContextProvider;
