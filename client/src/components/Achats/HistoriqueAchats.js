import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getFactureAchats, selectTabFacturesAchat } from "../../features/factures_ordinaires/achat/factures/factAchatSlice";
import AchatList from "./AchatList";

export default function HistoriqueAchats() {
  const tabAchatFacts = useSelector(selectTabFacturesAchat);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getFactureAchats());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (tabAchatFacts) {
    return (
      <>
        <h6 className="display-5">Historique des achats</h6>
        <div style={{ display: "flex" }}>
          <div className="container">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">N° de Facture</th>
                  <th scope="col">Total commande</th>
                  <th scope="col">Echéance</th>
                  <th scope="col">Détails</th>
                  <th scope="col">Suivi du paiement</th>
                </tr>
              </thead>
              <tbody>
                <AchatList listOfAchats={tabAchatFacts}></AchatList>
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
