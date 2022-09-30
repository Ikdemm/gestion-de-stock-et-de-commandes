import axios from "../Services/instance";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBan, FaSave, FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { produitCtx } from "./../store/produitContext";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

export default function UpdateStock() {
  const { t } = useTranslation();

  let { _id } = useParams();
  const [tabProduits, setTaProduits] = useState([]);
  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      setTaProduits(response.data);
    });
  }, []);
  let selectedStock = tabProduits.find((p) => p._id === _id);
  console.log("selectedStock", selectedStock);
  const pdtCtx = useContext(produitCtx);
  let reSI = useRef("");
  let refE = useRef("");
  let refS = useRef("");
  let refSF = useRef("");

  let navigate = useNavigate();
  function submitHandler(e) {
    e.preventDefault();
    let uProduct = {
      stock_initial: reSI.current.value,
      quantite_entree: refE.current.value,
      quantite_sortie: refS.current.value,
      stock_final: refSF.current.value,
    };

    pdtCtx.updateProduit(_id, uProduct);
    swal({
      title: "Opération réussie!",
      text: "Le stock a été bien mis à jour!",
      icon: "success",
    });
    setTimeout(() => {
      e.target.reset();
      navigate("/stock");
      window.location.reload();
    }, 1500);
  }

  if (selectedStock) {
    return (
      <div className="container">
        <div style={{ display: "flex" }}>
          <div className="container-fluid">
            <h6 className="display-6 mb-4">Corriger le stock</h6> <hr />
            <form onSubmit={submitHandler} className="card px-5 py-3">
              <label htmlFor="stock_initial">Stock initial</label>
              <input
                className="form-control"
                type="number"
                name="stock_initial"
                defaultValue={selectedStock.stock_initial}
                ref={reSI}
              ></input>
              <label htmlFor="quantite_entree">Quantité entrée</label>
              <input
                className="form-control"
                type="number"
                name="quantite_entree"
                defaultValue={selectedStock.quantite_entree}
                ref={refE}
              ></input>
              <label htmlFor="quantite_sortie">Quantité sortie</label>
              <input
                className="form-control"
                type="number"
                name="quantite_sortie"
                defaultValue={selectedStock.quantite_sortie}
                ref={refS}
              ></input>

              <label htmlFor="stock_final">Stock Existant</label>
              <input
                className="form-control"
                type="number"
                name="stock_final"
                defaultValue={selectedStock.stock_final}
                ref={refSF}
              ></input>

              <div className="d-flex flex-row-reverse">
                <div className="p-2">
                  <button className="btn bg-green my-2 " type="submit">
                    {t("buttons.confirm")} <FaSave></FaSave>
                  </button>
                </div>
                <div className="p-2">
                  <Link to="/stock" className="btn btn-danger my-2 mr-2">
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
