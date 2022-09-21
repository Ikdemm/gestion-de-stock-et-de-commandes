import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBan, FaSave, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewEmployeForm() {

let navigate= useNavigate()
 
const [nom, setNom] = useState('');
const [prenom, setPrenom] = useState('');
const [imageUrl, setImageUrl] = useState(null);
const [numCIN, setNumCIN] = useState('');
const [numTel, setNumTel] = useState('');
const [adresse, setAdresse] = useState('');
const [date_de_naissance, setDate_de_naissance] = useState('');
const [date_de_recrutement, setDate_de_recrutement] = useState('');
const [poste, setPoste] = useState('');
const [direction_id, setDirection_id] = useState('');

//directions from the backend
const [listeDirections, setTlisteDirections] = useState([]);

useEffect(() => {
  axios.get(`/api/directions`).then((response) => {
   setTlisteDirections(response.data);
  });
}, []); 

//handle and convert it in base 64
const handleImage = (e) =>{
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
}

const setFileToBase = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      setImageUrl(reader.result);
    }

}

//submit the form
const submitForm = async (e) =>{
    e.preventDefault();
    try {
        const {data} = await axios.post('/api/staff', {nom, prenom, adresse, direction_id, imageUrl,date_de_naissance, date_de_recrutement, numCIN, numTel,poste  })
        console.log('data', data)
        if  (data.success === true){
            setNom('');
            setPrenom('');
            setNumCIN('');
            setNumTel('');
            setAdresse('');
            setDate_de_naissance('');
            setDate_de_recrutement('');
            setPoste('');
            setDirection_id('');
            setImageUrl(null);
            toast.success("L'employé est bien ajouté!")
          }
        navigate('/employes')
        console.log(data);
    } catch (error) {
        console.log(error)
    }

}

if(listeDirections){

  return (
    <div className="container">
    <div style={{ display: "flex" }}>
  <div className="container-fluid">
      <h6 className="display-6 mb-4"> Ajouter un employé </h6>
      <hr />
   <form method="post" className="container shadow p-4 bg-light" onSubmit={submitForm} encType="multipart/form-data">  
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor="numCIN">N° de CIN</label>
        <input onChange={(e)=>setNumCIN(e.target.value)} className='form-control' type="number" name='numCIN' value={numCIN}   ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor="imageUrl">Photo</label>
        <input className='form-control' type="file" name='imageUrl' onChange={handleImage} accept="image/*" ></input> 
   
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor='prenom'>Prénom</label>
        <input onChange={(e)=>setPrenom(e.target.value)} className='form-control' type="text" name='prenom'  value={prenom} ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='nom'>Nom</label>
        <input className='form-control' type="text" name='nom' onChange={(e)=>setNom(e.target.value)} value={nom} ></input>
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor='date_de_naissance'>Date de naissance</label>
        <input className='form-control' type="date" name='date_de_naissance'  onChange={(e)=>setDate_de_naissance(e.target.value)} value={date_de_naissance} ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='adresse'>Adresse</label>
        <input className='form-control' type="text" name='adresse' onChange={(e)=>setAdresse(e.target.value)} value={adresse}  ></input>
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">

    <label htmlFor='date_de_recrutement'>Date de recrutement</label>
        <input className='form-control' type="date" name='date_de_recrutement'  onChange={(e)=>setDate_de_recrutement(e.target.value)} value={date_de_recrutement}  ></input>
    </div>
    <div className="col-md-6">

    <label htmlFor='direction_id'>Direction</label>
        <select name="direction_id" className="form-select"  onChange={(e)=>setDirection_id(e.target.value)}  value={direction_id} >
          <option > -- Veuillez choisir la direction --</option>
          {listeDirections.map((f) => {
            return <option  key={f._id} value={f._id}>{f.name}</option>;
          })}
        </select>
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor='poste'>Poste</label>
        <input className='form-control' type="text"  name='poste' onChange={(e)=>setPoste(e.target.value)}  value={poste}  ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='numTel'>Numéro de téléphone</label>
        <input className='form-control' type="number"  name='numTel' onChange={(e)=>setNumTel(e.target.value)}  value={numTel}   ></input>
     
    </div>
    </div>

       
    <div className='d-flex flex-row-reverse'>
                <div className='p-2'>
             <button className="btn bg-green my-2 " type="submit" >Confirmer <FaSave></FaSave></button>    
                </div>
                <div className='p-2'>
             <Link to="/employes" className="btn btn-danger my-2 mr-2">Annuler <FaBan></FaBan> </Link>
                </div>
                
               </div>
      
      
      </form>
    </div>
    </div>
    </div>
  )
}else
{
  return (
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div>
  )
}
}
