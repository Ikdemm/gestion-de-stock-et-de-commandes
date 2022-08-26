import {  default as React, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
export default function ListeEmployes() {
  const [APIData, setAPIData] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios.get(`/api/staff`)
        .then((response) => {
            setAPIData(response.data);
        })
}, []) 
const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(APIData)
  }
}
 
  return (
    <>


           <div>
   
          <div className='row'>
<div className='d-flex align-items-center mb-4'>
 
  <div className='col-9 inner-addon right-addon'>
  <i className="glyphicon glyphicon-search"></i>

<input type="text" className="form-control" placeholder="Chercher un employé..." onChange={(e) => searchItems(e.target.value)}/>

  </div>
  <div className="col-2 mx-2" >
    <Link to="/nouveau-employe">
    <button className='btn btn-dark'>Ajouter un employé</button>
    </Link>
  </div>
  </div>
</div>
            <div className='row'>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                          <div className='card mx-4 my-2 col-sm-12 col-md-4' style={{width:18+"rem"}}>                                 
                          <img src={`http://localhost:4000/getfile/${item.imageUrl}`} className="card-img-top" alt="avatar" style={{ width:250+"px", height:350+"px"}}/>                           
                   
                            <div className='card-body'>
                          <div className="card-title h5">{item.prenom} {item.nom}</div>
                                <p className="card-text">
                                    {item.poste}
                                </p>
     <button type="button" className='btn btn-outline-dark rounded-pill form-control'> Voir plus d'informations</button>
                            </div>
                
                        </div>
                 
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
<div className='card mx-4 my-2 col-sm-12 col-md-4' style={{width:18+"rem"}}>                                 
                              <img src={`http://localhost:4000/getfile/${item.imageUrl}`} className="card-img-top" alt="avatar" style={{ width:250+"px", height:350+"px"}}/>                           
                       
                                <div className='card-body'>
                              <div className="card-title h5">{item.prenom} {item.nom}</div>
                                    <p className="card-text">
                                        {item.poste}
                                    </p>
                                    <Link  to={"/employes/" + item._id + "/details"}>
                                   
         <button type="button" className='btn btn-outline-dark rounded-pill form-control'> Voir plus d'informations</button>
                                    </Link>
                                </div>
                    
                            </div>
                        )
                    })
                )}
            </div>
        </div>

    </>
  )
}
