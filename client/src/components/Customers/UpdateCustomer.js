import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clientCtx } from './../../store/clientContext';
import swal from 'sweetalert';

export default function UpdateCustomer() {
    let {_id}=useParams()
    const catdCtx= useContext(clientCtx)
    const [tabClients, setTabClients] = useState([]);
    useEffect(() => {
      axios.get(`/api/clients`).then((response) => {
        setTabClients(response.data);
      });
    }, []); 
let selectedClient= tabClients.find((c)=>c._id===_id)
 console.log('selectedClient', selectedClient)
  const nomClientValue = useRef();
  const numero_de_telValue = useRef();
  const adresseValue = useRef();
  const emailValue = useRef();
  let navigate=useNavigate()
  function submitHandler(event) {
    event.preventDefault();
    const uCand = {
      nomClient: nomClientValue.current.value,
      numero_de_tel: numero_de_telValue.current.value,
      adresse: adresseValue.current.value,
      email: emailValue.current.value,
    }
    catdCtx.updateClient(_id,uCand);
    swal({
      title: "Opération réussie!",
      text: "Le client a été bien mis à jour!",
      icon: "success",
    });
    navigate('/clients');
}  
    if(selectedClient){ 
  return (
    <div  style={{display: "flex"}}>

    <div className="container" style={{ padding: 50 + "px" }}>
           <div className="row d-flex justify-content-center">   
           
               <div className="col" >
        <h6 className='display-3'>Mettre à jour le client</h6>  <hr/>
           <form className='card p-3 shadow container-fluid'>
          
                 <label htmlFor="nomClient">Nom du client</label>
                 <input className="form-control" type="text" name="nomClient" defaultValue={selectedClient.nomClient} ref={nomClientValue} ></input>
                 <label htmlFor="numero_de_tel">Numéro de téléphone</label>
                 <input className="form-control" type="number" name="numero_de_tel" defaultValue={selectedClient.numero_de_tel} ref={numero_de_telValue} ></input>
                 <label htmlFor="adresse">Adresse</label>
                 <input className="form-control" type="text" name="adresse" defaultValue={selectedClient.adresse} ref={adresseValue} ></input>
                 <label htmlFor="email">Email</label>
                 <input className="form-control" type="email" name="email" defaultValue={selectedClient.email} ref={emailValue} ></input>
              
               <div className='d-flex justify-content-center'>
                <div className='p-2'>
             <Link to="/clients" className="btn btn-outline-danger my-2 mr-2 rounded-pill" type="submit">Annuler</Link>
                </div>
                <div className='p-2'>
             <button className="btn btn-outline-success my-2 rounded-pill" type="submit" onClick={submitHandler}>Confirmer</button>
                  
                </div>
                
               </div>
             </form>
               </div>
               </div>
           </div>
           </div>
         
  )
}  
else{
  return(
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div> 
  )
}
}
