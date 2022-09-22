import axios from "axios";
import React, { useEffect, useState } from "react";
import OneProduct from "../Produits/OneProduct";

export default function AlertesSurAchat() {
  const [tabProduits, settabProduits] = useState([]);

  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      settabProduits(response.data);
    });
  }, []);
  var tabAlertesSUR = tabProduits.filter((p) => p.stock_final >= p.stock_max);
  var tabAlertesSOUS = tabProduits.filter((p) => p.stock_final <= p.stock_min);

  return (
    <div>
      <h6 className="display-5">Alertes de stock</h6> <hr />
      <div style={{ display: "block" }}>
        <div className="container mb-5">
          <h3 className="text-danger">Alertes de surstockage</h3>
          <div className="row">
            {tabAlertesSUR.length > 0 ? (
              <ol className="list-group">
                {tabAlertesSUR.map((p) => {
                  return <OneProduct produit={p} key={p._id}></OneProduct>;
                })}
              </ol>
            ) : (
              " La liste des alertes de sur-stockage est vide"
            )}
          </div>
        </div>
        <div className="row">
          <h3 className="text-danger">Alertes de rupture de stock</h3>

          {tabAlertesSOUS.length > 0 ? (
            <ol className="list-group">
              {tabAlertesSOUS.map((p) => {
                return <OneProduct produit={p} key={p._id}></OneProduct>;
              })}
            </ol>
          ) : (
            " La liste des alertes de rupture de stock est vide"
          )}
        </div>
      </div>
    </div>
  );
}
