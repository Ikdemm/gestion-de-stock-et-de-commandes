import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { FcHome, FcInfo, FcPhoneAndroid, FcSms } from "react-icons/fc";
import { fournisseurtCtx } from "./../../store/fournisseurContext";

export default function OneFournisseur(props) {
  let ctx = useContext(fournisseurtCtx);
  function removeC() {
    if (window.confirm('Etes-vous sur de bien vouloir supprimer ce fournisseur ? ')) {
  
    ctx.removeOneFournisseur(props.fournisseur._id);
    window.location.reload();
  }
  }
  return (
    <>
      <div className="row mb-1 mr-0 custom-border ">
        <div className="col-md-2 custom-border-right p-1 text-center">
          <img
            src={require("../../assets/images/company.jpg")}
            alt="company static"
            width="100px"
            height="100px"
          />
        </div>
        <div className="col-md-7 custom-border-right">
          <div className="col my-1">
            <div className="row">
              <div className="col-md-1">
                {" "}
                <FcInfo></FcInfo>
              </div>
              <div className="col-11">{props.fournisseur.nom_commercial}</div>
            </div>
            <div className="row">
              <div className="col-md-1">
                {" "}
                <FcPhoneAndroid></FcPhoneAndroid>
              </div>
              <div className="col-11">{props.fournisseur.numero_de_tel}</div>
            </div>
            <div className="row">
              <div className="col-md-1">
                {" "}
                <FcSms></FcSms>
              </div>
              <div className="col-11">{props.fournisseur.email}</div>
            </div>
            <div className="row">
              <div className="col-md-1">
                {" "}
                <FcHome></FcHome>
              </div>
              <div className="col-11">{props.fournisseur.adresse}</div>
            </div>
          </div>
        </div>

        <div className="col-md-3 my-4 px-4">
          <div className="row px-3 d-flex  justify-content-between">
            <Link
              className=" btn btn-outline-success col-md-5"
              to={"/fournisseurs/" + props.fournisseur._id + "/edit"}
            >
              {" "}
              <FaEdit />
            </Link>
            <button
              className=" btn btn-outline-danger col-md-5 "
              onClick={removeC}
            >
              {" "}
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
