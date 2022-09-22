import React from "react";
import { useTranslation } from "react-i18next";
import ListeCategories from "./ListeCategories";

export default function CategoryHolder() {
  const { t } = useTranslation();

  return (
    <div className="col">
      <div className="row p-2">
        <div className="col-md-12 p-0">
          <h1 className="display-3">{t("categories")}</h1>
          <hr />
        </div>

        <div className=" card col ml-0 my-3 ">
          <ListeCategories></ListeCategories>
        </div>
      </div>
    </div>
  );
}
