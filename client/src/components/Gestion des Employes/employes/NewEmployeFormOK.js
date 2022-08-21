import React, { useContext, useEffect, useState } from 'react'
import { directionCtx } from '../../../store/directionContext';
import { employeeCtx } from '../../../store/employeeContext';
//import { useDispatch } from 'react-redux';

//import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewEmployeForm() {
 // const dispatch = useDispatch()

  let empCtx=useContext(employeeCtx)
  let dctx = useContext(directionCtx);
  let listeDirections = dctx.tabDirections
  console.log("listeDirections", listeDirections);
  useEffect(() => {
    dctx.getAllDirections()
  }, []);
let navigate= useNavigate()
const [nom, setNom]=useState("")
const [prenom, setprenom]=useState("")
const [imageUrl, setimageUrl]=useState("")
const [numCIN, setnumCIN]=useState("")
const [adresse, setadresse]=useState("")
const [date_de_naissance, setdate_de_naissance]=useState("")
const [date_de_recrutement, setdate_de_recrutement]=useState("")
const [poste, setposte]=useState("")
const [direction, setdirection_id]=useState("")



function nomHandler(e) { 

  setNom(e.target.value);
  console.log(e.target.value);

}
function prenomHandler(e) { 

  setprenom(e.target.value);
  console.log(e.target.value);
}
function imageUrlHandler(e) {
//let file=e.target.files[0];
  setimageUrl(e.target.files[0].name)
 console.log("h2222",e.target.files[0].name);

   }

function numCINHandler(e) { 

  setnumCIN(e.target.value);
  console.log(e.target.value);

}
function adresseHandler(e) {

  setadresse(e.target.value);
  console.log(e.target.value);

}
function date_de_naissanceHandler(e) { 
  setdate_de_naissance(e.target.value);
  console.log(e.target.value);
}
function date_de_recrutementHandler(e) {
 
  setdate_de_recrutement(e.target.value);
  console.log(e.target.value);
}
function posteHandler(e) {

  setposte(e.target.value);
  console.log(e.target.value);
}
function direction_idHandler(e) { 
  setdirection_id(e.target.value);
  console.log(e.target.value);
}
const onSubmit= () =>{

  
  const newEmployee = {
     
    nom,prenom,imageUrl,numCIN,adresse,date_de_naissance,date_de_recrutement,poste,direction
  }
  console.log("newEmployee",newEmployee)
  empCtx.addNewEmployee(newEmployee);
  //window.location.reload()
  navigate('/employes');

}

  return (
    <div style={{ display: "flex" }}>
            <div className="container" style={{ padding: 50 + "px" }}>

        <h6 className='display-5'  style={{color:"#4125D9"}}>Ajouter un employé</h6> 
      <form   encType="multipart/form-data" method="post" > 
      
    

        <label htmlFor="numCIN">N° de CIN</label>
        <input className='form-control' type="text" name='numCIN'onChange={numCINHandler} value={numCIN}  ></input>
        <label htmlFor="imageUrl">Photo</label>
        <input className='form-control' type="file" name='imageUrl' onChange={imageUrlHandler} ></input> 
        <label htmlFor='nom'>Nom</label>
        <input className='form-control' type="text" name='nom' onChange={nomHandler} value={nom} ></input>
        <label htmlFor='prenom'>Prénom</label>
        <input className='form-control' type="text" name='prenom' onChange={prenomHandler} value={prenom} ></input>
        <label htmlFor='date_de_naissance'>Date de naissance</label>
        <input className='form-control' type="date" name='date_de_naissance'value={date_de_naissance} onChange={date_de_naissanceHandler} ></input>
        <label htmlFor='adresse'>Adresse</label>
        <input className='form-control' type="text" name='adresse' value={adresse} onChange={adresseHandler} ></input>
        <label htmlFor='date_de_recrutement'>Date de recrutement</label>
        <input className='form-control' type="date" name='date_de_recrutement' value={date_de_recrutement} onChange={date_de_recrutementHandler} ></input>
        <label htmlFor='direction' >Direction</label>
        <select  className="form-control"  onChange={direction_idHandler}  name="direction" value={direction} >
      

          {listeDirections.map((f) => {
            return <option  key={f.name} value={f._id}>{f.name}</option>;
          })}
        </select> 
        <label htmlFor='poste'>Poste</label>
        <input className='form-control' type="text"  name='poste' onChange={posteHandler} value={poste}></input>
       
        <button type="button"  className='btn text-light form-control my-2' style={{backgroundColor:"#4125D9"}} onClick={onSubmit}>Valider</button>
      </form>
    </div>
    </div>
  )
}
