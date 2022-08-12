import React, { useContext } from 'react'
import { produitCtx } from '../store/produitContext'
import classes from './Stock.module.css'
export default function Stock() {
  let pctx=useContext(produitCtx)
  let listeP=pctx.tabProduits
  return (
  <div className={classes.c}>
    <div className={classes.title}>Etat des stocks</div>
        
 
  
    {
      listeP.map((p)=>{
       
        return <div className={classes.card}>
           <div className={classes.container}>
          <p><b>{p.title}</b></p>
    <h4>{p.qte_en_stock}</h4>
  </div>
  </div> 
      })
    }
    
    </div>   
  )
}
