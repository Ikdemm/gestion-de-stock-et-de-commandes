import axios from "../../../Services/instance";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import OneFactureAchat from "./../OneFactureAchat";

export default function HolderEcheances() {
  const [tabAchatFacts, setTabAchatFacts] = useState([]);

  useEffect(() => {
    axios.get(`/api/factures/achat`).then((response) => {
      setTabAchatFacts(response.data);
    });
  }, []);

  var tabEcheances = tabAchatFacts.filter((f) => f.etat === "non_payee");

  console.log("tabAchatFacts", tabAchatFacts);
  console.log("tabEcheances", tabEcheances);
  if (tabAchatFacts && tabEcheances) {
    return (
      <>
        <h6 className="display-5">Factures impayées</h6>
        <div style={{ display: "flex" }}>
          <div className="container">
            {tabEcheances.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">N° de Facture</th>
                    <th scope="col">Total commande</th>
                    <th scope="col">Echéance</th>
                    <th scope="col">Détails</th>
                    <th scope="col">Etat</th>
                  </tr>
                </thead>
                <tbody>
                  {tabEcheances.map((f) => {
                    return (
                      <OneFactureAchat
                        facture={f}
                        key={f._id}
                      ></OneFactureAchat>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              "Vous n'avez acune facture impayée"
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
