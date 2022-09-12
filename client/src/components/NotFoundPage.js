import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className='text-center p-5'>
        <h1 className='display-1 text-danger'>Oops!</h1>
        <h6 className='display-4'  >Page non trouvée</h6>
        <Link to="welcome-page" className='btn bg-blue mt-5' >Retour vers la page d'accueil   <AiOutlineHome />
 </Link>
    </div>
  )
}
