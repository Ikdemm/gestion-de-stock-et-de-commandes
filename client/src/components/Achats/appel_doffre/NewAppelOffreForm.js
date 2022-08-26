import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { appelOffreCtx } from './../../../store/appelOffreContext';
import { produitCtx } from './../../../store/produitContext';

export default function NewAppelOffreForm() {
  let navigate = useNavigate();
  const apoCtx = useContext(appelOffreCtx);
  const pdtCtx=useContext(produitCtx);
  const tabPdts=pdtCtx.tabProduits
  const refRef = useRef("");
  const refdateAPO = useRef("");
  const refObjet = useRef("");
  const refproduit_id = useRef("");
  const refquantite = useRef("");
  const refcommentaire = useRef("");
  const refdateLimiteDeReponse = useRef("");
  const refdateDeCommandePlanifiee = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    const c = tabPdts.find((p) => p.title === refproduit_id.current.value);
 
    let newAppelOffre = {
      ref: refRef.current.value,
      dateAPO: refdateAPO.current.value,
      objet: refObjet.current.value,
      produit_id:c._id,
      quantite: refquantite.current.value,
      commentaire: refcommentaire.current.value,
      dateLimiteDeReponse: refdateLimiteDeReponse.current.value,
      dateDeCommandePlanifiee: refdateDeCommandePlanifiee.current.value,
    };

    apoCtx.addNewAppelOffre(newAppelOffre);
    navigate("/historique-appel-doffre");
  }
  return (
    <div style={{display:"flex"}}>
                <div className="container" >
  
      <h6 className="display-6">Nouvel appel d'offre</h6>
      <hr />
      <div  >
        
      <form onSubmit={submitHandler} method="post">
        <label htmlFor="ref">Référence de l'appel d'offre</label>
        <input
          type="text"
          name="ref"
          ref={refRef}
          className="form-control"
        />
        <label htmlFor="dateAPO">Date</label>
        <input
          type="date"
          name="dateAPO"
          ref={refdateAPO}
          className="form-control"
        />
        <label htmlFor="objet">Objet</label>
        <input
          type="text"
          name="objet"
          ref={refObjet}
          className="form-control"
          />
  
        <label htmlFor="produit_id">Produits</label>
        <select name="select" className="form-control">
          <option selected>--veuillez choisir le produit--</option>
          {tabPdts.map((f) => {
            return <option ref={refproduit_id} key={f._id}>{f.title}</option>;
          })}
        </select>
        <label htmlFor="quantite">quantite</label>
        <input
          type="number"
          name="quantite"
          ref={refquantite}
          className="form-control"
          />
        <label htmlFor="commentaire">commentaire</label>
        <input
          type="text"
          name="commentaire"
          ref={refcommentaire}
          className="form-control"
          />
        <label htmlFor="dateLimiteDeReponse">dateLimiteDeReponse</label>
        <input
          type="date"
          name="dateLimiteDeReponse"
          ref={refdateLimiteDeReponse}
          className="form-control"
          />
        <label htmlFor="dateDeCommandePlanifiee">dateDeCommandePlanifiee</label>
        <input
          type="date"
          name="dateDeCommandePlanifiee"
          ref={refdateDeCommandePlanifiee}
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
          </div>
    </div>
  );
}
