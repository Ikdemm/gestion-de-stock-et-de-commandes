import React, { useContext, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { demandeCtx } from './../../../store/demandeContext';

export default function NouvelleDemande(props) {
  var listeUsers=props.tabUsers;
  var tabStaff=props.tabStaff;
  let emailUser = localStorage.getItem("email");
  var connectedUser = listeUsers.find((u) => u.email === emailUser);
  console.log('connectedUser', connectedUser)
  var employee = tabStaff.find((o) => o._id === connectedUser.employe_id);
  
  let dctx=useContext(demandeCtx)
  let refobjet = useRef("");
  let refdetailsDemande = useRef("");
  
  
  function submitHandler(e) {
    e.preventDefault();
    let newDemande = {
      objet: refobjet.current.value,
      detailsDemande: refdetailsDemande.current.value,
      employe_id: employee._id
       };
    dctx.addNewDemande(newDemande);
    console.log('newDemande', newDemande)
   e.target.reset()
   window.location.reload()
 
  }
  if (tabStaff.length>0 && listeUsers.length>0 && connectedUser && employee) {

  return (
    <>
    <div style={{display:"flex"}}>
    <div className="container  p-3" >
    <h6 className="display-6">Nouvelle demande</h6>
    <form onSubmit={submitHandler}  method="post">
        <label htmlFor="objet">Objet</label>
        <input type="text" name="objet" ref={refobjet} className="form-control" />

        <label htmlFor="detailsDemande">Détails de la demande</label>
        <textarea    name="detailsDemande"ref={refdetailsDemande}  className="form-control"/>

  
  
        <button type="submit"className='btn bg-blue form-control my-2'>Confirmer la demande </button>
      </form>


      </div>
      </div>

    </>  )
}else
{
  return (
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div>
  )
}
}