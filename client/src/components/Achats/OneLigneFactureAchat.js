import React from 'react'
import { FaEdit ,FaTrash } from 'react-icons/fa';
import { useContext } from 'react';
import { produitCtx } from './../../store/produitContext';

export default function OneLigneFactureAchat(props) {
let articleId=props.ligne.article_id;
  let pCtx=useContext(produitCtx);
let tabProduits=pCtx.tabProduits
  let a=tabProduits.find((p)=>p._id===articleId);
  console.log("article",a);
  return (
  
    <tr>
        {/* <td>{a.title}</td>
        <td>{a.price_a}</td> */}
        {/* <td>{props.ligne.quantite_a}</td> */}
        <td>{props.ligne.total}</td>
        <td><FaEdit/></td>
        <td><FaTrash/></td>
    </tr>
   
  )
}
