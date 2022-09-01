import React from 'react'
import OneLigneAvoirVente from './OneLigneAvoirVente'

export default function ListeAvoirVente(props) {
    return (
        <>
    {
        props.listeOfVentes.map((l)=>{
            return <OneLigneAvoirVente ligne={l} key={l._id} ></OneLigneAvoirVente>
        })
    }
        </>
      )
    }
    