import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function BeneficesParProduit() {
    const [tabProduits, setTtabProduits] = useState([]);


    useEffect(() => {
     axios.get(`/api/produits`).then((response) => {
      setTtabProduits(response.data);
     });
   }, []); 
  const [tabLignes, setTabLignes] = useState([]);
   useEffect(() => {
     axios.get(`/api/vente/addToInvoice`).then((response) => {
       setTabLignes(response.data);
     });
   }, []); 
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
  return (
    <div className=' ml-2'>
      <div className=' card p-2'>
        
        <table className="table ">
  <thead>
    <tr>
      <th scope="col">Produit</th>
      <th className='text-center' scope="col">Marge bénéficiaire</th>
      <th className='text-center' scope="col">% CA</th>
    </tr>
  </thead>
  <tbody>
    {tabProduits.map((p)=>{
  var tabDesVentesParProduit =  tabLignes.filter((pdt)=>pdt.article.article_id===p._id)
  var CA=0;
for(let i=0; i<tabDesVentesParProduit.length; i++){
  CA+=tabDesVentesParProduit[i].total
 
}
        return(
            <tr key={p._id}>
        <td>{p.title}</td>
      <td className='text-center'>{((p.price_v-p.price_a)/p.price_v *100 ).toFixed(2) } %</td>
      <td className='text-center'>{ (CA /totalVentes *100).toFixed(2)} % </td>
      </tr>
        )
    })

    }
    
      
 

  </tbody>
</table>
    </div>
    </div>
  )
}
