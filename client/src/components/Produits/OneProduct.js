import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaRegEye, FaSpinner, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { produitCtx } from "../../store/produitContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FcInfo , FcMoneyTransfer, FcPackage, FcRating, FcSalesPerformance} from "react-icons/fc";
import axios from "axios";

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
export default function OneProduct(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabCategories, seTabCategories] = useState([]);
  useEffect(() => {
    axios.get(`/api/categories`).then((response) => {
      seTabCategories(response.data);
    });
  }, []);
  var category=tabCategories.find((c)=>c._id===props.produit.categorie.categorie_id)
  console.log('category', category)
  let ctx = useContext(produitCtx);
  function removeC() {
    ctx.removeOneProduit(props.produit._id);

    window.location.reload();
  }
  if(category){
    return (
      <div className="row mb-1 mr-0 custom-border ">
 <div className="col-md-2 custom-border-right p-1 text-center">
  {
   props.produit.image?
     <img src={props.produit.image} alt="article from DB" width="100px" height="100px" />
     
    :
      
      <img src={require("../../assets/images/box.jpg")} alt="article static" width="100px" height="100px" />
   }


  </div>
                    {/* détails produit */}
  
        <div className="col-md-4 custom-border-right my-1">
        <div className="col">
            <div className="row">
                    <div className="col-md-1">  <FcInfo></FcInfo></div>
                    <div className="col-11">Libellé: {props.produit.title}</div>
            </div>
          <div className="row">
                  <div className="col-md-1">  <FcMoneyTransfer></FcMoneyTransfer></div>
                  <div className="col-11">Prix d'achat: {props.produit.price_a} dt</div>
          </div>
          <div className="row">
                  <div className="col-md-1">  <FcSalesPerformance></FcSalesPerformance></div>
                  <div className="col-11">Prix de vente: {props.produit.price_v} dt</div>
          </div>
          <div className="row">
                  <div className="col-md-1"> <FcPackage></FcPackage></div>
                  <div className="col-11">Etat: 
                   {
                    props.produit.stock_final>0?
                    
                    props.produit.etat="en stock"
                    :
                    props.produit.etat="en rupture de stock"
                    
  
                  }
                  </div>
          </div>
          </div>
          </div>
  
  
              {/* catégorie */}
              <div className="col-md-3 my-1 custom-border-right">
      <div className="row">
        <div className="col-md-2 ">
         <FcRating></FcRating>
        </div>
        <div className="col-md-10">
          <div className="row ">
          {category.name}
          </div>
        </div>
      </div>
    </div>
              {/* buttons */}
  
              <div className="col-md-3 my-4 px-4">
      <div className="row px-3 d-flex  justify-content-between" >
        <Button className=" btn btn-outline-dark  col-md-3 " onClick={handleOpen}>
             
             <FaRegEye />
           </Button>
        <Link
             className=" btn btn-outline-success col-md-3 "
             to={"/produits/" + props.produit._id + "/edit"}
           >
          
             <FaEdit />
           </Link>
        <button className=" btn btn-outline-danger col-md-3 " onClick={removeC}>
           
             <FaTrash />
           </button>
      </div>
    </div>
  
  
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              {props.produit.title}
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              {props.produit.description} <hr/>
              <ul>
                <li> En stock: {props.produit.stock_final}</li>
                <li className="text-danger"> Stock MIN: {props.produit.stock_min}</li>
                <li className="text-danger"> Stock MAX: {props.produit.stock_max}</li>
                
               
              </ul>
             
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
 else{
  return(
    <div className="fetching">      
    <FaSpinner className="spinner"></FaSpinner>
          </div>
  )
 }
}
