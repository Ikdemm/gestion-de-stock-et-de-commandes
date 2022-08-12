import React from 'react'
import classes from './Stock.module.css'

export default function Caisse() {
  return (
<div className={classes.c}>
    <div className={classes.title}>Etat de caisse</div>
        <div className={classes.card}>
 
  <div className={classes.container}>
    <h4><b>Total Recetttes</b></h4>
    <p>55 dt</p>
  </div>
</div>
        <div className={classes.card}>
 
  <div className={classes.container}>
    <h4><b>Total Dépenses </b></h4>
    <p>80 dt</p>
  </div>
</div>
        <div className={classes.card}>
 
  <div className={classes.container}>
    <h4><b>Solde en Caisse</b></h4>
    <p>125 dt</p>
  </div>
</div>
    
    </div>  )
}
