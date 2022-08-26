import React from 'react'


export default function DashbordHolder() {
  return (
    <div> 
      <h6 className='display-5'>Tableau de bord</h6> <hr/>
      <div className='container '>
        <div className='row text-center align-items-center justify-content-center'>
          
          <div className='col-2 shadow p-4 mx-4 my-2'>
            Nombre de produits <span><b>[3]</b></span> 
          </div>
          <div className='col-2 shadow p-4 mx-4 my-2'>
            Nombre de catégories <span><b>[3]</b></span>
          </div>
          <div className='col-2 shadow p-4 mx-4 my-2'>
            Nombre de clients <span><b>[3]</b></span>
          </div>
          <div className='col-2 shadow p-4 mx-4'>
            Nombre de fournisseurs <span><b>[3]</b></span>
          </div>
         
        </div>
        <div className='row text-center align-items-center justify-content-center'>
          <div className='col-2 shadow p-4 mx-4 my-2'>
            Nombre des directions <span><b>[3]</b></span> 
          </div>
          <div className='col-2 shadow p-4 mx-4 my-2'>
            Nombre des employés <span><b>[3]</b></span>
          </div>
          <div className='col-2 shadow p-4 mx-4 my-2'>
            Nombre de clients <span><b>[3]</b></span>
          </div>
          <div className='col-2 shadow p-4 mx-4 my-2'>
            Nombre de fournisseurs <span><b>[3]</b></span>
          </div>
         
        </div>
      </div>
  </div>
  )
}
