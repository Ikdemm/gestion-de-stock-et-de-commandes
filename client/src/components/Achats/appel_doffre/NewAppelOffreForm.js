import emailjs from "@emailjs/browser";
import axios from "../../../Services/instance";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { FaBan, FaSave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { appelOffreCtx } from "./../../../store/appelOffreContext";
import { useTranslation } from "react-i18next";
const _ = require("lodash");

export default function NewAppelOffreForm() {
  const { t } = useTranslation();

  let navigate = useNavigate();
  const apoCtx = useContext(appelOffreCtx);
  const [tabProduits, settabProduits] = useState([]);

  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      settabProduits(response.data);
    });
  }, []);
  const refRef = useRef("");
  const refdateAPO = useRef("");
  const refObjet = useRef("");
  const refproduit_id = useRef("");
  const refquantite = useRef("");
  const refcommentaire = useRef("");
  const refdateLimiteDeReponse = useRef("");
  const refdateDeCommandePlanifiee = useRef("");
  const refDestinataire = useRef("");
  const tabNotFiltred = _.map(apoCtx.tabAppelOffres, "ref");
  //const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4d727vz",
        "template_buichrq",
        e.target,
        "MLOcpsLxRpw0wWQtg"
      )
      .then(
        (result) => {
          alert(
            "Votre appel d'offre a été envoyé par email au destinataire, vous pouvez le renvoyer vers un autre destinataire ou l'enregistrer dans la BD"
          );
          console.log("send email", result.text);
        },
        (error) => {
          console.log("send email ERROR", error.text);
        }
      );
  };
  function submitHandler(e) {
    e.preventDefault();
    const c = tabProduits.find((p) => p.title === refproduit_id.current.value);

    let newAppelOffre = {
      ref: refRef.current.value,
      dateAPO: refdateAPO.current.value,
      objet: refObjet.current.value,
      destinataire: refDestinataire.current.value,
      produit_id: c._id,
      quantite: refquantite.current.value,
      commentaire: refcommentaire.current.value,
      dateLimiteDeReponse: refdateLimiteDeReponse.current.value,
      dateDeCommandePlanifiee: refdateDeCommandePlanifiee.current.value,
    };
    if (!tabNotFiltred.includes(newAppelOffre.ref)) {
      apoCtx.addNewAppelOffre(newAppelOffre);
      navigate("/historique-appel-doffre");
      e.target.reset();
    } else
      alert(
        "cette référence existe déjà, veuillez entrer une référence différente"
      );
  }
  return (
    <div style={{ display: "flex" }}>
      <div className="container">
        <h6 className="display-6">Nouvel appel d'offre</h6>
        <hr />
        <div>
          <form
            method="post"
            className="card bg-white shadow p-3"
            /* ref={form} */ onSubmit={sendEmail}
          >
            <label htmlFor="ref">Référence de l'appel d'offre</label>
            <input
              type="text"
              name="ref"
              ref={refRef}
              className="form-control"
              required
            />
            <label htmlFor="dateAPO">Date</label>
            <input
              type="date"
              name="dateAPO"
              ref={refdateAPO}
              className="form-control"
              required
            />
            <label htmlFor="objet">Objet</label>
            <input
              type="text"
              name="objet"
              ref={refObjet}
              className="form-control"
              required
            />

            <label htmlFor="objet">
              Destinataire(s) [Entrez les e-mails (séparés par des virgules)]{" "}
            </label>
            <input
              type="email"
              multiple
              name="destinataire"
              ref={refDestinataire}
              className="form-control"
              placeholder="abc@gmail.com,xyz@gmail.com"
            />

            <label htmlFor="produit_id">Produit</label>
            <select
              name="produit_id"
              className="form-select"
              ref={refproduit_id}
            >
              <option>--veuillez choisir le produit--</option>
              {tabProduits.map((f) => {
                return <option key={f._id}>{f.title}</option>;
              })}
            </select>
            <label htmlFor="quantite">Quantite</label>
            <input
              type="number"
              name="quantite"
              ref={refquantite}
              className="form-control"
              required
            />
            <label htmlFor="commentaire">Commentaire</label>
            <input
              type="text"
              name="commentaire"
              ref={refcommentaire}
              className="form-control"
            />
            <label htmlFor="dateLimiteDeReponse">Date Limite De Reponse</label>
            <input
              type="date"
              name="dateLimiteDeReponse"
              ref={refdateLimiteDeReponse}
              className="form-control"
              required
            />
            <label htmlFor="dateDeCommandePlanifiee">
              Date De Commande Planifiée
            </label>
            <input
              type="date"
              name="dateDeCommandePlanifiee"
              ref={refdateDeCommandePlanifiee}
              className="form-control"
            />

            <div className="d-flex flex-row-reverse">
              <button type="submit" className="btn bg-blue  m-2 ">
                Envoyer en email <BiMailSend></BiMailSend>
              </button>
              <button
                className="btn bg-green  m-2"
                onClick={submitHandler}
                type="submit"
              >
                Enregitrer L'appel d'offre <FaSave></FaSave>
              </button>
              <Link to="/achat" className="btn btn-danger  m-2 ">
                {t("buttons.cancel")} <FaBan></FaBan>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
