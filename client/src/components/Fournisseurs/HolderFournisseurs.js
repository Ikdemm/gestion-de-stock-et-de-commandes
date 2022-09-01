import React from 'react'
import ListeFournisseur from './ListeFournisseur';

export default function HolderFournisseurs() {
  return (
    <div className="col">
    <div className="row p-2">
      <div className="col-md-12 p-0">
        <h1 className="display-3">Fournisseurs</h1>
        <hr />
      </div>
    
      <div className=" card col ml-0 my-3 ">
      <ListeFournisseur></ListeFournisseur>
  
      </div>
    </div>
  </div>

)
}
