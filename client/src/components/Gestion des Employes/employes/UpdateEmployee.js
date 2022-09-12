import axios from 'axios';
import 'moment/locale/fr';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaBan, FaSave, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { employeeCtx } from '../../../store/employeeContext';
export default function UpdateEmployee() {
  let {_id}=useParams()
  const [tabEmployes, settabEmployes] = useState([]);
  let navigate=useNavigate()

  useEffect(() => {
    axios.get(`/api/staff`).then((response) => {
      settabEmployes(response.data);
    });
  }, []);
  let empctx = useContext(employeeCtx);
  let selectedEmployee=tabEmployes.find((e)=>e._id===_id)
  const [listeDirections, setTabDirections] = useState([]);
  useEffect(() => {
    axios.get(`/api/directions`).then((response) => {
      setTabDirections(response.data);
    });
  }, []);

  console.log("listeDirections", listeDirections);

  let refCIN = useRef("");
  let refN = useRef("");
  let refPR = useRef("");
  let refA = useRef("");
  let refPOSTE = useRef("");
  let refDR = useRef("");
  let refDRc = useRef("");
  let refDN = useRef("");
  let refU = useRef("");
  let refImage = useRef("");

  const handleEmployee =async (e) => {
    const d = listeDirections.find((p) => p.name === refDR.current.value);

    e.preventDefault();
    let uEmployee={
      nom:refN.current.value,
      prenom: refPR.current.value,
      numCIN: refCIN.current.value,
      adresse: refA.current.value,
      date_de_naissance: refDN.current.value,
      date_de_recrutement: refDRc.current.value,
      poste: refPOSTE.current.value,
      direction_id: d._id,
      user_id: refU.current.value,
      imageUrl:refImage.current.files[0]
    }
    empctx.updateEmployee(selectedEmployee._id, uEmployee)
    navigate('/employes')
}

if(selectedEmployee && listeDirections){
  return (
    <div className="container">
    <div style={{ display: "flex" }}>
  <div className="container-fluid">
      <h6 className="display-6 mb-4"> Mettre à jour l'employé </h6>
      <hr />
   <form method="post" className="container shadow p-4 bg-light" onSubmit={handleEmployee}>  
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor="numCIN">N° de CIN</label>
        <input className='form-control' type="text" name='numCIN' ref={refCIN} defaultValue={selectedEmployee.numCIN}   ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor="imageUrl">Photo</label>
        <input className='form-control' type="file" name='imageUrl'  ref={refImage} accept="image/*" ></input> 
    
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor='prenom'>Prénom</label>
        <input className='form-control' type="text" name='prenom' ref={refPR} defaultValue={selectedEmployee.prenom}  ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='nom'>Nom</label>
        <input className='form-control' type="text" name='nom'  ref={refN} defaultValue={selectedEmployee.nom} ></input>
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor='date_de_naissance'>Date de naissance</label>
        <input className='form-control' type="date" name='date_de_naissance' ref={refDN} defaultValue={selectedEmployee.date_de_naissance}  ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='adresse'>Adresse</label>
        <input className='form-control' type="text" name='adresse' ref={refA} defaultValue={selectedEmployee.adresse}  ></input>
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">

    <label htmlFor='date_de_recrutement'>Date de recrutement</label>
        <input className='form-control' type="date" name='date_de_recrutement' ref={refDRc}  defaultValue={selectedEmployee.date_de_recrutement} ></input>
    </div>
    <div className="col-md-6">

    <label htmlFor='direction_id'>Direction</label>
        <select name="direction_id" className="form-select"  ref={refDR} defaultValue={selectedEmployee.direction_id}  >
          <option > -- Veuillez choisir la direction --</option>
          {listeDirections.map((f) => {
            return <option  key={f._id}>{f.name}</option>;
          })}
        </select>
    </div>
    </div>
    <div className='row mb-2'>
    <div className="col-md-6">
    <label htmlFor='poste'>Poste</label>
        <input className='form-control' type="text"  name='poste' ref={refPOSTE} defaultValue={selectedEmployee.poste}  ></input>
    </div>
    <div className="col-md-6">
    <label htmlFor='user_id'>ID d'utilisateur</label>
        <input className='form-control' type="text"  name='user_id' ref={refU} defaultValue={selectedEmployee.user_id}  ></input>
     
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
else {
  return (
    <div className="fetching">
      <FaSpinner className="spinner"></FaSpinner>
    </div>
  );
}
}