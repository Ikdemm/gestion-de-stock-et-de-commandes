import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import editPhoto from '../../assets/images/pen.gif';
import { fournisseurtCtx } from './../../store/fournisseurContext';

export default function UpdateFournisseur() {
  let {_id}=useParams()
  const fourCtx= useContext(fournisseurtCtx)
let selectedFour= fourCtx.getFournisseurById(_id)
const [fournisseur, setFournisseur]=useState(selectedFour)
function handleInputChange ( event) {
  const { name, value } = event.target

  setFournisseur({ ...fournisseur, [name]: value })
}
  let navigate=useNavigate()
  return (
    <div  style={{display: "flex"}}>

    <div className="container" style={{ padding: 50 + "px" }}>
           <div className="row d-flex justify-content-center">   
               <div className="col-md-4">
               <img src={editPhoto} alt="editPhoto"  style={{height: 55+"vh",marginTop: 20+"vh"}}/> 
               </div> 
               <div className="col-md-8" style={{marginTop: 20+"vh"}}>
        <h6 className='display-6'  style={{color:"#4125D9"}}>Mettre à jour le fournisseur</h6>  
           <form onSubmit={event => {
               event.preventDefault()
               fourCtx.updateFournisseur(_id,fournisseur);
              navigate('/fournisseurs') }
             }>
          
                 <label htmlFor="nom_commercial">Nom du Fournisseur</label>
                 <input className="form-control" type="text" name="nom_commercial" value={fournisseur.nom_commercial} onChange={handleInputChange} ></input>
                 <label htmlFor="numero_de_tel">Numéro de téléphone</label>
                 <input className="form-control" type="number" name="numero_de_tel" value={fournisseur.numero_de_tel} onChange={handleInputChange} ></input>
                 <label htmlFor="adresse">Adresse</label>
                 <input className="form-control" type="text" name="adresse" value={fournisseur.adresse} onChange={handleInputChange} ></input>
                 <label htmlFor="email">Email</label>
                 <input className="form-control" type="email" name="email" value={fournisseur.email} onChange={handleInputChange} ></input>
              
               
             <button className="btn btn-success my-2" type="submit">Modifier le Fournisseur</button>
             </form>
               </div>
               </div>
           </div>
           </div>
         
  )
}
