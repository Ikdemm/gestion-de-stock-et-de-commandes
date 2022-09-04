import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Indices() {
    const [tabVenteFacts, settabVenteFacts] = useState([]);

    useEffect(() => {
      axios.get(`/api/factures/vente`).then((response) => {
        settabVenteFacts(response.data);
      });
    }, []); 
    var  totalVentes =0 ;
    for(let i=0; i<tabVenteFacts.length; i++){
        totalVentes+=tabVenteFacts[i].net_a_payer
         
    }
    const [tabAchatFacts, setTabAchatFacts] = useState([]);

    useEffect(() => {
      axios.get(`/api/factures/achat`).then((response) => {
        setTabAchatFacts(response.data);
      });
    }, []); 
    var  totalAchats =0 ;
    for(let i=0; i<tabAchatFacts.length; i++){
      totalAchats+=tabAchatFacts[i].net_a_payer
         
    }  
  return (
    <div className='p-3 card'>
        <div className='col mb-1'>
        <div className='p-3 card'>
        <div >
     <img src={require("../../assets/images/rentabilite.png")} className="rounded-circle" width="60px" alt="money out" style={{float:"right"}}/>       
        
        <div >
            <h3 className='h6 text-muted mt-1' style={{float:"left"}}> TAUX DE RENTABILITE</h3>
           <h3 style={{display:"inline-block"}}> {((totalVentes-totalAchats)/totalVentes *100).toFixed(2)} %</h3> 
        </div>
        
    </div>
    </div>      
        </div>
        <div className='col'>
        <div className='p-3 card'>
        <div >
     <img src={require("../../assets/images/tax.png")} className="rounded-circle" width="60px" alt="money out" style={{float:"right"}}/>       
        
        <div >
            <h3 className='h6 text-muted mt-1' style={{float:"left"}}> IMPOT A PAYER</h3>
           <h3 style={{display:"inline-block"}}> {(totalVentes-totalAchats) *0.3} TND</h3> 
        </div>
        
    </div>
    </div>      
        </div>
    </div>
  )
}
