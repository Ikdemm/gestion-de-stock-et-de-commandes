import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);
/*  export const data = {
  
  labels: ['Vente au comptant', 'Vente à crédit'],
  datasets: [
    {
      label: 'Répartition des ventes',
      data: [20, 80],
      backgroundColor: [
        ' rgb(9, 255, 0, 0.2)',
        'rgb(65, 37, 217, 0.2)',
      
      ],
      borderColor: [
        ' rgba(9, 255, 0)',
        ' #4125D9',
     
      ],
      borderWidth: 1,
    },
  ],
}; */
 
export default function PieChart() {
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
  console.log('totalVentes', totalVentes)

var TABVenteCredit=tabVenteFacts.filter((v)=>v.mode_de_paiement !=="Comptant" )
var totalVentesCredit=0;
for(let i=0; i<TABVenteCredit.length; i++){
  totalVentesCredit+=TABVenteCredit[i].net_a_payer
 
}
console.log('TABVenteCredit', TABVenteCredit)
console.log('totalVentesCredit', totalVentesCredit)

var VenteAuComptant=totalVentes-totalVentesCredit;
console.log('VenteAuComptant', VenteAuComptant)

var PartVenteCredit=(totalVentesCredit/totalVentes)*100 ;
console.log('PartVenteCredit', PartVenteCredit)
var PartVenteComptant=(VenteAuComptant/totalVentes)*100;
console.log('PartVenteComptant', PartVenteComptant)
const data = {
  
  labels: ['Vente au comptant', 'Vente à crédit'],
  datasets: [
    {
      label: 'Répartition des ventes',
      data: [PartVenteComptant , PartVenteCredit],
      backgroundColor: [
        ' rgb(9, 255, 0, 0.2)',
        'rgb(65, 37, 217, 0.2)',
      
      ],
      borderColor: [
        ' rgba(9, 255, 0)',
        ' #4125D9',
     
      ],
      borderWidth: 1,
    },
  ],
};
if(tabVenteFacts&&TABVenteCredit){
  return (
    <div className='card pb-3'><Pie data={data} /></div>
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