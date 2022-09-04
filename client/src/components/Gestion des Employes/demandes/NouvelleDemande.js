import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { demandeCtx } from './../../../store/demandeContext';

export default function NouvelleDemande() {
  const [tabUsers, setListeUsers] = useState([]);
  useEffect(()=>{
    fetch('/api/auth/all-users')
    .then(res => {return res.json()})
    .then(data => {
              
      for (const key in data) {
          data[key]._id = key;
          setListeUsers((prev)=>{
              return [...prev, data[key]]
          })

      }}
      )
   
  },[])
  const [tabStaff, setTabStaff] = useState([]);
  useEffect(() => {
    axios.get(`/api/staff`).then((response) => {
      setTabStaff(response.data);
    });
  }, []);
  let emailUser = localStorage.getItem("email");
  var connectedUser = tabUsers.find((u) => u.email === emailUser);
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
  return (
    <>
    <div style={{display:"flex"}}>
    <div className="container card p-3" >
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
}
