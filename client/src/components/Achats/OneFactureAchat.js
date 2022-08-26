import moment from 'moment';
import 'moment/locale/fr';
import React, { useContext } from "react";
import { AiOutlineDownload, AiTwotoneEdit } from "react-icons/ai";
import { fournisseurtCtx } from './../../store/fournisseurContext';
export default function OneFactureAchat(props) {
  let ctx=useContext(fournisseurtCtx);

  let tabF=ctx.tabFournisseurs
  console.log("tabF", tabF);

  let date=props.facture.dateFacture;
  let fournisseurID=props.facture.fournisseur_id;
  let fournisseur=tabF.find((f)=> f._id==fournisseurID)
  console.log("fournisseur",fournisseur)
  console.log('rtrt');
  return (
    <tr>    
      <td scope="col">{
        moment(date).locale('fr').format('LL')
      }
       
        </td>
    <td scope="col">{props.facture.numFacture}</td>
    <td scope="col">{fournisseur.nom_commercial}</td>
    <td scope="col">{props.facture.net_a_payer} dt</td>
      <td scope="col">{
        moment(props.facture.dateEcheance).locale('fr').format('LL')
      }
       
        </td>
    <td scope="col">  <button className='btn btn-light'><AiTwotoneEdit></AiTwotoneEdit></button></td>
    <td scope="col">
      <button className='btn btn-light'>

      <AiOutlineDownload></AiOutlineDownload>
      </button>
      </td>
</tr>
  )
}
