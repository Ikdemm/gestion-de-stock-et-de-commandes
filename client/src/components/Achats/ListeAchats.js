import React from 'react'
import OneLigneFactureAchat from './OneLigneFactureAchat'

export default function ListeAchats(props) {
  return (
    <>
{
    props.listeOfAchats.map((l)=>{
        return <OneLigneFactureAchat ligne={l} key={l._id} ></OneLigneFactureAchat>
    })
}
    </>
  )
}
