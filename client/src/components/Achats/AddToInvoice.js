import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "../../Services/instance"; 
import moment from "moment";
import "moment/locale/fr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ligneAchatCtx } from "../../store/ligneAchatContext";
import ListeAchats from "./ListeAchats";

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
export default function AddToInvoice() {
  const { t } = useTranslation();

  let navigate = useNavigate();
  let ligneCtx = useContext(ligneAchatCtx);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /*PRODUITS OK*/

  const [tabProduits, setTabProduits] = useState([]);
  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      setTabProduits(response.data);
    });
  }, []);

  /*FACTURES OK*/
  const [tabAchatFacts, setTabAchatFacts] = useState([]);
  useEffect(() => {
    axios.get(`/api/factures/achat`).then((response) => {
      setTabAchatFacts(response.data);
    });
  }, []);

  /*LIGNES OK*/

  const [tabLignes, setTabLignes] = useState([]);
  useEffect(() => {
    axios.get(`/api/achat/addToInvoice`).then((response) => {
      setTabLignes(response.data);
    });
  }, []);
  const [tabFrs, setTabFrs] = useState([]);
  useEffect(() => {
    axios.get(`/api/fournisseurs`).then((response) => {
      setTabFrs(response.data);
    });
  }, []);
  var lastF = tabAchatFacts.at(tabAchatFacts.length - 1);
  console.log("lastF", lastF);
  var fournisseur = tabFrs.find((f) => f._id === lastF.fournisseur_id);
  console.log("fournisseur", fournisseur);
  const refArticle = useRef("");
  const refQuantite_a = useRef("");

  function ajouterLigneAchat(e) {
    e.preventDefault();
    var c = tabProduits.find((p) => p.title === refArticle.current.value);
    const newLigne = {
      quantite_a: refQuantite_a.current.value,
      facture_id: lastF._id,
      article_id: c._id,
    };
    ligneCtx.addNewLigneAchat(newLigne);
    e.target.reset();
    handleClose();
    window.location.reload();
  }

  function validationDeCommande() {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm(
      "Etes-vous sûr de bien vouloir valider la commande? Après cette étape, vous ne pouvez changer rien changer dans cette commande, en cas d erreur vous pouvez générer une facture d avoir!!!"
    );

    if (result) {
      navigate("/historique-achat");
    }
  }
  var tabLignesFiltred = tabLignes.filter((l) => l.facture_id === lastF._id);

  if (lastF && fournisseur && tabLignesFiltred) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div className="container">
            <h6 className="display-6">Poursuivre votre achat</h6>
            <hr />
            <div className="row my-2 container">
              <div className="d-flex align-items-center py-3">
                <div className="col-6">
                  N° de facture: {lastF.numFacture} <br />
                  Date facture:
                  {moment(lastF.dateFacture).locale("fr").format("LL")}
                </div>
                <div className="col-6 mx-2">
                  Nom du Fournisseur: {fournisseur.nom_commercial}
                </div>
              </div>
            </div>
            <hr />
            <div className="row my-2">
              <div className="d-flex align-items-center">
                <div className="col-9">
                  <h5 className="fs-4">Articles commandés</h5>
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
                  {/*      {
                   tabLignesFiltred && tabLignesFiltred.map((l)=>{
                        return <OneLigneFactureAchat ligne={l}></OneLigneFactureAchat>
                    })
                }   */}
                  <ListeAchats listeOfAchats={tabLignesFiltred}></ListeAchats>
                </tbody>
              </table>
            </div>
            <hr />
            <div className="row my-2 container">
              <div className="d-flex align-items-center">
                <div className="col-5"></div>
                <div className="col-6 mx-2">
                  Frais de livraison: {lastF.frais_de_livraison} dt
                  <br></br>
                  {tabLignesFiltred.length ? (
                    <b className="fs-4">Net à payer: {lastF.net_a_payer} DT</b>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row my-2 container">
              <div className="d-flex align-items-center">
                <div className="col-9">
                  Mode de paiement: {lastF.mode_de_paiement} <br />
                  Date d'échéance:
                  {moment(lastF.dateEcheance).locale("fr").format("LL")}
                </div>
                <div className="col-4 mx-2">
                  <button
                    type=""
                    className="col-6 m-5 btn  fs-5 bg-blue"
                    onClick={validationDeCommande}
                  >
                    Valider la commande
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
              {t("buttons.new")} un article à la facture
            </Typography>
            <div>
              <form onSubmit={ajouterLigneAchat}>
                <label htmlFor="article_id">Produit</label>
                <select className="form-select" ref={refArticle}>
                  <option>--veuillez choisir le produit--</option>
                  {tabProduits.map((f) => {
                    return <option key={f.title}>{f.title}</option>;
                  })}
                </select>

                <label htmlFor="quantite_a">Quantité</label>
                <input
                  type="number"
                  name="quantite_a"
                  ref={refQuantite_a}
                  className="form-control"
                />

                <button
                  type="submit"
                  className="btn text-light form-control my-2"
                  style={{ backgroundColor: "#4125D9" }}
                >
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
