import React, { useContext } from 'react'
import styles from '../Liste.module.css'
import  '../Form.module.css'
//import { FaEdit ,FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { clientCtx } from './../../store/clientContext';
import OneCustomer from './OneCustomer';

export default function ListeClients() {
  let cctx=useContext(clientCtx)
  let listeC=cctx.tabClients
  return (

    <div className={styles.container}>    
    <p>Liste des clients <button><Link to="/addClient" style={{textDecoration:'none'}}> Ajouter un nouveau client</Link></button></p>  
    <table>
  <tr>
    <th>Nom complet du Client</th>
    <th>Numéro de téléphone</th>
    <th>Adresse de livraison</th>
    <th>Modifier</th>
    <th>Supprimer</th>
  </tr>

  {
      listeC.map((c)=>{
        return <OneCustomer client={c} key={c._id}></OneCustomer>
      })
    }

</table>
   
    </div>

  )
}
