import {BsSpeedometer2,BsPeople,BsShop,BsList, BsCalculatorFill,BsFillPersonBadgeFill,BsCart4,BsBoxArrowLeft,BsFillPeopleFill, BsBoxSeam  , BsFillGearFill} from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import styles from'./Sidebar.module.css'
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div  className={styles.side}>     
    <div className={styles.top} >
    <span  className={styles.logo}> GSC Application</span>
  </div>
  <hr />
  <div>
    <ul>
    <Link to="/" style={{textDecoration:'none', color:"white"}}>
      <li>
        <BsSpeedometer2 className={styles.icon}/>
        <span>  Tableau de bord </span>
      </li>
      </Link>
      <Link to="/stock" style={{textDecoration:'none', color:"white"}}>  
      <li>
<BsBoxSeam className={styles.icon}/>
<span> Stock </span>
</li></Link>
<Link to="/listClients" style={{textDecoration:'none', color:"white"}}>
      <li>
<BsFillPeopleFill className={styles.icon}/>
        <span>Clients </span>
      </li>
      </Link>
      <Link to="/listCategories"style={{textDecoration:'none', color:"white"}}>
      <li>
<BsList className={styles.icon}/>
        <span> Catégories</span>
      </li>
      </Link>
      <Link to="/listProduits"style={{textDecoration:'none', color:"white"}}>
      <li>
<BsShop className={styles.icon}/>
        <span> Produits </span>
      </li>
      </Link>
      <Link to="/listFournisseurs" style={{textDecoration:'none', color:"white"}}>
      <li>
        <BsFillPersonBadgeFill className={styles.icon}/>
<span>Fournisseurs</span>
</li>
</Link>
<Link to="/"style={{textDecoration:'none', color:"white"}}> 
      <li>
        <BsCalculatorFill className={styles.icon}/>
        <span>Ventes </span>
      </li>
      </Link>
      <Link to="/"style={{textDecoration:'none', color:"white"}}>
      <li>
      <BsCart4 className={styles.icon}/>

        <span> Achats </span>
      </li>
      </Link>
      <Link to="/caisse"style={{textDecoration:'none', color:"white"}}>
      <li>
      <GiTakeMyMoney className={styles.icon}/>
        <span> Caisse </span>
      </li>
      </Link>
      <Link to="/listEmployes"style={{textDecoration:'none', color:"white"}}>
      <li>
      <BsPeople className={styles.icon}/>
        <span> Employés </span>
      </li>
      </Link>
      <Link to="/"style={{textDecoration:'none', color:"white"}}>
      <li>
<BsFillGearFill className={styles.icon}/>
        <span>Paramètres </span>
      </li>
      </Link>
      <Link to="/"style={{textDecoration:'none', color:"white"}}>
      <li>
<BsBoxArrowLeft className={styles.icon}/>
        <span>Se Déconnecter </span>
      </li>
      </Link>
    </ul>
    
    
    </div>
  
  </div>
  )
}

export default Sidebar