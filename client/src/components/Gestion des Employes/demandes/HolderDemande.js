import React from 'react'
import ListeDemandes from './ListeDemandes';
import NouvelleDemande from './NouvelleDemande';

export default function HolderDemande() {
  return (
    <div>
    <h1 className='display-1'>Mes demandes</h1><hr/>
    <div className='row'>
        <div className='col-5'>
            <NouvelleDemande></NouvelleDemande>
        </div>
        <div className='col-7'>
            <ListeDemandes></ListeDemandes>
        </div>
    </div>
</div>
  )
}
