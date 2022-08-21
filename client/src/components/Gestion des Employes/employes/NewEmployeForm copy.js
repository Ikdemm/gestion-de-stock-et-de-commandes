import React, { useContext, useEffect, useState } from 'react'
import { directionCtx } from './../../../store/directionContext';
import { employeeCtx } from './../../../store/employeeContext';
//import axios from 'axios';

export default function NewEmployeForm() {
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

 function nomHandler(e) { e = event
       e.preventDefault();
        console.log(e.target.value);
        setNom(prev => {
            return {   ...prev,   nom: e.target.value  }
        }
        );
        console.log(formInput);

   }
 function prenomHandler(e) { e = event
       e.preventDefault();
        console.log(e.target.value);
        setprenom(prev => {
            return {   ...prev,   prenom: e.target.value  }
        }
        );
        console.log(formInput);

   }
 function imageUrlHandler(e) { e = event
       e.preventDefault();
        console.log(e.target.files[0]);
        setimageUrl(prev => {
            return {   ...prev,   imageUrl: e.target.files[0]  }
        }
        );
        console.log(formInput);

   }
 function numCINHandler(e) { e = event
       e.preventDefault();
        console.log(e.target.value);
        setnumCIN(prev => {
            return {   ...prev,   numCIN: e.target.value  }  }
        );
        console.log(formInput);

   }
 function numCINHandler(e) { e = event
       e.preventDefault();
        console.log(e.target.value);
        setnumCIN(prev => {
            return {   ...prev,   numCIN: e.target.value  }  }
        );
        console.log(formInput);

   }
 function direction_idHandler(e) { e = event
       e.preventDefault();
        console.log(e.target.value);
        setnumCIN(prev => {
            return {   ...prev,   direction_id: e.target.value  }  }
        );
        console.log(formInput);

   }




 let EmpCtx= useContext(employeeCtx)
 const [nom, setNom]=useState("")
 const [prenom, setprenom]=useState("")
 const [imageUrl, setimageUrl]=useState([])
 const [numCIN, setnumCIN]=useState("")
 const [adresse, setadresse]=useState("")
 const [date_de_naissance, setdate_de_naissance]=useState("")
 const [date_de_recrutement, setdate_de_recrutement]=useState("")
 const [poste, setposte]=useState("")
 const [direction_id, setdirection_id]=useState("")
 const send= event=>{
event.preventDefault()
const d = listeDirections.find((d)=>d.name==event.target.value)
const data = new FormData();
data.append("nom",nom);
data.append("prenom",prenom);
data.append("imageUrl",imageUrl);
data.append("numCIN",numCIN);
data.append("adresse",adresse);
data.append("date_de_naissance",date_de_naissance);
data.append("date_de_recrutement",date_de_recrutement);
data.append("poste",poste);
data.append("direction_id",direction_id);
EmpCtx.addNewEmployee(data)
}

  return (
    <div style={{ display: "flex" }}>
            <div className="container" style={{ padding: 50 + "px" }}>

        <h6 className='display-5'  style={{color:"#4125D9"}}>Ajouter un employé</h6> 
      <form>

        <label htmlFor="numCIN">N° de CIN</label>
        <input className='form-control' type="text" name='numCIN' onChange={event=>{
          const {numCIN}=event.target.value;
          setnumCIN(numCIN)
        }}
        ></input>
     <label htmlFor="imageUrl">Photo</label>
        <input className='form-control' type="file" name='imageUrl'  onChange={event=>{
          const imageURL=event.target.files[0];
          setimageUrl(imageURL)
        }}></input> 
        <label htmlFor='nom'>Nom</label>
        <input className='form-control' type="text" name='nom' onChange={event=>{
          const {nom}=event.target.value;
          setNom(nom)
        }}></input>
        <label htmlFor='prenom'>Prénom</label>
        <input className='form-control' type="text" name='prenom' onChange={event=>{
          const {prenom}=event.target.value;
          setprenom(prenom)
        }}></input>
        <label htmlFor='date_de_naissance'>Date de naissance</label>
        <input className='form-control' type="date" name='date_de_naissance' onChange={event=>{
          const {date_de_naissance}=event.target.value;
          setdate_de_naissance(date_de_naissance)
        }}></input>
        <label htmlFor='adresse'>Adresse</label>
        <input className='form-control' type="text" name='adresse' onChange={event=>{
          const {adresse}=event.target.value;
          setadresse(adresse)
        }}></input>
        <label htmlFor='date_de_recrutement'>Date de recrutement</label>
        <input className='form-control' type="date" name='date_de_recrutement' onChange={event=>{
          const {date_de_recrutement}=event.target.value;
          setdate_de_recrutement(date_de_recrutement)
        }}></input>
        <label htmlFor='direction_id'>Direction</label>
        <select name="select" className="form-control"  onChange={event=>{
              const {direction_id}=event.target.value;
              setdirection_id(direction_id)
            }}>
          <option selected>--veuillez choisir la direction--</option>
          {listeDirections.map((f) => {
            return <option name="direction_id" key={f._id} value={f._id}>{f.name}</option>;
          })}
        </select>
        <label htmlFor='poste'>Poste</label>
        <input className='form-control' type="text"  name='poste' onChange={event=>{
          const {poste}=event.target.value;
          setposte(poste)
        }}></input>
       
        <button onClick={send} className='btn text-light form-control my-2' type="" style={{backgroundColor:"#4125D9"}}>Valider</button>
      </form>
    </div>
    </div>
  )
}
