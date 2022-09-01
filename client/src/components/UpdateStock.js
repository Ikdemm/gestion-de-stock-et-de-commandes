import React, { useContext, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import editPhoto from '../assets/images/pen.gif';
import { produitCtx } from './../store/produitContext';

export default function UpdateStock() {
    let {_id}=useParams()
    const pdtCtx= useContext(produitCtx)
   
  let selectedStock= pdtCtx.getProduitById(_id)
  console.log('selectedStock', selectedStock)
  const [stock, setStock]=useState(selectedStock)
  function handleInputChange ( event) {
    const { name, value } = event.target
  
    setStock({ ...stock, [name]: value })
  }
    let navigate=useNavigate()
    
    if(selectedStock){
   
  return (
    <div  style={{display: "flex"}}>

    <div className="container" style={{ padding: 50 + "px" }}>
           <div className="row d-flex justify-content-center">   
               <div className="col-md-6">
               <img src={editPhoto} alt="editPhoto"  style={{height: 80+"vh"}}/> 
               </div> 
               <div className="col-md-6" style={{marginTop: 30+"vh"}}>
        <h6 className='display-6'  style={{color:"#4125D9"}}>Corriger le stock</h6>  
           <form onSubmit={event => {
               event.preventDefault()
               pdtCtx.updateProduit(_id,stock);
              navigate('/stock') }
             }>
          
                 <label htmlFor="stock_initial">Stock initial</label>
                 <input className="form-control" type="number" name="stock_initial" value={stock.stock_initial} onChange={handleInputChange} ></input>
                 <label htmlFor="quantite_entree">Quantité entrée</label>
                 <input className="form-control" type="number" name="quantite_entree" value={stock.quantite_entree} onChange={handleInputChange} ></input>
                 <label htmlFor="quantite_sortie">Quantité sortie</label>
                 <input className="form-control" type="number" name="quantite_sortie" value={stock.quantite_sortie} onChange={handleInputChange} ></input>
   
                 <label htmlFor="stock_final">Stock Existant</label>
                 <input className="form-control" type="number" name="stock_final" value={stock.stock_final} onChange={handleInputChange} ></input>
   
               
             <button className="btn btn-success my-2" type="submit">Corriger le stock</button>
             </form>
               </div>
               </div>
           </div>
           </div>
  )
}
else{
  return (
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div>
  )
  }
  
  }