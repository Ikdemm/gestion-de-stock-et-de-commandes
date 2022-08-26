import React, { useContext,useEffect } from "react";
import OneDemande from './OneDemande';
import { demandeCtx } from './../../../store/demandeContext';

export default function NonTraitees() {
    const dCtx=useContext(demandeCtx)
    var tabDemandes=dCtx.tabDemandes
    var tabFiltred=tabDemandes.filter((d)=>d.etat=="non_traitee")
    useEffect(()=>{
        dCtx.getAllDemandes()
      },[])
  return (
    <>
    <h6 className="display-5">Demandes non Traitées</h6> <hr/>
    <div style={{ display: "flex" }}>
      <div className="container">
      {  tabFiltred.length>0 ?
      <ol className='list-group'>
      {  tabFiltred.map((p)=>{
    
        return    <OneDemande demande={p} key={p._id}></OneDemande>  
        
      })
    }
 </ol>
 :" La liste des demandes non traitées est vide"
}
    </div>
    </div>
  
    
  </>
  )
}
