import React from 'react'
import OneLigneAvoirAchat from './OneLigneAvoirAchat'

export default function ListeAvoirSurAchat(props) {
  return (
    <>
{
    props.listeOfAchats.map((l)=>{
        return <OneLigneAvoirAchat ligne={l} key={l._id} ></OneLigneAvoirAchat>
    })
}
    </>
  )
}
