import React from 'react';
import ListeClients from './ListeClients';

export default function HolderCustomers() {
  return (
    <div className="col">
    <div className="row p-2">
      <div className="col-md-12 p-0">
        <h1 className="display-3">Clients</h1>
        <hr />
      </div>
    
      <div className=" card col ml-0 my-3 ">
      <ListeClients></ListeClients>
  
      </div>
    </div>
  </div>

  )
}
