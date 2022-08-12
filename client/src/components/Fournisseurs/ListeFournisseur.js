import React, { useContext, useEffect } from 'react'
import styles from '../Liste.module.css'
import  '../Form.module.css'
//import { FaEdit ,FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fournisseurtCtx } from '../../store/fournisseurContext';
import OneFournisseur from './OneFournisseur';
//import Fournisseur from './Fournisseur';

export default function ListeFournisseur() {
  let fctx=useContext(fournisseurtCtx)
  let listeF=fctx.tabFournisseurs
/*   function updateFournisseur(_id){
    //fctx.updateFournisseur(_id)
  }
  function deleteFournisseur(_id){
    //fctx.removeOneFournisseur(_id)
  } */
useEffect(()=>{
  fctx.getAllFournisseurs()
})
  return (

    <div className={styles.container}>    
    <p>Liste Fournisseurs <button><Link to="/addFournisseur" style={{textDecoration:'none'}}> Ajouter un nouveau fournisseur</Link></button></p>  
    <table>
  <tr>
    <th>Nom du Founisseur</th>
    <th>Numéro de téléphone</th>
    <th>Adresse</th>
    <th>Modifier</th>
    <th>Supprimer</th>
  </tr>
 
    
 

    {
      listeF.map((f)=>{
        return   <OneFournisseur fournisseur={f} key={f._id}></OneFournisseur>
 
      })
    }
 
 
 
</table>
   
    </div>

  )
}
