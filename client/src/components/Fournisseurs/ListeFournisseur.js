import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiAddToQueue } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetAllFournisseurs, selectFournisseur } from "../../features/supplier/fournisseurSlice";
import "../Form.module.css";
import OneFournisseur from "./OneFournisseur";

export default function ListeFournisseur() {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const tabF = useSelector(selectFournisseur)
console.log('tabF', tabF)
useEffect(()=>{
  dispatch(GetAllFournisseurs())
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])


  if (tabF) {
    return (
      <div>
        <div className="row d-flex">
          <h6 className="col-md-9 flex-fill display-4">
          {t('page.fournisseurs.list')}          </h6>

          <div className="col-md-2">
            <Link to="/addFournisseur" className="btn bg-blue m-4 p-2">
              {t("buttons.new")} <BiAddToQueue></BiAddToQueue>
            </Link>
          </div>
        </div>
        {tabF.length > 0 ? (
          <div className="card col m-3 px-2">
            {tabF.map((f) => {
              return (
                <OneFournisseur fournisseur={f} key={f._id}></OneFournisseur>
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            <img
              src={require("../../assets/images/nothing.png")}
              alt="nothing to display"
            />{" "}
          </div>
        )}
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
