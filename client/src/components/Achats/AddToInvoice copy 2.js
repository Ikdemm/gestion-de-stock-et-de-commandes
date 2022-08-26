import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "moment/locale/fr";
import React, { useContext, useEffect, useRef } from "react";
import { achatFactCtx } from "./../../store/achatFactContext";
import { ligneAchatCtx } from "./../../store/ligneAchatContext";
import { produitCtx } from "./../../store/produitContext";
import OneLigneFactureAchat from "./OneLigneFactureAchat";
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

  const pCtx = useContext(produitCtx);

  const factCtx = useContext(achatFactCtx);

  const lCtx = useContext(ligneAchatCtx);
  var ListeProduits = pCtx.tabProduits;
  useEffect(()=>{
    lCtx.getAllLigneAchats()
  })
  console.log('ListeProduits', ListeProduits)
  var tabFactures = factCtx.tabAchatFacts;
  console.log('tabFactures', tabFactures)
  var lastF = tabFactures.at(tabFactures.length - 1);
  console.log("lastF", lastF);

  const refArticle = useRef("");
  const refQuantite_a = useRef("");
  function ajouterLigneAchat(e) {
    e.preventDefault();
  var c = ListeProduits.find((p) => p.title == refArticle.current.value);
    const newLigne = {
      quantite_a: refQuantite_a.current.value,
      facture_id:lastF._id,
      article_id: c._id,
    };
    lCtx.addNewLigneAchat(newLigne);
    e.target.reset();
    window.location.reload()
  } 

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="container">
          <h6 className="display-6">Poursuivre votre achat</h6>
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
                {
                    lastF.articles.map((l)=>{
                        return <OneLigneFactureAchat ligne={l} key={l._id} ></OneLigneFactureAchat>
                    })
                }   
             
            </tbody>
          </table>
          <hr />
      
 
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
          <div id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={ajouterLigneAchat}>
            
              <label htmlFor="fournisseur_id">Produit</label>
              <select className="form-control">
                <option>--veuillez choisir le produit--</option>
                {ListeProduits.map((f) => {
                  return <option ref={refArticle} key={f._id}>{f.title}</option>;
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
          </div>
        </Box>
      </Modal>
    </>
  );
}
