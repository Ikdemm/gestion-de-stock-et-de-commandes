import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { demandeCtx } from './../../../store/demandeContext';

export default function NouvelleDemande() {
  let dctx=useContext(demandeCtx)
  let navigate=useNavigate()
  let refobjet = useRef("");
  let refdetailsDemande = useRef("");
  let refemploye_id = useRef("")

  function submitHandler(e) {
    e.preventDefault();
    let newDemande = {
      objet: refobjet.current.value,
      detailsDemande: refdetailsDemande.current.value,
      employe_id: refemploye_id.current.value
       };
    dctx.addNewDemande(newDemande);
    console.log('newDemande', newDemande)
  e.target.reset()

   window.location.reload()
 
  }
  return (
    <>
    <div style={{display:"flex"}}>
    <div className="container" >
    <h6 className="display-6">Nouvelle demande</h6>
    <form onSubmit={submitHandler}  method="post">
        <label htmlFor="objet">Objet</label>
        <input type="text" name="objet" ref={refobjet} className="form-control" />

        <label htmlFor="detailsDemande">detailsDemande</label>
        <textarea    name="detailsDemande"ref={refdetailsDemande}  className="form-control"/>

        <label htmlFor="employe_id">employe_id</label>
        <input  type="text"  name="employe_id"  ref={refemploye_id}  className="form-control"   />
      
  
        <button type="submit"className='btn text-light form-control my-2'style={{backgroundColor:"#4125D9"}}>Confirmer la demande </button>
      </form>


    

      </div>
      </div>

    </>  )
}
