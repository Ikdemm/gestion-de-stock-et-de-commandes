import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiAddToQueue } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetAllClients, selectClient } from "../../features/customer/customerSlice";
import "../Form.module.css";
import OneCustomer from "./OneCustomer";

export default function ListeClients() {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const tabClients = useSelector(selectClient)

  useEffect(() => {
    dispatch(GetAllClients())
    // eslint-disable-next-line
  }, []);

  if (tabClients) {
    return (
      <div>
      <div className="row d-flex">
        <h6 className="col-md-9 flex-fill display-4">{t('page.clients.list')}</h6>

        <div className="col-md-2">
          <Link to="/addClient" className="btn bg-blue m-4 p-2">
          {t('buttons.new')} <BiAddToQueue></BiAddToQueue>
          </Link>
        </div>
      </div>
      {tabClients.length > 0 ? (
          <div className="card col m-3 px-2">
          {tabClients.map((p) => {
            return <OneCustomer client={p} key={p._id}></OneCustomer>;
          })}
               </div>
        ) : (
          <div className="text-center">
            <img
              src={require("../../assets/images/nothing.png")}
              alt="nothing to display"
            />{" "}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-success display-6">
        {t('page.clients.fetch')}
          <div className="fetching">
            <FaSpinner className="spinner"></FaSpinner>
          </div>
        </div>
      </div>
    );
  }
}
