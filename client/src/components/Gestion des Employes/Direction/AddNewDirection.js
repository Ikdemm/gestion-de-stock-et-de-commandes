import React, { useContext, useRef } from 'react';
import { directionCtx } from '../../../store/directionContext';
const _ = require ('lodash')

export default function AddNewDirection() {
    const dCtx=useContext(directionCtx)

    const refName=useRef('')
    const tabNotFiltred=_.map(dCtx.tabDirections,"name")

    function submitHandler(e){
        e.preventDefault()
        let newD={
          name: refName.current.value,
        }  
    
        if(!tabNotFiltred.includes(newD.name)){
    
            dCtx.addNewDirection(newD);
          e.target.reset()
window.location.reload()    
    }else
        alert('ce nom de catégorie existe déjà, veuillez entrer un nom différent')
      }
  return (
    <div>
          <h6 className='display-6'  style={{color:"#4125D9"}}>Ajout de Direction</h6>  
       <div className="container shadow p-3">
      <form onSubmit={submitHandler} method="post">
        <div >
          <label htmlFor="name">Nom de la direction</label>
          <input className="form-control mb-4" type="text" ref={refName} name="name"></input>
        
      <button className="btn btn-outline-dark form-control rounded-pill" type="submit">Valider</button>
        </div>
      </form> 
    </div>     
    </div>
  )
}
