import axios from "../../Services/instance"; 
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBan, FaSave, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { achatFactCtx } from "./../../store/achatFactContext";
const _ = require("lodash");

export default function NewAchatForm() {
  const { t } = useTranslation();

  let ctx = useContext(achatFactCtx);
  const [tabFrs, setTabFrs] = useState([]);
  useEffect(() => {
    axios.get(`/api/fournisseurs`).then((response) => {
      setTabFrs(response.data);
    });
  }, []);

  const [tabAchatFacts, setTabAchatFacts] = useState([]);
  const tabNotFiltred = _.map(tabAchatFacts, "numFacture");

  useEffect(() => {
    axios.get(`/api/factures/achat`).then((response) => {
      setTabAchatFacts(response.data);
    });
  }, []);
  let navigate = useNavigate();

  let refnumFacture = useRef("");
  let refdateFacture = useRef("");
  let reffournisseur_id = useRef("");
  let reffrais_de_livraison = useRef("");
  let refdateEcheance = useRef("");
  let refmode_de_paiement = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    const c = tabFrs.find(
      (p) => p.nom_commercial === reffournisseur_id.current.value
    );
    let newInvoice = {
      numFacture: refnumFacture.current.value,
      dateFacture: refdateFacture.current.value,
      fournisseur_id: c._id,
      frais_de_livraison: reffrais_de_livraison.current.value,
      mode_de_paiement: refmode_de_paiement.current.value,
      dateEcheance: refdateEcheance.current.value,
    };
    if (tabNotFiltred.includes(newInvoice.numFacture)) {
      alert(
        "Ce numéro de facture existe déjà, veuillez entrer un numéro différent"
      );
    } else if (!tabNotFiltred.includes(newInvoice.numFacture)) {
      ctx.addNewAchatFact(newInvoice);
      setTimeout(() => {
        alert("Vous allez être rediriger dans 3secondes, merci de patientez");
        navigate("/facture-achat/panier");
        console.log("facture ajoutée!");
      }, 3000);
    }
  }
  if (tabFrs) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div className="container">
            <h6 className="display-6">Nouvelle facture d'achat</h6>
            <hr />
            <h5 className="fs-4">Informations générales</h5>
            <form
              onSubmit={submitHandler}
              method="post"
              className="container shadow p-3 bg-light"
            >
              <label htmlFor="numFacture">Numéro de facture</label>
              <input
                type="text"
                name="numFacture"
                ref={refnumFacture}
                className="form-control"
                required
              />
              <label htmlFor="fournisseur_id">Fournisseur</label>
              <select className="form-select" ref={reffournisseur_id}>
                <option>Veuillez choisir le fournisseur</option>
                {tabFrs &&
                  tabFrs.map((f) => {
                    return <option key={f._id}>{f.nom_commercial}</option>;
                  })}
              </select>

              <label htmlFor="dateFacture">Date Facture</label>
              <input
                type="date"
                name="dateFacture"
                ref={refdateFacture}
                className="form-control"
                required
              />

              <label htmlFor="frais_de_livraison">Frais de livraison</label>
              <input
                type="number"
                name="frais_de_livraison"
                defaultValue={0}
                ref={reffrais_de_livraison}
                className="form-control"
              />
              <label htmlFor="mode_de_paiement">Mode de paiement</label>
              <select
                name="mode_de_paiement"
                className="form-select"
                ref={refmode_de_paiement}
              >
                <option>Veuillez choisir le mode de paiement</option>
                <option>Comptant</option>
                <option>à crédit</option>
                <option>autres</option>
              </select>
              <label htmlFor="dateEcheance">Date d'échéance</label>
              <input
                type="date"
                name="dateEcheance"
                ref={refdateEcheance}
                className="form-control"
                required
              />
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
