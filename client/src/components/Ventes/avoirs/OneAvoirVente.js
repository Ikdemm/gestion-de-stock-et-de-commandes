import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import React, { useEffect, useState } from "react";
import { BsCardHeading } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function OneAvoirVente(props) {
    let date = props.facture.dateAvoir;
    const [tabLignes, setTabLignes] = useState([]);
    useEffect(() => {
      axios.get(`/api/avoirSurvente/addToInvoice`).then((response) => {
        setTabLignes(response.data);
      });
    }, []);   
    var tabLignesFiltred=tabLignes.filter((l)=>l.avoir_id===props.facture._id)

 
    if(tabLignesFiltred){
        return (
          <>
          <tr>
            <td>{moment(date).locale("fr").format("L")}</td>
            <td  >{props.facture.numAvoir}</td>
            
            <td  >{props.facture.somme_a_rembourser} dt</td>
      
            <td  >
            <Link to={"/avoir-vente/"+props.facture._id+"/details"} className=' btn btn-outline-dark mx-1'> <BsCardHeading /></Link> 
      
            </td>
            <td >
     
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
      