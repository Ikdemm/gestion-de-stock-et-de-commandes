import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientCtx } from './../../store/clientContext';

export default function AddClientForm() {

  let navigate= useNavigate()
  const cctx=useContext(clientCtx)
  const refNom=useRef('')
  const refTel=useRef('')
  const refAdresse=useRef('')
  const refEmail=useRef('')
  function submitHandler(e){
    e.preventDefault()
    let newClient={
      nomClient: refNom.current.value,
      numero_de_tel: refTel.current.value,
      adresse: refAdresse.current.value,
      email: refEmail.current.value,
          }
          cctx.addNewClient(newClient)
          e.target.reset()
       navigate('/clients')
  }
  return (
    <div>  
      <h6 className="display-6">  Ajouter un client </h6>
      <form onSubmit={submitHandler} method="post"  className="container shadow p-3">
        <label htmlFor='nomClient' >Nom Complet du Client</label>
        <input type="text" name="nomClient" ref={refNom}className="form-control"/>
        <label htmlFor="numero_de_tel">Numéro de téléphone</label>
        <input type="number" name="numero_de_tel" ref={refTel}className="form-control" />
        <label htmlFor="adresse">Adresse de livraiosn</label>
      <input type="text" name="adresse" ref={refAdresse}className="form-control"/>
        <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={refEmail}className="form-control"/>
      <button type="submit"  className="btn btn-outline-dark rounded-pill my-2 form-control"
>Ajouter</button>

      </form>
    </div>
  )
}
