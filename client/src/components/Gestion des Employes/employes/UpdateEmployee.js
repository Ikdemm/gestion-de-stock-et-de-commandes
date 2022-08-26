import React, { useContext, useEffect, useState } from 'react'
import { directionCtx } from '../../../store/directionContext';
import { employeeCtx } from '../../../store/employeeContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateEmployee() {
  let {_id}=useParams()
  let empctx = useContext(employeeCtx);
  let selectedEmployee=empctx.getEmployeeById(_id)
  const [employee, setEmployee]=useState(selectedEmployee)
  //const [imageUrl, setImgaeUrl]=useState(selectedEmployee.imageUrl)

function handleChange ( event) {
  const { name, value } = event.target
  setEmployee({ ...employee, [name]: value })

}
let navigate=useNavigate()


  return (
    <div style={{ display: "flex" }}>
    <div className="container" style={{ padding: 50 + "px" }}>

<h6 className='display-5' >Modifier l'employé</h6> 

<form onSubmit={event => {
               event.preventDefault()
               empctx.updateEmployee(_id,employee);
              navigate('/employes') }
             }>  
    
<label htmlFor="numCIN">N° de CIN</label>
<input className='form-control' type="text" name='numCIN' onChange={handleChange} value={employee.numCIN} ></input>
 <label htmlFor='nom'>Nom</label>
<input className='form-control' type="text" name='nom' onChange={handleChange}value={employee.nom} ></input>
<label htmlFor='prenom'>Prénom</label>
<input className='form-control' type="text" name='prenom' onChange={handleChange} value={employee.prenom}></input>
<label htmlFor='date_de_naissance'>Date de naissance</label>
<input className='form-control' type="date" name='date_de_naissance' onChange={handleChange}value={employee.date_de_naissance} ></input>
<label htmlFor='adresse'>Adresse</label>
<input className='form-control' type="text" name='adresse' onChange={handleChange}value={employee.adresse} ></input>
<label htmlFor='date_de_recrutement'>Date de recrutement</label>
<input className='form-control' type="date" name='date_de_recrutement' onChange={handleChange} value={employee.date_de_recrutement}></input>
<label htmlFor='poste'>Poste</label>
<input className='form-control' type="text"  name='poste' onChange={handleChange} value={employee.poste}></input>

<button type="submit"  className='btn text-light form-control my-2' style={{backgroundColor:"#4125D9"}} >Valider</button>
</form>
  </div>
</div>

  )
}
