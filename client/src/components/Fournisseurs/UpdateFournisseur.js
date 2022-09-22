import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fournisseurtCtx } from "./../../store/fournisseurContext";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

export default function UpdateFournisseur() {
  const { t } = useTranslation();

  let { _id } = useParams();
  const fourCtx = useContext(fournisseurtCtx);
  const [tabFournisseurs, setTabFournisseurs] = useState([]);
  useEffect(() => {
    axios.get(`/api/fournisseurs`).then((response) => {
      setTabFournisseurs(response.data);
    });
  }, []);
  let selectedFour = tabFournisseurs.find((c) => c._id === _id);
  let navigate = useNavigate();
  const nomFrstValue = useRef();
  const numero_de_telValue = useRef();
  const adresseValue = useRef();
  const emailValue = useRef();
  const refLogo = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    const uFour = {
      nom_commercial: nomFrstValue.current.value,
      numero_de_tel: numero_de_telValue.current.value,
      adresse: adresseValue.current.value,
      email: emailValue.current.value,
      logo: refLogo.current.value,
    };
    fourCtx.updateFournisseur(_id, uFour);
    swal({
      title: "Opération réussie!",
      text: "Le fournisseur a été bien mis à jour!",
      icon: "success",
    });
    setTimeout(() => {
      navigate("/fournisseurs");
    }, 1500);
  }
  if (selectedFour) {
    return (
      <div style={{ display: "flex" }}>
        <div className="container" style={{ padding: 50 + "px" }}>
          <div className="row d-flex justify-content-center">
            <div className="col">
              <h6 className="display-3">
                {t("buttons.update")} le fournisseur
              </h6>{" "}
              <hr />
              <form className="card p-3 shadow container-fluid">
                <label htmlFor="nom_commercial">Nom commercial</label>
                <input
                  className="form-control"
                  type="text"
                  name="nom_commercial"
                  defaultValue={selectedFour.nom_commercial}
                  ref={nomFrstValue}
                ></input>
                <label htmlFor="numero_de_tel">
                  {t("generalInformations.phone")}
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="numero_de_tel"
                  defaultValue={selectedFour.numero_de_tel}
                  ref={numero_de_telValue}
                ></input>
                <label htmlFor="adresse">Adresse</label>
                <input
                  className="form-control"
                  type="text"
                  name="adresse"
                  defaultValue={selectedFour.adresse}
                  ref={adresseValue}
                ></input>
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  defaultValue={selectedFour.email}
                  ref={emailValue}
                ></input>
                <label htmlFor="email">Logo</label>
                <input
                  type="url"
                  name="logo"
                  ref={refLogo}
                  className="form-control"
                  placeholder="entrer un lien Url"
                  defaultValue={selectedFour.logo}
                />

                <div className="d-flex justify-content-center">
                  <div className="p-2">
                    <Link
                      to="/fournisseurs"
                      className="btn btn-outline-danger my-2 mr-2 rounded-pill"
                      type="submit"
                    >
                      {t("buttons.cancel")}
                    </Link>
                  </div>
                  <div className="p-2">
                    <button
                      className="btn btn-outline-success my-2 rounded-pill"
                      type="submit"
                      onClick={submitHandler}
                    >
                      {t("buttons.confirm")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
