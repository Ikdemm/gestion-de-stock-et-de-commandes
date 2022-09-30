import axios from "../../Services/instance";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiAddToQueue } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UsersList(props) {
  const { t } = useTranslation();

  const [tabStaff, setTabStaff] = useState([]);
  useEffect(() => {
    axios.get(`/api/staff`).then((response) => {
      setTabStaff(response.data);
    });
  }, []);

  if (tabStaff) {
    return (
      <div>
        <div className="row d-flex">
          <h6 className="col-md-9 flex-fill display-4">
            Liste des Utilisateurs
          </h6>

          <div className="col-md-2">
            <Link to="/register-form" className="btn bg-blue m-4 p-2">
              {t("buttons.new")} <BiAddToQueue></BiAddToQueue>
            </Link>
          </div>
        </div>
        <table className="table bg-white p-2">
          <thead>
            <tr>
              <th scope="col">Employé</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {props.listOfUsers.map((u) => {
              var employee = tabStaff.find((o) => o._id === u.employe_id);
              return (
                <tr key={u._id}>
                  <td>
                    {employee.imageUrl.url ? (
                      <img
                        src={employee.imageUrl.url}
                        alt="employee avatar from cloud"
                        className="avatar"
                      />
                    ) : (
                      <img
                        src={`http://localhost:4000/getfile/${employee.imageUrl}`}
                        alt="employee avatar from server"
                        className="avatar"
                      />
                    )}
                    {employee.prenom} {employee.nom}
                  </td>
                  <td className="py-2">{u.email} </td>
                  <td className="py-2"> {u.role} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
