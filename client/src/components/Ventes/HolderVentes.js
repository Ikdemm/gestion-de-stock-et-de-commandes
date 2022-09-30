import React from "react";
import { useTranslation } from "react-i18next";
import {
  FcCalculator,
  FcCalendar,
  FcHighPriority,
  FcPlus,
  FcSearch,
  FcViewDetails,
} from "react-icons/fc";
import { Link } from "react-router-dom";
export default function HolderVentes() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="display-3">Vente</h1> <hr />
      <div className="container">
        <div className="row card  my-4 p-4 shadow">
          <div className="d-flex align-items-center">
            <div className="col-2">
              <FcCalculator size={70}></FcCalculator>
            </div>
            <div className="col-6">
              <h3 className="display-5">Factures de vente</h3>
            </div>

            <div className="col-2">
              <Link to="/historique-ventes" className="nav-link">
                <FcViewDetails size={50}> </FcViewDetails>
                <br />
                Historique
              </Link>
            </div>
            <div className="col-2">
              <Link to="/ajout-facture-vente" className="nav-link">
                <FcPlus size={50}></FcPlus>
                <br />
                {t("buttons.new")}
              </Link>
            </div>
          </div>
        </div>

        <div className="row card  my-4 p-4 shadow">
          <div className="d-flex align-items-center">
            <div className="col-2">
              <FcHighPriority size={70}></FcHighPriority>
            </div>
            <div className="col-6">
              <h3 className="display-4"> Avoirs sur vente</h3>
            </div>
            <div className="col-2">
              <Link to="/historique-avoir-vente" className="nav-link">
                <FcViewDetails size={50}> </FcViewDetails>
                <br />
                Historique
              </Link>
            </div>
            <div className="col-2">
              <Link to="/ajout-avoir-vente" className="nav-link">
                <FcPlus size={50}></FcPlus>
                <br />
                {t("buttons.new")}
              </Link>
            </div>
          </div>
        </div>

        <div className="row card  my-4 p-4 shadow">
          <div className="d-flex align-items-center">
            <div className="col-2">
              <FcCalendar size={70}></FcCalendar>
            </div>
            <div className="col-7">
              <h3 className="display-4">Suivi de paiement</h3>
            </div>
            <div className="col-3">
              <Link to="/echeances-vente" className="nav-link">
                <FcSearch size={50}> </FcSearch>
                <br />
                Voir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
