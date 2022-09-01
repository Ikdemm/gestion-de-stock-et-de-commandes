import React from 'react'
import UneLigneVente from './UneLigneVente'

export default function ListeVentes(props) {
    return (
        <>
    {
        props.listeOfVentes.map((l)=>{
            return <UneLigneVente ligne={l} key={l._id} ></UneLigneVente>
        })
    }
        </>
      )
    }
    