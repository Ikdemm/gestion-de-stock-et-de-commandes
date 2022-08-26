import React, { useContext, useEffect } from 'react';
import { demandeCtx } from './../../../store/demandeContext';
import OneDemande from './OneDemande';

export default function ListeDemandes() {
    let dCtx=useContext(demandeCtx);
    let ListeD=dCtx.tabDemandes
    useEffect(()=>{
        dCtx.getAllDemandes()
    },[])
  return (
    <div>
    <h6 className='display-6'>Liste des demandes</h6>  
    <ol className='list-group'>
      {  ListeD.map((p)=>{
        return    <OneDemande demande={p} key={p._id}></OneDemande>  
        
      })
    }
 </ol>
    </div>
  )
}
