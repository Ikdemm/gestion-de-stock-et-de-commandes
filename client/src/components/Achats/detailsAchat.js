import moment from "moment";
import "moment/locale/fr";
import React, { useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFactureAchats, selectTabFacturesAchat } from "../../features/factures_ordinaires/achat/factures/factAchatSlice";
import { getAllLignesAchatsOridinaires, selectTabAllLignesAchatsOridinaires } from "../../features/factures_ordinaires/achat/lines/ligneAchatOrdinaireSlice";
import { getAllProduits, selectProduit } from "../../features/product/productSlice";
import { GetAllFournisseurs, selectFournisseur } from "../../features/supplier/fournisseurSlice";
import DownloadPageAsPdf from '../DownloadPageAsPdf';
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

if(selectedFacture && fournisseur &&tabLignesFiltred && tabProduits){


  return (
    <>
    <div style={{ display: "flex",paddingTop:30+"px"}} id="here" >
    <div className="container px-5"  style={{ width:1800+"px"}}>
      <div className="row my-2" style={{width: 95+"vh" ,marginTop:60+"px", marginBottom:60+"px"}}>
       <b style={{   marginBottom:20+"px"}}>Nodes Storage Manager SARL</b> <br/>
          <div >
            N° de facture:    {selectedFacture.numFacture}    <br />
            Date facture:
           {moment(selectedFacture.dateFacture).locale("fr").format("LL")}   
          </div>
          <div style={{ marginLeft:130+"px",  marginTop:20+"px"}} >
        <b> Nom du Fournisseur:</b>  {fournisseur.nom_commercial}   
        </div>
      </div>

            <h5 style={{ marginTop:20+"px"}} >Articles commandés</h5>
  
     
      
      <table style={{width: 65+"vh" , marginBottom:30+"px"}}>
        <thead>
          <tr>
            <th style={{textAlign: "left"}} >Article</th>
            <th style={{textAlign: "center"}}>PU</th>
            <th style={{textAlign: "center"}}>Q</th>
            <th style={{textAlign: "center"}}>Total HT</th>
            <th style={{textAlign: "center"}}>TVA</th>
            <th style={{textAlign: "center"}}>TTC</th>
         
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

                  <td style={{textAlign: "left"}} >{a.title}</td>
                  <td style={{textAlign: "center", padding: 15+"px"}}>{a.price_a}</td>
                  <td style={{textAlign: "center", padding: 15+"px"}}>{l.quantite_a} </td>
                  <td style={{textAlign: "center", padding: 15+"px"}}>{l.total_HT}</td>
                  <td style={{textAlign: "center", padding: 15+"px"}}>{l.TVA} </td>
                  <td style={{textAlign: "center", padding: 15+"px"}}>{l.total_TTC}</td>
                  </tr>
          )
                }else{
                  return <h2>Chargement en cours...</h2>
                }
                })
            }   
    
        </tbody>
      </table>
     
      <div style={{ marginBottom:40+"px", marginLeft:170+"px"}}>
          Net commercial HT: {selectedFacture.net_commercial_HT} DT
                  <br></br>
                  Total TVA: {selectedFacture.TVA_deductibles} DT
                  <br></br>
            Frais de livraison:  {selectedFacture.frais_de_livraison} DT
            <br></br>
              
                <b style={{fontSize: "larger"}}>Net à payer:   {selectedFacture.net_a_payer} DT</b>
            
               
      </div>
      <div className="row ">
          <div className="col-9">
          
            Mode de paiement:  {selectedFacture.mode_de_paiement}  <br />
            Date d'échéance: {moment(selectedFacture.dateEcheance).locale("fr").format("LL")}  
          </div>
       
      </div>
    </div>
  </div>
<div className='row'>
  <div className="col-8">
    
  </div>
  <div className="col-4">
    
    <DownloadPageAsPdf rootElementId={"here"} dowloadFileName={`Facture-Achat-N°${selectedFacture.numFacture}`}></DownloadPageAsPdf>
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
 