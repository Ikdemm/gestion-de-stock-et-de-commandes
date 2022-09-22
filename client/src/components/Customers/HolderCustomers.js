import React from 'react';
import ListeClients from './ListeClients';
import {useTranslation} from 'react-i18next'

export default function HolderCustomers() {
  const {t} = useTranslation()

  return (
    <div className="col">
    <div className="row p-2">
      <div className="col-md-12 p-0">
        <h1 className="display-3">{t("clients")}</h1>
        <hr />
      </div>
    
      <div className=" card col ml-0 my-3 ">
      <ListeClients></ListeClients>
  
      </div>
    </div>
  </div>

  )
}
