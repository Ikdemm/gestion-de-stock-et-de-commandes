import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function BeneficesParProduit() {
    const [tabProduits, setTtabProduits] = useState([]);


    useEffect(() => {
     axios.get(`/api/produits`).then((response) => {
      setTtabProduits(response.data);
     });
   }, []); 
  return (
    <div className='card'>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Produit</th>
      <th className='text-center' scope="col">Prix d'achat</th>
      <th className='text-center' scope="col">Prix de vente</th>
      <th className='text-center' scope="col">Marge bénéficiaire</th>
    </tr>
  </thead>
  <tbody>
    {tabProduits.map((p)=>{
        return(
            <tr key={p._id}>
        <td>{p.title}</td>
      <td className='text-center'>{p.price_a} DT</td>
      <td className='text-center'>{p.price_v} DT</td>
      <td className='text-center'>{((p.price_v-p.price_a)/p.price_a *100 )} %</td>
      </tr>
        )
    })

    }
    
      
 

  </tbody>
</table>
    </div>
  )
}
