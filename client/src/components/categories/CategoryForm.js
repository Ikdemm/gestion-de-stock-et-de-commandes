import React, { useContext, useRef } from 'react';
import { categorieCtx } from '../../store/categoryContext';
//import{lodash}from 
const _ = require ('lodash')

export default function CategoryForm() {
  const catCtx=useContext(categorieCtx)
  const refName=useRef('')
  const tabNotFiltred=_.map(catCtx.tabCategories,"name")
  console.log(tabNotFiltred);

  function submitHandler(e){
    e.preventDefault()
    let NewCategory={
      name: refName.current.value,
    }  
    //catCtx.tabCategories.includes
    if(!tabNotFiltred.includes(NewCategory.name)){

      catCtx.addNewCategorie(NewCategory);
      e.target.reset()
window.location.reload()
}else
    alert('ce nom de catégorie existe déjà, veuillez entrer un nom différent')
  }
  return (
    <div>
       <h6 className='display-6'>Nouvelle catégorie</h6>  
       <div className="container shadow p-3">
      <form onSubmit={submitHandler} method="post">
        <div >
          <label htmlFor="name">Libellé</label>
          <input className="form-control mb-4" type="text" ref={refName} name="name"></input>
        
      <button className="btn btn-outline-dark form-control rounded-pill" type="submit">Valider</button>
        </div>
      </form> 
    </div>
    </div>
  )
}
