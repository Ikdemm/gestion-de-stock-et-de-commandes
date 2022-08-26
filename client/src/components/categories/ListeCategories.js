import React, { useContext, useEffect } from 'react';
import { categorieCtx } from './../../store/categoryContext';
import OneCategory from './OneCategory';

export default function ListeCategories() {
    let pctx=useContext(categorieCtx)
    let listeP=pctx.tabCategories
    useEffect(()=>{
      pctx.getAllCategories()
    },[])
  return (
    <div>    
    <h6 className='display-6'>Liste des catégories</h6>  
    <ol className='list-group'>
      {  listeP.map((p)=>{
        
        return    <OneCategory categorie={p} key={p._id}></OneCategory>  
        
      })
    }
 </ol>
   
   
   
    </div>
  )
}
