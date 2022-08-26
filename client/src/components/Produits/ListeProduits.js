import React, { useContext, useEffect } from 'react';
import '../Form.module.css';
import { produitCtx } from './../../store/produitContext';
import OneProduct from './OneProduct';

export default function ListeProduits() {
  let pctx=useContext(produitCtx)
    let listeP=pctx.tabProduits
    console.log(listeP, "tab Pdts");
    useEffect(()=>{
      pctx.getAllProduits()
    },[])
  return (

    <div>    
    <h6 className='display-4'>Liste des Produits</h6>  
    <ol className='list-group'>
      
 { listeP.map((p)=>{
    return <OneProduct produit={p} key={p._id}></OneProduct>
  })
} 
    </ol>
    </div>

  )
}
