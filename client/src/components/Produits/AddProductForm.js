import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { categorieCtx } from "../../store/categoryContext";
import { produitCtx } from "../../store/produitContext";
export default function AddProductForm() {
  let pctx = useContext(produitCtx);

  let cCtx = useContext(categorieCtx);
  let listeCategories = cCtx.tabCategories;
  console.log("tabCategories", listeCategories);
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
  function submitHandler(e) {
    e.preventDefault();
    const c = listeCategories.find((p) => p.name === refC.current.value);
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
    };
    pctx.addNewProduit(newProduct);
    e.target.reset();
    navigate("/listProduits");
  }
  useEffect(() => {
    cCtx.getAllCategories();
  }, []);
  return (
    <div>
      <h6 className="display-6">  Ajouter un produit </h6>
      <form
        onSubmit={submitHandler}
        method="post"
        className="container shadow p-3"
      >
        <label htmlFor="title">Nom du produit</label>
        <input type="text" name="title" ref={refT} className="form-control" />
        <label htmlFor="categorie_id">Catégorie</label>
        <select name="select" className="form-control">
          <option selected>--veuillez choisir la catégorie--</option>
          {listeCategories.map((f) => {
            return <option ref={refC}>{f.name}</option>;
          })}
        </select>

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          ref={refD}
          className="form-control"
        />

        <label htmlFor="price_a">Prix d'achat</label>
        <input
          type="number"
          step="0.001"
          name="price_a"
          ref={refPA}
          className="form-control"
        />

        <label htmlFor="price_v">Prix de vente</label>
        <input
          type="number"
          step="0.001"
          name="price_v"
          ref={refPV}
          className="form-control"
        />

        <label htmlFor="stock_min">Stock Minimum</label>
        <input
          type="number"
          name="stock_min"
          ref={refSM}
          className="form-control"
        />

        <label htmlFor="stock_max">Stock Maximum</label>
        <input
          type="number"
          name="stock_max"
          ref={refSMax}
          className="form-control"
        />
        <label htmlFor="stock_initial">Stock Initial</label>
        <input
          type="number"
          name="stock_initial"
          ref={refSI}
          className="form-control"
        />
        <label htmlFor="quantite_entree">Quantité entrée</label>
        <input
          type="number"
          name="quantite_entree"
          ref={refQE}
          className="form-control"
        />
        <label htmlFor="quantite_sortie">Quantité sortie</label>
        <input
          type="number"
          name="quantite_sortie"
          ref={refQS}
          className="form-control"
        />

        <button
          type="submit"
          className="btn btn-outline-dark rounded-pill my-2 form-control"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
