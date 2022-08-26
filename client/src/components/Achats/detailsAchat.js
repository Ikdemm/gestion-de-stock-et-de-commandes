import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { achatFactCtx } from './../../store/achatFactContext';
import { ligneAchatCtx } from './../../store/ligneAchatContext';
import { fournisseurtCtx } from './../../store/fournisseurContext';

export default function detailsAchat() {
    let {_id}=useParams()
    console.log("_id",_id);
    let factCtx=useContext(achatFactCtx)
    let ligneCtx=useContext(ligneAchatCtx)
  var tabFactures=factCtx.tabAchatFacts
  var tabLignes=ligneCtx.tabLigneAchats
  var selectedInvoice=factCtx.getAchatFactById(_id)
  const ctx = useContext(fournisseurtCtx);
  const tabF = ctx.tabFournisseurs;
const fournisseurID = selectedInvoice.fournisseur_id;
 const fournisseur = tabF.find((f) => f._id == fournisseurID);

  return (
    <div style={{ display: "flex" }}>
        <div className="container">
          <h6 className="display-6">Poursuivre votre achat</h6>
          <hr />
          <div className="row my-2 container">
            <div className="d-flex align-items-center">
              <div className="col-6">
                N° de facture:   {selectedInvoice.numFacture}  <br />
                Date facture:
                {moment(lastF.dateFacture).locale("fr").format("LL")} 
              </div>
              <div className="col-6 mx-2">
                Nom du Fournisseur:  {fournisseur.nom_commercial}  
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
               {
                    selectedInvoice.articles.map((l)=>{
                        return <OneLigneFactureAchat ligne={l}></OneLigneFactureAchat>
                    })
                }  
          
            </tbody>
          </table>
          <hr />
          <div className="row my-2 container">
            <div className="d-flex align-items-center">
              <div className="col-5"></div>
              <div className="col-6 mx-2">
                Frais de livraison: {selectedInvoice.frais_de_livraison}  dt
                <br></br>
                <b>Net à payer:   {selectedInvoice.net_a_payer}   DT</b>
              </div>
            </div>
          </div>
          <div className="row my-2 container">
            <div className="d-flex align-items-center">
              <div className="col-6">
                Mode de paiement:  {selectedInvoice.mode_de_paiement} <br />
                Date d'échéance:
               {moment(selectedInvoice.dateEcheance)
                  .locale("fr")
                  .format("LL")} 
              </div>
              <div className="col-6 mx-2"></div>
            </div>
          </div>
        </div>
      </div>
  )
}
