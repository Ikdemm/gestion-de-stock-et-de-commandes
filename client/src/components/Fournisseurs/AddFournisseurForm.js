import React, { useContext, useId, useRef } from 'react'
import styles from '../Liste.module.css'
import  '../Form.module.css'
import { useNavigate } from 'react-router-dom';
import { fournisseurtCtx } from '../../store/fournisseurContext';

export default function AddFournisseurForm() {
  const idGenerate=useId();
  let navigate= useNavigate()
  const fctx=useContext(fournisseurtCtx)
  const refNom=useRef('')
  const refTel=useRef('')
  const refAdresse=useRef('')
  function submitHandler(e){
    e.preventDefault()
    let newFournisseur={
      id: idGenerate,
      nom_commercial: refNom.current.value,
      numero_de_tel: refTel.current.value,
      adresse: refAdresse.current.value,
          }
       fctx.addNewFournisseur(newFournisseur)
       navigate('/listFournisseurs')
  }
  return (
    <div className={styles.container}>  
      <p>Ajouter un fournisseur</p>
      <form onSubmit={submitHandler} method="post">
        <label htmlFor='nom_commercial' >Nom Commercial</label><br/>
        <input type="text" name="nom_commercial" ref={refNom}/><br/>
        <label htmlFor="numero_de_tel">Numéro de téléphone</label><br/>
        <input type="number" name="numero_de_tel" ref={refTel} /><br/>
        <label htmlFor="adresse">Adresse</label><br/>
      <input type="text" name="adresse" ref={refAdresse}/>
      <button type="submit">Ajouter</button>

      </form>
    </div>
  )
}
