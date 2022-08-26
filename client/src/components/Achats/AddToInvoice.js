import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import moment from "moment";
import "moment/locale/fr";
import React, { useContext, useEffect, useRef,useState } from "react";
import { achatFactCtx } from "./../../store/achatFactContext";
import { fournisseurtCtx } from "./../../store/fournisseurContext";
import { ligneAchatCtx } from "./../../store/ligneAchatContext";
import { produitCtx } from "./../../store/produitContext";
import OneLigneFactureAchat from "./OneLigneFactureAchat";
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /*PRODUITS OK*/
  const [tabProduits, setTabProduits] = useState([]);
useEffect(()=>
fetch("/api/produits", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => {


    return res.json();
  })
  .then((data) => setTabProduits(data)),[]
)
const [tabFrs, setTabFrs] = useState([]);

useEffect(()=>
fetch("/api/fournisseurs", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => {


    return res.json();
  })
  .then((data) => setTabFrs(data)),[]
)
useEffect(()=>
fetch("/api/fournisseurs", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => {


    return res.json();
  })
  .then((data) => setTabFrs(data)),[]
)
const [tabAchatFacts, setTabAchatFacts] = useState([]);

useEffect(()=>

 fetch("/api/factures/achat", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => {


    return res.json();
  })
  .then((data) => setTabAchatFacts(data)),[]
)


    //console.log('tabProduits', tabProduits)

/* const pCtx = useContext(produitCtx);
  var ListeProduits = pCtx.tabProduits;
  useEffect(()=>{
    pCtx.getAllProduits()
  },[]) */
  //console.log('ListeProduits', ListeProduits)

  /*FOURNISSEURS OK*/
  /* const ctx = useContext(fournisseurtCtx);
  const tabF = ctx.tabFournisseurs; */
  //console.log('tabFournisseurs', tabF)
  

  /*FACTURES */
/*   const factCtx = useContext(achatFactCtx);
useEffect(()=>{
factCtx.getAllAchatFacts()

},[]
  ) */

  //var lastF = tabAchatFacts.at(tabAchatFacts.length - 1);
  //var tabFactures = factCtx.tabAchatFacts;
  //console.log('tabAchatFacts', tabFactures)

  var lastF = tabAchatFacts.at(tabAchatFacts.length - 1);
  console.log("lastF", lastF);
  //const fournisseurID = lastF.fournisseur_id;
 // console.log('fournisseurID', fournisseurID)
  //const fournisseur = tabF.find((f) => f._id == fournisseurID);
  //console.log('fournisseur', fournisseur)
  

/* 
   
  const lCtx = useContext(ligneAchatCtx);
  let tabLignes=lCtx.tabLigneAchats;
  var lignesDeFacture=tabLignes.filter((l)=>l.facture_id==lastF._id)
  //console.log('lignesDeFacture', lignesDeFacture)

 */

  const refArticle = useRef("");
  const refQuantite_a = useRef("");

  function ajouterLigneAchat(e) {
    e.preventDefault();
  var c = tabProduits.find((p) => p.title == refArticle.current.value);
    const newLigne = {
      quantite_a: refQuantite_a.current.value,
      facture_id:lastF._id,
      article_id: c._id,
    };
   // lCtx.addNewLigneAchat(newLigne);
    e.target.reset();
    handleClose()
  } 
 
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="container">
          <h6 className="display-6">Poursuivre votre achat</h6>
          <hr />
          <div className="row my-2 container">
            <div className="d-flex align-items-center">
              <div className="col-6">
                N° de facture:  {/*   {lastF.numFacture} */}    <br />
                Date facture:
            {/*     {moment(lastF.dateFacture).locale("fr").format("LL")}   */} 
              </div>
              <div className="col-6 mx-2">
                Nom du Fournisseur: {/*  {fournisseur.nom_commercial}   */}
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
                  Ajouter un article
                </Button>
              </div>
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Produit</th>
                <th scope="col">Prix Unitaire</th>
                <th scope="col">Quantité</th>
                <th scope="col">Total</th>
                <th scope="col">Modifier</th>
                <th scope="col">Supprimer</th>
              </tr>
            </thead>
            <tbody>
         {/*       {
                   lignesDeFacture && lignesDeFacture.map((l)=>{
                        return <OneLigneFactureAchat ligne={l}></OneLigneFactureAchat>
                    })
                }   
           */}
            </tbody>
          </table>
          <hr />
          <div className="row my-2 container">
            <div className="d-flex align-items-center">
              <div className="col-5"></div>
              <div className="col-6 mx-2">
                Frais de livraison:{/*  {lastF.frais_de_livraison} */}  dt
                <br></br>
                <b>Net à payer: {/*  {lastF.net_a_payer} */}  DT</b>
              </div>
            </div>
          </div>
          <div className="row my-2 container">
            <div className="d-flex align-items-center">
              <div className="col-6">
                Mode de paiement: {/*  {lastF.mode_de_paiement} */} <br />
                Date d'échéance:
            {/*    {moment(lastF.dateEcheance)
                  .locale("fr")
                  .format("LL")}  */}
              </div>
              <div className="col-6 mx-2"></div>
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
          <Typography id="keep-mounted-modal-title" variant="h6" component="h6">
            Ajouter un article à la facture
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={ajouterLigneAchat}>
            
              <label htmlFor="fournisseur_id">Produit</label>
              <select className="form-control">
                <option>--veuillez choisir le produit--</option>
                {tabProduits.map((f) => {
                  return <option ref={refArticle}>{f.title}</option>;
                })} 
              </select>

              <label htmlFor="article_id">Quantité</label>
              <input
                type="number"
                name="article_id"
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
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
