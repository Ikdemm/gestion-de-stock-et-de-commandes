import React, { useEffect, useState } from 'react';
import UsersList from './UsersList';

export default function AllUsers() {
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

 
    

  return (
    <div>    
         

    <h6 className='display-6'>Liste des utilisateurs</h6>  

<UsersList listOfUsers={tabUsers}></UsersList>
   
   
   
    </div>  )
}
