import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { categorieCtx } from '../../store/categoryContext';
//import{lodash}from 
const _ = require ('lodash')

export default function CategoryForm() {
  const catCtx=useContext(categorieCtx)
  const navigate=useNavigate()
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
      navigate('/listCategories')    

}else
    alert('ce nom de catégorie existe déjà, veuillez entrer un nom différent')
  }
  return (
    <div>
       <h6 className='display-6'  style={{color:"#4125D9"}}>Ajout de catégorie</h6>  
       <div className="container shadow p-3">
      <form onSubmit={submitHandler} method="post">
        <div >
          <label htmlFor="name">Intitulé de la catégorie</label>
          <input className="form-control mb-4" type="text" ref={refName} name="name"></input>
        
      <button className="btn btn-outline-dark form-control rounded-pill" type="submit">Valider</button>
        </div>
      </form> 
    </div>
    </div>
  )
}
