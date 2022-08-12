import React from 'react'
import { Link } from 'react-router-dom';

export default function ListeEmployes() {
  return (
    <div>Employés <span>(nbre)</span>
<button type=""><Link to="/addEmploye"> Ajouter </Link></button>
        <input type="" name="" value=""></input>
         <table>
  <tr>
    <th>CIN</th>
    <th>Employé</th>
    <th>Direction</th>
    <th>Service</th>
    <th>Responsable</th>
    <th>Ancienneté</th>
  
  </tr>
  </table>
    </div>
  )
}
