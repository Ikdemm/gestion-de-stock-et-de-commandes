import moment from "moment";
import "moment/locale/fr";
import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { employeeCtx } from "../../../store/employeeContext";
import { directionCtx } from "./../../../store/directionContext";
export default function OneEmploye() {
  let { _id } = useParams();
  console.log("_id", _id);
  let empCtx = useContext(employeeCtx);
  let dirCtx = useContext(directionCtx);
  var tabEmployes = empCtx.tabEmployees;
  var tabDirections = dirCtx.tabDirections;
  console.log("tabEmployes", tabEmployes);
  /*     useEffect(()=>{
  empCtx.getAllEmployees()
  dirCtx.getAllDirections()
},[])   */
  var selectedEmployee = empCtx.getEmployeeById(_id);
  console.log("selectedEmployee", selectedEmployee);
  var dir = tabDirections.find(
    (d) => d._id === selectedEmployee.direction.direction_id
  );
  console.log("dir", dir);
  function removeC() {
    if (
      window.confirm("Etes-vous sur de bien vouloir supprimer cet employé ? ")
    ) {
      empCtx.removeOneEmployee(selectedEmployee._id);

      window.location.reload();
    }
  }
  return (
    <>
      <h6 className="display-6">Informations sur l'employé</h6>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img
              src={`http://localhost:4000/getfile/${selectedEmployee.imageUrl}`}
              alt="avatar"
              className="img-responsive rounded-circle mt-5 "
              style={{ height: 60 + "vh", width: 45 + "vh" }}
            />
            <button className="btn btn-warning">Changer la photo</button>
          </div>
          <div className="col-6" style={{ marginTop: 25 + "vh" }}>
            <div className="pt-2">
              <b>N° de CIN: </b> {selectedEmployee.numCIN}
            </div>
            <div className="pt-2">
              {" "}
              <b>Nom complet: </b>
              {selectedEmployee.prenom} {selectedEmployee.nom}
            </div>
            <div className="pt-2">
              {" "}
              <b>Poste: </b>
              {selectedEmployee.poste}
            </div>
            <div className="pt-2">
              {" "}
              <b>Direction rattachée: </b>
              {dir.name}
            </div>
            <div className="pt-2">
              {" "}
              <b>Adresse: </b>
              {selectedEmployee.adresse}
            </div>
            <div className="pt-2">
              {" "}
              <b>Date de naissance: </b>
              {moment(selectedEmployee.date_de_naissance)
                .locale("fr")
                .format("LL")}
            </div>
            <div className="pt-2">
              {" "}
              <b>Date de recrutement: </b>
              {moment(selectedEmployee.date_de_recrutement)
                .locale("fr")
                .format("LL")}
            </div>
            <div className="pt-3">
              <Link to={"/employes/" + selectedEmployee._id + "/edit"}>
                <button className="btn " style={{ backgroundColor: "#09ff00" }}>
                  Modifier <FaEdit />
                </button>
              </Link>
              <button
                className="btn mx-2 text-light"
                onClick={removeC}
                style={{ backgroundColor: "#4125D9" }}
              >
                {t("buttons.delete")} <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
