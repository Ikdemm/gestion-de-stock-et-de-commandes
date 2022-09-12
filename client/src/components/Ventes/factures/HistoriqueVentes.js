import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import VenteList from "./VenteList";

export default function HistoriqueVentes() {
  const [tabVenteFacts, settabVenteFacts] = useState([]);

  useEffect(() => {
    axios.get(`/api/factures/vente`).then((response) => {
      settabVenteFacts(response.data);
    });
  }, []); 

if(tabVenteFacts){
  return (
    <>
        <h6 className='display-5'>Historique des ventes</h6> 
    <div  style={{display:"flex"}}>
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
 
 <VenteList listOfVentess={tabVenteFacts}></VenteList> 

    
  </tbody>

</table>
    </div>
    
    </div> 
    

    </>
  )
}
else{
  return(
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div> 
  )
}
}
