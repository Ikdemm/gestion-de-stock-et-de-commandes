import moment from "moment";
import "moment/locale/fr";
import React, { useEffect } from "react";
import { BsCardHeading } from "react-icons/bs";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateFactureAchat } from "../../features/factures_ordinaires/achat/factures/factAchatSlice";
import { getAllLignesAchatsOridinaires, selectTabAllLignesAchatsOridinaires } from "../../features/factures_ordinaires/achat/lines/ligneAchatOrdinaireSlice";

export default function OneFactureAchat(props) {
  //let ctx = useContext(achatFactCtx);
  let date = props.facture.dateFacture;
  const dispatch = useDispatch();

  const tabLignes = useSelector(selectTabAllLignesAchatsOridinaires);

  useEffect(() => {
    dispatch(getAllLignesAchatsOridinaires());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var tabLignesFiltred = tabLignes.filter( (l) => l.facture_id === props.facture._id );
  function UpdateFacture() {
    if (props.facture.etat === "non_payee") {
      props.facture.etat = "payee";
    } else {
      props.facture.etat = "non_payee";
    }
    let data={
      id: props.facture._id,
      data:  props.facture
    }
    dispatch(updateFactureAchat(data))
    //ctx.updateAchatFact(props.facture._id, props.facture);
    window.location.reload();
  }
  if (tabLignesFiltred) {
    return (
      <>
        <tr>
          <td>{moment(date).locale("fr").format("L")}</td>
          <td>{props.facture.numFacture}</td>

          <td>{props.facture.net_a_payer} dt</td>
          <td>{moment(props.facture.dateEcheance).locale("fr").format("L")}</td>

          <td>
            <Link
              to={"/facture-achat/" + props.facture._id + "/details"}
              className=" btn btn-outline-dark mx-1"
            >
              {" "}
              <BsCardHeading />
            </Link>
          </td>
          <td>
            <button
              className="btn bg-white border-dark mx-1"
              onClick={UpdateFacture}
            >
              {props.facture.etat === "non_payee" ? (
                <div className="text-success">
                  Marquer comme payée <FaCheck className="mx-2 " />
                </div>
              ) : (
                <div className="text-danger">
                  Marquer comme non payée <FcCancel></FcCancel>
                </div>
              )}
            </button>
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <div className="fetching">
        <FaSpinner className="spinner"></FaSpinner>
      </div>
    );
  }
}
