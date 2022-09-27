import axios from "../../Services/instance";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiAddToQueue } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Form.module.css";
import OneProduct from "./OneProduct";

export default function ListeProduits() {
  const { t } = useTranslation();

  const [tabProduits, settabProduits] = useState([]);

  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      settabProduits(response.data);
    });
  }, []);

  if (tabProduits) {
    return (
      <div>
        <div className="row d-flex">
          <h6 className="col-md-9 flex-fill display-4">Liste des Produits</h6>

          <div className="col-md-2">
            <Link to="/addProduit" className="btn bg-blue m-4 p-2">
              {t("buttons.new")} <BiAddToQueue></BiAddToQueue>
            </Link>
          </div>
        </div>
        {tabProduits.length > 0 ? (
          <div className="card col m-3 px-2">
            {tabProduits.map((p) => {
              return <OneProduct produit={p} key={p._id}></OneProduct>;
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
