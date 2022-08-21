import React from 'react'
import AddNewDirection from './AddNewDirection'
import ListeDirections from './ListeDirections'

export default function HolderDirection() {
  return (
    <div>
    <h1 className='display-1'>Directions</h1><hr/>
    <div className='row'>
        <div className='col-5'>
            <AddNewDirection></AddNewDirection>
        </div>
        <div className='col-7'>
            <ListeDirections></ListeDirections>
        </div>
    </div>
</div>
  )
}
