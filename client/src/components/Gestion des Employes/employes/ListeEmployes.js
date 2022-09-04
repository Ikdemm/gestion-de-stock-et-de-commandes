import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import { default as React, useContext, useEffect, useState } from "react";
import { FaIdCard, FaRegEye, FaTrash } from "react-icons/fa";
import { FcBriefcase, FcDepartment, FcHome, FcInfo, FcOvertime, FcCellPhone} from "react-icons/fc";
import { Link } from "react-router-dom";
import { employeeCtx } from "../../../store/employeeContext";
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
export default function ListeEmployes() {
  let empCtx=useContext(employeeCtx)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [tabDirections, setTabDirections] = useState([]);
  useEffect(() => {
    axios.get(`/api/directions`).then((response) => {
      setTabDirections(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/api/staff`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="d-flex align-items-center mb-4">
            <div className="col-md-10">
       
              <input
                type="text"
                className="form-control"
                placeholder="Chercher un employé..."
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className="col-2 mx-2">
              <Link to="/nouveau-employe">
                <button className="btn btn-dark">Ajouter un employé</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {searchInput.length > 1
            ? filteredResults.map((item) => {
                return (
                  <div className="row mb-1 mr-0 custom-border bg-light"  key={item._id}>
                  <div className="col-md-2 custom-border-right p-1 text-center">
                  <img src={`http://localhost:4000/getfile/${item.imageUrl}`} alt="article static" width="100px" height="100px" />
                  </div>
                  <div className="col-md-4 custom-border-right my-1">
        <div className="col">
            <div className="row">
                    <div className="col-md-1">  <FcInfo></FcInfo></div>
                    <div className="col-11"> {item.prenom} {item.nom}</div>
            </div>
          <div className="row">
                  <div className="col-md-1">  <FcBriefcase></FcBriefcase></div>
                  <div className="col-11">{item.poste}</div>
          </div>
          <div className="row">
                  <div className="col-md-1"> <FcCellPhone></FcCellPhone></div>
                  <div className="col-11"> {item.numTel}  </div>
          </div>
          <div className="row">
                  <div className="col-md-1">  <FcHome></FcHome></div>
                  <div className="col-11">{item.adresse} </div>
          </div>
      
          </div>
          </div>
          <div className="col-md-3 my-1 custom-border-right">
      <div className="row">
        <div className="col-md-2 ">
         <FcDepartment></FcDepartment>
        </div>
        <div className="col-md-10">
          <div className="row ">
          {tabDirections&&tabDirections.map((d)=>{
            if(d._id===item.direction_id)
              return d.name
          }
            
          )
            
          }
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3 my-4 px-4">
      <div className="row px-3 d-flex  justify-content-between" >
        <Button className=" btn btn-outline-dark  col-md-3 " onClick={handleOpen}>
             
             <FaRegEye />
           </Button>
{/*         <Link
             className=" btn btn-outline-success col-md-3 "
             to={"/employes/" + item._id + "/edit"}
           >
          
             <FaEdit />
           </Link> */}
        <button className=" btn btn-outline-danger col-md-3 " onClick={
          function removeC(){
            empCtx.removeOneEmployee(item._id)
          window.location.reload()
          }
        }>
           
             <FaTrash />
           </button>
      </div>
    </div>
        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        key={item._id} 
      >
        <Box sx={style}>
          <div >
            <h6>Autres Informations</h6>
          <div className="row">
                  <div className="col-md-1">  <FaIdCard></FaIdCard></div>
                  <div className="col-11">N° CIN: {item.numCIN} </div>
          </div>
          <div className="row">
                  <div className="col-md-1"> <FcOvertime></FcOvertime></div>
                  <div className="col-11">Date de naissance: {moment(item.date_de_naissance).locale('fr').format('ll')} </div>
          </div>
          <div className="row">
                  <div className="col-md-1"> <FcOvertime></FcOvertime></div>
                  <div className="col-11">Date de recrutement: {moment(item.date_de_recrutement).locale('fr').calendar()} </div>
          </div>
          </div>
        </Box>
      </Modal>
</div>
                );
              })
            : APIData.map((item) => {
                return (
                  
 /*                  <div
                    className="card mx-4 my-2 col-sm-12 col-md-4"
                    style={{ width: 18 + "rem" }}
                    key={item._id}
                  >
                    <img
                      src={`http://localhost:4000/getfile/${item.imageUrl}`}
                      className="card-img-top"
                      alt="avatar"
                      style={{ width: 250 + "px", height: 350 + "px" }}
                    />

                    <div className="card-body">
                      <div className="card-title h5">
                        {item.prenom} {item.nom}
                      </div>
                      <p className="card-text">{item.poste}</p>
                      <Link to={"/employes/" + item._id + "/details"}>
                        <button
                          type="button"
                          className="btn btn-outline-dark rounded-pill form-control"
                        >
                          {" "}
                          Voir plus d'informations
                        </button>
                      </Link>
                    </div>
                  </div> */

                  <div className="row mb-1 mr-0 custom-border bg-light"  key={item._id}>
                  <div className="col-md-2 custom-border-right p-1 text-center">
                  <img src={`http://localhost:4000/getfile/${item.imageUrl}`} alt="article static" width="100px" height="100px" />
                  </div>
                  <div className="col-md-4 custom-border-right my-1">
        <div className="col">
            <div className="row">
                    <div className="col-md-1">  <FcInfo></FcInfo></div>
                    <div className="col-11"> {item.prenom} {item.nom}</div>
            </div>
          <div className="row">
                  <div className="col-md-1">  <FcBriefcase></FcBriefcase></div>
                  <div className="col-11">{item.poste}</div>
          </div>
          <div className="row">
                  <div className="col-md-1"> <FcCellPhone></FcCellPhone></div>
                  <div className="col-11">{item.numTel}  </div>
          </div>
          <div className="row">
                  <div className="col-md-1">  <FcHome></FcHome></div>
                  <div className="col-11">{item.adresse} </div>
          </div>
          </div>
          </div>
          <div className="col-md-3 my-1 custom-border-right">
      <div className="row">
        <div className="col-md-2 ">
         <FcDepartment></FcDepartment>
        </div>
        <div className="col-md-10">
          <div className="row ">
          {tabDirections&&tabDirections.map((d)=>{
            if(d._id===item.direction_id)
              return d.name
          }
            
          )
            
          }
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3 my-4 px-4">
      <div className="row px-3 d-flex  justify-content-between" >
        <Button className=" btn btn-outline-dark  col-md-3 " onClick={handleOpen}>
             
             <FaRegEye />
           </Button>
{/*         <Link
             className=" btn btn-outline-success col-md-3 "
             to={"/employes/" + item._id + "/edit"}
           >
          
             <FaEdit />
           </Link> */}
        <button className=" btn btn-outline-danger col-md-3 " onClick={
          function removeC(){
            empCtx.removeOneEmployee(item._id)
          window.location.reload()
          }
        }>
           
             <FaTrash />
           </button>
      </div>
    </div>
    <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
   key={item._id}   >
        <Box sx={style}>
          <div >
          <h6>Autres Informations</h6>

          <div className="row">
                  <div className="col-md-1">  <FaIdCard></FaIdCard></div>
                  <div className="col-11">N° CIN: {item.numCIN} </div>
          </div>
          <div className="row">
                  <div className="col-md-1"> <FcOvertime></FcOvertime></div>
                  <div className="col-11">Date de naissance: {moment(item.date_de_naissance).locale('fr').format('ll')} </div>
          </div>
          <div className="row">
                  <div className="col-md-1"> <FcOvertime></FcOvertime></div>
                  <div className="col-11">Date de recrutement: {moment(item.date_de_recrutement).locale('fr').calendar()} </div>
          </div>
          </div>
        </Box>
      </Modal>
</div>
                );
              })}
        </div>
        
      </div>
    </>
  );
}
