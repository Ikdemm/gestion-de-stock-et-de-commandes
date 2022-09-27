import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "../../../Services/instance";
import moment from "moment";
import "moment/locale/fr";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { appelOffreCtx } from "./../../../store/appelOffreContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function OneAPO(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let ctx = useContext(appelOffreCtx);
  const [tabProduits, setTabProduits] = useState([]);
  useEffect(() => {
    axios.get(`/api/produits`).then((response) => {
      setTabProduits(response.data);
    });
  }, []);
  console.log("tabProduits", tabProduits);
  var pdt = tabProduits.find((p) => p._id === props.apo.produit_id);
  console.log("pdt", pdt);

  function removeC() {
    ctx.removeOneAppelOffre(props.apo._id);

    window.location.reload();
  }
  if (tabProduits && pdt) {
    return (
      <>
        <tr>
          <td>{moment(props.apo.dateAPO).locale("fr").format("LL")}</td>
          <td>{props.apo.ref}</td>
          <td>
            {moment(props.apo.dateLimiteDeReponse).locale("fr").format("LL")}
          </td>
          <td>
            {moment(props.apo.dateDeCommandePlanifiee)
              .locale("fr")
              .format("LL")}{" "}
          </td>
          <td>
            <button className="btn btn-outline-dark" onClick={handleOpen}>
              {" "}
              <AiTwotoneEye />
            </button>
          </td>

          <td>
            <button className="btn btn-danger" onClick={removeC}>
              <BsTrash></BsTrash>
            </button>
          </td>
        </tr>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Appel d'offre n°: {props.apo.ref}
              <br />
              Objet: {props.apo.objet} <br />
              <hr />
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <ul>
                <li>Produit: {pdt.title}</li>
                <li>Quantité: {props.apo.quantite} unités</li>
                <li>Commentaire: {props.apo.commentaire} </li>
                <li>
                  Date Limite De Reponse:{" "}
                  {moment(props.apo.dateLimiteDeReponse)
                    .locale("fr")
                    .endOf("day")
                    .fromNow()}
                </li>
                <li>
                  Date De Commande Planifiée:{" "}
                  {moment(props.apo.dateDeCommandePlanifiee)
                    .locale("fr")
                    .endOf("day")
                    .fromNow()}
                </li>
              </ul>
            </Typography>
          </Box>
        </Modal>
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
