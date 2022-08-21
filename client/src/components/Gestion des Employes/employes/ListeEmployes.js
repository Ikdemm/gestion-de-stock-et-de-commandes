import React, { useContext, useEffect } from 'react';
//import { BsSearch } from "react-icons/bs";
import { employeeCtx } from './../../../store/employeeContext';
import OneEmploye from './OneEmploye';

export default function ListeEmployes() {
  let eCtx=useContext(employeeCtx)
  let tabEmp= eCtx.tabEmployees
  useEffect(()=>{
    eCtx.getAllEmployees()
  },[])
  return (
    <>

<table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Photo</th>
      <th scope="col">CIN</th>
      <th scope="col">Employé</th>
      <th scope="col">Poste</th>
      <th scope="col">Modifier</th>
      <th scope="col">Supprimer</th>
    </tr>
  </thead>
  <tbody>
{
  tabEmp.map((e)=>{
return <OneEmploye employee={e} key={e.numCIN}></OneEmploye>
  })
}
  </tbody>

</table>
        
    </>
  )
}
