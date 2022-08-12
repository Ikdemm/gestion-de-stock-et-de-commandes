import React, { useContext } from 'react'
import { FaEdit ,FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from '../Liste.module.css'
import { produitCtx } from './../../store/produitContext';

export default function ListeCategories() {
    let pctx=useContext(produitCtx)
    let listeP=pctx.tabProduits
  return (
    <div className={styles.container}>    
    <p>Liste des catégories<button><Link to="/addCategory" style={{textDecoration:'none'}}> Ajouter une nouvelle catégorie</Link></button></p>  
  
 
    {
      listeP.map((p)=>{

        return  <ol>
        <li>{p.title} {p.category} <FaEdit/>  <FaTrash/></li>
        </ol>
      })
    }
   
   
   
    </div>
  )
}
