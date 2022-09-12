import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import AchatList from "./AchatList";

export default function HistoriqueAchats() {

  const [tabAchatFacts, setTabAchatFacts] = useState([]);

  useEffect(() => {
    axios.get(`/api/factures/achat`).then((response) => {
      setTabAchatFacts(response.data);
    });
  }, []); 
if(tabAchatFacts){
  return (
    <>
        <h6 className='display-5'>Historique des achats</h6> 
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
 
 <AchatList listOfAchats={tabAchatFacts}></AchatList> 

    
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
