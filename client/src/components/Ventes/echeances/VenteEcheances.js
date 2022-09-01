import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import UneFactureVente from "../factures/UneFactureVente";

export default function VenteEcheances() {
  const [tabVenteFacts, setTabVenteFacts] = useState([]);


  useEffect(() => {
   axios.get(`/api/factures/vente`).then((response) => {
     setTabVenteFacts(response.data);
   });
 }, []); 
 var tabEcheances = tabVenteFacts.filter((f) => f.etat==="non_payee" )

 console.log('tabVenteFacts',tabVenteFacts);
 console.log('tabEcheances',tabEcheances);
 if(tabVenteFacts && tabEcheances){
  return (
    <>
      <h6 className="display-5">Factures impayées</h6>
      <div style={{ display: "flex" }}>
        <div className="container">
        {
        tabEcheances.length>0 ?
         <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">N° de Facture</th>
                <th scope="col">Total commande</th>
                <th scope="col">Echéance</th>
                <th scope="col">Modifier</th>
                <th scope="col">Détails</th>
                <th scope="col">Etat</th>
              </tr>
            </thead>
            <tbody>
              {tabEcheances.map((f) => {
                    return (
                      <UneFactureVente facture={f}  key={f._id}   ></UneFactureVente>
                    );
                  })
                }
            </tbody>
          </table>
      : "Vous n'avez acune facture impayée"}
        </div>
      </div>
    </>
  )
}else
{
  return (
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div>
  )
}
}
