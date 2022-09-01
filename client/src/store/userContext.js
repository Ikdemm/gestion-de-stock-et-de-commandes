import { createContext, useState } from "react";

export const UserContext = createContext(
    {
        listeUsers: [],
        //selUser: {},
        addUser: () => { },
        //deleteUser: () => { },
        updateUser: () => { },
        getUsers: () => { },
        //getUser: () => { },
        seConnecter: () => { },
        
    }
)

function UserContextProvider(props) {

    const [tabUsers, setTabUsers] = useState([]);
/*     const [selectedCand, setSelectedCand] = useState({});
 */

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
                alert("Utilisateur Ajouté")
            }).catch((err) => {
                alert("Erreur inconnue !")
            })
setTabUsers((prev) => {
    return [...prev, user];
  });
    }
    function login(user) {
        return fetch('/api/auth/login',
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
   
    }
    function getAllUsers() {
        fetch('/api/auth/all-users')
            .then(res => res.json())
            .then(data => {
                
                console.log("getAllUsers",data);
                setTabUsers(data);
            })
          
    }

/*     function supprimerUser(id) {
        fetch(`http://localhost:3000/cv/persons/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                getAllUsers();
                alert("User Supprimé")
            }).catch((err) => {
                alert("Erreur inconnue !")
            })


    }
    function editerUser(uCand) {
        fetch(`http://localhost:3000/cv/persons/${selectedCand._id}`,
            {
                method: 'PUT',
                body: JSON.stringify(uCand),
                headers: {
                    'Content-Type': 'application/json',

                }
            }).then(res => {
                getAllUsers();
                alert("User mis à jour")
            }).catch((err) => {
                alert("Erreur inconnue !")
            })
    }

    function chercherUser(id) {
        let sel = {};
        fetch(`http://localhost:3000/cv/persons/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                sel = data;
                setSelectedCand(data);
            })
        console.log(sel);
        return sel;
    } */
    const context = {
        listeUsers: tabUsers,
        //selUser: selectedCand,
        getUsers: getAllUsers,
        addUser: register,
        //deleteUser: supprimerUser,
        //updateUser: editerUser,
        //getUser: chercherUser,
        seConnecter: login,
     
    }

    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContextProvider;