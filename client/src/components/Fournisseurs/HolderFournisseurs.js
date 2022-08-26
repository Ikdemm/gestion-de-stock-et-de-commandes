import React from 'react'
import AddFournisseurForm from './AddFournisseurForm';
import ListeFournisseur from './ListeFournisseur';

export default function HolderFournisseurs() {
  return (
    <div>
    <h1 className='display-3'>Fournisseurs</h1><hr/>
    <div className='row'>
        <div className='col-5'>
            <AddFournisseurForm></AddFournisseurForm>
        </div>
        <div className='col-7'>
            <ListeFournisseur></ListeFournisseur>
        </div>
    </div>
</div>  )
}
