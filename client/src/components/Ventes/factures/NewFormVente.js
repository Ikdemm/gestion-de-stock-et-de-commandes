import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBan, FaSave, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { venteFactCtx } from './../../../store/venteFactContext';
const _ = require ('lodash')

export default function NewFormVente() {
  let ctx=useContext(venteFactCtx);
  const [ListeClients, setListeClients] = useState([]);
  useEffect(() => {
    axios.get(`/api/clients`).then((response) => {
      setListeClients(response.data);
    });
  }, []);


  const [tabVenteFacts, setTabVenteFacts] = useState([]);
  const tabNotFiltred=_.map(tabVenteFacts,"numFacture")

  useEffect(() => {
    axios.get(`/api/factures/vente`).then((response) => {
      setTabVenteFacts(response.data);
    });
  }, []);
  let navigate=useNavigate()


  let refnumFacture = useRef("");
  let refdateFacture = useRef("");
  let refclient_id = useRef("");
  let reffrais_de_livraison = useRef("");
  let refdateEcheance = useRef("");
  let refmode_de_paiement = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    const c = ListeClients.find((p) => p.nomClient === refclient_id.current.value);
    let newInvoice = {
      numFacture: refnumFacture.current.value,
      dateFacture: refdateFacture.current.value,
      client_id: c._id,
      frais_de_livraison: reffrais_de_livraison.current.value,
      mode_de_paiement: refmode_de_paiement.current.value,
      dateEcheance: refdateEcheance.current.value,
   
    };
    if(tabNotFiltred.includes(newInvoice.numFacture)){
      alert("Ce numéro de facture existe déjà, veuillez entrer un numéro différent")
    }
    else if(!tabNotFiltred.includes(newInvoice.numFacture)){
      ctx.addNewVenteFact(newInvoice);
      setTimeout(() => {
        alert("Vous allez être diriger dans 3secondes")
        navigate('/facture-vente/panier')
        console.log('facture ajoutée!')
      }, 3000);
    }
  }
  if (ListeClients) { 
  return (
    <>
      <div style={{display:"flex"}}>
    <div className="container" >
    <h6 className="display-6">Nouvelle facture de vente</h6><hr/>
    <h5 className="fs-4">Informations générales</h5>
    <form onSubmit={submitHandler}  method="post"className="container shadow p-3 bg-light">
        <label htmlFor="numFacture">Numéro de facture</label>
        <input type="text" name="numFacture" ref={refnumFacture} className="form-control" />
        <label htmlFor="client_id">Client</label>
        <select className="form-select" ref={refclient_id}>
          <option>--veuillez choisir le client--</option>
          {ListeClients&&ListeClients.map((f) => {
            return <option  key={f._id}>{f.nomClient}</option>;
          })}
        </select>

        <label htmlFor="dateFacture">Date Facture</label>
        <input type="date"   name="dateFacture"ref={refdateFacture}  className="form-control"/>

        <label htmlFor="frais_de_livraison">Frais de livraison</label>
        <input  type="number"  name="frais_de_livraison"  ref={reffrais_de_livraison}  className="form-control"   />
        <label htmlFor="mode_de_paiement">Mode de paiement</label>
        <select name="mode_de_paiement" className="form-select" ref={refmode_de_paiement}>
          <option>--veuillez choisir le mode de paiement--</option>
           <option>Comptant</option>
           <option >à crédit</option>
           <option >autres</option>
        </select>
        <label htmlFor="dateEcheance">Date d'échéance</label>
        <input type="date"name="dateEcheance"ref={refdateEcheance} className="form-control" />
        <div className='d-flex flex-row-reverse'>
                <div className='p-2'>
             <button className="btn bg-green my-2 " type="submit">Confirmer les informations générales <FaSave></FaSave></button>    
                </div>
                <div className='p-2'>
             <Link to="/ventes" className="btn btn-danger my-2 mr-2">Annuler <FaBan></FaBan> </Link>
                </div>
                
               </div>
      </form>


    

      </div>
      </div>

    </>
  )
}
else {
  return (
    <div className="fetching">
      <FaSpinner className="spinner"></FaSpinner>
    </div>
  );
}
}

