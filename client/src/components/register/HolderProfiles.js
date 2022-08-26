import { default as React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RegisterForm from './RegisterForm';
export default function HolderProfiles() {
  return (
    <div className="container">
      <div className="row  pt-3">
        <div className="d-flex align-items-center mb-4">
          <div className="col-8">
            <h1 className="display-4">Gestion des utilisateurs </h1>
          </div>
          <div className="col-4 mx-2">
            <Link to="/all-users">
              <button className="btn btn-dark p-3">Liste des utilisateurs</button>
            </Link>
          </div>
        </div>
      </div><hr/>
      <RegisterForm></RegisterForm>
    </div>
  );
}
