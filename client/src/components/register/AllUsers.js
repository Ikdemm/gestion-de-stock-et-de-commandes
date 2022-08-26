import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function AllUsers() {
    const [tabUsers, setTabUsers] = useState([]);

useEffect(()=>{

    fetch("/api/auth/all-users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
  
  
        return res.json();
      })
      .then((data) => setTabUsers(data));
},[])
  
    
  return (
    <div>    
         

    <h6 className='display-6'>Liste des utilisateurs</h6>  
  <ol className='list-group'>

      { tabUsers.map((u)=>{
          
          return   <li className='list-group-item'>{u.email} | {u.role}</li>
          
        })
    }
    </ol>

   
   
   
    </div>  )
}
