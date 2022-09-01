import React from 'react'
import ListeDirections from './ListeDirections'

export default function HolderDirection() {
  return (
    <div className="col">
    <div className="row p-2">
      <div className="col-md-12 p-0">
        <h1 className="display-3">Directions</h1>
        <hr />
      </div>
    
      <div className=" card col ml-0 my-3 ">
      <ListeDirections></ListeDirections>
  
      </div>
    </div>
  </div>

  )
}
