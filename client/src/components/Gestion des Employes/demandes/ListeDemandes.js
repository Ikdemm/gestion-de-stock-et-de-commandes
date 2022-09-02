import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import OneDemande from './OneDemande';

export default function ListeDemandes() {
  const [tabDemandes, setTtabDemandes] = useState([]);


  useEffect(() => {
   axios.get(`/api/demandes`).then((response) => {
    setTtabDemandes(response.data);
   });
 }, []); 
 if(tabDemandes){

  return (
    <div>
    <h6 className='display-6'>Liste des demandes</h6>  
    <ol className='list-group'>
      {  tabDemandes.map((p)=>{
        return    <OneDemande demande={p} key={p._id}></OneDemande>  
        
      })
    }
 </ol>
    </div>
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