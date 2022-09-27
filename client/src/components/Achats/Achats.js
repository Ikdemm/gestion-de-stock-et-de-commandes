import axios from "../../Services/instance"; 
import React, { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import {
  FcCalculator,
  FcHighPriority,
  FcMoneyTransfer,
  FcMultipleSmartphones,
  FcPlus,
  FcSearch,
  FcViewDetails,
} from "react-icons/fc";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Achats() {
  const { t } = useTranslation();
  const [tabProduits, settabProduits] = useState([]);

  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      settabProduits(response.data);
    });
  }, []);
  var tabAlertes = tabProduits.filter(
    (p) => p.stock_final >= p.stock_max || p.stock_final <= p.stock_min
  );
  return (
    <>
      <div className="row d-flex">
        <div className="col-md-8">
          <h1 className="display-3">Achats</h1>
        </div>
        <div className="col-md-4">
          <Link to="/alertes" className="btn btn-danger mt-4">
            <CgDanger></CgDanger> Alertes
            <span className="badge">({tabAlertes.length})</span>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row card  my-2 p-4 shadow">
          <div className="d-flex align-items-center">
            <div className="col-2">
              <FcCalculator size={70}></FcCalculator>
            </div>
            <div className="col-6">
              <h3 className="display-5">Factures d'achat</h3>
            </div>

            <div className="col-2">
              <Link to="/historique-achat" className="nav-link">
                <FcViewDetails size={50}> </FcViewDetails>
                <br />
                Historique
              </Link>
            </div>
            <div className="col-2">
              <Link to="/ajout-facture-achat" className="nav-link">
                <FcPlus size={50}></FcPlus>
                <br />
                {t("buttons.new")}
              </Link>
            </div>
          </div>
        </div>

        <div className="row card  my-2 p-4 shadow">
          <div className="d-flex align-items-center">
            <div className="col-2">
              <FcHighPriority size={70}></FcHighPriority>
            </div>
            <div className="col-6">
              <h3 className="display-4"> Avoirs sur achat</h3>
            </div>
            <div className="col-2">
              <Link to="/historique-avoir-achat" className="nav-link">
                <FcViewDetails size={50}> </FcViewDetails>
                <br />
                Historique
              </Link>
            </div>
            <div className="col-2">
              <Link to="/ajout-avoir-achat" className="nav-link">
                <FcPlus size={50}></FcPlus>
                <br />
                {t("buttons.new")}
              </Link>
            </div>
          </div>
        </div>

        <div className="row card  my-2 p-4 shadow">
          <div className="d-flex align-items-center">
            <div className="col-2">
              <FcMoneyTransfer size={70}></FcMoneyTransfer>
            </div>
            <div className="col-7">
              <h3 className="display-4"> Suivi de paiement</h3>
            </div>
            <div className="col-3">
              <Link to="/echeances" className="nav-link">
                <FcSearch size={50}> </FcSearch>
                <br />
                Voir
              </Link>
            </div>
          </div>
        </div>
        <div className="row card  my-2 p-4 shadow">
          <div className="d-flex align-items-center">
            <div className="col-2">
              <FcMultipleSmartphones size={70}></FcMultipleSmartphones>
            </div>
            <div className="col-6">
              <h3 className="display-4"> Appels d'offre</h3>
            </div>
            <div className="col-2">
              <Link to="/historique-appel-doffre" className="nav-link">
                <FcViewDetails size={50}> </FcViewDetails>
                <br />
                Historique
              </Link>
            </div>
            <div className="col-2">
              <Link to="/ajout-appel-doffre" className="nav-link">
                <FcPlus size={50}></FcPlus>
                <br />
                {t("buttons.new")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
