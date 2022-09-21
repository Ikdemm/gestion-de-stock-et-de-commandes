import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { employeeCtx } from "../../store/employeeContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
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
export default function DetailsUser(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  let emailUser = localStorage.getItem("email");
  var connectedUser =
    props.listOfUsers && props.listOfUsers.find((u) => u.email === emailUser);

  const [tabStaff, setTabStaff] = useState([]);
  useEffect(() => {
    axios.get(`/api/staff`).then((response) => {
      setTabStaff(response.data);
    });
  }, []);
  var employee = tabStaff.find((o) => o._id === connectedUser.employe_id);
  let navigate=useNavigate()
  let empctx = useContext(employeeCtx);

  let refCIN = useRef("");
  let refTel = useRef("");
  let refN = useRef("");
  let refPR = useRef("");
  let refA = useRef("");
function submitHandler(e) {
  e.preventDefault();
  let uEmployee = {
    nom:refN.current.value,
    prenom: refPR.current.value,
    numCIN: refCIN.current.value,
    numTel: refTel.current.value,
    adresse: refA.current.value,

  };
  empctx.updateEmployee(employee._id,uEmployee);
    e.target.reset();
    navigate("/welcome-page");
    window.location.reload();

}
const [selectedImage, setSelectedImage] = useState(null);

  if (tabStaff && connectedUser && employee) {
    return (
      <div>
        <h6 className="display-4">Bienvenue {employee.prenom}!</h6>

        <div className="row mt-4">
          <div className="col-md-4 card">
            <div className="text-center">
            {
                        employee.imageUrl.url?
                        <img
                        src={employee.imageUrl.url}
                        alt="employee avatar from cloud"
                        className="avatar-profile mt-3"

                      />
    
                                            : 

                        <img
                        src={`http://localhost:4000/getfile/${employee.imageUrl}`}
                        alt="employee avatar from server"
                        className="avatar-profile mt-3"

                      /> 
                    
              }
         
              <h3 className="card-title mt-3">
                {" "}
                {employee.prenom} {employee.nom}
              </h3>
              <h4 className="text-muted card-body"> {employee.poste}</h4>
              <div className="card-footer bg-white p-3" > 
              <Button  onClick={handleOpen}>
              Changer la photo du profile

              </Button>
              </div>
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
            <b>Modifier la photo de profile</b> 
            </Typography>
            <form onSubmit={event => {
               event.preventDefault()
               empctx.updateImageEmployee(employee._id,selectedImage);
              window.location.reload() }}>

            
                 <label htmlFor="imageUrl" className="my-2">Importer la photo</label>
                 <input className="form-control" type="file" name="imageUrl" onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }} ></input>
                 
               <button className="btn btn-success my-3" type="submit">Modifier</button>

            </form>
          </Box>
        </Modal> 
          <div className="col-md-8">
              
            <div className="card mr-3 p-3">
            <div className="card-title">
             <h4 className="display-4">Profile</h4>  
             <p className="text-muted">Vos informations peuvent être modifiées!</p> {" "}<hr />
            </div>
                  <form onSubmit={submitHandler}>
            <div className=" card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                    
                  <label htmlFor="prenom">Prénom</label>
                  <input type="text" name="prenom" defaultValue={ employee.prenom}  className="form-control"/>
                  </div>
                <div className="col-md-6">
                  <label htmlFor="nom">Nom</label>
                  <input type="text" name="nom" defaultValue={ employee.nom}  className="form-control"/>
                  </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="numTel"> N° de téléphone</label>
                  <input type="number" name="numTel" defaultValue={ employee.numTel}  className="form-control"/>
                 </div>
                <div className="col-md-6">
                  <label htmlFor="numCIN"> N° de CIN</label>
                  <input type="number" name="numCIN" defaultValue={ employee.numCIN}  className="form-control"/>
                 </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="adresse"> Adresse</label>
                  <input type="text" name="adresse" defaultValue={ employee.adresse}  className="form-control"/>
                 </div>
         
              </div>
            </div>
            <div className="card-footer bg-white ">
              <div className="row">
                
              <button className="btn bg-blue mt-3" type="submit">Enregistrer les détails</button>
              </div>
            </div>
                  </form>
          </div>
            </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fetching">
        <FaSpinner className="spinner"></FaSpinner>
      </div>
    );
  }
}
