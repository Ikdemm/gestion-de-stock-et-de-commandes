import React, { useContext,useEffect } from "react";
import { achatFactCtx } from "./../../../store/achatFactContext";
import OneFactureAchat from "./../OneFactureAchat";

export default function HolderEcheances() {
  let fCtx = useContext(achatFactCtx);

  let tabFactures = fCtx.tabAchatFacts;
  console.log("tabFactures111", tabFactures);
  useEffect(()=>{
    fCtx.getAllAchatFacts()
  },[])
  let today = new Date();
  console.log('today', today.toDateString())
  var tabEcheances = tabFactures.filter((f) =>  f.dateEcheance > today.toDateString() )
/*   var tabEcheances = tabFactures.map((f) =>
 { if( f.dateEcheance.toDateString() < today.toDateString()) 
  return f
}
  ) */
  console.log('tabEcheances',tabEcheances);

  return (
    <>
      <h6 className="display-5">Echéances à venir</h6>
      <div style={{ display: "flex" }}>
        <div className="container">
        {tabEcheances.length?
         <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">N° de Facture</th>
                <th scope="col">Nom du Fournisseur</th>
                <th scope="col">Total commande</th>
                <th scope="col">Echéance</th>
                <th scope="col">Modifier</th>
                <th scope="col">Téléchager</th>
              </tr>
            </thead>
            <tbody>
              { tabEcheances.map((f) => {
                    return (
                      <OneFactureAchat facture={f}   key={f._id}   ></OneFactureAchat>
                    );
                  })
                }
            </tbody>
          </table>
      : "Vous n'avez acune échéance à venir"}
        </div>
      </div>
    </>
  );
}
