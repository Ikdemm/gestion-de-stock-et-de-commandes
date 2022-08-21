import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { FaEdit, FaRegEye, FaTrash } from "react-icons/fa";
import { useNavigate, useParams , Link} from "react-router-dom";
import { directionCtx } from "../../../store/directionContext";

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
    let {_id}=useParams() 
    let navigate=useNavigate()

    //modal view more details
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let ctx = useContext(directionCtx);
    function removeC() {
        ctx.removeOneDirection(props.direction._id);
    
        window.location.reload();
      }


  return (
<div>
      <li
        className="list-group-item my-1 shadow p-3"
        style={{ backgroundColor: "#F5FAFF" }}
      >
        <div className="row">
          <div className="col-8">{props.direction.name}</div>
          <Button
            className="col-1 btn btn-outline-dark mx-1"
            onClick={handleOpen}
          >
           
            <FaRegEye />
          </Button>
          <Link
            className="col-1 btn btn-outline-success mx-1"
            to={"/directions/" + props.direction._id + "/edit"}
          >
           
            <FaEdit />
          </Link> 
          <button
            className="col-1 btn btn-outline-danger mx-1"
            onClick={removeC}
          >
           
            <FaTrash />
          </button>
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
            Titre: {props.direction.name}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Nombre des employés: {props.direction.nb_employes}
           
          </Typography>
        </Box>
      </Modal>
    
    </div>
  
  );
}
