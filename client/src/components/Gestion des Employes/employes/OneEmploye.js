import React from 'react'
import { FaEdit ,FaTrash } from 'react-icons/fa';

export default function OneEmploye(props) {
  return (
  
    <tr><td><img src={`http://localhost:4000/getfile/${props.employee.imageUrl}`} alt="avatar"className='img-fluid' style={{width:150+'px'}}/></td> 
        {/* <td><img src={`/images/employes/${props.employee.imageUrl}`}className='img-fluid' style={{width:150+'px'}}/></td> */} 
        <td>{props.employee.numCIN}</td>
        <td>{props.employee.prenom} {props.employee.nom}</td>
        <td>{props.employee.poste}</td>
        <td><FaEdit/></td>
        <td><FaTrash/></td></tr>
  
  )
}
