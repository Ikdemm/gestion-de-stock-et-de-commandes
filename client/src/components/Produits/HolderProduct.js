import React from 'react'
import ListeProduits from './ListeProduits';
import AddProductForm from './AddProductForm';

export default function HolderProduct() {
  return (
    <div>
    <h1 className='display-3'>Produits</h1><hr/>
    <div className='row'>
        <div className='col-5'>
            <AddProductForm></AddProductForm>
        </div>
        <div className='col-7'>
            <ListeProduits></ListeProduits>
        </div>
    </div>
</div>
  )
}
