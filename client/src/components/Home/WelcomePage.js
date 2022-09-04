import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import DetailsUser from "./DetailsUser";
export default function WelcomePage() {
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

  if (tabUsers) {
    return (
      <div>
        <DetailsUser listOfUsers={tabUsers}></DetailsUser>
      </div>
    );
  } else {
    return (
      <div className="fetching">
        <FaSpinner className="spinner"></FaSpinner>
      </div>
    );
  }
}
