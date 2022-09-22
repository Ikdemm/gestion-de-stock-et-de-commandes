import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBan, FaSave, FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { produitCtx } from "../../store/produitContext";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

const _ = require("lodash");

export default function UpdateProduct() {
  const { t } = useTranslation();

  let { _id } = useParams();
  const pctx = useContext(produitCtx);
  const [tabProduits, setTaProduits] = useState([]);
  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      setTaProduits(response.data);
    });
  }, []);
  let selectedProduit = tabProduits.find((p) => p._id === _id);
  console.log("selectedProduit", selectedProduit);
  const tabNotFiltred = _.map(pctx.tabProduits, "title");

  const [tabCat, setTtabCat] = useState([]);
  useEffect(() => {
    axios.get(`/api/categories`).then((response) => {
      setTtabCat(response.data);
    });
  }, []);
  let navigate = useNavigate();

  let refT = useRef("");
  let refD = useRef("");
  let refC = useRef("");
  let refPA = useRef("");
  let refPV = useRef("");
  let refSM = useRef("");
  let refSMax = useRef("");
  let refImage = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    const c = tabCat.find((p) => p.name === refC.current.value);
    let uProduct = {
      title: refT.current.value,
      description: refD.current.value,
      categorie_id: c._id,
      price_a: refPA.current.value,
      price_v: refPV.current.value,
      stock_min: refSM.current.value,
      stock_max: refSMax.current.value,
      image: refImage.current.value,
    };
    if (tabNotFiltred.includes(uProduct.title)) {
      swal({
        title: "Echec",
        text: "ce nom de produit existe déjà, veuillez entrer un nom différent!",
        icon: "error",
      });
    } else {
      pctx.updateProduit(_id, uProduct);
      swal({
        title: "Opération réussie!",
        text: "Le produit a été bien mis à jour!",
        icon: "success",
      });
      setTimeout(() => {
        e.target.reset();
        navigate("/listProduits");
        window.location.reload();
      }, 1500);
    }
  }
  if (selectedProduit) {
    return (
      <div>
        <div className="container">
          <div style={{ display: "flex" }}>
            <div className="container-fluid">
              <h6 className="display-6 mb-4">
                {" "}
                {t("buttons.update")} le produit{" "}
              </h6>
              <hr />
              <form
                onSubmit={submitHandler}
                method="post"
                className="container shadow p-4 bg-light"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="title">Nom du produit</label>
                    <input
                      type="text"
                      name="title"
                      ref={refT}
                      className="form-control"
                      defaultValue={selectedProduit.title}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="image">Image du produit</label>
                    <input
                      type="url"
                      name="image"
                      ref={refImage}
                      className="form-control"
                      placeholder="entrer un lien URL"
                      defaultValue={selectedProduit.image}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="categorie_id">Catégorie</label>
                    <select
                      name="categorie_id"
                      className="form-control"
                      ref={refC}
                    >
                      <option>--Veuillez choisir la catégorie--</option>
                      {tabCat.map((f) => {
                        return <option key={f._id}>{f.name}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      name="description"
                      ref={refD}
                      className="form-control"
                      defaultValue={selectedProduit.description}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="price_a">Prix d'achat</label>
                    <input
                      type="number"
                      step="0.001"
                      name="price_a"
                      ref={refPA}
                      className="form-control"
                      defaultValue={selectedProduit.price_a}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="price_v">Prix de vente</label>
                    <input
                      type="number"
                      step="0.001"
                      name="price_v"
                      ref={refPV}
                      className="form-control"
                      defaultValue={selectedProduit.price_v}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="stock_min">Stock Minimum</label>
                    <input
                      type="number"
                      name="stock_min"
                      ref={refSM}
                      className="form-control"
                      defaultValue={selectedProduit.stock_min}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="stock_max">Stock Maximum</label>
                    <input
                      type="number"
                      name="stock_max"
                      ref={refSMax}
                      className="form-control"
                      defaultValue={selectedProduit.stock_max}
                    />
                  </div>
                </div>

                <div className="d-flex flex-row-reverse">
                  <div className="p-2">
                    <button className="btn bg-green my-2 " type="submit">
                      {t("buttons.confirm")} <FaSave></FaSave>
                    </button>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/listProduits"
                      className="btn btn-danger my-2 mr-2"
                    >
                      {t("buttons.cancel")} <FaBan></FaBan>{" "}
                    </Link>
                  </div>
                </div>
              </form>
            </div>
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
