import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Cards() {
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
  const [tabClients, setTabClients] = useState([]);
  useEffect(() => {
    axios.get(`/api/clients`).then((response) => {
      setTabClients(response.data);
    });
  }, []); 
  return (
    <div className='row'>
        <div className='row mt-3'>
            
<div className='col-md-3 '>
    <div className='p-3 card'>
        <div >
     <img src={require("../../assets/images/depenses.png")} className="rounded-circle" width="60px" alt="money out" style={{float:"right"}}/>       
        
        <div >
            <h3 className='h6 text-muted mt-1' style={{float:"left"}}> TOTAL DEPENSES </h3>
           <h3 style={{display:"inline-block"}}> {totalAchats} TND</h3> 
        </div>
        
    </div>
    </div>
</div>
<div className='col-md-3 '>
    <div className='p-3 card'>
        <div >
     <img src={require("../../assets/images/recettes.png")} className="rounded-circle" width="60px" alt="money out" style={{float:"right"}}/>       
        
        <div >
            <h3 className='h6 text-muted mt-1' style={{float:"left"}}> TOTAL RECETTES </h3>
           <h3 style={{display:"inline-block"}}> {totalVentes} TND</h3> 
        </div>
        
    </div>
    </div>
</div>
<div className='col-md-3 '>
    <div className='p-3 card'>
        <div >
     <img src={require("../../assets/images/benefices.png")} className="rounded-circle" width="60px" alt="money out" style={{float:"right"}}/>       
        
        <div >
            <h3 className='h6 text-muted mt-1' style={{float:"left"}}> BENEFICES NETS </h3>
           <h3 style={{display:"inline-block"}}> {totalVentes - totalAchats} TND</h3> 
        </div>
        
    </div>
    </div>
</div>
<div className='col-md-3 '>
    <div className='p-3 card'>
        <div >
     <img src={require("../../assets/images/customers.png")} className="rounded-circle" width="60px" alt="money out" style={{float:"right"}}/>       
        
        <div style={{float:"left"}}>
            <h3 className='h6 text-muted mt-1' style={{float:"left"}}> TOTAL CLIENTS </h3><br/>
           <h3 style={{float:"none"}}  className="text-left"> {tabClients.length} </h3> 
        </div>
        
    </div>
    </div>
</div>


        </div>
    </div>
  )
}
