import React, { useContext } from "react";
import { FaEdit, FaRegEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { fournisseurtCtx } from './../../store/fournisseurContext';
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
export default function OneFournisseur(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  let ctx=useContext(fournisseurtCtx)
  function removeC(){
    ctx.removeOneFournisseur(props.fournisseur._id)
 
window.location.reload()
}
  return (

      <div>
      <li className='list-group-item my-1 shadow p-3' style={{backgroundColor:"#F5FAFF"}}>
      <div className='row'>
           
       <div className='col-8'>{props.fournisseur.nom_commercial}</div> 
       <Button className='col-1 btn btn-outline-dark mx-1'  onClick={handleOpen}> <FaRegEye /></Button> 
     <Link className='col-1 btn btn-outline-success mx-1'  to={"/fournisseurs/" + props.fournisseur._id + "/edit"}> <FaEdit /></Link>
      
   <button className='col-1 btn btn-outline-danger mx-1'onClick={removeC}> <FaTrash /></button>
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
                {props.fournisseur.nom_commercial}
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                 <ul>
  
                 <li>Numéro de téléphone: {props.fournisseur.numero_de_tel}</li>
                  <li>Adresse: {props.fournisseur.adresse}</li>
                  <li>Adresse mail: {props.fournisseur.email}</li>
                 </ul>
              </Typography>
            </Box>
          </Modal>
        
        </div>
 )
}
