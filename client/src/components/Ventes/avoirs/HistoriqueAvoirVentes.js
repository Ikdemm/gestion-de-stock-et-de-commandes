import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import AvoirVenteList from "./AvoirVenteList";

export default function HistoriqueAvoirVentes() {
  const [tabVenteFacts, setTabVenteFacts] = useState([]);

  useEffect(() => {
    axios.get(`/api/avoirs/vente`).then((response) => {
      setTabVenteFacts(response.data);
    });
  }, []);  
  if(tabVenteFacts){
    return (
      <>
          <h6 className='display-5'>Historique des avoirs sur vente</h6> 
      <div  style={{display:"flex"}}>
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
   
   <AvoirVenteList listOfVentes={tabVenteFacts}></AvoirVenteList> 
  
      
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
 