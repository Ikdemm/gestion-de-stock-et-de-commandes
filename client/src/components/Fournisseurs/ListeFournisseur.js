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
      <h6 className="display-4">Liste Fournisseurs </h6>
   
      <ol className='list-group'>
        {listeF.map((f) => {
          return <OneFournisseur fournisseur={f} key={f._id}></OneFournisseur>;
        })}
    </ol>
    </div>
  );
}
