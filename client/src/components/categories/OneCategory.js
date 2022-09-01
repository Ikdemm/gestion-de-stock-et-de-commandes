import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useContext, useRef } from "react";
import { AiFillDropboxCircle } from "react-icons/ai";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import { categorieCtx } from "../../store/categoryContext";

const _ = require ('lodash')

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
export default function OneCategory(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let ctx = useContext(categorieCtx);
  function removeC() {
    ctx.removeOneCategorie(props.categorie._id);

    window.location.reload();
  }
 
  const tabNotFiltred=_.map(ctx.tabCategories,"name")
  console.log(tabNotFiltred);
  const refName=useRef('')

  function submitHandler(e){
    e.preventDefault()
    let uCategory={
      name: refName.current.value,
    }  
    if(!tabNotFiltred.includes(uCategory.name)){

      ctx.updateCategorie(props.categorie._id,uCategory);
      e.target.reset()
window.location.reload()
}else
    alert('ce nom de catégorie existe déjà, veuillez entrer un nom différent')
  }
  //if (tabCommandes){
  return (
    <>
      <div className="row mb-1 mr-0 custom-border ">
        <div className="col-md-6 custom-border-right py-3  text-left">
          <div>
            <FaInfoCircle></FaInfoCircle> Libellé: {props.categorie.name}
          </div>
          <div>
            <AiFillDropboxCircle></AiFillDropboxCircle> Nombre de produits:{" "}
            {props.categorie.nb_produits}
          </div>
        </div>
        <div className="col-md-3 custom-border-right py-4 text-center">
          <button
            className=" btn btn-outline-success "
            onClick={handleOpen}

          >
            Mettre à jour  <FaEdit />
          </button>
        </div>
        <div className="col-md-3 my-4 px-4 text-center">
          <button className=" btn btn-outline-danger" onClick={removeC}>
            Supprimer <FaTrash />
          </button>
        </div>
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        >
        <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            <b>Modifier le libellé de la catégorie</b> 
            </Typography>
            <form    onSubmit={submitHandler}>

            
                 <label htmlFor="name" className="my-2">Nouveau Libellé</label>
                 <input className="form-control" type="text" name="name" defaultValue={props.categorie.name} ref={refName} ></input>
                 
               <button className="btn btn-success my-3" type="submit">Modifier</button>

            </form>
          </Box>
      </Modal>
    </>
  );
}
/* } else{
  return(
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div> 
  )
} */
