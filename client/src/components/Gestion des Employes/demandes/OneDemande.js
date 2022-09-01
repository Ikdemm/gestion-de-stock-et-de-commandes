import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { FaCheck, FaRegEye } from "react-icons/fa";
import { demandeCtx } from './../../../store/demandeContext';

import {
  FcCancel
} from "react-icons/fc";
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
   function UpdateDemande() {

      if(props.demande.etat==="non_traitee")
       { props.demande.etat="traitee"}
     
      else{
        props.demande.etat="non_traitee"
     
      }
ctx.updateDemande(props.demande._id, props.demande)
window.location.reload()
return
      } 
  return (
    <div>
    <li
      className="list-group-item my-1 shadow p-3"
      style={{ backgroundColor: "#F5FAFF" }}
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
        <b> Objet: {props.demande.objet}</b> <hr></hr>
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
        <b> Date Demande:</b> {props.demande.dateDemande}<br/>
        <b> Details Demande:</b> {props.demande.detailsDemande}<br/>
        <b> Etat:</b> {props.demande.etat}
         
        </Typography>
      </Box>
    </Modal> 
  </div>
  )
}
