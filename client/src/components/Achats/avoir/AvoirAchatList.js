import React from 'react'
import OneAvoirAchat from './OneAvoirAchat';

export default function AvoirAchatList(props) {
    return (
        <>
          {props.listOfAchats.map((l) => {
            return <OneAvoirAchat facture={l} key={l._id}></OneAvoirAchat>;
          })}
        </>
      );
    }
    