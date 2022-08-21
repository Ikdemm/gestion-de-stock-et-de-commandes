import React, { useContext, useEffect } from "react";
import "../Form.module.css";
//import { FaEdit ,FaTrash } from 'react-icons/fa';
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
      <p className="display-4">Liste des clients</p>
      <table>
        <tr>
          <th>Nom complet du Client</th>
          <th>Numéro de téléphone</th>
          <th>Adresse de livraison</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>

        {listeC.map((c) => {
          return <OneCustomer client={c} key={c._id}></OneCustomer>;
        })}
      </table>
    </div>
  );
}
