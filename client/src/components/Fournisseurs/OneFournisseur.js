import React from 'react'
import { FaEdit ,FaTrash } from 'react-icons/fa';


export default function OneFournisseur(props) {
  return (
    <tr>
        <td>{props.fournisseur.nom_commercial}</td>
        <td>{props.fournisseur.numero_de_tel}</td>
        <td>{props.fournisseur.adresse}</td>
      
          <td >
        <FaEdit />
      </td>
      <td>
        <FaTrash />
      </td>
      </tr>
 )
}
