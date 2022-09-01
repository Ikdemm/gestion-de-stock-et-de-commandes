import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import OneDirection from "./OneDirection";
import { BiAddToQueue } from "react-icons/bi";
import AddNewDirection from "./AddNewDirection";
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
export default function ListeDirections() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabDirections, setTabDirections] = useState([]);
  useEffect(() => {
    axios.get(`/api/directions`).then((response) => {
      setTabDirections(response.data);
    });
  }, []);

  if (tabDirections.length>=0) {
    return (
      <div>
      <div className="row d-flex">
        <h6 className="col-md-9 flex-fill display-4">Liste des directions</h6>

        <div className="col-md-2">
          <button onClick={handleOpen} className="btn bg-blue m-4 p-2">
            Ajouter <BiAddToQueue></BiAddToQueue>
          </button>
        </div>
      </div>
      {
    tabDirections.length>0?  
      <div className="card col m-3 px-2">
          {tabDirections.map((p) => {
            return <OneDirection direction={p} key={p._id}></OneDirection>;
          })}
 </div>
        : <div className='text-center'><img src={require("../../../assets/images/nothing.png")} alt="nothing to display"/> </div>
      }        
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <div >
              <AddNewDirection></AddNewDirection>
            </div>
          </Box>
        </Modal>
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
