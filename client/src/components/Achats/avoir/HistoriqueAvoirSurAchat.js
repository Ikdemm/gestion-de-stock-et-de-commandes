import axios from "../../../Services/instance";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import AvoirAchatList from "./AvoirAchatList";

export default function HistoriqueAvoirSurAchat() {
  const [tabAchatFacts, setTabAchatFacts] = useState([]);

  useEffect(() => {
    axios.get(`/api/avoirs/achat`).then((response) => {
      setTabAchatFacts(response.data);
    });
  }, []);
  if (tabAchatFacts) {
    return (
      <>
        <h6 className="display-5">Historique des avoirs sur achats</h6>
        <div style={{ display: "flex" }}>
          <div className="container">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">N° de l'avoir</th>
                  <th scope="col">Total</th>
                  <th scope="col">Détails</th>
                </tr>
              </thead>
              <tbody>
                <AvoirAchatList listOfAchats={tabAchatFacts}></AvoirAchatList>
              </tbody>
            </table>
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
