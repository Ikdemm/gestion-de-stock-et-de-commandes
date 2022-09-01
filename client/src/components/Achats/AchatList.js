import "moment/locale/fr";
import React from "react";
import OneFactureAchat from "./OneFactureAchat";
export default function AchatList(props) {
  return (
    <>
      {props.listOfAchats.map((l) => {
        return <OneFactureAchat facture={l} key={l.numFacture}></OneFactureAchat>;
      })}
    </>
  );
}
