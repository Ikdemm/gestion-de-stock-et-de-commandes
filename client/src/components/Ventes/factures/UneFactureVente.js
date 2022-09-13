import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import React, { useContext, useEffect, useState } from "react";
import { BsCardHeading } from "react-icons/bs";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";
import { venteFactCtx } from "../../../store/venteFactContext";
import swal from 'sweetalert';

export default function UneFactureVente(props) {
  let ctx=useContext(venteFactCtx)
  let date = props.facture.dateFacture;
  const [tabLignes, setTabLignes] = useState([]);
  useEffect(() => {
    axios.get(`/api/vente/addToInvoice`).then((response) => {
      setTabLignes(response.data);
    });
  }, []);
  var tabLignesFiltred=tabLignes.filter((l)=>l.facture_id===props.facture._id)
  function UpdateFacture() {

    if(props.facture.etat==="non_payee")
     { props.facture.etat="payee"}
   
    else{
      props.facture.etat="non_payee"
   
    }
ctx.updateVenteFact(props.facture._id, props.facture);
swal({
  title: "Opération réussie!",
  text: "Etat de paiement de la facture a été bien mis à jour!",
  icon: "success",
});
setTimeout(()=>{
  window.location.reload()

}, 2000)

    } 
    if(tabLignesFiltred){
      return (
        <>
        <tr>
          <td>{moment(date).locale("fr").format("L")}</td>
          <td  >{props.facture.numFacture}</td>
          
          <td  >{props.facture.net_a_payer} dt</td>
          <td  >{moment(props.facture.dateEcheance).locale("fr").format("L")}</td>
     
          <td  >
          <Link to={"/facture-vente/"+props.facture._id+"/details"} className=' btn btn-outline-dark mx-1'> <BsCardHeading /></Link> 
    
          </td>
          <td >
          <button
              className="btn bg-white border-dark mx-1"
              onClick={UpdateFacture}
            >
             {props.facture.etat=== "non_payee" ?<div className="text-success">Marquer comme payée <FaCheck className='mx-2 '/></div> : <div className="text-danger">Marquer comme non payée     <FcCancel ></FcCancel>
     </div> }
              
             
            </button>
          </td>
        </tr>
       
        </>
      )}
      else{
        return (
          <div className="fetching">      
          <FaSpinner className="spinner"></FaSpinner>
                </div>
        )
        }
    }
    