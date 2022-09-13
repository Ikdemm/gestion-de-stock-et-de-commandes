import React, { useContext, useRef } from "react";
import { categorieCtx } from "../../store/categoryContext";
import swal from 'sweetalert';
const _ = require("lodash");

export default function CategoryForm() {
  const catCtx = useContext(categorieCtx);
  const refName = useRef("");
  const tabNotFiltred = _.map(catCtx.tabCategories, "name");
  console.log(tabNotFiltred);

  function submitHandler(e) {
    e.preventDefault();
    let NewCategory = {
      name: refName.current.value,
    };
    if (tabNotFiltred.includes(NewCategory.name)) {
      swal({
        title: "Echec",
        text: "ce nom de catégorie existe déjà, veuillez entrer un nom différent",
        icon: "error",
      })
   
    } else
     {
      catCtx.addNewCategorie(NewCategory);
      swal({
        title: "Opération réussie!",
        text: "La catégorie est bien ajoutée!",
        icon: "success",
      });
      setTimeout(()=>{

      e.target.reset();
      window.location.reload();
    }, 1500)

     }
  }
  return (
    <div>
      <h6 className="display-6">Nouvelle catégorie</h6>
      <div className="container shadow p-3">
        <form onSubmit={submitHandler} method="post">
          <div>
            <label htmlFor="name">Libellé</label>
            <input
              className="form-control mb-4"
              type="text"
              ref={refName}
              name="name"
              required
            ></input>

            <button
              className="btn btn-outline-dark form-control rounded-pill"
              type="submit"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
