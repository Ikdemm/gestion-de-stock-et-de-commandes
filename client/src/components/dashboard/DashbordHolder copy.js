import React, { useEffect, useState } from "react";
import axios from "../Services/instance";
import LineChart from "./charts/LineChart/LineChart";

export default function DashbordHolder() {
  const [tabProduits, settabProduits] = useState([]);
  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      settabProduits(response.data);
    });
  }, []);
  const [TabCategories, setTabCategories] = useState([]);
  useEffect(() => {
    axios.get(`/api/categories`).then((response) => {
      setTabCategories(response.data);
    });
  }, []);
  const [tabClients, setTabClients] = useState([]);
  useEffect(() => {
    axios.get(`/api/clients`).then((response) => {
      setTabClients(response.data);
    });
  }, []);

  const [tabF, setTabFournisseurs] = useState([]);
  useEffect(() => {
    axios.get(`/api/fournisseurs`).then((response) => {
      setTabFournisseurs(response.data);
    });
  }, []);
  const [tabDirections, setTabDirections] = useState([]);
  useEffect(() => {
    axios.get(`/api/directions`).then((response) => {
      setTabDirections(response.data);
    });
  }, []);
  const [tabAchatFacts, setTabAchatFacts] = useState([]);
  useEffect(() => {
    axios.get(`/api/factures/achat`).then((response) => {
      setTabAchatFacts(response.data);
    });
  }, []);
  const [tabVenteFacts, setTabVenteFacts] = useState([]);
  useEffect(() => {
    axios.get(`/api/factures/vente`).then((response) => {
      setTabVenteFacts(response.data);
    });
  }, []);
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get(`/api/staff`).then((response) => {
      setAPIData(response.data);
    });
  }, []);
  return (
    <div>
      <h1 className="display-4">Tableau de bord</h1> <hr />
      <div className="container ">
        <div className="row text-center align-items-center justify-content-center">
          <div
            className="col-2 shadow p-4 mx-4 my-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,224,79,0.28644961402529767) 0%, rgba(67,224,203,0.33406866164434523) 100%)",
            }}
          >
            Total produits{" "}
            <span>
              <b>[{tabProduits.length}]</b>
            </span>
          </div>
          <div
            className="col-2 shadow p-4 mx-4 my-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,224,79,0.28644961402529767) 0%, rgba(67,224,203,0.33406866164434523) 100%)",
            }}
          >
            Total catégories{" "}
            <span>
              <b>[{TabCategories.length}]</b>
            </span>
          </div>
          <div
            className="col-2 shadow p-4 mx-4 my-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,224,79,0.28644961402529767) 0%, rgba(67,224,203,0.33406866164434523) 100%)",
            }}
          >
            Total clients{" "}
            <span>
              <b>[{tabClients.length}]</b>
            </span>
          </div>
          <div
            className="col-2 shadow p-4 mx-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,224,79,0.28644961402529767) 0%, rgba(67,224,203,0.33406866164434523) 100%)",
            }}
          >
            Total fournisseurs{" "}
            <span>
              <b>[{tabF.length}]</b>
            </span>
          </div>
        </div>
        <div className="row text-center align-items-center justify-content-center">
          <div
            className="col-2 shadow p-4 mx-4 my-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,224,79,0.28644961402529767) 0%, rgba(67,224,203,0.33406866164434523) 100%)",
            }}
          >
            Total directions{" "}
            <span>
              <b>[{tabDirections.length}]</b>
            </span>
          </div>
          <div
            className="col-2 shadow p-4 mx-4 my-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,224,79,0.28644961402529767) 0%, rgba(67,224,203,0.33406866164434523) 100%)",
            }}
          >
            {" "}
            Total employés{" "}
            <span className="badge text-dark">
              <b>[{APIData.length}]</b>
            </span>
          </div>
          <div
            className="col-2 shadow p-4 mx-4 my-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,224,79,0.28644961402529767) 0%, rgba(67,224,203,0.33406866164434523) 100%)",
            }}
          >
            Total ventes{" "}
            <span>
              <b>[{tabVenteFacts.length}]</b>
            </span>
          </div>
          <div
            className="col-2 shadow p-4 mx-4 my-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,224,79,0.28644961402529767) 0%, rgba(67,224,203,0.33406866164434523) 100%)",
            }}
          >
            Total achats{" "}
            <span>
              <b>[{tabAchatFacts.length}]</b>
            </span>
          </div>
        </div>
        <div className="row text-center align-items-center justify-content-center">
          <div className="card m-5 p-5">
            <LineChart></LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}
