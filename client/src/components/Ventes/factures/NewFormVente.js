import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { venteFactCtx } from './../../../store/venteFactContext';
import { clientCtx } from './../../../store/clientContext';
import { produitCtx } from './../../../store/produitContext';

export default function NewFormVente() {
  let fCtx=useContext(venteFactCtx);
  let pCtx=useContext(produitCtx);
  let CltCtx=useContext(clientCtx)
  let ListeClients=CltCtx.tabClients
  let tabFactures=fCtx.tabVenteFacts
  let navigate=useNavigate()


  let refnumFacture = useRef("");
  let refdateFacture = useRef("");
  let refclient_id = useRef("");
  let reffrais_de_livraison = useRef("");
  let refdateEcheance = useRef("");
  let refmode_de_paiement = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    const c = ListeClients.find((p) => p.nomClient == refclient_id.current.value);
    let newInvoice = {
      numFacture: refnumFacture.current.value,
      dateFacture: refdateFacture.current.value,
      client_id: c._id,
      frais_de_livraison: reffrais_de_livraison.current.value,
      mode_de_paiement: refmode_de_paiement.current.value,
      dateEcheance: refdateEcheance.current.value,
   
    };
    fCtx.addNewVenteFact(newInvoice);
    // lastF = tabFactures.at(tabFactures.length - 1)
    setTimeout(() => {
     // navigate('/facture-vente/panier')

      console.log('new invoice added!')
    }, 3000);
  }
  return (
    <>
    <div style={{display:"flex"}}>
    <div className="container" >
    <h6 className="display-6">Nouvelle facture de vente</h6><hr/>
    <h5 className="fs-4">Informations générales</h5>
    <form onSubmit={submitHandler}  method="post">
        <label htmlFor="numFacture">Numéro de facture</label>
        <input type="text" name="numFacture" ref={refnumFacture} className="form-control" />
        <label htmlFor="client_id">Client</label>
        <select name="select" className="form-control">
          <option>--veuillez choisir le client--</option>
          {ListeClients.map((f) => {
            return <option ref={refclient_id} key={f._id}>{f.nomClient}</option>;
          })}
        </select>

        <label htmlFor="dateFacture">Date Facture</label>
        <input type="date"   name="dateFacture"ref={refdateFacture}  className="form-control"/>

        <label htmlFor="frais_de_livraison">Frais de livraison</label>
        <input  type="number"  name="frais_de_livraison"  ref={reffrais_de_livraison}  className="form-control"   />
        <label htmlFor="mode_de_paiement">Mode de paiement</label>
        <select name="mode_de_paiement" className="form-control"  ref={refmode_de_paiement}>
          <option>--veuillez choisir le mode de paiement--</option>
           <option>Comptant</option>
           <option>à crédit</option>
           <option>autres</option>
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
