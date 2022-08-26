import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { achatFactCtx } from './../../store/achatFactContext';
import { fournisseurtCtx } from './../../store/fournisseurContext';
import { produitCtx } from './../../store/produitContext';


export default function NewAchatForm() {

  let fCtx=useContext(achatFactCtx);
  let pCtx=useContext(produitCtx);
  let FourCtx=useContext(fournisseurtCtx)
  let tabFOurnisseurs=FourCtx.tabFournisseurs
  let tabFactures=fCtx.tabAchatFacts
  let navigate=useNavigate()


  let refnumFacture = useRef("");
  let refdateFacture = useRef("");
  let reffournisseur_id = useRef("");
  let reffrais_de_livraison = useRef("");
  let refdateEcheance = useRef("");
  let refmode_de_paiement = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    const c = tabFOurnisseurs.find((p) => p.nom_commercial == reffournisseur_id.current.value);
    let newInvoice = {
      numFacture: refnumFacture.current.value,
      dateFacture: refdateFacture.current.value,
      fournisseur_id: c._id,
      frais_de_livraison: reffrais_de_livraison.current.value,
      mode_de_paiement: refmode_de_paiement.current.value,
      dateEcheance: refdateEcheance.current.value,
   
    };
    fCtx.addNewAchatFact(newInvoice);
    //const lastF = tabFactures.at(tabFactures.length - 1)
    setTimeout(() => {
      navigate('/facture-achat/panier')

      console.log('Hello, World!')
    }, 3000);
  }

  return (
    <>
    <div style={{display:"flex"}}>
    <div className="container" >
    <h6 className="display-6">Nouvelle facture d'achat</h6><hr/>
    <h5 className="fs-4">Informations générales</h5>
    <form onSubmit={submitHandler}  method="post">
        <label htmlFor="numFacture">Numéro de facture</label>
        <input type="text" name="numFacture" ref={refnumFacture} className="form-control" />
        <label htmlFor="fournisseur_id">Fournisseur</label>
        <select name="select" className="form-control">
          <option>--veuillez choisir le fournisseur--</option>
          {tabFOurnisseurs.map((f) => {
            return <option ref={reffournisseur_id} key={f._id}>{f.nom_commercial}</option>;
          })}
        </select>

        <label htmlFor="dateFacture">Date Facture</label>
        <input type="date"   name="dateFacture"ref={refdateFacture}  className="form-control"/>

        <label htmlFor="frais_de_livraison">Frais de livraison</label>
        <input  type="number"  name="frais_de_livraison"  ref={reffrais_de_livraison}  className="form-control"   />
        <label htmlFor="mode_de_paiement">Mode de paiement</label>
        <select name="mode_de_paiement" className="form-control" ref={refmode_de_paiement}>
          <option>--veuillez choisir le mode de paiement--</option>
           <option>Comptant</option>
           <option >à crédit</option>
           <option >autres</option>
        </select>
        <label htmlFor="dateEcheance">Date d'échéance</label>
        <input type="date"name="dateEcheance"ref={refdateEcheance} className="form-control" />

        <button type="submit"className='btn text-light form-control my-2'style={{backgroundColor:"#4125D9"}}>Confirmer les informations générales </button>
      </form>


    

      </div>
      </div>

    </>
  )
}
