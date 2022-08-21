import React, { useContext, useEffect } from "react";
import { fournisseurtCtx } from "../../store/fournisseurContext";
import "../Form.module.css";
import OneFournisseur from "./OneFournisseur";

export default function ListeFournisseur() {
  let fctx = useContext(fournisseurtCtx);
  let listeF = fctx.tabFournisseurs;

  useEffect(() => {
    fctx.getAllFournisseurs();
  }, []);
  return (
    <div>
      <p className="display-4">Liste Fournisseurs </p>
      <table>
        <tr>
          <th>Nom du Founisseur</th>
          <th>Numéro de téléphone</th>
          <th>Adresse</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>

        {listeF.map((f) => {
          return <OneFournisseur fournisseur={f} key={f._id}></OneFournisseur>;
        })}
      </table>
    </div>
  );
}
