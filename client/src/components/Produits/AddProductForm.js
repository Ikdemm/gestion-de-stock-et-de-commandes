/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaBan, FaSave, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { GetCategories, selectCategorie } from "../../features/category/categorySlice";
import { createProduit, selectProduit } from "../../features/product/productSlice";

const _ = require("lodash");

export default function AddProductForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const tabCat = useSelector(selectCategorie);
  const tabProduits = useSelector(selectProduit);

  //let pctx = useContext(produitCtx);
  const tabNotFiltred = _.map(tabProduits, "title");

  useEffect(() => {
    dispatch(GetCategories());

  }, []);

  let navigate = useNavigate();
  let refT = useRef("");
  let refD = useRef("");
  let refC = useRef("");
  let refPA = useRef("");
  let refPV = useRef("");
  let refSI = useRef("");
  let refSM = useRef("");
  let refQE = useRef("");
  let refQS = useRef("");
  let refSMax = useRef("");
  let refImage = useRef("");
  let refTVA = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    const c = tabCat.find((p) => p.name === refC.current.value);
    let newProduct = {
      title: refT.current.value,
      description: refD.current.value,
      categorie_id: c._id,
      price_a: refPA.current.value,
      price_v: refPV.current.value,
      stock_initial: refSI.current.value,
      stock_min: refSM.current.value,
      stock_max: refSMax.current.value,
      quantite_entree: refQE.current.value,
      quantite_sortie: refQS.current.value,
      image: refImage.current.value,
      taxe_sur_la_valeur_ajoutee: refTVA.current.value,
    };
    if (tabNotFiltred.includes(newProduct.title)) {
      swal({
        title: "Echec",
        text: "ce nom de produit existe déjà, veuillez entrer un nom différent!",
        icon: "error",
      });
    } else {
      dispatch(createProduit(newProduct))
      //pctx.addNewProduit(newProduct);
      swal({
        title: "Opération réussie!",
        text: "Le produit est bien ajouté!",
        icon: "success",
      });
      setTimeout(() => {
        e.target.reset();
        navigate("/listProduits");
        window.location.reload();
      }, 1500);
    }
  }

  if (tabCat) {
    return (
      <div className="container">
        <div style={{ display: "flex" }}>
          <div className="container-fluid">
            <h6 className="display-6 mb-4"> {t("buttons.new")} un produit </h6>
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
                    defaultValue={20}

                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="stock_max">Stock Maximum</label>
                  <input
                    type="number"
                    name="stock_max"
                    ref={refSMax}
                    defaultValue={100}

                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="quantite_entree">Quantité entrée</label>
                  <input
                    type="number"
                    name="quantite_entree"
                    ref={refQE}
                    className="form-control"
                    defaultValue={0}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="quantite_sortie">Quantité sortie</label>
                  <input
                    type="number"
                    name="quantite_sortie"
                    ref={refQS}
                    className="form-control"
                    defaultValue={0}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
              <label htmlFor="stock_initial">Stock Initial</label>
              <input
                type="number"
                name="stock_initial"
                ref={refSI}
                className="form-control"
                defaultValue={0}
              />
</div>
<div className="col-md-6">
              <label htmlFor="stock_initial">Taux de TVA appliqué</label>
              <input
                type="number"
                name="taxe_sur_la_valeur_ajoutee"
                ref={refTVA}
                className="form-control"
                placeholder="exp taux de TVA = 7% veuillez entrer 7 "
                defaultValue={19}
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
                  <Link to="/listProduits" className="btn btn-danger my-2 mr-2">
                    {t("buttons.cancel")} <FaBan></FaBan>{" "}
                  </Link>
                </div>
              </div>
            </form>
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
