import React from 'react'
import OneAvoirVente from './OneAvoirVente';

export default function AvoirVenteList(props) {
  return (
    <>
          {props.listOfVentes.map((l) => {
            return <OneAvoirVente facture={l} key={l._id}></OneAvoirVente>;
          })}
        </>
      );
    }
    