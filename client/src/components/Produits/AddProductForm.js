import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBan, FaSave, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { produitCtx } from "../../store/produitContext";
import swal from 'sweetalert';
const _ = require("lodash");

export default function AddProductForm() {
  let pctx = useContext(produitCtx);
  const tabNotFiltred = _.map(pctx.tabProduits, "title");

  const [tabCat, setTtabCat] = useState([]);
  useEffect(() => {
    axios.get(`/api/categories`).then((response) => {
      setTtabCat(response.data);
    });
  }, []);

  let navigate = useNavigate();
  let refT = useRef("");
  let refD = useRef("");
  let refC = useRef("");
  let refPA = useRef("");
  let refPV = useRef("");
  let refSI = useRef("");
  let refSM = useRef("");
  let refQE = useRef("");
  let refQS = useRef("");
  let refSMax = useRef("");
  let refImage = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    const c = tabCat.find((p) => p.name === refC.current.value);
    let newProduct = {
      title: refT.current.value,
      description: refD.current.value,
      categorie_id: c._id,
      price_a: refPA.current.value,
      price_v: refPV.current.value,
      stock_initial: refSI.current.value,
      stock_min: refSM.current.value,
      stock_max: refSMax.current.value,
      quantite_entree: refQE.current.value,
      quantite_sortie: refQS.current.value,
      image: refImage.current.value,
    };
    if (tabNotFiltred.includes(newProduct.title)) {
      swal({
        title: "Echec",
        text: "ce nom de produit existe déjà, veuillez entrer un nom différent!",
        icon: "error",
      });
    } else{
      pctx.addNewProduit(newProduct);
      swal({
        title: "Opération réussie!",
        text: "Le produit est bien ajouté!",
        icon: "success",
      });
      setTimeout(()=>{

      e.target.reset();
      navigate("/listProduits");
      window.location.reload();
    }, 1500)

    }
  }

  if (tabCat) {
    return (
      <div className="container">
          <div style={{ display: "flex" }}>
        <div className="container-fluid">
            <h6 className="display-6 mb-4"> Ajouter un produit </h6>
            <hr />
            <form
              onSubmit={submitHandler}
              method="post"
              className="container shadow p-4 bg-light"
            >
              <div className="row">
                
               <div className="col-md-6">
                
              <label htmlFor="title">Nom du produit</label>
              <input
                type="text"
                name="title"
                ref={refT}
                className="form-control"
                />
                </div> 
                <div className="col-md-6">
                  
              <label htmlFor="image">Image du produit</label>
              <input
                type="url"
                name="image"
                ref={refImage}
                className="form-control"
                placeholder="entrer un lien URL"
                />
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">

              <label htmlFor="categorie_id">Catégorie</label>
              <select name="categorie_id" className="form-control" ref={refC}>
                <option>--Veuillez choisir la catégorie--</option>
                {tabCat.map((f) => {
                  return <option key={f._id}>{f.name}</option>;
                })}
              </select>
              </div>
              <div className="col-md-6">

              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                ref={refD}
                className="form-control"
                />
                </div>
                </div>
        <div className="row">
        <div className="col-md-6">

              <label htmlFor="price_a">Prix d'achat</label>
              <input
                type="number"
                step="0.001"
                name="price_a"
                ref={refPA}
                className="form-control"
                />
</div>
            <div className="col-md-6">

              <label htmlFor="price_v">Prix de vente</label>
              <input
                type="number"
                step="0.001"
                name="price_v"
                ref={refPV}
                className="form-control"
                />
                </div>
                </div>
<div className="row">
  <div className="col-md-6">
  <label htmlFor="stock_min">Stock Minimum</label>
              <input
                type="number"
                name="stock_min"
                ref={refSM}
                className="form-control"
              />
  </div>
  <div className="col-md-6">
    
  <label htmlFor="stock_max">Stock Maximum</label>
              <input
                type="number"
                name="stock_max"
                ref={refSMax}
                className="form-control"
              />
  </div>
</div>
<div className="row">
  <div className="col-md-6">
  <label htmlFor="quantite_entree">Quantité entrée</label>
              <input
                type="number"
                name="quantite_entree"
                ref={refQE}
                className="form-control"
                defaultValue={0}

              />
  </div>
  <div className="col-md-6">
  <label htmlFor="quantite_sortie">Quantité sortie</label>
              <input
                type="number"
                name="quantite_sortie"
                ref={refQS}
                className="form-control"
                defaultValue={0}

              />
  </div>
</div>
             

              <label htmlFor="stock_initial">Stock Initial</label>
              <input
                type="number"
                name="stock_initial"
                ref={refSI}
                className="form-control"
                defaultValue={0}
              />
             
         
             <div className='d-flex flex-row-reverse'>
                <div className='p-2'>
             <button className="btn bg-green my-2 " type="submit">Confirmer <FaSave></FaSave></button>    
                </div>
                <div className='p-2'>
             <Link to="/listProduits" className="btn btn-danger my-2 mr-2">Annuler <FaBan></FaBan> </Link>
                </div>
                
               </div>
            
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fetching">
        <FaSpinner className="spinner"></FaSpinner>
      </div>
    );
  }
}
