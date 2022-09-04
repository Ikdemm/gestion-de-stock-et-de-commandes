import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBan, FaSave, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../store/userContext";
const _ = require("lodash");

export default function RegisterForm() {
  let navigate = useNavigate();
  let refemail = useRef("");
  let refrole = useRef("");
  let refpassword = useRef("");
  let refemploye = useRef("");
  const [tabStaff, setTabStaff] = useState([]);
  useEffect(() => {
    axios.get(`/api/staff`).then((response) => {
      setTabStaff(response.data);
    });
  }, []);

  let ctx=useContext(UserContext)
  const tabNotFiltred = _.map(ctx.listeUsers, "email");

  function submitHandler(e) {
    e.preventDefault();
    const c = tabStaff.find((p) => p._id === refemploye.current.value);

    let newUser = {
      email: refemail.current.value,
      role: refrole.current.value,
      password: refpassword.current.value,
      employe_id: c._id

    };
    if (!tabNotFiltred.includes(newUser.email)) {
   
    ctx.addUser(newUser)
    e.target.reset();
    navigate("/profiles");
    window.location.reload()
  } else
  alert("cet email existe déjà, veuillez entrer un email différent");
}

  if (tabStaff ) {

  return (
    <div className="container">
    <div style={{ display: "flex" }}>
  <div className="container-fluid">       
  <h6 className='display-6 mb-4'>Créer un compte utilisateur</h6>        <hr />

       <div className="row card">
      <form onSubmit={submitHandler} method="post" className="shadow p-4 bg-white">
        <div >
          <label htmlFor="email">Email</label>
          <input className="form-control mb-4" type="email" ref={refemail} name="email"></input>
          <label htmlFor="password">Mot de passe</label>
          <input className="form-control mb-4" type="password" ref={refpassword} name="password" autoComplete="on"></input>
          <label htmlFor="employe_id">Employé</label>
          <select name="employe_id" className="form-select  mb-4" ref={refemploye}>
          <option>--veuillez choisir l'employé--</option>
  
          {tabStaff.map((f) => {
          
                  return <option key={f._id} value={f._id} >{f.prenom} {f.nom}  </option>
                }
          )
          }  
        </select>
          <label htmlFor="role">Role</label>
          <select name="role" className="form-select  mb-4" ref={refrole}>
          <option>--veuillez choisir le role--</option>
           <option value="magasinier_appro">Magasinier d'approvisionnement</option>
           <option value="magasinier_bati">Magasinier du batiment</option>
           <option value="chef_serv_achat">Chef de service achat</option>
           <option value="chef_serv_vente">Chef de service vente</option>
           <option value="directeur_direction">Directeur de direction</option>
           <option value="employe">Employé</option>
           <option value="admin">Admin</option>
        </select>
        <div className='d-flex flex-row-reverse'>
                <div className='p-2'>
             <button className="btn bg-green my-2 " type="submit" >Confirmer <FaSave></FaSave></button>    
                </div>
                <div className='p-2'>
             <Link to="/profiles" className="btn btn-danger my-2 mr-2">Annuler <FaBan></FaBan> </Link>
                </div>
                
               </div>
        </div>
      </form>  
    </div>  
    </div>
    </div>
    </div>
  )
} else {
  return (
    <div className="fetching">
      <FaSpinner className="spinner"></FaSpinner>
    </div>
  );
}
}