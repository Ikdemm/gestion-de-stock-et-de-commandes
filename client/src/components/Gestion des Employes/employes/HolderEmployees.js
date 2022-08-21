import React from 'react'
import { Link } from 'react-router-dom'
import ListeEmployes from './ListeEmployes'

export default function HolderEmployees() {
  return (
    <div>
<h1 className='display-4'>Employés</h1> <hr/>

<div className='row'>
<div className='d-flex align-items-center'>
 
  <div className='col-9'>

<input type="text" className="form-control" placeholder="Chercher un employé..."/>

  </div>
  <div className="col-2 mx-2" >
    <Link to="/nouveau-employe">
    <button className='btn btn-dark'>Ajouter un employé</button>
    </Link>
  </div>
  </div>
</div>
<br/>
<div className='row'>
    <ListeEmployes></ListeEmployes>
</div>
    </div>
  )
}
