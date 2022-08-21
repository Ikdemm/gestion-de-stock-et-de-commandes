import React, { useContext, useEffect } from 'react';
import { directionCtx } from '../../../store/directionContext';
import OneDirection from './OneDirection';

export default function ListeDirections() {
    let dCtx=useContext(directionCtx)
    let listeDirections=dCtx.tabDirections
    useEffect(()=>{
        dCtx.getAllDirections()
    },[])
  return (
    <div>    
    <h6 className='display-6'  style={{color:"#4125D9"}}>Liste des directions</h6>  
    <ol className='list-group'>
      {  listeDirections.map((p)=>{
        
        return    <OneDirection direction={p} key={p._id}></OneDirection>  
        
      })
    }
 </ol>
   
   
   
    </div>
  )
}
