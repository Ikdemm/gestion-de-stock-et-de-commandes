import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import OneDemande from "./OneDemande";

export default function ListeDemandes(props) {

  const [tabDemandes, setTtabDemandes] = useState([]);
var listeUsers=props.tabUsers;
var tabStaff=props.tabStaff;

  useEffect(() => {
    axios.get(`/api/demandes`).then((response) => {
      setTtabDemandes(response.data);
    });
  }, []);

  let emailUser = localStorage.getItem("email");
  console.log("emailUser", emailUser);

  var connectedUser = listeUsers.find((u) => u.email === emailUser);

  console.log("tabUsers", listeUsers);
  console.log("connectedUser", connectedUser);
  var employee = tabStaff.find((o) => o._id === connectedUser.employe_id);
  console.log("tabStaff", tabStaff);
  console.log("employee", employee);

  var mesDemandes = tabDemandes.filter((d) => d.employe_id === employee._id);

  if (
    tabStaff.length > 0 &&
    listeUsers.length > 0 &&
    tabDemandes &&
    connectedUser &&
    employee &&
    mesDemandes
  ) {
    return (
      <div >
        <h6 className="display-6">Historique de mes demandes</h6>
        
        <ol className="list-group">
           {connectedUser.role === "employe"
            ? mesDemandes &&
              mesDemandes.map((p) => {
                if(mesDemandes.length>0){

                  return <OneDemande demande={p} key={p._id}></OneDemande>;
                }else{
                  return <div>Vous n'avez envoyé aucune demande</div>
                }
              })
            : tabDemandes &&
              tabDemandes.map((p) => {
                return <OneDemande demande={p} key={p._id}></OneDemande>;
              })} 
        </ol>
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
