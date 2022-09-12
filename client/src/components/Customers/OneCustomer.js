import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FcHome, FcInfo, FcPhoneAndroid, FcSms } from "react-icons/fc";
import { Link } from "react-router-dom";
import { clientCtx } from './../../store/clientContext';


export default function OneCustomer(props) {

  let ctx=useContext(clientCtx)
  function removeC(){
    if (window.confirm('Etes-vous sur de bien vouloir supprimer ce client ? ')) {

    ctx.removeOneClient(props.client._id)
     window.location.reload()
  }
  }
  
  return (
<>
  <div className="row mb-1 mr-0 custom-border ">

        <div className="col-md-2 custom-border-right p-1 text-center">
          <img src={require("../../assets/images/person.jpg")} alt="client static" width="100px" height="100px" />
        </div>
        <div className="col-md-7 custom-border-right">
        <div className="col my-1">
            <div className="row">
                    <div className="col-md-1">  <FcInfo></FcInfo></div>
                    <div className="col-11">{props.client.nomClient}</div>
            </div>
          <div className="row">
                  <div className="col-md-1">  <FcPhoneAndroid></FcPhoneAndroid></div>
                  <div className="col-11">{props.client.numero_de_tel}</div>
          </div>
          <div className="row">
                  <div className="col-md-1">  <FcSms></FcSms></div>
                  <div className="col-11">{props.client.email}</div>
          </div>
          <div className="row">
                  <div className="col-md-1"> <FcHome></FcHome></div>
                  <div className="col-11">{props.client.adresse}</div>
          </div>
          </div>
     </div>
          <div className="col-md-3 my-4 px-4">
            <div className="row px-3 d-flex  justify-content-between" >
            <Link className=' btn btn-outline-success col-md-5'   to={"/clients/" + props.client._id + "/edit"}> <FaEdit /></Link> 
            <button className=" btn btn-outline-danger col-md-5 " onClick={removeC}> <FaTrash /></button>        
         </div>
     </div>
  </div>

      
      </>
 )
}
