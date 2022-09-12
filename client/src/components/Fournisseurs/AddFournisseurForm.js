import React, { useContext, useRef } from 'react';
import { FaBan, FaSave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { fournisseurtCtx } from '../../store/fournisseurContext';
const _ = require ('lodash')

export default function AddFournisseurForm() {
  let navigate= useNavigate()
  const fctx=useContext(fournisseurtCtx)
  const tabNotFiltred=_.map(fctx.tabFournisseurs,"email")

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
    if(!tabNotFiltred.includes(newFournisseur.email)){
       
       fctx.addNewFournisseur(newFournisseur)
       e.target.reset()
       navigate('/fournisseurs')
      }else
      alert('cet email de fournisseur existe déjà, veuillez entrer un email différent')
    }
  return (
    <div className="container">
    <div style={{ display: "flex" }}>
  <div className="container-fluid">
<h6 className="display-6 my-4">  Ajouter un fournisseur </h6>            <hr />
<form onSubmit={submitHandler} method="post"  className="container shadow p-3 bg-light">
        <label htmlFor='nom_commercial' >Nom Commercial</label>
        <input type="text" name="nom_commercial" ref={refNom}className="form-control" required/>
        <label htmlFor="numero_de_tel">Numéro de téléphone</label>
        <input type="number" name="numero_de_tel" ref={refTel} className="form-control" required/>
        <label htmlFor="adresse">Adresse</label>
      <input type="text" name="adresse" ref={refAdresse} className="form-control" required/>
        <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={refEmail} className="form-control" required/>
      <div className='d-flex flex-row-reverse'>
                <div className='p-2'>
             <button className="btn bg-green my-2 " type="submit">Confirmer <FaSave></FaSave></button>    
                </div>
                <div className='p-2'>
             <Link to="/fournisseurs" className="btn btn-danger my-2 mr-2">Annuler <FaBan></FaBan> </Link>
                </div>
                
               </div>

      </form>
    </div>
    </div>
    </div>
  )
}
