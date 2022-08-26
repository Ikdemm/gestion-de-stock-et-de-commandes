import {
  BsSpeedometer2,
  BsPeople,
  BsShop,
  BsList,
  BsCalculatorFill,
  BsFillPersonBadgeFill,
  BsCart4,
  BsBoxArrowLeft,
  BsFillPeopleFill,
  BsBoxSeam,
  BsFillGearFill,
  BsFileEarmark,
  BsFillFileEarmarkArrowDownFill
} from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaRegBuilding } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
function Sidebar(props) {
if(!props.auth)
  return (

    <div className="d-flex flex-column flex-shrink-0 p-3 text-white col-3"style={{height:100+'vh',  float:"left", backgroundColor: "black", marginRight:7+'vh'}} >
      <div>
        <span className="display-6 fs-2" style={{color: "#09ff00" }}>  Nodes-Storage-Manager </span>
        <hr />
      </div>
    
      <div>

        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item" >
          <Link to="/dashboard" className="nav-link text-white">
              <span className={styles.icon}>  
              <BsSpeedometer2 />

              </span>
           <span className="ms-1"> Tableau de bord</span>  
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/stock"className="nav-link text-white">
          <span className={styles.icon}>
            <BsBoxSeam />
            </span>    
              <span className="ms-1"> Stock </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/clients"className="nav-link text-white">
          <span className={styles.icon}>   <BsFillPeopleFill /></span>
              <span className="ms-1">Clients </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/listCategories"className="nav-link text-white">
          <span className={styles.icon}>   <BsList /></span>
              <span className="ms-1"> Catégories des produits</span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/listProduits"className="nav-link text-white">
          <span className={styles.icon}>   <BsShop /></span>
              <span className="ms-1"> Produits </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/fournisseurs"className="nav-link text-white">
          <span className={styles.icon}>    <BsFillPersonBadgeFill /></span>
              <span className="ms-1">Fournisseurs</span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/ventes"className="nav-link text-white">
          <span className={styles.icon}>    <BsCalculatorFill /></span>
              <span className="ms-1">Ventes </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/achat"className="nav-link text-white">
          <span className={styles.icon}>  <BsCart4 /></span>

              <span className="ms-1"> Achats </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/caisse"className="nav-link text-white">
          <span className={styles.icon}>    <GiTakeMyMoney /></span>
              <span className="ms-1"> Caisse </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/directions"className="nav-link text-white">
          <span className={styles.icon}>  <FaRegBuilding /></span>
              <span className="ms-1"> Directions </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/employes"className="nav-link text-white">
          <span className={styles.icon}>  <BsPeople /></span>
              <span className="ms-1"> Employés </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/demandes"className="nav-link text-white">
          <span className={styles.icon}>  <BsFileEarmark /></span>
              <span className="ms-1"> Demandes </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/gestion-demandes"className="nav-link text-white">
          <span className={styles.icon}>  <BsFillFileEarmarkArrowDownFill /></span>
              <span className="ms-1">Gestion des Demandes des Employés </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/register"className="nav-link text-white">
          <span className={styles.icon}>  <BsFillGearFill /></span>
              <span className="ms-1">Gestion des profiles des utilisateurs </span>
          </Link>
            </li>
            <li className="nav-item">
          <Link to="/logout"className="nav-link text-white">
          <span className={styles.icon}>  <BsBoxArrowLeft /></span>
              <span className="ms-1">Se Déconnecter </span>
          </Link>
            </li>
        </ul>
      </div>
      </div>
     
   
  )
   else
   return(
    <div></div>
   )
}
export default Sidebar;
