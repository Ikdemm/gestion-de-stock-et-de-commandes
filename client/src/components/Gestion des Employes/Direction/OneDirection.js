import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useContext, useRef } from "react";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { directionCtx } from "../../../store/directionContext";
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
export default function OneDirection(props) {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let ctx = useContext(directionCtx);
    const tabNotFiltred=_.map(ctx.tabDirections,"name")

    function removeC() {
      if (window.confirm('Etes-vous sur de bien vouloir supprimer cette direction ? Sachant que tous les employés y inclus seront supprimés ainsi')) {
 
        ctx.removeOneDirection(props.direction._id);
    
        window.location.reload();
      }
      }
    const refName=useRef('')

      function submitHandler(e){
        e.preventDefault()
        let uDirection={
          name: refName.current.value,
        }  
        if(!tabNotFiltred.includes(uDirection.name)){
    
          ctx.updateDirection(props.direction._id,uDirection);
          e.target.reset()
         window.location.reload()
    }else
        alert('ce nom de direction existe déjà, veuillez entrer un nom différent')
      }

  return (
<div>
<div className="row mb-1 mr-0 custom-border ">
<div className="col-md-2 custom-border-right p-1 text-center">
          <img src={require("../../../assets/images/direction.jpg")} alt="direction static" width="100px" height="100px" />
        </div>
        <div className="col-md-4 custom-border-right py-3  text-left">
          <div>
            <FaInfoCircle></FaInfoCircle> Libellé: {props.direction.name}
          </div>
          <div>
            <IoPeopleCircleSharp></IoPeopleCircleSharp> Nombre des employés:{" "}
            {props.direction.nb_employes}
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
            <b>Modifier le libellé de la direction</b> 
            </Typography>
            <form    onSubmit={submitHandler}>

            
                 <label htmlFor="name" className="my-2">Nouveau Libellé</label>
                 <input className="form-control" type="text" name="name" defaultValue={props.direction.name} ref={refName} ></input>
                 
               <button className="btn btn-success my-3" type="submit">Modifier</button>

            </form>
          </Box>
      </Modal>
    
    </div>
  
  );
}
