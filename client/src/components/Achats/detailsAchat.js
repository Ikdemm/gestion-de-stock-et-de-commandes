import moment from "moment";
import "moment/locale/fr";
import React, { useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { VscFilePdf } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFactureAchats, selectTabFacturesAchat } from "../../features/factures_ordinaires/achat/factures/factAchatSlice";
import { getAllLignesAchatsOridinaires, selectTabAllLignesAchatsOridinaires } from "../../features/factures_ordinaires/achat/lines/ligneAchatOrdinaireSlice";
import { getAllProduits, selectProduit } from "../../features/product/productSlice";
import { GetAllFournisseurs, selectFournisseur } from "../../features/supplier/fournisseurSlice";
import axios from '../../Services/instance';
import { saveAs } from 'file-saver';

export default function DetailsAchat() {
  const dispatch = useDispatch();

  var {_id}=useParams()
  const tabProduits = useSelector(selectProduit);
  const tabFrs = useSelector(selectFournisseur);
  const tabFact = useSelector(selectTabFacturesAchat);
  const tabLignes = useSelector(selectTabAllLignesAchatsOridinaires);


  let selectedFacture=tabFact.find((f)=>f._id===_id)

  console.log('selectedFacture', selectedFacture)
 
    var tabLignesFiltred=tabLignes.filter((l)=>l.facture_id===selectedFacture._id)
 
    var fournisseur= tabFrs.find((f)=>f._id===selectedFacture.fournisseur_id);

    useEffect(() => {
      dispatch(getAllProduits());
      dispatch(getFactureAchats());
      dispatch(getAllLignesAchatsOridinaires());
      dispatch(GetAllFournisseurs());
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function downloadFileDocument() {
 
       var state = {fournisseur, selectedFacture , tabLignesFiltred , tabProduits }
        axios.post(`/api/factures/achat/${selectedFacture._id}/create-pdf`, state)
        .then(() => axios.get(`/api/factures/achat/${selectedFacture._id}/fetch-pdf`, { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
          saveAs(pdfBlob,  `Facture-Achat-N°-${selectedFacture.numFacture}`);
         
      })
    }
    
if(selectedFacture && fournisseur &&tabLignesFiltred && tabProduits){


  return (
    <>
    <div style={{ display: "flex" }}  id="here">
    <div className="container">
    
      <div className="row my-2 container">
        <div className="d-flex align-items-center py-3">
          <div className="col-6">
           <b> N° de facture:</b>    {selectedFacture.numFacture}    <br />
           <b> Date facture:
</b>           {moment(selectedFacture.dateFacture).locale("fr").format("LL")}   
          </div>
          <div className="col-6 mx-2">
          <b>  Nom du Fournisseur: </b>  {fournisseur.nom_commercial}   
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
            <th scope="col">Prix Unitaire HT</th>
            <th scope="col">Quantité</th>
            <th scope="col">Total HT</th>
            <th scope="col">TVA</th>
            <th scope="col">Total TTC</th>
         
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
                  <td>{a.price_a}</td>
                  <td>{l.quantite_a} </td>
                  <td >{l.total_HT}</td>
                  <td >{l.TVA}</td>
                  <td >{l.total_TTC}</td>
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
      <div className="row my-5 container">
        <div className="d-flex align-items-center">
          <div className="col-6"></div>
          <div className="col-5">
           <b> Frais de livraison: </b> {selectedFacture.frais_de_livraison}  dt  <br></br>
          <b>  Net commercial HT: </b> {selectedFacture.net_commercial_HT}  dt  <br></br>
           <b> Total TVA: </b> {selectedFacture.TVA_deductibles}  dt  <br></br>
              <hr></hr>
                <b className="fs-4">Net à payer:   {selectedFacture.net_a_payer}   DT</b>
            
               
          </div>
        </div>
      </div>
      <div className="row my-2 container">
        <div className="d-flex align-items-center">
          <div className="col-9">
           <b> Mode de paiement:</b>  {selectedFacture.mode_de_paiement}  <br />
           <b> Date d'échéance:</b>
          {moment(selectedFacture.dateEcheance)
              .locale("fr")
              .format("LL")}  
          </div>
          <div className="col-4 mx-2">
   {/*  <Link to="/historique-achat" className="col-6 m-5 btn  fs-5 bg-blue">Retour</Link>
 */}
          </div>
        </div>
      </div>
    </div>
  </div>
<div className='row'>
  <div className="col-8">
    
  </div>
  <div className="col-4">
  <button onClick={downloadFileDocument} className="m-5 btn  fs-5 bg-blue">
        <VscFilePdf></VscFilePdf>Télécharger en Pdf
      </button> 
  {/*   <DownloadPageAsPdf rootElementId={"here"} dowloadFileName={`Facture-Achat-N°${selectedFacture.numFacture}`}></DownloadPageAsPdf> */}
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
 