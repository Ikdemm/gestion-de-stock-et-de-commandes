import React, { useContext, useId, useRef } from 'react'
import  '../Liste.module.css'
import classes from '../Form.module.css'
import { useNavigate } from 'react-router-dom';
import { produitCtx } from '../../store/produitContext';
import { fournisseurtCtx } from '../../store/fournisseurContext';
export default function AddProductForm() {
  const idGenerate=useId()
  let pctx=useContext(produitCtx)
  let fctx=useContext(fournisseurtCtx)
  let listeF=fctx.tabFournisseurs
  let navigate= useNavigate()
  let refT=useRef('')
  let refI=useRef('')
  let refD=useRef('')
  let refC=useRef('')
  let refPA=useRef('')
  let refPV=useRef('')
  let refF=useRef('')
  let refQ=useRef('')
  let refSM=useRef('')
function submitHandler(e){
  e.preventDefault()
  let newProduct={
    id:idGenerate,
    title: refT.current.value, 
    description: refD.current.value,
    category: refC.current.value, 
    fournisseur:refF.current.value,
    imageUrl:refI.current.value,
    price_a:refPA.current.value,
    price_v:refPV.current.value,
    qte_en_stock:refQ.current.value,
    stock_min:refSM.current.value,
  }
pctx.addNewProduit(newProduct)
navigate('/listProduits')
}
  return (
  <div className={classes.container}>
    <p >Ajouter un nouveau produit</p>
    <form onSubmit={submitHandler} method="post">
        <label htmlFor='title'>Nom du produit</label><br/>
        <input type="text" name="title" ref={refT}/><br/>

        <label htmlFor='imageUrl'>Image</label><br/>
        <input type="file" name="imageUrl" ref={refI}/><br/>

        <label htmlFor='category'>Catégorie</label><br/>
        <input type="text" name="category" ref={refC}/><br/>

        <label htmlFor='description'>Description</label><br/>
        <input type="text" name="description" ref={refD}/><br/>

        <label htmlFor='price_a'>Prix d'achat</label><br/>
        <input type="number" step="0.001" name="price_a" ref={refPA}/><br/>

        <label htmlFor='price_v'>Prix de vente</label><br/>
        <input type="number" step="0.001" name="price_v" ref={refPV}/><br/>

        <label htmlFor='stock_min'>Stock minimum</label><br/>
        <input type="number" name="stock_min" ref={refSM}/><br/>

        <label htmlFor='qte_en_stock'>Quantité en stock</label><br/>
        <input type="number"name="qte_en_stock" ref={refQ}/><br/>

        <label for="fournisseur">Fournisseur</label><br/>
        <select name='select'>
        <option selected>--veuillez choisir le fournisseur--</option>
        {
          listeF.map((f)=>{
            return<option  ref={refF}>{f.nom_commercial}</option>
          })
        }
        
       
        </select><br/>
    <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}
