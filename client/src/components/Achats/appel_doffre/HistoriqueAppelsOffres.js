import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import OneAPO from "./OneAPO";


export default function HistoriqueAppelsOffres() {
  const [tabApo, setTabAPO] = useState([]);
  useEffect(() => {
    axios.get(`/api/appelDoffres`).then((response) => {
      setTabAPO(response.data);
    });
  }, []); 
  
  if(tabApo){

    return (
      <div>
        <h6 className='display-4'> Historique des appels d'offres</h6>
      
        
        <div  style={{display:"flex"}}>
      <div className="container">
         
      {tabApo.length > 0 ? (

          <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col">Date d'envoie</th>
        <th scope="col">Référence de l'APO</th>
        <th scope="col">Date limite de réponse</th>
        <th scope="col">Date De Commande Planifiée</th>
        <th scope="col">Voir</th>
        <th scope="col">Supprimer</th>
  
      </tr>
    </thead>
    <tbody>
      {
        tabApo.map((a)=>{
       return <OneAPO apo={a} key={a.ref} ></OneAPO>
        })
      }
        
    </tbody>
  
     
  </table>
  
  ) : (
    <div className="text-center">
      <h4>Liste vide!</h4>
      <img
        src={require("../../../assets/images/nothing.png")}
        alt="nothing to display"
      />{" "}
    </div>
  )}

      </div>
      </div>
      </div>
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
