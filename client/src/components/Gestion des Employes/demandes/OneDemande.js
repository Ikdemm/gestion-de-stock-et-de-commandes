import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaRegEye, FaSpinner } from "react-icons/fa";
import { demandeCtx } from './../../../store/demandeContext';
import moment from "moment";
import "moment/locale/fr";
import swal from 'sweetalert';

import {
  FcCancel
} from "react-icons/fc";
import axios from "axios";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
export default function OneDemande(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let ctx = useContext(demandeCtx );
    //const [etat, setEtat]=useState("non_traitee")
  /*   function removeC() {
        ctx.removeOneDemande(props.demande._id);
    
        window.location.reload();
      } */
      const [APIData, setAPIData] = useState([]);

      useEffect(() => {
         axios.get(`/api/staff`).then((response) => {
           setAPIData(response.data);
         });
       }, []);
       var employee= APIData.find((e)=>e._id===props.demande.employe_id)
   function UpdateDemande() {

      if(props.demande.etat==="non_traitee")
       { props.demande.etat="traitee"}
     
      else{
        props.demande.etat="non_traitee"
     
      }
ctx.updateDemande(props.demande._id, props.demande)
swal({
  title: "Opération réussie!",
  text: "Etat de traitement de la demande a été bien mis à jour!",
  icon: "success",
});

setTimeout(()=>{
  window.location.reload()

}, 2000)
      } 
 if (APIData && employee) {

  return (
    <div>
    <li
      className="list-group-item my-1 shadow p-3"
    >
      <div className="row">
        <div className="col-6">{props.demande.objet}</div>
        <Button
          className="col-1 btn btn-outline-dark mx-1"
          onClick={handleOpen}
        >
         
          <FaRegEye />
        </Button>
 

        <button
          className="col-4 btn bg-white border-dark mx-1"
          onClick={UpdateDemande}
        >
         {props.demande.etat=== "non_traitee" ?<div className="text-success">Marquer comme traitée <FaCheck className='mx-2 '/></div> : <div className="text-danger">Marquer comme non traitée     <FcCancel ></FcCancel>
 </div> }
          
         
        </button>
 {/*        <button
          className="col-1 btn btn-outline-danger mx-1"
          onClick={removeC}
        >
         
          <FaTrash />
        </button> */}
      </div>
    </li>
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        <b> Objet: {props.demande.objet}</b> <br></br>
        
        <b> Envoyé par: {employee.prenom}  {employee.nom}</b> <hr></hr>
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
        <b> Date Demande:</b> {moment(props.demande.dateDemande).locale('fr').format('ll')}<br/>
        <b> Details Demande:</b> {props.demande.detailsDemande}<br/>
        <b> Etat:</b> {props.demande.etat}
         
        </Typography>
      </Box>
    </Modal> 
  </div>
  )
} else {
  return (
    <div className="fetching">
      <FaSpinner className="spinner"></FaSpinner>
    </div>
  );
}
}
