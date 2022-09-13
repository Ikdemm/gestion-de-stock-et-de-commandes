import { createContext, useState } from "react";

export const UserContext = createContext(
    {
        listeUsers: [],
        addUser: () => { },
        getUsers: () => { },
        
    }
)

function UserContextProvider(props) {

    const [tabUsers, setTabUsers] = useState([]);

    function register(user) {
        fetch('/api/auth/register',
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                getAllUsers();
                console.log("Utilisateur Ajouté")
            }).catch((err) => {
                console.log("Erreur inconnue !")
            })
setTabUsers((prev) => {
    return [...prev, user];
  });
    }

    function getAllUsers() {
        fetch('/api/auth/all-users')
        .then(res => {return res.json()})
        .then(data => {
                  
          for (const key in data) {
              data[key]._id = key;
              setTabUsers((prev)=>{
                  return [...prev, data[key]]
              })
    
          }}
          )
    }


    const context = {
        listeUsers: tabUsers,
        getUsers: getAllUsers,
        addUser: register,
      
     
    }

    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContextProvider;