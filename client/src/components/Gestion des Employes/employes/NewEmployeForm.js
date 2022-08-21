import React, { useContext, useEffect, useState } from 'react'
import { directionCtx } from '../../../store/directionContext';
import { employeeCtx } from '../../../store/employeeContext';
import { useNavigate } from 'react-router-dom';

export default function NewEmployeForm() {

  //let empCtx=useContext(employeeCtx)
  let dctx = useContext(directionCtx);
  let listeDirections = dctx.tabDirections
  console.log("listeDirections", listeDirections);
  useEffect(() => {
    dctx.getAllDirections()
  }, []);
let navigate= useNavigate()
 
   const [Employee, setEmployee] = useState({
    nom: '',
    prenom: '',
    numCIN: '',
    adresse: '',
    date_de_naissance: '',
    date_de_recrutement: '',
    poste: '',
    direction: '',

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
    data.append("adresse",Employee.adresse);
    data.append("date_de_naissance",Employee.date_de_naissance);
    data.append("date_de_recrutement",Employee.date_de_recrutement);
    data.append("poste",Employee.poste);
    data.append("direction",Employee.direction);
    console.log('data', data)
    //empCtx.addNewEmployee(data)
  await  fetch('/api/staff',{
      method: 'POST',
      body: data,
    })
    alert('employé ajouté')
    navigate('/employes')
   // console.log('tabEmlpyes', empCtx.tabEmployees)

}
  return (
    <div style={{ display: "flex" }}>
            <div className="container" style={{ padding: 50 + "px" }}>

        <h6 className='display-5'  style={{color:"#4125D9"}}>Ajouter un employé</h6> 
   <form method="post" >  
    

        <label htmlFor="numCIN">N° de CIN</label>
        <input className='form-control' type="text" name='numCIN' onChange={handleChange}  ></input>
        <label htmlFor="imageUrl">Photo</label>
        <input className='form-control' type="file" name='imageUrl' onChange={(e) => setimageUrl(e.target.files[0]) } /* console.log("hedhy",e.target.files[0].name) } */  accept="image/*" ></input> 
     {/*    <input className='form-control' type="file" name='imageUrl' onChange={(e) => setimageUrl(e.target.files[0].name) }  accept="image/*" ></input> */}
        <label htmlFor='nom'>Nom</label>
        <input className='form-control' type="text" name='nom' onChange={handleChange} ></input>
        <label htmlFor='prenom'>Prénom</label>
        <input className='form-control' type="text" name='prenom' onChange={handleChange} ></input>
        <label htmlFor='date_de_naissance'>Date de naissance</label>
        <input className='form-control' type="date" name='date_de_naissance' onChange={handleChange} ></input>
        <label htmlFor='adresse'>Adresse</label>
        <input className='form-control' type="text" name='adresse' onChange={handleChange} ></input>
        <label htmlFor='date_de_recrutement'>Date de recrutement</label>
        <input className='form-control' type="date" name='date_de_recrutement' onChange={handleChange} ></input>
        <label htmlFor='direction_id'>Direction</label>
        <select name="direction" className="form-control"  onChange={handleChange} >
          {listeDirections.map((f) => {
            return <option  key={f._id} value={f._id}>{f.name}</option>;
          })}
        </select>
        <label htmlFor='poste'>Poste</label>
        <input className='form-control' type="text"  name='poste' onChange={handleChange} ></input>
       
        <button type="button" onClick={handleEmployee} className='btn text-light form-control my-2' style={{backgroundColor:"#4125D9"}} >Valider</button>
      </form>
    </div>
    </div>
  )
}
