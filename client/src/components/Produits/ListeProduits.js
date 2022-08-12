import React, { useContext } from 'react'
import styles from '../Liste.module.css'
import  '../Form.module.css'
import { FaEdit ,FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { produitCtx } from './../../store/produitContext';

export default function ListeProduits() {
  let pctx=useContext(produitCtx)
  let listeP=pctx.tabProduits
  
  return (

    <div className={styles.container}>    
    <p>Liste des Produits<button><Link to="/addProduit" style={{textDecoration:'none'}}> Ajouter un nouveau produit</Link></button></p>  
    <table>
  <tr>
    <th>Image</th>
    <th>Nom du Produit</th>
    <th>Catégorie</th>
    <th>Modifier</th>
    <th>Supprimer</th>
  </tr>
 
    {
      listeP.map((p)=>{
        return <tr> <td><img src={p.imageUrl} alt="produit"/></td>
        <td>{p.title}</td>
        <td>{p.category}</td>
        <td><FaEdit/></td>
        <td><FaTrash></FaTrash></td>
      </tr>
      })
    }
   

</table>
   
    </div>

  )
}
