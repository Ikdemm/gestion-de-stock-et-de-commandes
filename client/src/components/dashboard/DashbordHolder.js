import React from "react";
import Cards from "./Cards";
import LineChart from "./charts/LineChart/LineChart";
import PieChart from "./charts/LineChart/PieChart";
import Indices from "./Indices";
import BeneficesParProduit from "./tables/BeneficesParProduit";

export default function DashbordHolder() {

  return (
  <div>
    <div className="row mb-3">
    <Cards></Cards>
      
    </div>
    <div className="row mb-3">
      <div className="col-md-8">
        <LineChart></LineChart>
      </div>
      <div className="col-md-4">
        <PieChart></PieChart>
      </div>
    </div>
    <div className="row">
   
    <div className="col-md-8">

      <BeneficesParProduit></BeneficesParProduit>
    </div>
    <div className="col-md-4">
      <Indices></Indices>
</div>
    </div>
  </div>
  )
}
