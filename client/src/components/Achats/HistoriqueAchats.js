import React, { useContext, useEffect } from "react";
import { achatFactCtx } from './../../store/achatFactContext';
import OneFactureAchat from "./OneFactureAchat";

export default function HistoriqueAchats() {
  let fCtx=useContext(achatFactCtx);
  let tabFactures=fCtx.tabAchatFacts;
  useEffect(()=>{
    fCtx.getAllAchatFacts()
  },[])
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
      <th scope="col">Nom du Fournisseur</th>
      <th scope="col">Total commande</th>
      <th scope="col">Echéance</th>
      <th scope="col">Modifier</th>
      <th scope="col">Téléchager</th>

    </tr>
  </thead>
  <tbody>
 
{
tabFactures.map((f)=>{
  return <OneFactureAchat facture={f} key={f._id}></OneFactureAchat>
})
}

    
  </tbody>

</table>
    </div>
    
    </div> 
    

    </>
  )
}
