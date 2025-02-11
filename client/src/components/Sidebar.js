import { useContext, useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsBoxArrowLeft,
  BsBoxSeam,
  BsCalculatorFill,
  BsCart4,
  BsFileEarmark,
  BsFillFileEarmarkArrowDownFill,
  BsFillGearFill,
  BsFillPeopleFill,
  BsFillPersonBadgeFill,
  BsList,
  BsPeople,
  BsShop,
  BsSpeedometer2
} from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../store/LoginContext";
import styles from "./Sidebar.module.css";
function Sidebar() {
  const LogCtx = useContext(LoginContext);
  let navigate = useNavigate();
  const [tabUsers, setListeUsers] = useState([]);
  useEffect(()=>{
    fetch('/api/auth/all-users')
    .then(res => {return res.json()})
    .then(data => {
              
      for (const key in data) {
          data[key]._id = key;
          setListeUsers((prev)=>{
              return [...prev, data[key]]
          })

      }}
      )
   
  },[])

  let emailUser = localStorage.getItem("email");
  var connectedUser = tabUsers.find((u) => u.email === emailUser);
  const [isLogged, setIsLogged] = useState(false);
  function verifyConnecte() {
    let token = localStorage.getItem('token');
    if (token)
        setIsLogged(true);
    else
        setIsLogged(false);
}
useEffect(()=>{
  verifyConnecte()
},[])
 
  if (!isLogged) {
return<div></div>
  }else
if(connectedUser?.role==="admin")
 { return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white col-3"
        style={{
          height: 100 + "vh",
          float: "left",
          backgroundColor: "black",
          marginRight: 7 + "vh",
        }}
      >
        <div>
          <span className="display-6 fs-2" style={{ color: "#09ff00" }}>
            {" "}
            Nodes-Storage-Manager{" "}
          </span>
          <hr />
        </div>

        <div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/welcome-page" className="nav-link text-white">
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className="ms-1"> Page d'accueil</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white">
                <span className={styles.icon}>
                  <BsSpeedometer2 />
                </span>
                <span className="ms-1"> Tableau de bord</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/stock" className="nav-link text-white">
                <span className={styles.icon}>
                  <BsBoxSeam />
                </span>
                <span className="ms-1"> Inventaire </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/listCategories" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsList />
                </span>
                <span className="ms-1"> Catégories des produits</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/listProduits" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsShop />
                </span>
                <span className="ms-1"> Produits </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/clients" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFillPeopleFill />
                </span>
                <span className="ms-1">Clients </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fournisseurs" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFillPersonBadgeFill />
                </span>
                <span className="ms-1">Fournisseurs</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ventes" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsCalculatorFill />
                </span>
                <span className="ms-1">Ventes </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/achat" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsCart4 />
                </span>

                <span className="ms-1"> Achats </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/directions" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <FaRegBuilding />
                </span>
                <span className="ms-1"> Directions </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/employes" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsPeople />
                </span>
                <span className="ms-1"> Employés </span>
              </Link>
            </li>
                  <li className="nav-item">
              <Link to="/gestion-demandes" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFillFileEarmarkArrowDownFill />
                </span>
                <span className="ms-1">Gestion des Demandes des Employés </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profiles" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFillGearFill />
                </span>
                <span className="ms-1">
                  Gestion des profiles des utilisateurs{" "}
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  LogCtx.seDeconnecter();
                  navigate("/");
                  window.location.reload();
                }}
                className="nav-link text-white"
              >
                <span className={styles.icon}>
                  {" "}
                  <BsBoxArrowLeft />
                </span>
                <span className="ms-1">Se Déconnecter </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )}
  else 
  if(connectedUser?.role==="magasinier_appro")
{  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white col-3"
        style={{
          height: 100 + "vh",
          float: "left",
          backgroundColor: "black",
          marginRight: 7 + "vh",
        }}
      >
        <div>
          <span className="display-6 fs-2" style={{ color: "#09ff00" }}>
            {" "}
            Nodes-Storage-Manager{" "}
          </span>
          <hr />
        </div>

        <div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/welcome-page" className="nav-link text-white">
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className="ms-1"> Page d'accueil</span>
              </Link>
            </li>
     
            <li className="nav-item">
              <Link to="/stock" className="nav-link text-white">
                <span className={styles.icon}>
                  <BsBoxSeam />
                </span>
                <span className="ms-1"> Inventaire </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/listCategories" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsList />
                </span>
                <span className="ms-1"> Catégories des produits</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/listProduits" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsShop />
                </span>
                <span className="ms-1"> Produits </span>
              </Link>
            </li>
         
            <li className="nav-item">
              <button
                onClick={() => {
                  LogCtx.seDeconnecter();
                  navigate("/");
                  window.location.reload();
                }}
                className="nav-link text-white"
              >
                <span className={styles.icon}>
                  {" "}
                  <BsBoxArrowLeft />
                </span>
                <span className="ms-1">Se Déconnecter </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );}
  if(connectedUser?.role==="magasinier_bati")
 { return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white col-3"
        style={{
          height: 100 + "vh",
          float: "left",
          backgroundColor: "black",
          marginRight: 7 + "vh",
        }}
      >
        <div>
          <span className="display-6 fs-2" style={{ color: "#09ff00" }}>
            {" "}
            Nodes-Storage-Manager{" "}
          </span>
          <hr />
        </div>

        <div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/welcome-page" className="nav-link text-white">
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className="ms-1"> Page d'accueil</span>
              </Link>
            </li>
         
            <li className="nav-item">
              <Link to="/gestion-demandes" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFillFileEarmarkArrowDownFill />
                </span>
                <span className="ms-1">Gestion des Demandes des Employés </span>
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  LogCtx.seDeconnecter();
                  navigate("/");
                  window.location.reload();
                }}
                className="nav-link text-white"
              >
                <span className={styles.icon}>
                  {" "}
                  <BsBoxArrowLeft />
                </span>
                <span className="ms-1">Se Déconnecter </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )}
  if(connectedUser?.role==="chef_serv_achat")
 { return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white col-3"
        style={{
          height: 100 + "vh",
          float: "left",
          backgroundColor: "black",
          marginRight: 7 + "vh",
        }}
      >
        <div>
          <span className="display-6 fs-2" style={{ color: "#09ff00" }}>
            {" "}
            Nodes-Storage-Manager{" "}
          </span>
          <hr />
        </div>

        <div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/welcome-page" className="nav-link text-white">
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className="ms-1"> Page d'accueil</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fournisseurs" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFillPersonBadgeFill />
                </span>
                <span className="ms-1">Fournisseurs</span>
              </Link>
            </li>
  <li className="nav-item">
              <Link to="/achat" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsCart4 />
                </span>

                <span className="ms-1"> Achats </span>
              </Link>
            </li>

    
            <li className="nav-item">
              <button
                onClick={() => {
                  LogCtx.seDeconnecter();
                  navigate("/");
                  window.location.reload();
                }}
                className="nav-link text-white"
              >
                <span className={styles.icon}>
                  {" "}
                  <BsBoxArrowLeft />
                </span>
                <span className="ms-1">Se Déconnecter </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )}
  if(connectedUser?.role==="chef_serv_vente")
 { return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white col-3"
        style={{
          height: 100 + "vh",
          float: "left",
          backgroundColor: "black",
          marginRight: 7 + "vh",
        }}
      >
        <div>
          <span className="display-6 fs-2" style={{ color: "#09ff00" }}>
            {" "}
            Nodes-Storage-Manager{" "}
          </span>
          <hr />
        </div>

        <div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/welcome-page" className="nav-link text-white">
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className="ms-1"> Page d'accueil</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/clients" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFillPeopleFill />
                </span>
                <span className="ms-1">Clients </span>
              </Link>
            </li>
           <li className="nav-item">
              <Link to="/ventes" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsCalculatorFill />
                </span>
                <span className="ms-1">Ventes </span>
              </Link>
            </li>
    
            <li className="nav-item">
              <button
                onClick={() => {
                  LogCtx.seDeconnecter();
                  navigate("/");
                  window.location.reload();
                }}
                className="nav-link text-white"
              >
                <span className={styles.icon}>
                  {" "}
                  <BsBoxArrowLeft />
                </span>
                <span className="ms-1">Se Déconnecter </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )}
  if(connectedUser?.role==="directeur_direction")
 { return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white col-3"
        style={{
          height: 100 + "vh",
          float: "left",
          backgroundColor: "black",
          marginRight: 7 + "vh",
        }}
      >
        <div>
          <span className="display-6 fs-2" style={{ color: "#09ff00" }}>
            {" "}
            Nodes-Storage-Manager{" "}
          </span>
          <hr />
        </div>

        <div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/welcome-page" className="nav-link text-white">
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className="ms-1"> Page d'accueil</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white">
                <span className={styles.icon}>
                  <BsSpeedometer2 />
                </span>
                <span className="ms-1"> Tableau de bord</span>
              </Link>
            </li>
   <li className="nav-item">
              <Link to="/profiles" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFillGearFill />
                </span>
                <span className="ms-1">
                  Gestion des profiles des utilisateurs{" "}
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  LogCtx.seDeconnecter();
                  navigate("/");
                  window.location.reload();
                }}
                className="nav-link text-white"
              >
                <span className={styles.icon}>
                  {" "}
                  <BsBoxArrowLeft />
                </span>
                <span className="ms-1">Se Déconnecter </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )}
  if(connectedUser?.role==="employe")
 { return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white col-3"
        style={{
          height: 100 + "vh",
          float: "left",
          backgroundColor: "black",
          marginRight: 7 + "vh",
        }}
      >
        <div>
          <span className="display-6 fs-2" style={{ color: "#09ff00" }}>
            {" "}
            Nodes-Storage-Manager{" "}
          </span>
          <hr />
        </div>

        <div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/welcome-page" className="nav-link text-white">
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className="ms-1"> Page d'accueil</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/demandes" className="nav-link text-white">
                <span className={styles.icon}>
                  {" "}
                  <BsFileEarmark />
                </span>
                <span className="ms-1"> Demandes </span>
              </Link>
            </li>
          
            <li className="nav-item">
              <button
                onClick={() => {
                  LogCtx.seDeconnecter();
                  navigate("/");
                  window.location.reload();
                }}
                className="nav-link text-white"
              >
                <span className={styles.icon}>
                  {" "}
                  <BsBoxArrowLeft />
                </span>
                <span className="ms-1">Se Déconnecter </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )}
}
export default Sidebar;
