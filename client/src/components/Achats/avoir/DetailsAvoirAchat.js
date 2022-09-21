import axios from 'axios';
import moment from "moment";
import "moment/locale/fr";
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import DownloadPageAsPdf from '../../DownloadPageAsPdf';

export default function DetailsAvoirAchat() {
    var {_id}=useParams()
    const [tabAvoirs, setTtabAvoirs] = useState([]);
    useEffect(() => {
      axios.get(`/api/avoirs/achat`).then((response) => {
        setTtabAvoirs(response.data);
      });
    }, []);
    let selectedFacture=tabAvoirs.find((f)=>f._id===_id)
  
    console.log('selectedFacture', selectedFacture)
      const [tabLignes, setTabLignes] = useState([]);
      useEffect(() => {
        axios.get(`/api/avoirSurachat/addToInvoice`).then((response) => {
          setTabLignes(response.data);
        });
      }, []);
      var tabLignesFiltred=tabLignes.filter((l)=>l.avoir_id===selectedFacture._id)
      const [tabFact, setTtabFact] = useState([]);
      useEffect(() => {
        axios.get(`/api/factures/achat`).then((response) => {
          setTtabFact(response.data);
        });
      }, []);
      var facture= tabFact.find((f)=>f._id===selectedFacture.facture_id);
      const [tabProduits, setTabProduits] = useState([]);
      useEffect(() => {
        axios.get(`/api/produits`).then((response) => {
          setTabProduits(response.data);
        });
      }, []);
      if(selectedFacture && facture &&tabLignesFiltred && tabProduits){

        return (
          <>
            <div style={{ display: "flex" }}>
            <div className="container" id="here">
            
              <div className="row my-2 container">
                <div className="d-flex align-items-center py-3">
                  <div className="col-6">
                    N° de l'avoir:    {selectedFacture.numAvoir}    <br />
                    Date facture:
                   {moment(selectedFacture.dateAvoir).locale("fr").format("LL")}   
                  </div>
                  <div className="col-6 mx-2">
                  N° de facture:  {facture.numFacture}   
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
        
                          return (  <tr key={l._id}>
        
                          <td>{a.title}</td>
                          <td>{a.price_a}</td>
                          <td>{l.quantite_a} </td>
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
                  <div className="col-7"></div>
                  <div className="col-5 mx-2">
              
                      
                        <b className="fs-4">Somme à recevoir:   {selectedFacture.somme_a_recevoir}   DT</b>
                    
                       
                  </div>
                </div>
              </div>
     
            </div>
          </div>
          <div className="row">
          <div className="col-8">
    
    </div>

                  <div className="col-4">
       {/*      <Link to="/historique-avoir-achat" className="col-6 my-5 btn  fs-5 bg-blue">Retour</Link>
         */}
             <DownloadPageAsPdf rootElementId={"here"} dowloadFileName={`Avoir-Achat-N°${selectedFacture.numAvoir}`}></DownloadPageAsPdf>

                  </div>
              </div>
          </>
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
         