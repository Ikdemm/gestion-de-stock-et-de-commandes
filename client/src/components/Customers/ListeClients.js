import React, { useContext, useEffect } from "react";
import "../Form.module.css";
import { clientCtx } from "./../../store/clientContext";
import OneCustomer from "./OneCustomer";

export default function ListeClients() {
  let cctx = useContext(clientCtx);
  let listeC = cctx.tabClients;
  useEffect(() => {
    cctx.getAllClients();
  }, []);
  return (
   
    <div>    
    <h6 className='display-4'>Liste des Clients</h6>  
    <ol className='list-group'>
      
 { listeC.map((p)=>{
    return <OneCustomer client={p} key={p._id}></OneCustomer>
  })
} 
    </ol>
    </div>

  )

}
