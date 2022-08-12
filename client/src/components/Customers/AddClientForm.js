import React, { useContext, useId, useRef } from 'react'
import styles from '../Liste.module.css'
import  '../Form.module.css'
import { useNavigate } from 'react-router-dom';
import { clientCtx } from './../../store/clientContext';

export default function AddClientForm() {
  const idGenerate=useId();
  let navigate= useNavigate()
  const cctx=useContext(clientCtx)
  const refNom=useRef('')
  const refTel=useRef('')
  const refAdresse=useRef('')
  function submitHandler(e){
    e.preventDefault()
    let newClient={
      id: idGenerate,
      nom_complet: refNom.current.value,
      numero_de_tel: refTel.current.value,
      adresse: refAdresse.current.value,
          }
          cctx.addNewClient(newClient)
       navigate('/listClients')
  }
  return (
    <div className={styles.container}>  
      <p>Ajouter un client</p>
      <form onSubmit={submitHandler} method="post">
        <label htmlFor='nom_complet' >Nom Complet</label><br/>
        <input type="text" name="nom_complet" ref={refNom}/><br/>
        <label htmlFor="numero_de_tel">Numéro de téléphone</label><br/>
        <input type="number" name="numero_de_tel" ref={refTel} /><br/>
        <label htmlFor="adresse">Adresse</label><br/>
      <input type="text" name="adresse" ref={refAdresse}/>
      <button type="submit">Ajouter</button>

      </form>
    </div>
  )
}
