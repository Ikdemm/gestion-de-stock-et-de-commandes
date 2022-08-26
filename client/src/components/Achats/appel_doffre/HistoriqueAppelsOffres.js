import React, { useContext } from "react";
import { appelOffreCtx } from './../../../store/appelOffreContext';
import OneAPO from "./OneAPO";


export default function HistoriqueAppelsOffres() {
  const apoCtx=useContext(appelOffreCtx);
  const tabAPO=apoCtx.tabAppelOffres;

  return (
    <div>
      <h6 className='display-4'> Historique des appels d'offres</h6>
      <div  style={{display:"flex"}}>
    <div className="container">
      
    
        <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Date d'envoie</th>
      <th scope="col">Référence de l'APO</th>
      <th scope="col">Date limite de réponse</th>
      <th scope="col">Date limite de commande prévue</th>
      <th scope="col">Voir</th>
      <th scope="col">Modifier</th>

    </tr>
  </thead>
  <tbody>
    {
      tabAPO.map((a)=>{
     return <OneAPO apo={a}></OneAPO>
      })
    }
      
  </tbody>


</table>
    </div>
    </div>
    </div>
  )
}
