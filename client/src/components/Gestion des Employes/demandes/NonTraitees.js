import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import OneDemande from './OneDemande';

export default function NonTraitees() {
  const [tabDemandes, setTtabDemandes] = useState([]);


  useEffect(() => {
   axios.get(`/api/demandes`).then((response) => {
    setTtabDemandes(response.data);
   });
 }, []); 
    var tabFiltred=tabDemandes.filter((d)=>d.etat==="non_traitee")

if(tabFiltred){

  return (
    <>
    <h6 className="display-5">Demandes non Traitées</h6> <hr/>
    <div style={{ display: "flex" }}>
      <div className="container">
      {  tabFiltred.length>=1 ?
      <ol className='list-group'>
      { tabFiltred && tabFiltred.map((p)=>{
    
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
}else
{
  return (
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div>
  )
}
}
