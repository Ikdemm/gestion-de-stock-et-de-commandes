import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBan, FaSave, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function NewEmployeForm() {
  const [listeDirections, setTlisteDirections] = useState([]);


  useEffect(() => {
   axios.get(`/api/directions`).then((response) => {
    setTlisteDirections(response.data);
   });
 }, []); 

let navigate= useNavigate()
 
   const [Employee, setEmployee] = useState({
    nom: '',
    prenom: '',
    numCIN: '',
    numTel: '',
    adresse: '',
    date_de_naissance: '',
    date_de_recrutement: '',
    poste: '',
    direction_id: '',

    })
    const [imageUrl, setimageUrl] = useState(null)

    const handleChange = e => {
      const { name, value } = e.target;
      setEmployee(prevState => ({
          ...prevState,
          [name]: value
      }));
      console.log(e.target.value)
  };

  const handleEmployee =async (e) => {
    e.preventDefault();

    console.log('Employee', Employee)
    let data = new FormData();
    data.append("nom",Employee.nom);
    data.append("prenom",Employee.prenom);
    data.append("imageUrl",imageUrl);
    data.append("numCIN",Employee.numCIN);
    data.append("numTel",Employee.numTel);
    data.append("adresse",Employee.adresse);
    data.append("date_de_naissance",Employee.date_de_naissance);
    data.append("date_de_recrutement",Employee.date_de_recrutement);
    data.append("poste",Employee.poste);
    data.append("direction_id",Employee.direction_id);
    console.log('data', data)
  await  fetch('/api/staff',{
      method: 'POST',
      body: data,
    })
    swal({
      title: "Opération réussie!",
      text: "L'employé est bien ajouté!",
      icon: "success",
    });
    setTimeout(()=>{
    navigate('/employes')
  }, 1500)

}
if(listeDirections){

  return (
    <div className="container">
    <div style={{ display: "flex" }}>
  <div className="container-fluid">
      <h6 className="display-6 mb-4"> Ajouter un employé </h6>
      <hr />
   <form method="post" className="container shadow p-4 bg-light">  
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor="numCIN">N° de CIN</label>
        <input className='form-control' type="number" name='numCIN' onChange={handleChange}  ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor="imageUrl">Photo</label>
        <input className='form-control' type="file" name='imageUrl' onChange={(e) => setimageUrl(e.target.files[0]) } /* console.log("hedhy",e.target.files[0].name) } */  accept="image/*" ></input> 
   
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor='prenom'>Prénom</label>
        <input className='form-control' type="text" name='prenom' onChange={handleChange} ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='nom'>Nom</label>
        <input className='form-control' type="text" name='nom' onChange={handleChange} ></input>
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor='date_de_naissance'>Date de naissance</label>
        <input className='form-control' type="date" name='date_de_naissance' onChange={handleChange} ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='adresse'>Adresse</label>
        <input className='form-control' type="text" name='adresse' onChange={handleChange} ></input>
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">

    <label htmlFor='date_de_recrutement'>Date de recrutement</label>
        <input className='form-control' type="date" name='date_de_recrutement' onChange={handleChange} ></input>
    </div>
    <div className="col-md-6">

    <label htmlFor='direction_id'>Direction</label>
        <select name="direction_id" className="form-select"  onChange={handleChange} >
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
        <input className='form-control' type="text"  name='poste' onChange={handleChange} ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='numTel'>Numéro de téléphone</label>
        <input className='form-control' type="number"  name='numTel' onChange={handleChange} ></input>
     
    </div>
    </div>

       
    <div className='d-flex flex-row-reverse'>
                <div className='p-2'>
             <button className="btn bg-green my-2 " type="submit" onClick={handleEmployee}>Confirmer <FaSave></FaSave></button>    
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
