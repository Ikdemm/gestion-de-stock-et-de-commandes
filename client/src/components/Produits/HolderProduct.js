import React from "react";
import ListeProduits from "./ListeProduits";

export default function HolderProduct() {
  return (
    <div className="col">
      <div className="row p-2">
        <div className="col-md-12 p-0">
          <h1 className="display-3">Produits</h1>
          <hr />
        </div>
      
        <div className=" card col ml-0 my-3 ">
          <ListeProduits></ListeProduits>
    
        </div>
      </div>
    </div>
  );
}
