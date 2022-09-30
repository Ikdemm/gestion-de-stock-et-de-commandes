import axios from "../../../Services/instance";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FcApproval, FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";
export default function HolderGestionDemandes() {
  const [tabDemandes, setTtabDemandes] = useState([]);

  useEffect(() => {
    axios.get(`/api/demandes`).then((response) => {
      setTtabDemandes(response.data);
    });
  }, []);

  var tabFiltredNonTraitee = tabDemandes.filter(
    (d) => d.etat === "non_traitee"
  );
  var tabFiltredTraitee = tabDemandes.filter((d) => d.etat === "traitee");
  if (tabDemandes && tabFiltredNonTraitee && tabFiltredTraitee) {
    return (
      <div>
        <h1 className="display-1">Gestion des demandes</h1>
        <hr />
        <div className="container">
          <Link to="/non-traitees" className="nav-link">
            <div className="row card  my-5 p-4 shadow">
              <div className="d-flex align-items-center">
                <div className="col-2">
                  <FcCancel size={70}></FcCancel>
                </div>
                <div className="col-8">
                  <h3 className="display-4"> Demandes non traitées</h3>
                </div>
                <div className="col-2">
                  <span>
                    <b>[{tabFiltredNonTraitee.length}]</b>{" "}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/traitees" className="nav-link">
            <div className="row card  my-5 p-4 shadow">
              <div className="d-flex align-items-center">
                <div className="col-2">
                  <FcApproval size={70}></FcApproval>
                </div>
                <div className="col-8">
                  <h3 className="display-4">Demandes traitées</h3>
                </div>

                <div className="col-2">
                  <span>
                    <b>[{tabFiltredTraitee.length}]</b>{" "}
                  </span>
                </div>
              </div>
            </div>
          </Link>
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
