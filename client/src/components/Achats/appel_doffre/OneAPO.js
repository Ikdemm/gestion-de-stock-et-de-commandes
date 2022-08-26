import React, { useContext, useEffect} from "react";
import moment from 'moment';
import 'moment/locale/fr';
import { AiTwotoneEye, AiTwotoneEdit } from "react-icons/ai";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { appelOffreCtx } from './../../../store/appelOffreContext';
import { produitCtx } from './../../../store/produitContext';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function OneAPO(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  let ctx=useContext(appelOffreCtx)
  let pdtctx=useContext(produitCtx)
  let tabProduits=pdtctx.tabProduits
  let pdt=tabProduits.find((p)=>p._id===props.apo.produit_id)
  function removeC(){
    ctx.removeOneAppelOffre(props.apo._id)
 
window.location.reload()
}
  return (
    <>
    <tr>      
    <td scope="col">{  moment(props.apo.dateAPO).locale('fr').format('LL') }</td>
        <td scope="col">{props.apo.ref}</td>
        <td scope="col">{ moment(props.apo.dateLimiteDeReponse).locale('fr').format('LL') }</td>
        <td scope="col">{ moment(props.apo.dateDeCommandePlanifiee).locale('fr').format('LL') } </td>
        <td scope="col">
        <Button className='col-1 btn btn-outline-dark mx-1'  onClick={handleOpen}> <AiTwotoneEye /></Button> 

          </td>
        <td scope="col"> 
        <button className='btn btn-light'><AiTwotoneEdit></AiTwotoneEdit></button>
        </td>
    </tr>  
    <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
               Appel d'offre n°: {props.apo.ref}<br/> 
               Objet: {props.apo.objet}
               <hr/>
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                 <ul>
  
                 <li>Produit: {pdt.title}</li>
                  <li>Quantité: {props.apo.quantite} unités</li>
                  <li>Commentaire: {props.apo.commentaire} </li>
                  <li>Date Limite De Reponse: { moment(props.apo.dateLimiteDeReponse).locale('fr').endOf('day').fromNow()}</li>
                  <li>Date De Commande Planifiée: { moment(props.apo.dateDeCommandePlanifiee).locale('fr').endOf('day').fromNow()}</li>
                 </ul>
              </Typography>
            </Box>
          </Modal>
    </>
    )
}
