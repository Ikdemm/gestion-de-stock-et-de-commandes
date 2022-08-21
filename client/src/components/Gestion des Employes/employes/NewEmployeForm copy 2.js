import React, { useContext, useEffect, useState } from 'react'
import { directionCtx } from './../../../store/directionContext';
import { employeeCtx } from './../../../store/employeeContext';
//import axios from 'axios';

export default function NewEmployeForm() {
  let empCtx=useContext(employeeCtx)
  let dctx = useContext(directionCtx);
  let listeDirections = dctx.tabDirections
  console.log("listeDirections", listeDirections);
  useEffect(() => {
    dctx.getAllDirections()
  }, []);

 // V1 : Formulaires controlés
   const [formInput, setFormInput] = useState({
    nom: '',
    prenom: '',
    imageUrl: '',
    numCIN: '',
    adresse: '',
    date_de_naissance: '',
    date_de_recrutement: '',
    poste: '',
    direction_id: '',

    })

 function nomHandler(e) { 
       e.preventDefault();
        console.log(e.target.value);
        setFormInput(prev => {
            return {   ...prev,   nom: e.target.value  }
        }
        );
        console.log(formInput);

   }
 function prenomHandler(e) { 
       e.preventDefault();
        console.log(e.target.value);
        setFormInput(prev => {
            return {   ...prev,   prenom: e.target.value  }
        }
        );
        console.log(formInput);

   }
 function imageUrlHandler(e) {
       e.preventDefault();
        console.log(e.target.files[0]);
        setFormInput(prev => {
            return {   ...prev,   imageUrl: e.target.files[0]  }
        }
        );
        console.log(formInput);

   }
 function numCINHandler(e) { 
       e.preventDefault();
        console.log(e.target.value);
        setFormInput(prev => {
            return {   ...prev,   numCIN: e.target.value  }  }
        );
        console.log(formInput);

   }
 function adresseHandler(e) {
       e.preventDefault();
        console.log(e.target.value);
        setFormInput(prev => {
            return {   ...prev,   adresse: e.target.value  }  }
        );
        console.log(formInput);

   }
 function date_de_naissanceHandler(e) { 
       e.preventDefault();
        console.log(e.target.value);
        setFormInput(prev => {
            return {   ...prev,   date_de_naissance: e.target.value  }  }
        );
        console.log(formInput);

   }
 function date_de_recrutementHandler(e) {
       e.preventDefault();
        console.log(e.target.value);
        setFormInput(prev => {
            return {   ...prev,   date_de_recrutement: e.target.value  }  }
        );
        console.log(formInput);

   }
 function posteHandler(e) {
       e.preventDefault();
        console.log(e.target.value);
        setFormInput(prev => {
            return {   
              ...prev,   poste: e.target.value  }  }
        );
        console.log(formInput);

   }
 function direction_idHandler(e) { 
       e.preventDefault();
        console.log(e.target.value);
        setFormInput(prev => {
            return {   ...prev,   direction_id: e.target.value  }  }
        );
        console.log(formInput);

   }
async function submitHandler(e) {
       e.preventDefault();
       console.log(formInput);
       try{
const data =await empCtx.addNewEmployee(formInput)
if(data.success===true){
  console.log('c bon')
}
       }catch(error){
        console.log('error: ' ,error);
       }
       
   }



  return (
    <div style={{ display: "flex" }}>
            <div className="container" style={{ padding: 50 + "px" }}>

        <h6 className='display-5'  style={{color:"#4125D9"}}>Ajouter un employé</h6> 
      <form onSubmit={submitHandler}  enctype="multipart/form-data" >

        <label htmlFor="numCIN">N° de CIN</label>
        <input className='form-control' type="text" name='numCIN' onChange={numCINHandler} value={formInput.numCIN} ></input>
        <label htmlFor="imageUrl">Photo</label>
        <input className='form-control' type="file" name='imageUrl' onChange={imageUrlHandler} value={formInput.imageUrl}></input> 
        <label htmlFor='nom'>Nom</label>
        <input className='form-control' type="text" name='nom' onChange={nomHandler} value={formInput.nom}></input>
        <label htmlFor='prenom'>Prénom</label>
        <input className='form-control' type="text" name='prenom' onChange={prenomHandler} value={formInput.prenom}></input>
        <label htmlFor='date_de_naissance'>Date de naissance</label>
        <input className='form-control' type="date" name='date_de_naissance'value={formInput.date_de_naissance} onChange={date_de_naissanceHandler}></input>
        <label htmlFor='adresse'>Adresse</label>
        <input className='form-control' type="text" name='adresse'value={formInput.adresse} onChange={adresseHandler}></input>
        <label htmlFor='date_de_recrutement'>Date de recrutement</label>
        <input className='form-control' type="date" name='date_de_recrutement'value={formInput.date_de_recrutement} onChange={date_de_recrutementHandler}></input>
        <label htmlFor='direction_id'>Direction</label>
        <select name="select" className="form-control"value={formInput.direction_id}  onChange={direction_idHandler}>
          <option selected>--veuillez choisir la direction--</option>
          {listeDirections.map((f) => {
            return <option name="direction_id" key={f._id}>{f._id}</option>;
          })}
        </select>
        <label htmlFor='poste'>Poste</label>
        <input className='form-control' type="text" value={formInput.poste} name='poste' onChange={posteHandler}></input>
       
        <button  className='btn text-light form-control my-2' type="submit" style={{backgroundColor:"#4125D9"}}>Valider</button>
      </form>
    </div>
    </div>
  )
}
