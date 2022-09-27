import axios from "../../../Services/instance";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import ListeDemandes from "./ListeDemandes";
import NouvelleDemande from "./NouvelleDemande";

export default function HolderDemande() {
  const [tabUsers, setListeUsers] = useState([]);
  const [tabStaff, setTabStaff] = useState([]);
  useEffect(() => {
    axios.get("/api/auth/all-users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (const key in data) {
          data[key]._id = key;
          setListeUsers((prev) => {
            return [...prev, data[key]];
          });
        }
      });
  }, []);
  useEffect(() => {
    axios.get(`/api/staff`).then((response) => {
      setTabStaff(response.data);
    });
  }, []);

  if (tabStaff.length > 0 && tabUsers.length > 0) {
    return (
      <div className="col">
        <div className="row p-2">
          <div className="col-md-12 p-0">
            <h1 className="display-3">Mes demandes</h1>
            <hr />
          </div>
          <div className=" card col ml-0 my-3 ">
            <NouvelleDemande
              tabUsers={tabUsers}
              tabStaff={tabStaff}
            ></NouvelleDemande>
          </div>
          <div className=" card col ml-0 my-3 ">
            <ListeDemandes
              tabUsers={tabUsers}
              tabStaff={tabStaff}
            ></ListeDemandes>
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
