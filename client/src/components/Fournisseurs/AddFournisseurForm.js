import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fournisseurtCtx } from '../../store/fournisseurContext';

export default function AddFournisseurForm() {
  let navigate= useNavigate()
  const fctx=useContext(fournisseurtCtx)
  const refNom=useRef('')
  const refTel=useRef('')
  const refAdresse=useRef('')
  const refEmail=useRef('')
  function submitHandler(e){
    e.preventDefault()
    let newFournisseur={
      nom_commercial: refNom.current.value,
      numero_de_tel: refTel.current.value,
      adresse: refAdresse.current.value,
      email:refEmail.current.value
          }
          
       fctx.addNewFournisseur(newFournisseur)
       navigate('/fournisseurs')
  }
  return (
    <div>  
      <h6 className="display-6">Ajouter un fournisseur</h6>
      <form onSubmit={submitHandler} method="post">
        <label htmlFor='nom_commercial' >Nom Commercial</label>
        <input type="text" name="nom_commercial" ref={refNom}className="form-control"/>
        <label htmlFor="numero_de_tel">Numéro de téléphone</label>
        <input type="number" name="numero_de_tel" ref={refTel} className="form-control"/>
        <label htmlFor="adresse">Adresse</label>
      <input type="text" name="adresse" ref={refAdresse} className="form-control"/>
        <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={refEmail} className="form-control"/>
      <button type="submit"  className="btn btn-outline-dark rounded-pill my-2 form-control">Ajouter</button>

      </form>
    </div>
  )
}
