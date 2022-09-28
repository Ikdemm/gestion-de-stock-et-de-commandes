/* eslint-disable no-unused-vars */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaSpinner, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { getAllLignesAchatsOridinaires,deleteOneLigneAchatOrdinaire ,selectTabAllLignesAchatsOridinaires , updateLigneAchatOrdinaire } from "../../features/factures_ordinaires/achat/lines/ligneAchatOrdinaireSlice";
import { getAllProduits, selectProduit } from "../../features/product/productSlice";
import { ligneAchatCtx } from '../../store/ligneAchatContext';
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
export default function OneLigneFactureAchat(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  const dispatch = useDispatch();

  const tabProduits = useSelector(selectProduit);
  const tabLignes = useSelector(selectTabAllLignesAchatsOridinaires);


//let navigate=useNavigate()
useEffect(() => {
  dispatch(getAllProduits());
  dispatch(getAllLignesAchatsOridinaires());

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
let articleId=props.ligne.article.article_id;
console.log('articleId', articleId)
let a=tabProduits.find((p)=>p._id===articleId);
  console.log("article",a);
  const [line, setLine]=useState(props.ligne._id)
function handleInputChange ( event) {
  const { name, value } = event.target

  setLine({ ...line, [name]: value })
}
//let ligneCtx=useContext(ligneAchatCtx)
function removeC(){
  // eslint-disable-next-line no-restricted-globals
  var result =  confirm('Etes-vous sûr de bien vouloir effectuer la suppression?');

  if(result){
dispatch(deleteOneLigneAchatOrdinaire(props.ligne._id))
    //ligneCtx.removeOneLigneAchat(props.ligne._id)
    window.location.reload()
  }


}
  if(a){  
    return (
  <>
      <tr >
          <td>{a.title}</td>
          <td className='text-center'>{a.price_a}</td>  
          <td className='text-center'>{props.ligne.quantite_a}</td> 
          <td className='text-center'>{props.ligne.total_HT}</td> 
          <td className='text-center'>{props.ligne.TVA}</td> 
          <td>{props.ligne.total_TTC}</td> 
          <td >
          <Button className=' btn btn-outline-dark mx-1'  onClick={handleOpen}>
            <FaEdit/>

          </Button>
          </td>
          <td className='text-center'>
            <button className=' btn btn-outline-danger mx-1'onClick={removeC} >

            <FaTrash/>
            </button>
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
            <b>Modifier la quantité commandée</b> 
            </Typography>
            <form onSubmit={event => {
               event.preventDefault()
               let data={
                id: props.ligne._id, 
                data:line 
               }
               dispatch(updateLigneAchatOrdinaire(data))
               //ligneCtx.updateLigneAchat(props.ligne._id,line);
              window.location.reload() }}>

            
                 <label htmlFor="quantite_a" className="my-2">Quantité</label>
                 <input className="form-control" type="number" name="quantite_a" value={line.quantite_a} onChange={handleInputChange} ></input>
                 
               <button className="btn btn-success my-3" type="submit">Modifier</button>

            </form>
          </Box>
        </Modal> 

  </>
    )
  }
 else{
  return (
    <tr>      
<td className='text-success display-6'>Les données sont en cours de chargement... veuillez patienter !
<div className="fetching">      
<FaSpinner className="spinner"></FaSpinner>
      </div>
</td>          
</tr>
  )
} } 
 
