import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaBan, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { CreateClient, selectClient } from "../../features/customer/customerSlice";

const _ = require("lodash");

export default function AddClientForm() {
  const { t } = useTranslation();
  const tabClients = useSelector(selectClient)
  const dispatch = useDispatch()

  let navigate = useNavigate();
  //const cctx = useContext(clientCtx);
  const tabNotFiltred = _.map(tabClients, "numero_de_tel");

  const refNom = useRef("");
  const refTel = useRef("");
  const refAdresse = useRef("");
  const refEmail = useRef("");

  function verifyPhoneNumber(nb) {
    var regex = new RegExp("^([234579]{1})([0-9]{7})$");
    var is_phone = regex.test(nb);
    if (is_phone) {
      //alert("ok");
      return true;
    } else {
      //alert("not ok");
      return false;
    }
  }
  function verifyEmail(email) {
    var regex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
    var is_email = regex.test(email);
    if (is_email) {
      //alert("ok");
      return true;
    } else {
      //alert("not ok");
      return false;
    }
  }
  function submitHandler(e) {
    e.preventDefault();
    let newClient = {
      nomClient: refNom.current.value,
      numero_de_tel: refTel.current.value,
      adresse: refAdresse.current.value,
      email: refEmail.current.value,
    };
    //verification du numero de tel
    //Guard clause
    if (!verifyPhoneNumber(refTel.current.value)) {
      swal({
        title: "Echec",
        text: `Mauvais format de ${t('generalInformations.phone')}!`,
        icon: "error",
      });
      return;
    } else {
    }
    //verification de l'adresse email
    //Guard clause
    if (!verifyEmail(refEmail.current.value)) {
      swal({
        title: "Echec",
        text: "Mauvais format de l'adresse email !",
        icon: "error",
      });
      return;
    } else {
    }
    if (!tabNotFiltred.includes(newClient.numero_de_tel)) {
      dispatch(CreateClient(newClient))
      //cctx.addNewClient(newClient);
      swal({
        title: "Ajout Client!",
        text: "Le client est bien ajouté!",
        icon: "success",
      });
      e.target.reset();
      navigate("/clients");
      window.location.reload();
    } else {
      swal({
        title: "Echec",
        text: "Ce {t('generalInformations.phone')} existe déjà, veuillez entrer un numéro différent!",
        icon: "error",
      });
    }
  }
  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div className="container-fluid">
          <h6 className="display-6 my-4"> {t("page.clients.form.add")} </h6>{" "}
          <hr />
          <form
            onSubmit={submitHandler}
            method="post"
            className="container shadow p-3 bg-light"
          >
            <label htmlFor="nomClient">{t("page.clients.form.name")}</label>
            <input
              type="text"
              name="nomClient"
              ref={refNom}
              className="form-control"
              required
            />
            <label htmlFor="numero_de_tel">
              {t("generalInformations.phone")}
            </label>
            <input
              type="number"
              name="numero_de_tel"
              ref={refTel}
              className="form-control"
              required
            />
            <label htmlFor="adresse">{t("page.clients.form.adress")}</label>
            <input
              type="text"
              name="adresse"
              ref={refAdresse}
              className="form-control"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              ref={refEmail}
              className="form-control"
              required
            />
            <div className="d-flex flex-row-reverse">
              <div className="p-2">
                <button className="btn bg-green my-2 " type="submit">
                  {t("buttons.confirm")} <FaSave></FaSave>
                </button>
              </div>
              <div className="p-2">
                <Link to="/clients" className="btn btn-danger my-2 mr-2">
                  {t("buttons.cancel")} <FaBan></FaBan>{" "}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
