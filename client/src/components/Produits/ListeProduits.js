import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiAddToQueue } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProduits, selectProduit } from "../../features/product/productSlice";
import "../Form.module.css";
import OneProduct from "./OneProduct";

export default function ListeProduits() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tabProduits = useSelector(selectProduit);

  useEffect(() => {
    dispatch(getAllProduits());
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
