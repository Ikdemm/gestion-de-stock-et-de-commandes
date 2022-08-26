import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import editPhoto from '../../assets/images/pen.gif'
import { clientCtx } from './../../store/clientContext';
export default function UpdateCustomer() {
    let {_id}=useParams()
    const catdCtx= useContext(clientCtx)
  let selectedClient= catdCtx.getClientById(_id)
  const [client, setClient]=useState(selectedClient)
  function handleInputChange ( event) {
    const { name, value } = event.target
  
    setClient({ ...client, [name]: value })
  }
    let navigate=useNavigate()
  return (
    <div  style={{display: "flex"}}>

    <div className="container" style={{ padding: 50 + "px" }}>
           <div className="row d-flex justify-content-center">   
               <div className="col-md-6">
               <img src={editPhoto} alt="editPhoto"  style={{height: 80+"vh"}}/> 
               </div> 
               <div className="col-md-6" style={{marginTop: 30+"vh"}}>
        <h6 className='display-6'  style={{color:"#4125D9"}}>Mettre à jour le client</h6>  
           <form onSubmit={event => {
               event.preventDefault()
               catdCtx.updateClient(_id,client);
              navigate('/clients') }
             }>
          
                 <label htmlFor="nomClient">Nom du client</label>
                 <input className="form-control" type="text" name="nomClient" value={client.nomClient} onChange={handleInputChange} ></input>
                 <label htmlFor="numero_de_tel">Numéro de téléphone</label>
                 <input className="form-control" type="number" name="numero_de_tel" value={client.numero_de_tel} onChange={handleInputChange} ></input>
                 <label htmlFor="adresse">Adresse</label>
                 <input className="form-control" type="text" name="adresse" value={client.adresse} onChange={handleInputChange} ></input>
                 <label htmlFor="email">Email</label>
                 <input className="form-control" type="email" name="email" value={client.email} onChange={handleInputChange} ></input>
              
               
             <button className="btn btn-success my-2" type="submit">Modifier le client</button>
             </form>
               </div>
               </div>
           </div>
           </div>
         
  )
}
