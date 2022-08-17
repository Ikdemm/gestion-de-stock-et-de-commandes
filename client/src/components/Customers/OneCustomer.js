import React from 'react'
import { FaEdit ,FaTrash } from 'react-icons/fa';


export default function OneCustomer(props) {
  return (
    <tr>
        <td>{props.client.nomClient}</td>
        <td>{props.client.numero_de_tel}</td>
        <td>{props.client.adresse}</td>
      
          <td >
        <FaEdit />
      </td>
      <td>
        <FaTrash />
      </td>
      </tr>
 )
}
