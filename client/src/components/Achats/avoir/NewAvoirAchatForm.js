import axios from "../../../Services/instance";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBan, FaSave, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { achatAvoirCtx } from "../../../store/achatAVOIRContext";
const _ = require("lodash");

export default function NewAchatAvoirForm() {
  const { t } = useTranslation();

  let ctx = useContext(achatAvoirCtx);
  const [tabAchatFacts, setTabAchatFacts] = useState([]);
  useEffect(() => {
    axios.get(`/api/factures/achat`).then((response) => {
      setTabAchatFacts(response.data);
    });
  }, []);
  const [tabAchatAvoirs, setTabAchatAvoirs] = useState([]);
  const tabNotFiltred = _.map(tabAchatAvoirs, "numAvoir");

  useEffect(() => {
    axios.get(`/api/avoirs/achat`).then((response) => {
      setTabAchatAvoirs(response.data);
    });
  }, []);
  let navigate = useNavigate();

  let refnumAvoir = useRef("");
  let refdateAvoir = useRef("");
  let reffacture_id = useRef("");

  function submitHandler(e) {
    e.preventDefault();
    const c = tabAchatFacts.find(
      (p) => p.numFacture === reffacture_id.current.value
    );

    let newInvoice = {
      numAvoir: refnumAvoir.current.value,
      dateAvoir: refdateAvoir.current.value,
      facture_id: c._id,
    };
    if (tabNotFiltred.includes(newInvoice.numAvoir)) {
      alert(
        "Ce numéro de facture existe déjà, veuillez entrer un numéro différent"
      );
    } else if (!tabNotFiltred.includes(newInvoice.numAvoir)) {
      ctx.addNewAchatAvoir(newInvoice);
      //const lastF = tabFactures.at(tabFactures.length - 1)
      setTimeout(() => {
        alert("Vous allez être rediriger dans 3secondes");
        navigate("/avoir-achat/panier");
        console.log("facture ajoutée!");
      }, 3000);
    }
  }
  if (tabAchatFacts) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div className="container">
            <h6 className="display-6">Nouvelle facture d'avoir sur achat</h6>
            <hr />
            <h5 className="fs-4">Informations générales</h5>
            <form
              onSubmit={submitHandler}
              method="post"
              className="container shadow p-3 bg-light"
            >
              <label htmlFor="numAvoir">Numéro de l'avoir</label>
              <input
                type="text"
                name="numAvoir"
                ref={refnumAvoir}
                className="form-control"
                required
              />

              <label htmlFor="dateAvoir">Date Avoir</label>
              <input
                type="date"
                name="dateAvoir"
                ref={refdateAvoir}
                className="form-control"
                required
              />

              <label htmlFor="facture_id">Facture concernée</label>
              <select className="form-select" ref={reffacture_id}>
                <option>--veuillez choisir la facture--</option>
                {tabAchatFacts &&
                  tabAchatFacts.map((f) => {
                    return <option key={f._id}>{f.numFacture}</option>;
                  })}
              </select>

              <div className="d-flex flex-row-reverse">
                <div className="p-2">
                  <button className="btn bg-green my-2 " type="submit">
                    {t("buttons.confirm")} les informations générales{" "}
                    <FaSave></FaSave>
                  </button>
                </div>
                <div className="p-2">
                  <Link to="/achat" className="btn btn-danger my-2 mr-2">
                    {t("buttons.cancel")} <FaBan></FaBan>{" "}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="fetching">
        <FaSpinner className="spinner"></FaSpinner>
      </div>
    );
  }
}
