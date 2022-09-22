import React from "react";
import { useTranslation } from "react-i18next";
import ListeProduits from "./ListeProduits";

export default function HolderProduct() {
  const { t } = useTranslation();

  return (
    <div className="col">
      <div className="row p-2">
        <div className="col-md-12 p-0">
          <h1 className="display-3">{t("produits")}</h1>
          <hr />
        </div>

        <div className=" card col ml-0 my-3 ">
          <ListeProduits></ListeProduits>
        </div>
      </div>
    </div>
  );
}
