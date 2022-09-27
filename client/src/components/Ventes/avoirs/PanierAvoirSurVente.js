import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "../../../Services/instance";
import moment from "moment";
import "moment/locale/fr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ligneAvoirSurVenteCtx } from "../../../store/ligneAvoirVenteContext";
import ListeAvoirVente from "./ListeAvoirVente";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function PanierAvoirSurVente() {
  const { t } = useTranslation();

  let navigate = useNavigate();
  let ligneCtx = useContext(ligneAvoirSurVenteCtx);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabProduits, setTabProduits] = useState([]);
  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      setTabProduits(response.data);
    });
  }, []);
  /*FACTURES OK*/
  const [tabVenteFacts, setTabVenteFacts] = useState([]);
  useEffect(() => {
    axios.get(`/api/factures/vente`).then((response) => {
      setTabVenteFacts(response.data);
    });
  }, []);
  /*AVOIRS OK*/
  const [tabVenteAvoirs, setTabVenteAvoirs] = useState([]);
  useEffect(() => {
    axios.get(`/api/avoirs/vente`).then((response) => {
      setTabVenteAvoirs(response.data);
    });
  }, []);
  /*LIGNES OK*/

  const [tabLignes, setTabLignes] = useState([]);
  useEffect(() => {
    axios.get(`/api/avoirSurvente/addToInvoice`).then((response) => {
      setTabLignes(response.data);
    });
  }, []);
  var lastF = tabVenteAvoirs.at(tabVenteAvoirs.length - 1);
  console.log("lastF", lastF);
  var facture = tabVenteFacts.find((f) => f._id === lastF.facture_id);
  console.log("facture", facture);
  const refArticle = useRef("");
  const refQuantite_s = useRef("");
  function ajouterLigneVente(e) {
    e.preventDefault();
    var c = tabProduits.find((p) => p.title === refArticle.current.value);
    const newLigne = {
      quantite_s: refQuantite_s.current.value,
      avoir_id: lastF._id,
      article_id: c._id,
    };

    ligneCtx.addNewLigneAvoirSurVente(newLigne);
    e.target.reset();
    handleClose();
    window.location.reload();
  }
  function validationDeCommande() {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm(
      "Etes-vous sûr de bien vouloir valider l avoir? Après cette étape, vous ne pouvez changer que les informations générales de la commande!!!"
    );

    if (result) {
      navigate("/historique-avoir-vente");
    }
  }
  var tabLignesFiltred = tabLignes.filter((l) => l.avoir_id === lastF._id);
  if (lastF && facture && tabLignesFiltred) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div className="container">
            <h6 className="display-6">Poursuivre votre annulation ( AVOIR )</h6>
            <hr />
            <div className="row my-2 container">
              <div className="d-flex align-items-center py-3">
                <div className="col-6">
                  N° de l'avoir: {lastF.numAvoir} <br />
                  Date :{moment(lastF.dateAvoir).locale("fr").format("LL")}
                </div>
                <div className="col-6 mx-2">
                  Avoir sur facture N° : {facture.numFacture}
                </div>
              </div>
            </div>
            <hr />
            <div className="row my-2">
              <div className="d-flex align-items-center">
                <div className="col-9">
                  <h5 className="fs-4">Articles à {t("buttons.cancel")}</h5>
                </div>
                <div className="col-3 mx-2">
                  <Button
                    className="btn rounded-pill text-light"
                    onClick={handleOpen}
                    style={{ backgroundColor: "#F779B0" }}
                  >
                    {t("buttons.new")} un article
                  </Button>
                </div>
              </div>
            </div>
            <div style={{ maxHeight: 240 + "px", overflowY: "scroll" }}>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th scope="col">Produit</th>
                    <th scope="col">Prix Unitaire</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Total</th>
                    <th scope="col">Modifier</th>
                    <th scope="col">{t("buttons.delete")}</th>
                  </tr>
                </thead>
                <tbody>
                  <ListeAvoirVente
                    listeOfVentes={tabLignesFiltred}
                  ></ListeAvoirVente>
                </tbody>
              </table>
            </div>
            <hr />
            <div className="row my-2 container">
              <div className="d-flex align-items-center">
                <div className="col-6 mx-2">
                  {tabLignesFiltred.length ? (
                    <b className="fs-4">
                      Somme à rembourser: {lastF.somme_a_rembourser} DT
                    </b>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="row my-2 container">
              <div className="d-flex align-items-center">
                <div className="col-10"></div>
                <div className="col-2">
                  <button
                    type=""
                    className=" btn  fs-5 bg-blue"
                    onClick={validationDeCommande}
                  >
                    Valider l'avoir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h6"
            >
              {t("buttons.new")} un article à l'avoir
            </Typography>
            <div>
              <form onSubmit={ajouterLigneVente}>
                <label htmlFor="article_id">Produit</label>
                <select className="form-select" ref={refArticle}>
                  <option>--veuillez choisir le produit--</option>
                  {tabProduits.map((f) => {
                    return <option key={f.title}>{f.title}</option>;
                  })}
                </select>

                <label htmlFor="quantite_s">Quantité</label>
                <input
                  type="number"
                  name="quantite_s"
                  ref={refQuantite_s}
                  className="form-control"
                />

                <button type="submit" className="btn bg-blue form-control my-2">
                  Valider
                </button>
              </form>
            </div>
          </Box>
        </Modal>
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
