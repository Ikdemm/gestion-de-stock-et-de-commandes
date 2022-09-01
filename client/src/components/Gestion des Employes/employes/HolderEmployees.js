import React from 'react';
import ListeEmployes from './ListeEmployes';

export default function HolderEmployees() {
  return (
    <div>
<h1 className='display-4'>Employés</h1> <hr/>


<br/>
<div className='row'>
    <ListeEmployes></ListeEmployes>
</div>
    </div>
  )
}
