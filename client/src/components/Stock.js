import React, { useContext, useEffect } from "react";
import { produitCtx } from "../store/produitContext";
import classes from "./Stock.module.css";
export default function Stock() {
  let pctx = useContext(produitCtx);
  let listeP = pctx.tabProduits;
  useEffect(() => {
    pctx.getAllProduits();
  }, []);
  return (
    <div>
      <p className="display-4">Etat des stocks</p><hr/>

      {listeP.map((p) => {
        return (
          <div className={classes.card}>
            <div className={classes.container}>
              <h4>  {p.title} </h4>
              <p>Stock initial: {p.stock_initial} pièces</p>
              <p>+ Achats: {p.quantite_entree} pièces</p>
              <p>- Ventes: {p.quantite_sortie} pièces</p><hr/>
              <h4>Existant: {p.stock_final} pièces</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}
