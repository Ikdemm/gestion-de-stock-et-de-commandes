import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { CreateCategory, selectCategorie } from "../../features/category/categorySlice";
const _ = require("lodash");

export default function CategoryForm() {
  //const { t } = useTranslation();
  const dispatch = useDispatch()
  const tabCategories = useSelector(selectCategorie)

  //const catCtx = useContext(categorieCtx);
  const refName = useRef("");
  const tabNotFiltred = _.map(tabCategories, "name");
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
      dispatch(CreateCategory(NewCategory))
      //catCtx.addNewCategorie(NewCategory);
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
