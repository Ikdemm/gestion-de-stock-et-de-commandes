//import axios from "../Services/instance"; ;
import axios from "../Services/instance";
import React, { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";

import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./Stock.module.css";
export default function Stock() {
  const [tabProduits, setTabAchatFacts] = useState([]);

  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      setTabAchatFacts(response.data);
    });
  }, []);

  if (tabProduits) {
    return (
      <div>
        <p className="display-4">Inventaire</p>
        <hr />

        {tabProduits.map((p) => {
          return (
            <div className={classes.card} key={p._id}>
              <div className={classes.container}>
                <h6 className="h4"> {p.title} </h6>
                <p>Stock initial: {p.stock_initial} pièces</p>
                <p>+ Entrées: {p.quantite_entree} pièces</p>
                <p>- Sorties: {p.quantite_sortie} pièces</p>
                <hr />
                <h4>Existant: {p.stock_final} pièces</h4>
                <Link
                  className="btn btn-outline-danger form-control m-3"
                  to={"/stock/" + p._id + "/edit"}
                >
                  Corriger le stock <AiTwotoneEdit></AiTwotoneEdit>
                </Link>
              </div>
            </div>
          );
        })}
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
