import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { categorieCtx } from '../../store/categoryContext'
import editPhoto from '../../assets/images/pen.gif'

export default function UpdateCategory() {
    let {_id}=useParams()
  const catdCtx= useContext(categorieCtx)
let selectedCat= catdCtx.getCategorieById(_id)
const [category, setCategory]=useState(selectedCat)
function handleInputChange ( event) {
  const { name, value } = event.target

  setCategory({ ...category, [name]: value })
}
  let navigate=useNavigate()
    return (
        <div  style={{display: "flex"}}>

<div className="container" style={{ padding: 50 + "px" }}>
       <div className="row d-flex justify-content-center">   
           <div className="col-md-6">
           <img src={editPhoto} alt="editPhoto"  style={{height: 80+"vh"}}/> 
           </div> 
           <div className="col-md-6" style={{marginTop: 30+"vh"}}>
    <h6 className='display-6'  style={{color:"#4125D9"}}>Mettre à jour la catégorie</h6>  
       <form onSubmit={event => {
           event.preventDefault()
           catdCtx.updateCategorie(_id,category);
          navigate('/listCategories') }
         }>
      
             <label htmlFor="name">Nouveau intitulé</label>
             <input className="form-control" type="text" name="name" value={category.name} onChange={handleInputChange} ></input>
          
           
         <button className="btn btn-success my-2" type="submit">Modifier la catégorie</button>
         </form>
           </div>
           </div>
       </div>
       </div>
     
       )
}
