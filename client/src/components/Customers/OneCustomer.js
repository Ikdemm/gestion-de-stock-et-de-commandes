import React, { useContext } from "react";
import { FaEdit, FaRegEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { clientCtx } from './../../store/clientContext';
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

export default function OneCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  let ctx=useContext(clientCtx)
  function removeC(){
    ctx.removeOneProduit(props.client._id)
 
window.location.reload()
}
  
  return (

      <div>
    <li className='list-group-item my-1 shadow p-3' style={{backgroundColor:"#F5FAFF"}}>
    <div className='row'>
         
     <div className='col-8'>{props.client.nomClient}</div> 
     <Button className='col-1 btn btn-outline-dark mx-1'  onClick={handleOpen}> <FaRegEye /></Button> 
   <Link className='col-1 btn btn-outline-success mx-1'  to={"/clients/" + props.client._id + "/edit"}> <FaEdit /></Link>
    
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
              {props.client.nomClient}
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
               <ul>

               <li>Numéro de téléphone: {props.client.numero_de_tel}</li>
                <li>Adresse de livraison: {props.client.adresse}</li>
                <li>Adresse mail: {props.client.email}</li>
               </ul>
            </Typography>
          </Box>
        </Modal>
      
      </div>
 )
}
