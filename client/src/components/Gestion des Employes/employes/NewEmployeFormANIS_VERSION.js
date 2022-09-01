import axios from 'axios';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { FaBan, FaSave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { employeeCtx} from "../../../store/employeeContext"
export default function NewEmployeForm() {
  let navigate= useNavigate()

  let empCtx=useContext(employeeCtx)
  const [listeDirections, setTabDirections] = useState([]);
  useEffect(() => {
    axios.get(`/api/directions`).then((response) => {
      setTabDirections(response.data);
    });
  }, []);
  
  const fileInput = createRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onEmployeeSubmit = async (data) => {

    const fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]); // formdata doesn't take objects
      console.log("data",data);

    fd.append("imageUrl", fileInput.current.files[0]);

    empCtx.addNewEmployee(fd);
    navigate('/employes')

    console.log("allEmployees",empCtx.tabEmployees);
  };
}
  return (
    <div className="container">
    <div style={{ display: "flex" }}>
  <div className="container-fluid">
      <h6 className="display-6 mb-4"> Ajouter un employé </h6>
      <hr />
   <form method="post"    className="container shadow p-4 bg-light" onSubmit={handleSubmit ( onEmployeeSubmit ) }
>  
    
   <div className="row mb-2">
   <div className="col-md-6">
   <label htmlFor="numCIN">N° de CIN</label>
   <input className='form-control' type="number" name='numCIN'min="00000001" max="99999999" {...register("numCIN", { required: true })} required></input>
</div>    
   <div className="col-md-6">
   <label htmlFor="imageUrl">Photo</label>
        <input className='form-control' type="file" name='imageUrl'  accept="image/*" ref={fileInput}></input> 
       
</div>    
</div>    
   <div className="row mb-2">
   <div className="col-md-6">
   <label htmlFor='nom'>Nom</label>
        <input className='form-control' type="text" name='nom'   required
            {...register("nom", { required: true })} ></input>
</div>    
   <div className="col-md-6">
    
   <label htmlFor='prenom'>Prénom</label>
        <input className='form-control' type="text" name='prenom' required
            {...register("prenom", { required: true })} ></input>
</div>    
</div>    
   <div className="row mb-2">
   <div className="col-md-6">
   <label htmlFor='date_de_naissance'>Date de naissance</label>
        <input className='form-control' type="date" name='date_de_naissance'required
            {...register("date_de_naissance", { required: true })}  ></input>
       
</div>    
   <div className="col-md-6">
   <label htmlFor='adresse'>Adresse</label>
        <input className='form-control' type="text" name='adresse'required
            {...register("adresse", { required: true })}   ></input>
        
</div>    
</div>    
   <div className="row mb-2">
   <div className="col-md-6">
   <label htmlFor='date_de_recrutement'>Date de recrutement</label>
        <input className='form-control' type="date" name='date_de_recrutement' required
            {...register("date_de_recrutement", { required: true })} ></input>
       
</div>    
   <div className="col-md-6">
   <label htmlFor='direction_id'>Direction</label>
        <select className="form-select"  required {...register("direction_id")} >
        <option  value={""}>--Veuillez choisir une direction--</option>

          {listeDirections&&listeDirections.map((items) => {
            console.log("items._id", items._id)
            console.log("listeDirections", listeDirections)
            return <option  key={items._id} value={items._id.slice(items._id.indexOf('')+1,items._id.lastIndexOf(''))}>{items.name}</option>;
          })}
        </select>
       
</div>    
</div>    
   <div className="row">
   <div className="col-md-6">
          
 <label htmlFor='poste'>Poste</label>
        <input className='form-control' type="text"  name='poste' required
            {...register("poste", { required: true })} ></input>
       
</div>    
   <div className="col-md-6">
   <label htmlFor='user_id'>ID d'utilisateur</label>
        <input className='form-control' type="text"  name='user_id'  ></input>
       
</div>    
</div>    
      
<div className='d-flex flex-row-reverse'>
                <div className='p-2'>
             <button className="btn bg-green my-2 " type="submit">Confirmer <FaSave></FaSave></button>    
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
}
