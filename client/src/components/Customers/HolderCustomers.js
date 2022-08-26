import React from 'react'
import AddClientForm from './AddClientForm';
import ListeClients from './ListeClients';

export default function HolderCustomers() {
  return (
    <div>
    <h1 className='display-3'>Clients</h1><hr/>
    <div className='row'>
        <div className='col-5'>
            <AddClientForm></AddClientForm>
        </div>
        <div className='col-7'>
            <ListeClients></ListeClients>
        </div>
    </div>
</div>
  )
}
