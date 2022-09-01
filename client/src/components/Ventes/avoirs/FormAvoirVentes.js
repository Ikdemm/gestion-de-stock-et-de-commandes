import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { venteAvoirCtx } from '../../../store/venteAvoirContext';
const _ = require ('lodash');

export default function FormAvoirVentes() {
  let ctx=useContext(venteAvoirCtx);
  const [tabVenteFacts, setTabVenteFacts] = useState([]);
  useEffect(() => {
    axios.get(`/api/factures/vente`).then((response) => {
      setTabVenteFacts(response.data);
    });
  }, []);
  const [tabVenteAvoirs, setTabVenteAvoirs] = useState([]);
  const tabNotFiltred=_.map(tabVenteAvoirs,"numAvoir")

  useEffect(() => {
    axios.get(`/api/avoirs/vente`).then((response) => {
      setTabVenteAvoirs(response.data);
    });
  }, []);
  let navigate=useNavigate()
  let refnumAvoir = useRef("");
  let refdateAvoir = useRef("");
  let reffacture_id = useRef(""); 
  function submitHandler(e) {
    e.preventDefault();
    const c = tabVenteFacts.find((p) => p.numFacture === reffacture_id.current.value);

    let newInvoice = {
      numAvoir: refnumAvoir.current.value,
      dateAvoir: refdateAvoir.current.value,
      facture_id: c._id,
   
    };
    if(tabNotFiltred.includes(newInvoice.numAvoir)){
      alert("Ce numéro de facture existe déjà, veuillez entrer un numéro différent")
    }
    else if(!tabNotFiltred.includes(newInvoice.numAvoir)){
      ctx.addNewVenteAvoir(newInvoice)
      setTimeout(() => {
        alert("Vous allez être rediriger dans 3secondes")
        navigate('/avoir-vente/panier')
        console.log('facture ajoutée!')
      }, 3000);
    }
  
  } 
  return (
    <>
        <div style={{display:"flex"}}>
    <div className="container" >
    <h6 className="display-6">Nouvelle facture d'avoir sur vente</h6><hr/>
    <h5 className="fs-4">Informations générales</h5>
    <form onSubmit={submitHandler}  method="post">
        <label htmlFor="numAvoir">Numéro de l'avoir</label>
        <input type="text" name="numAvoir" ref={refnumAvoir} className="form-control" />
  

        <label htmlFor="dateAvoir">Date Avoir</label>
        <input type="date"   name="dateAvoir"ref={refdateAvoir}  className="form-control"/>

        <label htmlFor="facture_id">Facture concernée</label>
        <select className="form-select" ref={reffacture_id}>
          <option>-veuillez choisir la facture--</option>
          {tabVenteFacts&&tabVenteFacts.map((f) => {
            return <option  key={f._id}>{f.numFacture}</option>;
          })}
        </select>
      

        <button type="submit"className='btn text-light form-control my-2'style={{backgroundColor:"#4125D9"}}>Confirmer les informations générales </button>
      </form>


    

      </div>
      </div>
    </>
  )
}