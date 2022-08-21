import React from 'react'
import CategoryForm from './CategoryForm'
import ListeCategories from './ListeCategories'

export default function CategoryHolder() {
  return (
    <div>
        <h1 className='display-1'>Catégories</h1><hr/>
        <div className='row'>
            <div className='col-5'>
                <CategoryForm></CategoryForm>
            </div>
            <div className='col-7'>
                <ListeCategories></ListeCategories>
            </div>
        </div>
    </div>
  )
}
