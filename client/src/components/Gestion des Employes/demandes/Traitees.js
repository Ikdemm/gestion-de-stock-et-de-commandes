import axios from "../../../Services/instance";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import OneDemande from "./OneDemande";

export default function Traitees() {
  const [tabDemandes, setTtabDemandes] = useState([]);

  useEffect(() => {
    axios.get(`/api/demandes`).then((response) => {
      setTtabDemandes(response.data);
    });
  }, []);

  var tabFiltred = tabDemandes.filter((d) => d.etat === "traitee");
  if (tabDemandes && tabFiltred) {
    return (
      <>
        <h6 className="display-5">Demandes Traitées</h6> <hr />
        <div style={{ display: "flex" }}>
          <div className="container">
            {tabFiltred.length > 0 ? (
              <ol className="list-group">
                {tabFiltred.map((p) => {
                  return <OneDemande demande={p} key={p._id}></OneDemande>;
                })}
              </ol>
            ) : (
              " La liste des demandes traitées est vide"
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="fetching">
        <FaSpinner className="spinner"></FaSpinner>
      </div>
    );
  }
}
