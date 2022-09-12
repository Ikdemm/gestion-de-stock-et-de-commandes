import axios from 'axios';
import moment from "moment";
import "moment/locale/fr";
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
export default function DetaisVente() {
  var {_id}=useParams()
  const [tabFact, setTtabFact] = useState([]);
  useEffect(() => {
    axios.get(`/api/factures/vente`).then((response) => {
      setTtabFact(response.data);
    });
  }, []);
  let selectedFacture=tabFact.find((f)=>f._id===_id)
  console.log('selectedFacture', selectedFacture)
    const [tabLignes, setTabLignes] = useState([]);
    useEffect(() => {
      axios.get(`/api/vente/addToInvoice`).then((response) => {
        setTabLignes(response.data);
      });
    }, []);
    var tabLignesFiltred=tabLignes.filter((l)=>l.facture_id===selectedFacture._id)
    const [tabClts, setTabClts] = useState([]);
    useEffect(() => {
      axios.get(`/api/clients`).then((response) => {
        setTabClts(response.data);
      });
    }, []);  
    var client= tabClts.find((f)=>f._id===selectedFacture.client_id);
    const [tabProduits, setTabProduits] = useState([]);
    useEffect(() => {
      axios.get(`/api/produits`).then((response) => {
        setTabProduits(response.data);
      });
    }, []);
    if(selectedFacture && client &&tabLignesFiltred && tabProduits){
    
      return (
        <div style={{ display: "flex" }}>
        <div className="container" id="here">
        
          <div className="row my-2 container">
            <div className="d-flex align-items-center py-3">
              <div className="col-6">
                N° de facture:    {selectedFacture.numFacture}    <br />
                Date facture:
               {moment(selectedFacture.dateFacture).locale("fr").format("LL")}   
              </div>
              <div className="col-6 mx-2">
                Nom du Client:  {client.nomClient}   
              </div>
            </div>
          </div>
          <hr />
          <div className="row my-2">
              <div className="col-9">
                <h5 className="fs-4">Articles commandés</h5>
              </div>
      
            </div>
         
          
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">Produit</th>
                <th scope="col">Prix Unitaire</th>
                <th scope="col">Quantité</th>
                <th scope="col">Total</th>
             
              </tr>
            </thead>
            <tbody >
           {
                   tabLignesFiltred && tabLignesFiltred.map((l)=>{
                    let articleId=l.article.article_id;
                    let a=tabProduits.find((p)=>p._id===articleId);
                    console.log('first', a)
                    if(a){
    
                      return (  <tr>
    
                      <td>{a.title}</td>
                      <td>{a.price_v}</td>
                      <td>{l.quantite_s} </td>
                      <td >{l.total}</td>
                      </tr>
              )
                    }else{
                      return <h2>Chargement en cours...</h2>
                    }
                    })
                }   
        
            </tbody>
          </table>
         
          <hr />
          <div className="row my-2 container">
            <div className="d-flex align-items-center">
              <div className="col-5"></div>
              <div className="col-6 mx-2">
                Frais de livraison:  {selectedFacture.frais_de_livraison}  dt
                <br></br>
                  
                    <b className="fs-4">Net à payer:   {selectedFacture.net_a_payer}   DT</b>
                
                   
              </div>
            </div>
          </div>
          <div className="row my-2 container">
            <div className="d-flex align-items-center">
              <div className="col-9">
                Mode de paiement:  {selectedFacture.mode_de_paiement}  <br />
                Date d'échéance:
              {moment(selectedFacture.dateEcheance)
                  .locale("fr")
                  .format("LL")}  
              </div>
              <div className="col-4 mx-2">
        <Link to="/historique-ventes" className="col-6 m-5 btn  fs-5 bg-blue">Retour</Link>
    
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
    else{
      return (
        <div>      
    <h6 className='text-success display-6'>Les données sont en cours de chargement... veuillez patienter !
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div>
    </h6>          
    </div>
      )
    } } 
     