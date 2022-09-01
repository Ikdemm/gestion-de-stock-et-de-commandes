import "moment/locale/fr";
import React from "react";
import UneFactureVente from "./UneFactureVente";

export default function VenteList(props) {
  return (
    <>
      {props.listOfVentess.map((l) => {
        return <UneFactureVente facture={l} key={l.numFacture}></UneFactureVente>;
      })}
    </>
  )
}
