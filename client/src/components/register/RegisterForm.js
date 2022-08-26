import React, { useContext, useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  let navigate = useNavigate();
  let refemail = useRef("");
  let refrole = useRef("");
  let refpassword = useRef("");
  const [tabUsers, setTabUsers] = useState([]);

  function submitHandler(e) {
    e.preventDefault();
    let newUser = {
      email: refemail.current.value,
      role: refrole.current.value,
      password: refpassword.current.value,
  
    };
    fetch("/api/auth/register",{
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },  
    }
    ).then((res) => {

      alert("le compte utilisateur est bien créé");
    })
    .catch((err) => {
      alert("erreur inconnue");
    });
    setTabUsers((prev) => {
      return [...prev, newUser];
    });
    e.target.reset();
    navigate("/register");
  }
  return (
    <div style={{display:"flex"}}>
     <div>
       <h6 className='display-6'>Créer un compte utilisateur</h6>  
       <div className="shadow p-3">
      <form onSubmit={submitHandler} method="post" style={{width:100+"vh"}}>
        <div >
          <label htmlFor="email">Email</label>
          <input className="form-control mb-4" type="email" ref={refemail} name="email"></input>
          <label htmlFor="password">Mot de passe</label>
          <input className="form-control mb-4" type="password" ref={refpassword} name="password"></input>
          <label htmlFor="role">Role</label>
          <select name="role" className="form-control  mb-4" ref={refrole}>
          <option>--veuillez choisir le role--</option>
           <option>magasinier_appro</option>
           <option >magasinier_bati</option>
           <option >chef_serv_achat</option>
           <option >chef_serv_vente</option>
           <option >directeur_direction</option>
           <option >employe</option>
           <option >admin</option>
        </select>
        
      <button className="btn btn-outline-dark form-control rounded-pill" type="submit">Valider</button>
        </div>
      </form>  
    </div>
    </div>  
    </div>
  )
}
